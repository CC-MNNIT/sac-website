#!/bin/bash

# Deploy the SAC website (Next.js static export) to sac.mnnit.ac.in.
# Mirrors the old SAC-MNNIT deploy flow: pull, nix build, copy to nginx web root.

# Exit immediately if any command fails
set -e

# Define exact variables
REPO_DIR="$HOME/repos/sac-website"

echo "🚀 Starting Nix-powered Deployment for sac.mnnit.ac.in..."

# 1. Ensure we are operating in the correct repository directory
cd "$REPO_DIR"
echo "📁 Operating in: $REPO_DIR"

# 2. Pull latest changes from GitHub.
#    Editing a bash script while it is running corrupts execution, so if the
#    pull changes this very file, re-exec it to run the freshly pulled version.
if [ -z "${DEPLOY_PULLED:-}" ]; then
  echo "⬇️ Pulling latest changes from Git..."
  git pull origin main
  export DEPLOY_PULLED=1
  exec bash "$0"
fi

# 3 & 4. Install dependencies and build the static export using Nix.
# `output: "export"` in next.config.ts makes this emit plain files into out/.
echo "📦 Building the application inside an isolated Nix environment..."
. "$HOME/.nix-profile/etc/profile.d/nix.sh"
nix-shell -p nodejs_20 --run "npm install && npm run build"

# Sanity check: the export must exist before we touch the web root
if [ ! -f out/index.html ]; then
  echo "❌ Build failed: out/index.html missing — leaving the live site untouched."
  exit 1
fi

# 5. Clean the old web directory and copy the entire new export.
#    The root-owned helper is NOPASSWD (see /etc/sudoers.d/sac-deploy), so no
#    password is needed here.
echo "🧹 Clearing old files and copying new build..."
sudo /usr/local/bin/sac-deploy-sync

echo "✅ Deployment Successful! The latest version is now live."
