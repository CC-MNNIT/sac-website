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
npm run build   # prerenders all 98 pages
npm run start   # serves the production build on port 3000
```

**Vercel / Netlify** — import the folder as a Next.js project. No configuration
and no environment variables are required; the default build command
(`npm run build`) is correct.

**Any Node host** — `npm install && npm run build && npm run start`, then put a
reverse proxy in front of port 3000.

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
can pull announcements from a public Drive folder every 30 minutes. It does
nothing until the `DRIVE_FOLDER_ID` and `GOOGLE_API_KEY` repository secrets are
set, so it is safe to leave alone.
