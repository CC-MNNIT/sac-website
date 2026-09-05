export type CategoryKey = "technical" | "sports" | "cultural" | "initiatives";

export interface ClubMember {
  name: string;
  role: string;
  year?: string;
  photo?: string;
  linkedin?: string;
  email?: string;
}

export interface AchievementTeamMember {
  name: string;
  linkedin?: string;
}

export interface AchievementTeam {
  name: string;
  members: AchievementTeamMember[];
}

export interface ClubAchievement {
  year: number | string;
  title: string;
  description?: string;
  teams?: AchievementTeam[];
}

export interface ClubActivity {
  title: string;
  description?: string;
  /** Free text — a date, a season, or a subtitle for a project. */
  date?: string;
  /** Optional photograph, shown as a card image when present. */
  image?: string;
}

export interface Club {
  slug: string;
  name: string;
  shortName: string;
  category: CategoryKey;
  categoryLabel: string;
  tagline: string;
  description: string;
  about: string[];
  icon: string;
  image: string;
  /** Logos render contained on a light plate; photographs fill the frame. */
  imageFit: "cover" | "contain";
  /** Set to "dark" when the official logo is drawn for a dark background
   *  (a white wordmark, say) and would disappear on the default light plate. */
  imageBg?: "dark" | "light";
  gallery: string[];
  website: string;
  socials: {
    instagram?: string;
    linkedin?: string;
    github?: string;
    youtube?: string;
  };
  email: string;
  established: string | number | null;
  highlights: string[];
  achievements: ClubAchievement[];
  team: ClubMember[];
  activities: ClubActivity[];
}

export interface FacultyMember {
  name: string;
  dept: string;
  role: string;
  photo: string;
}

export interface CommitteeGroup {
  id: string;
  activity: string;
  icon: string;
  members: FacultyMember[];
}

/** §10 — Student/Team | Event | Institution/Organisation | Position/Award |
 *  Date | Photograph, plus the categories the Hall of Fame filters on. */
export type AchievementCategory =
  | "international" | "national" | "inter-nit" | "sports" | "cultural"
  | "technical" | "innovation" | "entrepreneurship" | "individual" | "team";

export interface AchievementEntry {
  title: string;
  description: string;
  teams: AchievementTeam[];
  categories: AchievementCategory[];
  event: string;
  organisation: string;
  position: string;
  date: string;
  photo: string;
}

export interface AchievementYear {
  year: string;
  achievements: AchievementEntry[];
}

export interface HeroSlide {
  image: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: { label: string; href: string };
}

export interface GalleryPhoto {
  src: string;
  width: number;
  height: number;
}

export interface GalleryEvent {
  slug: string;
  name: string;
  /** CSS colour token used for the event's accents. */
  color: string;
  photos: GalleryPhoto[];
  /** §15 — academic session, e.g. "2026–27". "" until the office tags it. */
  session: string;
  /** Key into events.json, when this set belongs to a major event. */
  eventSlug: string;
}

export interface GalleryVideo {
  title: string;
  session: string;
  eventSlug: string;
  url: string;
  thumbnail: string;
  duration: string;
}

export interface Gallery {
  hero: HeroSlide[];
  campus: string[];
  events: GalleryEvent[];
  /** §15 — Video Gallery. */
  videos: GalleryVideo[];
}

export interface Developer {
  name: string;
  role: string;
  photo: string;
  /** CSS object-position, so each portrait can be framed individually. */
  objectPosition?: string;
  linkedin: string;
  github: string;
  blurb: string;
  batch?: string;
}

export interface DevelopersData {
  heading: string;
  subheading: string;
  members: Developer[];
}

export interface SiteConfig {
  name: string;
  shortName: string;
  institute: string;
  instituteShort: string;
  tagline: string;
  description: string;
  url: string;
  logo: string;
  about: { title: string; body: string }[];
  president: {
    name: string;
    role: string;
    dept: string;
    photo: string;
    profile: string;
    message: string[];
  };
  director: { name: string; role: string; profile: string };
  contact: {
    address: string;
    city: string;
    state: string;
    pin: string;
    country: string;
    phone: string[];
    fax: string;
    email: string;
    mapQuery: string;
  };
  quickLinks: { label: string; href: string }[];
  socials: { label: string; href: string; icon: string }[];
  stats: { value: number; suffix: string; label: string; hint: string }[];

  /* Added from the reform brief (docs/REFORM-BRIEF.md). */
  /** §2 — "Explore • Participate • Perform • Lead • Achieve". */
  motto: string[];
  /** §3 — the Centre's own vision. Empty until the SAC office supplies it. */
  vision: { statement: string; body: string[] };
  /** §1 — what this *website* exists to do, and everything it must document. */
  website: { statement: string; documents: string[]; principle: string };
  /** §3 — the About page's required headings; `pending` sections carry no text yet. */
  aboutSections: { title: string; pending: boolean }[];
  objectivesIntro: string;
  /** §3 — the eleven core objectives, verbatim. */
  objectives: string[];
  /** §4 — the four tiers of the SAC organisation. */
  structure: { title: string; body: string }[];
  /** §13 — the seven questions every club entry must answer. */
  participationModel: string[];
  /** §21 — WHAT / WHO / WHEN / HOW / ACHIEVEMENT. */
  fiveQuestions: { key: string; question: string; body: string; href: string }[];
  /** §20 — who is responsible for keeping this site current. */
  contentPolicy: {
    intro: string;
    roles: { role: string; duty: string }[];
    submissionIntro: string;
    submission: string[];
  };
  statsNote: string;
  /** §2 — figures the brief lists but marks "to be verified". */
  pendingStats: { label: string; hint: string }[];
}


/* ==================================================================== *
 *  Types added for the reform brief. Every one of these carries fields
 *  the brief names; fields the Institute has not supplied yet are empty
 *  and render an explicit "to be supplied" state rather than filler.
 * ==================================================================== */

/** §18 — the eight activity groups listed under Activities. */
export type ActivityCategory =
  | "sports"
  | "cultural"
  | "literary"
  | "technical"
  | "innovation"
  | "fitness"
  | "personality"
  | "social";

export interface Person {
  name: string;
  dept?: string;
  role?: string;
  photo?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
}

export interface Coach extends Person {
  activity: string;
  qualification: string;
  experience: string;
  schedule: string;
}

export interface ScheduleSlot {
  days: string;
  time: string;
  venue: string;
  note?: string;
}

export interface ActivityResult {
  year: string;
  event: string;
  position: string;
  note?: string;
}

/** §5 About | Faculty In-Charge | Coach | Captain | Team | Practice Schedule |
 *  Facilities | Events | Results | Achievements | Gallery
 *  §7 About → Domains → Team → Projects → Workshops → Competitions →
 *  Achievements → Resources → How to Join */
export interface Activity {
  slug: string;
  name: string;
  category: ActivityCategory;
  /** §5 splits Sports & Games into outdoor and indoor. Null elsewhere. */
  venue: "outdoor" | "indoor" | null;
  icon: string;
  image: string;
  imageFit: "cover" | "contain";
  /** Club that runs this activity, when one is recognised. */
  clubSlug: string;
  committeeId: string;
  committeeName: string;
  facultyInCharge: FacultyMember | null;
  facultyCoordinator: FacultyMember | null;
  activityFaculty: FacultyMember[];
  about: string[];
  coach: Coach | null;
  captain: ClubMember | null;
  viceCaptain: ClubMember | null;
  team: ClubMember[];
  schedule: ScheduleSlot[];
  facilities: string[];
  events: string[];
  results: ActivityResult[];
  achievements: ClubAchievement[];
  gallery: string[];
  domains: string[];
  projects: { title: string; description?: string; year?: string }[];
  workshops: { title: string; date?: string; description?: string }[];
  competitions: { title: string; date?: string; result?: string }[];
  resources: { label: string; href: string }[];
  join: {
    whatWeDo: string;
    whoCanJoin: string;
    process: string;
    recruitment: string;
    studentCoordinator: Person | null;
    link: string;
  };
}

/** §8 — one entry per year of a major event. */
export interface EventEdition {
  year: string;
  dates: string;
  theme: string;
  organisingTeam: Person[];
  participants: string;
  competitions: string[];
  winners: { title: string; name: string; position?: string }[];
  guests: Person[];
  results: string[];
  photos: string[];
  videos: { title: string; url: string }[];
  report: string;
  downloads: { label: string; href: string }[];
}

export interface MajorEvent {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  /** Key into gallery.events, when photographs exist for this event. */
  gallerySlug: string;
  about: string[];
  editions: EventEdition[];
}

/** §14 — announcements, SAC news and upcoming programmes. */
export interface Announcement {
  slug: string;
  kind: "announcement" | "news" | "upcoming";
  title: string;
  date: string;
  category: string;
  summary: string;
  body: string;
  image: string;
  eventSlug: string;
  link: string;
  attachments: { label: string; href: string }[];
}

/** §9 — the completed-activity archive. */
export interface ArchiveRecord {
  slug: string;
  title: string;
  date: string;
  /** e.g. "2026–27" */
  academicYear: string;
  /** e.g. "August 2026" */
  month: string;
  type: ActivityCategory | string;
  clubSlug: string;
  activitySlug: string;
  venue: string;
  coordinator: string;
  participants: string;
  result: string;
  resourcePersons: string[];
  outcomes: string[];
  report: string;
  photos: string[];
}

/** §12 — a calendar entry. */
export interface CalendarEntry {
  slug: string;
  title: string;
  /** ISO date, so today / this week / this month can be computed. */
  date: string;
  endDate: string;
  time: string;
  venue: string;
  organiser: string;
  eligibility: string;
  registration: string;
  contact: string;
  category: string;
  link: string;
}

/** §11 — Photographs | Location | Facilities | Timings | Rules | Contact Person */
export interface Facility {
  slug: string;
  name: string;
  photos: string[];
  location: string;
  facilities: string[];
  timings: string;
  rules: string[];
  contact: Person | null;
}

export interface FacilityGroup {
  id: string;
  title: string;
  icon: string;
  items: Facility[];
}

/** §16 — a downloadable document category. */
export interface DocumentCategory {
  id: string;
  title: string;
  group: "policy" | "forms" | "reports";
  files: { label: string; href: string; updated?: string; size?: string }[];
}

/** §17 — the annual SAC report. */
export interface AnnualReports {
  contents: string[];
  editions: {
    session: string;
    title: string;
    file: string;
    published: string;
    summary: string;
  }[];
}

/** §4 — student leadership, coaches, and the year-wise team archive. */
export interface PeopleData {
  studentLeadership: (Person & { activity?: string; year?: string })[];
  coaches: Coach[];
  previousTeams: { session: string; members: (Person & { activity?: string })[] }[];
}
