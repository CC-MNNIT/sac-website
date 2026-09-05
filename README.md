# SAC — Student Activity Centre, MNNIT Allahabad

A rebuild of the Student Activity Centre website, built to the SAC reform brief. Every
activity, club, event, achievement, facility, document and faculty member is driven by JSON
files in `src/data/`, so the site can be kept current without touching a single component.

The site is a **living record**, not a brochure: it documents what the Centre runs, who is
responsible for each activity, what is happening and when, how a student takes part, and what
its students have won.

- **[`docs/REFORM-BRIEF.md`](docs/REFORM-BRIEF.md)** — the brief this site is built to. It is
  the only source for the structure and wording used here.
- **[`docs/SPECIFICATION.md`](docs/SPECIFICATION.md)** — where every piece of content came from,
  the full data model, and exactly what is still to be supplied and by whom.

> **Content rule.** Where the brief supplies text, this site uses it verbatim. Where it names a
> section the Institute has not written yet, the section is **built and marked "not yet
> published"** with the role responsible for supplying it. Nothing is invented to fill a gap.

Built with Next.js 16 (App Router), TypeScript and Tailwind CSS v4. **No animation, icon,
carousel or theming library is used** — the hero slideshow, scroll reveals, counters and the
dark-mode toggle are all hand-written with `IntersectionObserver`, `requestAnimationFrame` and
CSS keyframes.

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
npm run lint
```

---

## Project structure

```
src/
├── app/                          # Routes (App Router) — 97 prerendered pages
│   ├── layout.tsx                # Root shell: fonts, metadata, theme, header/footer
│   ├── page.tsx                  # Home — the §2 section order
│   ├── globals.css               # Design tokens, utilities, keyframes
│   ├── about/                    # §3 — introduction, vision, objectives, structure…
│   ├── activities/
│   │   ├── page.tsx              # §5 §6 §7 — 42 activities, filter + search
│   │   └── [slug]/page.tsx       # One page per activity
│   ├── sports/                   # §5 — outdoor and indoor
│   ├── clubs/
│   │   ├── page.tsx              # Directory with filter + search
│   │   └── [slug]/page.tsx       # One page per club
│   ├── events/
│   │   ├── page.tsx              # §8 — major events
│   │   └── [slug]/page.tsx       # Year-wise archive per event
│   ├── calendar/                 # §12 — today, this week, this month
│   ├── news/                     # §14 — announcements, news, upcoming
│   ├── join/                     # §13 — explore your interest
│   ├── archive/                  # §9 — completed activities
│   ├── achievements/             # §10 — Hall of Fame
│   ├── facilities/               # §11
│   ├── people/                   # §4 §20 — governance and responsibility
│   ├── committee/                # Full faculty committee rosters
│   ├── gallery/                  # §15 — photos by session + video
│   ├── documents/                # §16
│   ├── reports/                  # §17 — annual SAC report
│   ├── contact/                  # §18
│   ├── search/                   # §19 — site-wide search
│   ├── web-team/                 # Website credits
│   ├── not-found.tsx
│   ├── sitemap.ts                # Auto-generated from the data files
│   └── robots.ts
│
├── components/
│   ├── layout/                   # Header, Footer, ThemeToggle
│   ├── home/                     # One component per home-page section
│   ├── activities/               # ActivityCard, ActivitiesExplorer, ActivitySection
│   ├── clubs/                    # ClubCard, ClubsExplorer
│   ├── events/                   # EventCard
│   ├── people/                   # PersonCard, FacultyTable
│   ├── news/ calendar/ archive/  # AnnouncementCard, CalendarView, ArchiveExplorer
│   ├── achievements/ search/     # HallOfFame, SiteSearch
│   ├── gallery/                  # PhotoGallery, VideoGallery
│   ├── providers/                # ThemeProvider
│   └── ui/                       # Button, Badge, Avatar, Section, Reveal, Icons,
│                                 # PageHeader, Pending, FilterChips, SearchInput, EmptyState
│
├── data/                         # ← all site content lives here
│   ├── site.json                 # Institute info, vision, objectives, governance, contact
│   ├── activities.json           # 42 activities across 8 areas
│   ├── clubs.json                # 20 clubs
│   ├── events.json               # 9 major events + their year-wise editions
│   ├── announcements.json        # Announcements, SAC news, upcoming
│   ├── calendar.json             # Scheduled programmes
│   ├── archive.json              # Completed activities
│   ├── achievements.json         # Results by year
│   ├── facilities.json           # 15 facilities in 3 groups
│   ├── documents.json            # 12 document categories
│   ├── reports.json              # Annual SAC reports
│   ├── people.json               # Coaches, student leadership, previous teams
│   ├── committee.json            # Faculty committees
│   ├── gallery.json              # Hero slides, campus, photo sets, videos
│   └── developers.json           # Website credits
│
└── lib/
    ├── data.ts                   # Typed accessors + the search index — the only
    │                             # place JSON is imported
    ├── types.ts                  # Shared TypeScript interfaces
    ├── hooks.ts                  # useInView, useCountUp, useScrollPosition, …
    └── utils.ts                  # cn, initials, slugify

public/images/
├── clubs/     faculty/     events/     campus/     team/     gallery/     hero/
```

---

## Updating content

All content changes happen in `src/data/`. Nothing else needs editing.

### Add or edit a club — `src/data/clubs.json`

```jsonc
{
  "slug": "robotics-club",          // URL: /clubs/robotics-club — must be unique
  "name": "Robotics Club",
  "shortName": "RC",
  "category": "technical",          // technical | sports | cultural | initiatives
  "categoryLabel": "Technical",
  "tagline": "",                    // optional strapline — hidden when empty
  "description": "Shown on the card and in search.",
  "about": ["One string per paragraph on the club page."],
  "icon": "robot",                  // key from src/components/ui/Icons.tsx
  "image": "/images/clubs/roboclub.jpg",
  "imageFit": "contain",            // "contain" for logos, "cover" for photographs
  "gallery": [],                    // add paths to show a gallery section
  "website": "",                    // official site — button appears when set
  "socials": { "instagram": "", "linkedin": "", "github": "", "youtube": "" },
  "email": "",
  "established": null,
  "highlights": [],                 // short bullet lines
  "achievements": [
    { "year": 2023, "title": "…", "description": "…", "teams": [] }
  ],
  "team": [],                       // current members — see below
  "activities": []
}
```

**`imageFit` matters.** Most club artwork is a logo, not a photograph. Use `"contain"` so it
is shown whole on a light plate; use `"cover"` only for real photographs that can be cropped.

### Add the current team of a club

Fill the `team` array. The section appears automatically once it is non-empty; until then a
short "will be published" note is shown instead.

```jsonc
"team": [
  {
    "name": "Student Name",
    "role": "President",
    "year": "Final year, CSE",              // optional
    "photo": "/images/clubs/team/name.jpg", // optional — initials are used if omitted
    "linkedin": "https://linkedin.com/in/…" // optional
  }
]
```

### Add an activity — `src/data/activities.json`

The file that drives `/activities`, `/sports`, the faculty table on `/people`, and the join
records on `/join`. The `facultyInCharge`, `facultyCoordinator` and `activityFaculty` fields are
taken from `committee.json` — keep them in step with it.

Everything else starts empty and renders a "not yet published" note until filled:

```jsonc
{
  "slug": "cricket", "name": "Cricket",
  "category": "sports",          // sports | cultural | literary | technical |
                                 // innovation | fitness | personality | social
  "venue": "outdoor",            // "outdoor" | "indoor" | null (sports only)
  "clubSlug": "cricket-club",    // "" if no club runs it

  "coach":   { "name": "…", "activity": "Cricket", "qualification": "…",
               "experience": "…", "schedule": "…" },
  "captain": { "name": "…", "role": "Captain", "year": "…" },
  "team":    [ { "name": "…", "role": "…" } ],
  "schedule":[ { "days": "Mon–Fri", "time": "6:00–8:00 am", "venue": "Cricket Ground" } ],
  "results": [ { "year": "2026", "event": "Inter-NIT", "position": "Winners" } ],

  // Technical and innovation activities also use these
  "domains": [], "projects": [], "workshops": [], "competitions": [], "resources": [],

  // §13 — how a student joins
  "join": { "whoCanJoin": "…", "process": "…", "recruitment": "…",
            "studentCoordinator": { "name": "…" }, "link": "https://…" }
}
```

### Add a major event — `src/data/events.json`

Each event carries a **year-wise archive**. Add a new `editions[]` entry per year:

```jsonc
{
  "slug": "avishkar", "title": "Avishkar",
  "subtitle": "Institute-level technical festival",
  "category": "Technical",
  "image": "/images/events/avishkar.webp",
  "gallerySlug": "avishkar",       // key into gallery.events
  "about": ["…"],
  "editions": [{
    "year": "2026", "dates": "12–14 March 2026", "theme": "…",
    "organisingTeam": [ { "name": "…", "role": "…" } ],
    "participants": "1,200",
    "competitions": ["…"],
    "winners": [ { "title": "…", "name": "…", "position": "1st" } ],
    "guests": [ { "name": "…", "role": "Chief Guest" } ],
    "results": ["…"], "photos": ["/images/…"],
    "videos": [ { "title": "…", "url": "https://…" } ],
    "report": "…", "downloads": [ { "label": "…", "href": "…" } ]
  }]
}
```

### Post a notice — `src/data/announcements.json`

`kind` is `"announcement"` (notices, selections, trials, registrations), `"news"` (reports of
completed activities) or `"upcoming"` (future programmes). Anything dated before the current
calendar year moves to the archive automatically — there is no flag to set.

### Schedule a programme — `src/data/calendar.json`

`date` and `endDate` must be **ISO dates** (`"2026-08-15"`); they are compared against the
viewer's clock to build the Today / This week / This month buckets.

```jsonc
{
  "slug": "…", "title": "…", "date": "2026-08-15", "endDate": "",
  "time": "4:00 pm", "venue": "…", "organiser": "…",
  "eligibility": "…", "registration": "…", "contact": "…",
  "category": "Sports", "link": ""
}
```

### Record a completed activity — `src/data/archive.json`

One record per completed programme, in the §20 submission format. `academicYear`, `month`,
`type` and `clubSlug` are the four filter facets on `/archive`:

```jsonc
{
  "slug": "…", "title": "Robotics Workshop", "date": "12 August 2026",
  "academicYear": "2026–27", "month": "August 2026",
  "type": "technical", "clubSlug": "robotics-club", "activitySlug": "robotics",
  "venue": "…", "coordinator": "…", "participants": "60", "result": "…",
  "resourcePersons": ["…"], "outcomes": ["…"], "report": "…", "photos": ["/images/…"]
}
```

### Add an achievement — `src/data/achievements.json`

Grouped by year, newest year first. Members with a `linkedin` value render as a link.

```jsonc
{
  "year": "2024",
  "achievements": [
    {
      "title": "ICPC Asia West Finalist",
      "description": "Reached the regional finals.",
      "teams": [
        { "name": "Team", "members": [{ "name": "…", "linkedin": "https://…" }] }
      ],
      // §10 Hall of Fame — `categories` also accepts international | national |
      // inter-nit | sports | cultural | technical | innovation | entrepreneurship
      "categories": ["team", "national"],
      "event": "ICPC Asia West", "organisation": "ICPC Foundation",
      "position": "Finalist", "date": "December 2024", "photo": ""
    }
  ]
}
```

`individual` and `team` are filled in automatically from how many students a result credits.
The other categories are yours to tag — the page states which are still untagged.

### Change hero slides — `src/data/gallery.json`

Each slide takes an `image`, `eyebrow`, `title`, `subtitle` and a `cta`. Add or remove entries
freely; the slideshow adapts its counter, progress bars and keyboard navigation automatically.
Use **photographs** here — posters and logos are mostly flat dark artwork and read badly
behind text.

### Faculty committee — `src/data/committee.json`

Grouped by activity domain. A member whose `role` contains "In-Charge" is highlighted as the
lead of that committee. Members without a `photo` fall back to tinted initials.

### Facilities, documents, reports and people

- **`facilities.json`** — three groups, each item taking `photos`, `location`, `facilities`,
  `timings`, `rules` and `contact`.
- **`documents.json`** — twelve categories; add files as
  `{ "label": "…", "href": "/docs/…", "updated": "…", "size": "…" }`.
- **`reports.json`** — add an edition as
  `{ "session": "2026–27", "title": "…", "file": "/docs/…", "published": "…", "summary": "…" }`.
- **`people.json`** — `coaches[]`, `studentLeadership[]` and the year-wise `previousTeams[]`.
- **`gallery.json`** — tag each photo set with a `session` (`"2026–27"`) so it groups correctly,
  and add videos as `{ title, session, eventSlug, url, thumbnail, duration }`.

### Who updates what

Responsibility is defined on **[/people#content-responsibility](src/app/people/page.tsx)** and
comes straight from the brief: the President SAC approves, Faculty In-Charges verify their own
domain, club and activity coordinators submit updates, and the SAC Web Team uploads and
maintains. Every completed event is submitted in one standard format — event name, date, venue,
organiser, faculty and student coordinator, number of participants, brief report, results,
achievements and 5–10 photographs.

### Images

Drop files into the matching folder under `public/images/` and reference them with an absolute
path (`/images/clubs/name.jpg`). Keep source images at 2200px or less on the long edge —
Next.js handles the responsive resizing from there.

---

## Design system

Tokens are defined once in `src/app/globals.css` as CSS custom properties, then exposed to
Tailwind through `@theme inline`. Light is the base definition; `.dark` redefines the same
names, so no colour is ever declared only inside a dark block.

| Token | Role |
|---|---|
| `--bg`, `--bg-tint`, `--surface`, `--surface-2/3` | Cool neutral surfaces |
| `--ink`, `--ink-muted`, `--ink-subtle` | Cool near-black text |
| `--brand`, `--brand-strong`, `--brand-soft` | Deep petrol blue — the primary |
| `--accent` | Brass, used sparingly |
| `--cat-technical / sports / cultural / initiatives` | Per-discipline accents |

Use them as ordinary Tailwind utilities: `bg-surface`, `text-ink-muted`, `border-line`.

**Typography** — Fraunces (serif) for display, Inter for body and UI, both loaded through
`next/font` so there is no layout shift and no external request at runtime.

---

## Theming

`ThemeProvider` stores the choice in `localStorage` under `sac-theme`. A small script in
`<head>` (`themeInitScript`) applies the class **before first paint**, so there is no flash of
the wrong theme. With no stored choice the site follows the operating system and keeps
following it live.

---

## Performance and accessibility

- **Fully static.** Every route, including all 20 club pages, is prerendered at build time via
  `generateStaticParams`.
- **Images** go through `next/image` with explicit `sizes`, lazy loading below the fold and
  `priority` only on the first hero slide.
- **Fonts** are self-hosted and preloaded by `next/font`; `display: swap` avoids invisible text.
- **No runtime dependencies** beyond React and Next — no animation, icon or theme package ships
  to the browser.
- **Animation is minimal and cheap**: a hero crossfade, a 14px scroll reveal and rAF counters —
  transforms and opacity only. No marquee, parallax, zoom or floating elements. See §6 of the
  specification for the complete inventory.
- **The hero pauses itself** when hovered, focused, scrolled out of view, or when the tab is
  hidden.
- **`prefers-reduced-motion`** is honoured globally — reveals resolve instantly and the
  slideshow stops auto-advancing.
- **Keyboard and screen readers**: skip link, focus-visible rings, labelled controls, `aria-live`
  on the carousel, arrow-key navigation, breadcrumbs, and semantic landmarks throughout.
- **SEO**: per-page metadata, Open Graph and Twitter cards, plus `sitemap.xml` and `robots.txt`
  generated from the data files.

---

## Credits

Designed and developed by **Ayush Tiwari** and **Shanu Kumawat**.
Content, photography and records sourced from the Student Activity Centre, MNNIT Allahabad.
