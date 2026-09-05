# SAC MNNIT — Build specification & findings

Status of this document: it records **where every piece of content came from**, what the data
model looks like, and exactly what still needs to be filled in. Read the "Provenance" section
first — it is the answer to "is this data legit?".

---

## 1. How the old site's data was obtained

`https://sac.mnnit.ac.in` is a Create React App single-page application. The served HTML is a
648-byte shell containing only `<div id="root"></div>` — there is no content in the markup, and
no public API. Fetching the page returns nothing usable.

The content is compiled into the JavaScript bundle at
`/static/js/main.ce7f7ed5.js` (272 KB). It was downloaded and four data arrays were located and
evaluated out of it:

| Bundle symbol | Contents | Extracted |
|---|---|---|
| `qe` | Clubs, grouped by category | 4 groups → 20 clubs |
| `Je` | Event announcements | 4 events |
| `Ze` | Achievements grouped by year | 7 years → 22 results |
| `mt` | Faculty committees | 8 committees → 43 members |

Images were referenced two ways: as hashed files under `/static/media/…` (65 files, downloaded
directly) and as inline `data:image/jpeg;base64` strings for 6 assets, which were decoded to
files. Hashes were stripped from filenames and images over 2200 px on the long edge were
downscaled (12 MB → 7.8 MB total).

Two facts were **not** in the old site and were taken from the institute's own site instead:

- Current Director — **Prof. K. Umamaheshwar Rao** (`mnnit.ac.in/index.php/institute/administration/director`)
- Postal address, phone, fax, email (`mnnit.ac.in/index.php/contact-us`)

---

## 2. Provenance — what is sourced and what is blank

Everything on the site is either (a) copied from the old site's bundle, (b) taken from
`mnnit.ac.in`, or (c) a count computed from that data. **No club descriptions, achievements,
names, dates or figures were written by hand.**

### Sourced verbatim

| Content | Source |
|---|---|
| 20 club names + descriptions | `qe` array |
| 22 achievements: title, description, year, team members, LinkedIn URLs | `Ze` array |
| 43 faculty: name, department, role, photo | `mt` array |
| 4 events: title, date, summary/content | `Je` array |
| "What is the SAC?" and "Curricular Activities" body text | About page component |
| President's message (3 paragraphs) | Home page component |
| President: Prof. Sushil Kumar, Chemical Engineering, profile link | Home page component |
| Footer quick links, social links | Footer component |
| All 74 images | Bundle assets |
| Director, address, phone, fax, email | `mnnit.ac.in` |

### Computed from the sourced data

`20 clubs`, `43 faculty members`, `8 committees`, `22 recorded results`, and the per-category
counts (Technical 4, Sports 9, Cultural 4, Initiatives 3). These are counts of the arrays above,
recomputed at build time — they cannot drift from the data.

### Deliberately left empty

These fields exist in the schema and render only when populated. They were **not** invented:

| Field | Why empty |
|---|---|
| `clubs[].tagline` | No strapline exists in the source |
| `clubs[].team` | The old site never listed club members or office bearers |
| `clubs[].website` | Only two were known: Computer Coding Club → `sac.mnnit.ac.in/codesangam`, Alumni Association → `alumni.mnnit.ac.in` |
| `clubs[].socials`, `email`, `established` | Not present in the source |
| `clubs[].gallery`, `activities` | Not present in the source |
| `clubs[].highlights` | Populated only for the Cricket Club, whose description states its Inter NIT and Asmita titles |
| `events[].tagline`, `link`, `gallery` | Not present in the source |
| `developers[].blurb` | Not supplied |

### Editorial judgements (the only non-mechanical decisions)

1. **Achievement → club mapping.** The source lists achievements globally, not per club. ICPC was
   assigned to the Computer Coding Club; the remaining 21 (e-Yantra, Techkriti, Technex, Megalith,
   Conscientia — robotics, embedded and autonomous-robotics events) to the Robotics Club. The
   global list on `/achievements` is unchanged and remains the authoritative record.
2. **`imageFit` classification.** Each club image was inspected and marked `contain` (a logo, 15 of
   them) or `cover` (a photograph: cricket, table tennis, lawn tennis, basketball, football).
3. **Category names.** The source group `"Others"` is displayed as "Initiatives"; `"Sports Club"`
   as "Sports". Membership is unchanged.
4. **Section headings and navigation labels** are descriptive text written for this site
   ("Clubs", "Recorded results", "Faculty committees"). They make no factual claims beyond the
   counts above.

### Known defects carried over from the source

- **Quintessence and Alchemy share one logo** (`drams.jpg`) — the old site used the same asset for
  both dramatics clubs.
- **Dr. Kapil Chandra** (Sports committee) has no photograph in the source; the site renders
  tinted initials.
- Several club descriptions contain the source's own typos (`"basis.Students"`, `"awn Tennis"`,
  `"thier craft"`, `"plateform"`). These were left **as written** rather than silently edited.
  Correct them in `clubs.json` if you want them fixed.
- Some source images are very low resolution (Robotics 206×206, Aeroclub 206×206, Football
  259×194). The layout compensates by never stretching them full-bleed.

---

## 2b. The reform build — what was added, and on what authority

The site was rebuilt against the SAC reform brief, reproduced verbatim in
`docs/REFORM-BRIEF.md`. That document is the **only** source for anything added in
this pass. The rule applied throughout:

| Where the brief… | The site… |
|---|---|
| supplies text (vision, core objectives, content-management roles, submission format, hero copy, the five questions, navigation labels, facility names, document categories, report contents) | uses that text **verbatim** |
| names a section but supplies no text (Mission, Role of SAC, History and evolution, Contribution to holistic development) | **builds the section** and renders a `Pending` note naming what is missing and who supplies it |
| names a field the Institute has not filled in (coaches, captains, schedules, timings, rules, contact addresses, files, calendar entries) | **builds the field** and renders `—` or a `Pending` note |

Nothing was written to fill a gap. The only content derived rather than copied is
noted in "Derived, not authored" below.

### New pages

| Route | Brief § | Contents |
|---|---|---|
| `/activities` | §5 §6 §7 §18 | 42 activities in 8 groups, filter + search, outdoor/indoor sub-filter |
| `/activities/[slug]` | §5 §7 | About · Faculty In-Charge · Coach · Captain · Team · Practice Schedule · Facilities · Events · Results · Achievements · Gallery · How to Join. Technical and innovation activities additionally carry Domains · Projects · Workshops · Competitions · Resources |
| `/sports` | §5 | Sports & Games split into Outdoor (10) and Indoor (5) |
| `/people` | §4 §20 | President · faculty table for every activity · coaches & trainers · student leadership · previous SAC teams · content-management responsibility and the submission format |
| `/events` `/events/[slug]` | §8 | 9 major events, each with a year-wise edition archive carrying every field the brief lists |
| `/calendar` | §12 | Today · This week · This month, against the viewer's clock |
| `/news` | §14 | Announcements · SAC News · Upcoming, with automatic archiving of prior sessions |
| `/join` | §13 | Explore Your Interest (7 areas) and the seven participation questions for all 20 clubs |
| `/archive` | §9 | Completed activities, filterable by Academic Year · Activity Type · Club · Month |
| `/facilities` | §11 | 15 facilities in 3 groups, each with Photographs · Location · Facilities · Timings · Rules · Contact Person |
| `/documents` | §16 | The brief's 12 document categories in 3 groups |
| `/reports` | §17 | Annual SAC Report editions plus the brief's contents list |
| `/contact` | §18 | Address, telephone, email, President, institute links |
| `/search` | §19 | 140-entry index across activities, clubs, events, results, facilities, committees, documents and pages |

### Reworked pages

- **`/`** — rebuilt in the §2 section order: hero (with the brief's fixed title, tagline and
  motto) · statistics · §21 five questions · About · Latest Announcements · Upcoming &
  Activities This Month · Major Events · Clubs · Sports · Cultural · Technical · Achievements ·
  Recently Completed · Facilities · Photo & Video · President's Message · Committee · Quick Links.
- **`/about`** — the nine §3 headings, in the brief's order, with the vision statement and the
  eleven core objectives verbatim.
- **`/achievements`** — Hall of Fame: category filter, search, and the §10 card fields.
- **`/gallery`** — grouped by academic session, plus the §15 video gallery.
- **`/clubs/[slug]`** — gained the §13 "How to join" block and links to the activities it runs.
- **Navigation** — the twelve §18 labels, with the remaining pages in the mobile sheet's
  secondary list and in the footer.

### Derived, not authored

Three things are computed from data already in the repo. Nothing else was inferred.

1. **Activity → faculty.** `activities.json` is generated by matching each activity against the
   committee that carries it in `committee.json`, so every Faculty In-Charge and Coordinator
   shown on an activity page is the one the Institute already published. Generated by
   `scripts/` logic recorded in this file's history; the JSON is the source of truth now.
2. **Achievement → Individual / Team.** A result credited to one student is tagged `individual`,
   one credited to several is tagged `team`. The other eight §10 categories are left untagged
   and the Hall of Fame says so on the page.
3. **Counts.** Every figure on the site (42 activities, 20 clubs, 15 facilities, 140 search
   entries, and the per-group counts) is recomputed from the data at build time.

### Still to be supplied

Every item below renders as an explicit "not yet published" note naming who supplies it, per
§20. None of it was invented.

| Data file | What is missing | Who supplies it (§20) |
|---|---|---|
| `people.json` | coaches & trainers, student leadership, previous SAC teams | SAC office / coordinators |
| `activities.json` | coach, captain, vice-captain, team, schedule, facilities, events, results, domains, projects, workshops, competitions, resources, recruitment details | club & activity coordinators |
| `events.json` | every `editions[]` entry | event organising teams |
| `calendar.json` | all entries | coordinators → SAC Web Team |
| `archive.json` | all completed-activity records | coordinators → SAC Web Team |
| `facilities.json` | photographs, location, timings, rules, contact person | SAC office |
| `documents.json` | all files | SAC office → SAC Web Team |
| `reports.json` | all editions | SAC office |
| `achievements.json` | event, organisation, position, date, photograph, domain categories | SAC office |
| `gallery.json` | `session` tags, all videos | SAC Web Team |
| `site.json` | Mission, Role of SAC, History and evolution, holistic-development text; SAC office email; the §2 figures marked for verification | SAC office |

## 3. Data model

All content lives in `src/data/`. `src/lib/data.ts` is the only module that imports these files;
`src/lib/types.ts` types them. Editing JSON is the entire content workflow.

### `clubs.json` — array of Club

```jsonc
{
  "slug": "robotics-club",        // REQUIRED, unique. Becomes /clubs/robotics-club
  "name": "Robotics Club",        // REQUIRED
  "shortName": "RC",
  "category": "technical",        // technical | sports | cultural | initiatives
  "categoryLabel": "Technical",   // display label for the above
  "tagline": "",                  // optional one-liner; hidden when ""
  "description": "…",             // REQUIRED. Card text + search + meta description
  "about": ["…"],                 // one string per paragraph on the club page
  "icon": "robot",                // key from src/components/ui/Icons.tsx ICON_MAP
  "image": "/images/clubs/roboclub.jpg",
  "imageFit": "contain",          // "contain" = logo, "cover" = photograph
  "gallery": [],                  // image paths; section hidden when empty
  "website": "",                  // official site; button hidden when ""
  "socials": { "instagram": "", "linkedin": "", "github": "", "youtube": "" },
  "email": "",                    // mailto button hidden when ""
  "established": null,            // year; row hidden when null
  "highlights": [],               // short bullet lines under the About text
  "achievements": [ /* see below */ ],
  "team": [ /* see below */ ],
  "activities": [ /* see below */ ]
}
```

`achievements[]`:

```jsonc
{
  "year": 2023,                   // number or string
  "title": "ICPC Asia West Finalist",
  "description": "…",             // optional
  "teams": [
    { "name": "Team", "members": [ { "name": "…", "linkedin": "https://…" } ] }
  ]
}
```

`team[]` — **this is the array to fill for "current members"**:

```jsonc
{
  "name": "Student Name",         // REQUIRED
  "role": "President",            // REQUIRED
  "year": "Final year, CSE",      // optional
  "photo": "/images/clubs/team/name.jpg",  // optional — initials shown if absent
  "linkedin": "https://…",        // optional
  "email": ""                     // optional
}
```

`activities[]`:

```jsonc
{ "title": "…", "description": "…", "date": "…" }
```

### `events.json` — array of MajorEvent (§8)

```jsonc
{
  "slug": "avishkar",                 // REQUIRED, unique → /events/avishkar
  "title": "Avishkar",
  "subtitle": "Institute-level technical festival",
  "category": "Technical",            // Technical | Cultural | Sports | ""
  "image": "/images/events/avishkar.webp",
  "gallerySlug": "avishkar",          // key into gallery.events; "" if none
  "about": [],                        // one string per paragraph
  "editions": [ /* one per year, newest first in the UI */ ]
}
```

`editions[]` — **this is the year-wise archive the brief asks for**:

```jsonc
{
  "year": "2026",
  "dates": "12–14 March 2026",
  "theme": "…",
  "organisingTeam": [ { "name": "…", "role": "…", "photo": "…" } ],
  "participants": "1,200",
  "competitions": ["…"],
  "winners": [ { "title": "…", "name": "…", "position": "1st" } ],
  "guests": [ { "name": "…", "role": "Chief Guest" } ],
  "results": ["…"],
  "photos": ["/images/…"],
  "videos": [ { "title": "…", "url": "https://…" } ],
  "report": "…",
  "downloads": [ { "label": "…", "href": "…" } ]
}
```

Every field renders only when populated; an event with no editions shows the "to be supplied"
note instead.

### `achievements.json` — array of AchievementYear (§10)

```jsonc
{
  "year": "2024",
  "achievements": [{
    "title": "…", "description": "…", "teams": [ … ],
    // §10 Hall of Fame fields — all empty in the source
    "categories": ["team"],   // international | national | inter-nit | sports | cultural |
                              // technical | innovation | entrepreneurship | individual | team
    "event": "", "organisation": "", "position": "", "date": "", "photo": ""
  }]
}
```

Newest year first. `categories` is pre-filled with `individual` or `team`, derived from how many
students a result is credited to; the other eight are for the SAC office to tag, and the page
says which are still untagged. Drives the Hall of Fame filter, the totals and the home preview.

### `committee.json` — array of CommitteeGroup

```jsonc
{
  "id": "technological-activities",   // anchor id
  "activity": "Technological Activities",
  "icon": "chip",
  "members": [ { "name": "…", "dept": "CSED", "role": "Faculty In-Charge", "photo": "/images/faculty/….jpg" } ]
}
```

A member whose `role` contains "In-Charge" is highlighted as that committee's lead and surfaces
on the home page.

### `site.json`

Institute identity, `about[]` blocks, `president` (with `message[]`), `director`, `contact`,
`quickLinks[]`, `socials[]`, and `stats[]`. **`stats[].value` is hardcoded** — if you add clubs or
faculty, update these four numbers to match.

Added from the brief: `tagline` and `motto[]` (§2 hero), `vision` (§1), `aboutSections[]` and
`objectives[]` (§3), `structure[]` (§4), `participationModel[]` (§13), `fiveQuestions[]` (§21),
`contentPolicy` (§20) and `pendingStats[]` (the §2 figures marked for verification).

### `gallery.json`

`events[]` gained `session` (e.g. `"2026–27"`, `""` until tagged — sets group by it on the page)
and `eventSlug` (key into `events.json`). `videos[]` is the §15 video gallery:
`{ title, session, eventSlug, url, thumbnail, duration }`.

`hero[]` — one object per slideshow slide (`image`, `eyebrow`, `title`, `subtitle`,
`cta: {label, href}`). Add or remove freely; the counter, progress bars and keyboard navigation
adapt. **Use photographs, not posters or logos** — posters are mostly flat dark artwork and read
badly behind text.

`campus[]` — plain image paths for the About page grid.

### `developers.json`

`heading`, `subheading`, `members[]` with `name`, `role`, `photo`, `objectPosition` (CSS
`object-position`, for framing the crop), `linkedin`, `github`, `blurb`.

---

### `activities.json` — array of Activity (§5, §6, §7, §18)

The largest file, and the one that drives `/activities`, `/sports`, the faculty table on
`/people` and the join records on `/join` and `/clubs/[slug]`.

```jsonc
{
  "slug": "cricket",                  // REQUIRED, unique → /activities/cricket
  "name": "Cricket",
  "category": "sports",               // sports | cultural | literary | technical |
                                      // innovation | fitness | personality | social
  "venue": "outdoor",                 // "outdoor" | "indoor" | null — §5 sports only
  "icon": "cricket",                  // key from Icons.tsx ICON_MAP
  "image": "", "imageFit": "contain",
  "clubSlug": "cricket-club",         // "" when no club runs it
  "committeeId": "sports-indoor-outdoor-activities",
  "committeeName": "Sports (Indoor & Outdoor) Activities",
  "facultyInCharge": { … }, "facultyCoordinator": { … }, "activityFaculty": [ … ],
  "about": [], "coach": null, "captain": null, "viceCaptain": null, "team": [],
  "schedule": [ { "days": "…", "time": "…", "venue": "…" } ],
  "facilities": [], "events": [], "results": [ { "year": "…", "event": "…", "position": "…" } ],
  "achievements": [], "gallery": [],
  "domains": [], "projects": [], "workshops": [], "competitions": [], "resources": [],
  "join": { "whatWeDo": "", "whoCanJoin": "", "process": "", "recruitment": "",
            "studentCoordinator": null, "link": "" }
}
```

The three `faculty*` fields are **generated from `committee.json`** — do not hand-edit them
without checking the committee data first.

### `announcements.json` — array of Announcement (§14)

`kind` is `"announcement" | "news" | "upcoming"`. Anything dated before the current calendar
year moves to the page's archive automatically; there is no flag to set.

### `calendar.json` — array of CalendarEntry (§12)

`date` and `endDate` must be **ISO dates** — they are compared against the viewer's clock to
build the Today / This week / This month buckets. Every other field
(`time`, `venue`, `organiser`, `eligibility`, `registration`, `contact`, `link`) is free text
and renders `—` when empty.

### `archive.json` — array of ArchiveRecord (§9)

One record per completed activity, in the §20 submission format. `academicYear` ("2026–27"),
`month` ("August 2026"), `type` (an activity category) and `clubSlug` are the four filter
facets; records are grouped by `month` on the page.

### `facilities.json` — array of FacilityGroup (§11)

Three groups, each with `items[]` carrying `photos`, `location`, `facilities`, `timings`,
`rules` and `contact`. A facility with none of those filled in renders one "to be supplied"
note instead of six empty rows.

### `documents.json` — array of DocumentCategory (§16)

Twelve categories in three groups (`policy` | `forms` | `reports`). Add files as
`{ label, href, updated?, size? }`.

### `reports.json` — AnnualReports (§17)

`contents[]` is the brief's list of what each report contains, shown as the page's sidebar.
`editions[]` holds `{ session, title, file, published, summary }`.

### `people.json` — PeopleData (§4)

`studentLeadership[]`, `coaches[]` (with `activity`, `qualification`, `experience`, `schedule`)
and `previousTeams[]` (`{ session, members[] }`).

## 4. Routes

All 97 pages are prerendered at build time; nothing renders at request time.

| Route | Rendering | Source |
|---|---|---|
| `/` | Static | all data files |
| `/about` | Static | `site.json`, `gallery.json` |
| `/activities` | Static shell + client filter | `activities.json` |
| `/activities/[slug]` | 42 pages via `generateStaticParams` | `activities.json`, `clubs.json` |
| `/sports` | Static | `activities.json` |
| `/clubs` | Static shell + client filter | `clubs.json` |
| `/clubs/[slug]` | 20 pages via `generateStaticParams` | `clubs.json`, `activities.json` |
| `/events` | Static | `events.json` |
| `/events/[slug]` | 9 pages via `generateStaticParams` | `events.json`, `gallery.json`, `announcements.json` |
| `/calendar` | Static shell + client clock | `calendar.json` |
| `/news` | Static | `announcements.json` |
| `/join` | Static | `clubs.json`, `activities.json`, `site.json` |
| `/archive` | Static shell + client filter | `archive.json` |
| `/achievements` | Static shell + client filter | `achievements.json` |
| `/facilities` | Static | `facilities.json` |
| `/people` | Static | `site.json`, `committee.json`, `activities.json`, `people.json` |
| `/committee` | Static | `committee.json`, `site.json` |
| `/gallery` | Static | `gallery.json` |
| `/documents` | Static | `documents.json` |
| `/reports` | Static | `reports.json` |
| `/contact` | Static | `site.json` |
| `/search` | Static shell + client filter | index built from every data file |
| `/web-team` | Static | `developers.json` |
| `/sitemap.xml`, `/robots.txt` | Generated | `clubs.json`, `activities.json`, `events.json`, `site.json` |

Adding an activity to `activities.json`, a club to `clubs.json` or an event to `events.json`
creates its page **and** its sitemap entry on the next build. No code changes.

`/clubs` reads `?category=` and `/activities` reads `?group=` on load and writes them back on
filter change, so `/clubs?category=sports` and `/activities?group=technical` are shareable.

## 5. Design system

Tokens are declared once in `src/app/globals.css` as CSS custom properties and exposed to
Tailwind via `@theme inline`. Light is the base; `.dark` redefines the same names, so no colour
is ever defined only inside a dark block.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#f7f8fa` | `#0b0f14` | Page |
| `--bg-tint` | `#eef1f5` | `#10151c` | Alternating sections |
| `--surface` | `#ffffff` | `#141a22` | Cards |
| `--ink` | `#101720` | `#eef2f7` | Body text |
| `--ink-muted` | `#4d5866` | `#a3afbf` | Secondary text |
| `--brand` | `#10495e` | `#6fb6d1` | Primary — deep petrol blue |
| `--accent` | `#a86a1f` | `#d9a55c` | Brass, used sparingly |
| `--cat-technical` | `#10495e` | `#6fb6d1` | Category accent |
| `--cat-sports` | `#1f6b4a` | `#5cbe8f` | Category accent |
| `--cat-cultural` | `#7a3b62` | `#cf8fb4` | Category accent |
| `--cat-initiatives` | `#8a6420` | `#d9a55c` | Category accent |

Use as ordinary utilities: `bg-surface`, `text-ink-muted`, `border-line`.

**Typography** — Fraunces (serif) for headings, Inter for body and UI, both via `next/font`
(self-hosted, no layout shift, no runtime request).

**Geometry** — 6 px / 8 px / 12 px radii, one hairline border weight, no pill shapes, no drop
shadows except a 1 px shadow under the header once scrolled.

**Header** — a single 64 px line: the mark (`SAC` · rule · `MNNIT Allahabad`), the six links, and
the theme toggle. No boxed logo tile, no bordered buttons, no floating back-to-top button. The
active link is marked by weight and colour plus a 4 px dot; nothing else. On mobile the links
become a full-width serif list.

---

## 6. Motion policy

Deliberately restrained. The complete inventory:

1. Hero crossfade between slides — 700 ms opacity, no zoom or pan.
2. Hero slide progress bar — a linear `scaleX` over the slide duration.
3. Scroll reveal — 14 px lift + fade over 500 ms, fired once per element by
   `IntersectionObserver`, which then disconnects.
4. Stat counters — `requestAnimationFrame` ease-out, once, when scrolled into view.
5. Hover — colour transitions and a 1–4 px lift on cards.

There is no marquee, no parallax, no Ken Burns, no floating elements, no animated gradients.
`prefers-reduced-motion: reduce` disables all of it and shows final values immediately.
The hero also stops advancing when hovered, focused, scrolled out of view, or on a hidden tab.

---

## 7. Performance & accessibility

- Every route is prerendered at build time; there is no server rendering at request time.
- Runtime dependencies are **`next`, `react`, `react-dom` only**. No animation, icon, carousel,
  theming or utility library ships to the browser. The ~40 icons are inline SVG components.
- `next/image` everywhere with explicit `sizes`; `priority` only on the first hero slide.
- Theme is applied by a blocking inline script in `<head>` before first paint, so there is no
  flash of the wrong theme. The choice is stored in `localStorage` under `sac-theme`; with no
  stored choice the site follows the OS live.
- Scroll listeners are passive and frame-throttled.
- Skip link, visible focus rings, labelled controls, `aria-live` on the carousel, arrow-key
  navigation, breadcrumbs, semantic landmarks.
- Per-page metadata, Open Graph and Twitter cards, sitemap and robots.

Verified in a headless browser across light and dark, desktop and mobile: theme toggle and
persistence, hero next/previous/autoplay, club filtering, search, empty state, deep links,
mobile menu, and all internal links returning 200.

---

## 8. What still needs filling in

See **§2b → "Still to be supplied"** for the complete table, keyed by data file and by the §20
role responsible for each. Every one of those gaps renders on the site as an explicit
"not yet published" note rather than being hidden, so the missing content is visible to the
people who have to supply it.

The two items carried over from the original build that are not §20 responsibilities:

1. **Source typos** — `"basis.Students"`, `"awn Tennis"`, `"thier craft"`, `"plateform"` are
   left as the old site wrote them. Correct them in `clubs.json` and `site.json` if you want
   them fixed.
2. **`site.json` → `stats[].value`** — recheck if the club or faculty counts change.
