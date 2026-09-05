/**
 * Rebuilds src/data/announcements.json from a public Google Drive folder.
 *
 * Every file in the folder becomes one announcement; a file deleted from the
 * folder disappears from the site on the next run. Nothing is written unless
 * the folder can actually be read, so a failed run never blanks the site.
 *
 *   node scripts/sync-announcements.mjs
 *
 * Environment:
 *   DRIVE_FOLDER_ID   the folder's id (from its share link)
 *   GOOGLE_API_KEY    a Google Cloud API key with the Drive API enabled
 *
 * The folder must be shared as "Anyone with the link — Viewer".
 *
 * ---------------------------------------------------------------------------
 * FILE NAMING FORMAT — this is the whole content workflow
 *
 *   YYYY-MM-DD__kind__Title__Category.pdf
 *
 *   2026-08-15__announcement__Football team trials__Sports.pdf
 *   2026-08-02__news__Independence Day sports meet concluded__Sports.pdf
 *   2026-09-01__upcoming__Avishkar registrations open__Technical.pdf
 *
 * `kind` is announcement | news | upcoming. Category is optional. Underscores
 * in the title are shown as spaces. A file that does not match the format is
 * still published, using its filename as the title and its Drive modified
 * time as the date, so nothing is ever silently dropped.
 * ---------------------------------------------------------------------------
 */
import fs from "node:fs";
import path from "node:path";

const OUT = path.join("src", "data", "announcements.json");
const FOLDER = process.env.DRIVE_FOLDER_ID;
const KEY = process.env.GOOGLE_API_KEY;

const KINDS = new Set(["announcement", "news", "upcoming"]);

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
}

/** Turn one Drive file into an announcement record. */
function toAnnouncement(file) {
  const base = file.name.replace(/\.[^.]+$/, "");
  const parts = base.split("__").map((p) => p.trim());

  let [date, kind, title, category] = ["", "announcement", base, ""];

  if (parts.length >= 3 && /^\d{4}-\d{2}-\d{2}$/.test(parts[0]) && KINDS.has(parts[1])) {
    [date, kind, title] = parts;
    category = parts[3] ?? "";
  } else {
    // Not in the naming format — keep it, using what Drive knows.
    date = (file.modifiedTime ?? "").slice(0, 10);
  }

  title = title.replace(/_/g, " ").trim();

  const pretty = date
    ? new Date(`${date}T00:00:00Z`).toLocaleDateString("en-IN", {
        day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
      })
    : "";

  const isImage = (file.mimeType ?? "").startsWith("image/");

  return {
    slug: slugify(`${date}-${title}`) || file.id,
    kind,
    title,
    date: pretty,
    category,
    summary: "",
    body: "",
    image: isImage ? `https://drive.google.com/uc?export=view&id=${file.id}` : "",
    eventSlug: "",
    link: file.webViewLink ?? `https://drive.google.com/file/d/${file.id}/view`,
    attachments: isImage ? [] : [{ label: file.name, href: file.webViewLink ?? "" }],
    // Kept so a re-run can tell Drive-sourced entries from hand-written ones.
    source: "drive",
  };
}

async function main() {
  if (!FOLDER || !KEY) {
    console.log(
      "DRIVE_FOLDER_ID / GOOGLE_API_KEY not set — leaving announcements.json untouched.",
    );
    return;
  }

  const url = new URL("https://www.googleapis.com/drive/v3/files");
  url.searchParams.set("q", `'${FOLDER}' in parents and trashed = false`);
  url.searchParams.set("fields", "files(id,name,mimeType,modifiedTime,webViewLink)");
  url.searchParams.set("orderBy", "name desc");
  url.searchParams.set("pageSize", "200");
  url.searchParams.set("key", KEY);

  const res = await fetch(url);
  if (!res.ok) {
    // Never blank the site because Drive had a bad day.
    console.error(`Drive returned ${res.status}. Leaving announcements.json untouched.`);
    process.exitCode = 1;
    return;
  }

  const { files = [] } = await res.json();
  const fromDrive = files
    .filter((f) => f.mimeType !== "application/vnd.google-apps.folder")
    .map(toAnnouncement);

  // Anything added by hand stays; only the Drive-sourced entries are replaced.
  const existing = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, "utf8")) : [];
  const manual = existing.filter((a) => a.source !== "drive");

  const next = [...fromDrive, ...manual];
  const before = JSON.stringify(existing);
  const after = JSON.stringify(next, null, 2) + "\n";

  if (before === JSON.stringify(next)) {
    console.log(`No change — ${fromDrive.length} announcement(s) from Drive.`);
    return;
  }

  fs.writeFileSync(OUT, after);
  console.log(`Wrote ${fromDrive.length} from Drive + ${manual.length} manual = ${next.length}.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
