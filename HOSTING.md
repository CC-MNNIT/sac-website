# Running and hosting this site

A Next.js 16 site. Everything it needs is in this folder — there is no database,
no API keys and no external service to set up.

## Run it locally

```bash
npm install     # installs dependencies (node_modules is not in this zip)
npm run dev     # http://localhost:3000
```

Node 20 or newer.

## Build and host

```bash
npm install
npm run build   # static export → out/ (95 pages + 404.html)
```

`next.config.ts` sets `output: "export"`, so the build emits plain HTML/CSS/JS
into `out/` — there is no Node runtime in production. Images are served
unoptimized (they are pre-sized WebP) and URLs use trailing slashes, which
matches the server's nginx `try_files $uri $uri/` routing.

**The SAC server (sac.mnnit.ac.in)** — the repo is cloned at
`/home/sac/repos/sac-website` on `sac@100.64.163.38`. Deploy with:

```bash
ssh sac@100.64.163.38
bash ~/repos/sac-website/deploy.sh
```

`deploy.sh` pulls from `main`, builds inside a Nix `nodejs_20` shell, sanity
checks that `out/index.html` exists, then copies `out/` into
`/var/www/sac.mnnit.ac.in/html` via the root-owned helper
`/usr/local/bin/sac-deploy-sync` (NOPASSWD sudo — no password needed). nginx
serves the result over HTTPS (Certbot). The previous site lives in
`/home/sac/repos/SAC-MNNIT` if a rollback is ever needed.

**Vercel / Netlify** — import the folder as a Next.js project. No configuration
and no environment variables are required; the default build command
(`npm run build`) is correct.

**Any Node host** — `npm install && npm run build`, then serve the generated
`out/` directory as plain static files.

## Where the content lives

Every word, name, photograph and link on the site comes from JSON files in
`src/data/`. Editing those files is the whole content workflow — no component
needs to be touched. `README.md` explains each file, and
`docs/SPECIFICATION.md` records where the existing content came from.

- `docs/REFORM-BRIEF.md` — the brief the site was built to
- `docs/SAC-Website-Content-Required.pdf` — the two-page list of what the SAC
  office still needs to supply
- `public/images/` — all photographs and logos

## Optional: announcements from Google Drive

`scripts/sync-announcements.mjs` and `.github/workflows/sync-announcements.yml`
can pull announcements from a public Drive folder every 30 minutes. The
workflow stays green but does nothing until the `DRIVE_FOLDER_ID` and
`GOOGLE_API_KEY` repository secrets are set.

Two things to know when enabling it later:

1. Adding the two repository secrets is all it takes — the guard step
   auto-activates the sync on the next scheduled run.
2. A sync only commits changes to git. The live site updates on the next
   `deploy.sh` run, so wire up a CI deploy step (or plan to redeploy manually)
   when announcements become a real content channel.
