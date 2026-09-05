/**
 * Regenerates the two-page "Content still required" checklist from the site's
 * own data, so the counts stay accurate as gaps are filled.
 * Run: node scripts/generate-content-checklist.mjs
 */
import fs from "node:fs";
const read = (f) => JSON.parse(fs.readFileSync(`src/data/${f}.json`, "utf8"));

const activities = read("activities"), events = read("events");
const facilities = read("facilities"), documents = read("documents");
const gallery = read("gallery"), achievements = read("achievements"), site = read("site");

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const totalAch = achievements.reduce((n, y) => n + y.achievements.length, 0);
const totalFac = facilities.reduce((n, g) => n + g.items.length, 0);

const OFFICE = "SAC office", COORD = "Coordinators", ORG = "Event teams", WEB = "Web team";

const table = (items) => `<table>
  <tbody>${items.map((i) => `<tr>
    <td class="c"><span class="box"></span></td>
    <td><strong>${esc(i.what)}</strong>${i.note ? `<span class="note">${esc(i.note)}</span>` : ""}</td>
    <td class="who">${esc(i.who)}</td>
  </tr>`).join("")}</tbody></table>`;

const section = (num, title, sub, items) => `<section>
  <div class="head"><span class="num">${num}</span><h2>${esc(title)}</h2></div>
  ${sub ? `<p class="sub">${esc(sub)}</p>` : ""}
  ${table(items)}
</section>`;

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>SAC Website — Content Still Required</title>
<style>
  @page { size: A4; margin: 12mm 12mm 10mm; }
  * { box-sizing: border-box; }
  body { font: 9pt/1.42 "Helvetica Neue", Helvetica, Arial, sans-serif; color: #14161f; margin: 0; }
  h1, h2 { font-family: Georgia, "Times New Roman", serif; }
  h1 { font-size: 19pt; line-height: 1.05; margin: 0 0 4pt; letter-spacing: -0.4pt; }
  h2 { font-size: 11.5pt; margin: 0; }
  p  { margin: 0 0 5pt; }
  .brand { font-size: 7pt; letter-spacing: 1.8pt; text-transform: uppercase; font-weight: 700;
           color: #2952e3; margin: 0 0 3pt; }
  .lede { font-size: 9pt; color: #3d4454; max-width: 165mm; margin-bottom: 3pt; }
  .rule { height: 2.5px; background: #14161f; margin: 7pt 0 9pt; }

  section { margin-top: 11pt; page-break-inside: avoid; }
  .head { border-top: 1.5px solid #14161f; padding-top: 5pt; margin-bottom: 4pt;
          display: flex; align-items: baseline; gap: 7pt; }
  .num  { font-family: Georgia, serif; font-size: 13pt; font-weight: 700; color: #2952e3; line-height: 1; }
  .sub  { font-size: 8pt; color: #6b7280; margin: 0 0 5pt; max-width: 168mm; }

  table { width: 100%; border-collapse: collapse; }
  tr { page-break-inside: avoid; }
  td { padding: 3.5pt 6pt; border-bottom: 0.6px solid #dcdad0; vertical-align: top; font-size: 8.8pt; }
  td.c { width: 15pt; padding-right: 0; }
  td.who { width: 74pt; font-size: 7.8pt; color: #6b7280; text-align: right; white-space: nowrap; }
  .note { display: block; font-size: 7.8pt; color: #6b7280; margin-top: 1pt; font-weight: 400; }
  .box { display: inline-block; width: 9pt; height: 9pt; border: 1.1px solid #14161f;
         border-radius: 1.5pt; margin-top: 1pt; }

  .cols { column-count: 2; column-gap: 12pt; }
  .cols td.who { display: none; }

  .foot { margin-top: 11pt; border-top: 1.5px solid #14161f; padding-top: 6pt;
          display: flex; gap: 14pt; font-size: 7.8pt; color: #3d4454; }
  .foot div { flex: 1; }
  .foot b { display: block; color: #14161f; font-size: 8pt; margin-bottom: 1pt; }
  .tail { margin-top: 7pt; font-size: 7.5pt; color: #6b7280; }
</style></head>
<body>

<p class="brand">Student Activity Centre · MNNIT Allahabad</p>
<h1>Content still required to complete the SAC website</h1>
<div class="rule"></div>
<p class="lede">The website is complete. Every page and section is built and working. What is
listed below is the <strong>content</strong> that has not yet been supplied — documents, written
text, names and photographs. None of this is a technical task.</p>

${section("01", "Documents to be provided", `All ${documents.length} categories exist on the website with no files in them. These are existing office documents — they need collecting and handing over as PDFs, not writing afresh.`,
  documents.map((d) => ({ what: d.title, who: `${OFFICE} → ${WEB}` })))}

${section("02", "Written text", "The reform brief names these headings but supplies no wording. Two to four paragraphs each, approved by the President, SAC.", [
  { what: "Vision of the Student Activity Centre", who: OFFICE },
  { what: "Mission of the Centre", who: OFFICE },
  { what: "Role of the SAC", who: OFFICE },
  { what: "History and evolution of the SAC", who: OFFICE },
  { what: "Contribution towards holistic student development", who: OFFICE },
])}

${section("03", "People", "The President and all faculty committee members are already published. These are missing entirely.", [
  { what: "Coaches and trainers", who: OFFICE,
    note: "Name, sport or activity, qualification, experience, training schedule and photograph — around ten in service." },
  { what: "Student leadership", who: COORD,
    note: "General Secretaries, club coordinators, captains and vice-captains, with the activity each holds." },
  { what: "Official contact for each activity", who: OFFICE,
    note: `One email or telephone number per activity — the Contact column of the faculty table is empty for all ${activities.length}.` },
  { what: "Official email address for the SAC office", who: OFFICE },
])}

${section("04", "Records for activities and events", "Every page is built and waiting. These are the records that fill them.", [
  { what: `Coach, captain, squad, practice schedule and results for each activity`, who: COORD,
    note: `Empty for all ${activities.length} activities. Best collected once from each coordinator at the start of a session.` },
  { what: "Recruitment details for each club", who: COORD,
    note: "Who can join, the selection process, when recruitment happens, the student coordinator and a registration link." },
  { what: `Year-wise record for each major event`, who: ORG,
    note: `No year filled in for any of the ${events.length} events. One recent year per event is enough to make the archive useful.` },
  { what: `Details for each facility`, who: OFFICE,
    note: `Photographs, location, timings, rules and contact person — empty for all ${totalFac} facilities.` },
])}

${section("05", "Achievements and photographs", null, [
  { what: "Competition, organisation, position, date and photograph for each result", who: OFFICE,
    note: `Missing for all ${totalAch} results, along with their category. The record also stops at 2023.` },
  { what: "Which academic session each existing photo set belongs to", who: WEB,
    note: `${gallery.events.length} sets currently group under "Session not recorded".` },
  { what: "Photographs and short videos from the current session", who: COORD,
    note: "The video gallery is empty. A title and a link is enough for each video." },
])}

${section("06", "Kept up to date from now on", "These are not one-off tasks. They are the routine that stops the site going stale — the problem the reform was written to solve.", [
  { what: "The events calendar", who: `${COORD} → ${WEB}`,
    note: "Date, time, venue, organiser, eligibility, registration and contact for each programme." },
  { what: "A report for every completed programme", who: `${COORD} → ${WEB}`,
    note: "In the standard format below. This is what builds the activity archive and the annual report." },
  { what: "Announcements — notices, trials, selections, registrations", who: `${COORD} → ${WEB}`,
    note: "The only four on file are from 2022–23." },
  { what: "The Annual SAC Report", who: OFFICE,
    note: "None published. Earlier reports should remain downloadable." },
])}

<section>
  <div class="head"><span class="num">07</span><h2>Standard submission format for a completed event</h2></div>
  <p class="sub">From §20 of the reform brief. Every completed programme should reach the web team in this form.</p>
  <div class="cols">${table(site.contentPolicy.submission.map((f) => ({ what: f, who: "" })))}</div>
</section>

<div class="foot">
  ${site.contentPolicy.roles.map((r) => `<div><b>${esc(r.role)}</b>${esc(r.duty)}</div>`).join("")}
</div>
<p class="tail">Generated ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })} from the website's own content, so it stays accurate — as items are supplied they drop off this list.</p>

</body></html>`;

fs.mkdirSync("docs", { recursive: true });
fs.writeFileSync("docs/content-checklist.html", html);
console.log("Wrote docs/content-checklist.html");
