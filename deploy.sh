#!/bin/bash

# Deploy the SAC website (Next.js static export) to sac.mnnit.ac.in.
# Mirrors the old SAC-MNNIT deploy flow: pull, nix build, copy to nginx web root.

# Exit immediately if any command fails
set -e

# Define exact variables
REPO_DIR="$HOME/repos/sac-website"
WEB_DIR="/var/www/sac.mnnit.ac.in/html"

echo "🚀 Starting Nix-powered Deployment for sac.mnnit.ac.in..."

# 1. Ensure we are operating in the correct repository directory
cd "$REPO_DIR"
echo "📁 Operating in: $REPO_DIR"

# 2. Pull latest changes from GitHub
echo "⬇️ Pulling latest changes from Git..."
git pull origin main

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

# 5. Clean the old web directory and copy the entire new export
echo "🧹 Clearing old files and copying new build..."
sudo rm -rf "$WEB_DIR"/*
sudo cp -r out/* "$WEB_DIR"/

# 6. Set proper Nginx permissions
echo "🔒 Setting permissions for Nginx..."
sudo chown -R www-data:www-data "$WEB_DIR"
sudo chmod -R 755 /var/www/sac.mnnit.ac.in

echo "✅ Deployment Successful! The latest version is now live."
