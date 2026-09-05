import achievementsJson from "@/data/achievements.json";
import activitiesJson from "@/data/activities.json";
import announcementsJson from "@/data/announcements.json";
import archiveJson from "@/data/archive.json";
import calendarJson from "@/data/calendar.json";
import clubsJson from "@/data/clubs.json";
import committeeJson from "@/data/committee.json";
import developersJson from "@/data/developers.json";
import documentsJson from "@/data/documents.json";
import eventsJson from "@/data/events.json";
import facilitiesJson from "@/data/facilities.json";
import galleryJson from "@/data/gallery.json";
import peopleJson from "@/data/people.json";
import reportsJson from "@/data/reports.json";
import siteJson from "@/data/site.json";

import type {
  AchievementCategory,
  AchievementYear,
  Activity,
  ActivityCategory,
  AnnualReports,
  Announcement,
  ArchiveRecord,
  CalendarEntry,
  CategoryKey,
  Club,
  CommitteeGroup,
  DevelopersData,
  DocumentCategory,
  FacilityGroup,
  Gallery,
  MajorEvent,
  PeopleData,
  SiteConfig,
} from "./types";

/**
 * Every page reads from these accessors rather than importing JSON directly.
 * To update the site, edit the files in `src/data/` — nothing else changes.
 */
export const site = siteJson as unknown as SiteConfig;
export const clubs = clubsJson as Club[];
export const committee = committeeJson as CommitteeGroup[];
export const events = eventsJson as unknown as MajorEvent[];
export const achievements = achievementsJson as unknown as AchievementYear[];
export const gallery = galleryJson as unknown as Gallery;
export const developers = developersJson as DevelopersData;
export const activities = activitiesJson as unknown as Activity[];
export const announcements = announcementsJson as unknown as Announcement[];
export const archive = archiveJson as unknown as ArchiveRecord[];
export const calendar = calendarJson as unknown as CalendarEntry[];
export const facilities = facilitiesJson as unknown as FacilityGroup[];
export const documents = documentsJson as unknown as DocumentCategory[];
export const reports = reportsJson as unknown as AnnualReports;
export const people = peopleJson as unknown as PeopleData;

/* ------------------------------------------------------------------ *
 *  Clubs
 * ------------------------------------------------------------------ */

export const CATEGORIES: {
  key: CategoryKey;
  label: string;
  blurb: string;
  colorVar: string;
}[] = [
  {
    key: "technical",
    label: "Technical",
    blurb: "Computer coding, robotics, aeromodelling and astronomy.",
    colorVar: "var(--cat-technical)",
  },
  {
    key: "sports",
    label: "Sports",
    blurb: "Cricket, football, basketball, kabaddi, chess, table tennis, lawn tennis, skating and lifting.",
    colorVar: "var(--cat-sports)",
  },
  {
    key: "cultural",
    label: "Cultural",
    blurb: "Literary activities, dramatics and the annual magazine.",
    colorVar: "var(--cat-cultural)",
  },
  {
    key: "initiatives",
    label: "Initiatives",
    blurb: "Alumni association, entrepreneurship cell and student mentorship.",
    colorVar: "var(--cat-initiatives)",
  },
];

export function getClub(slug: string): Club | undefined {
  return clubs.find((club) => club.slug === slug);
}

export function getClubsByCategory(category: CategoryKey): Club[] {
  return clubs.filter((club) => club.category === category);
}

export function getRelatedClubs(slug: string, limit = 3): Club[] {
  const current = getClub(slug);
  if (!current) return [];
  const sameCategory = clubs.filter(
    (club) => club.category === current.category && club.slug !== slug,
  );
  const others = clubs.filter((club) => club.category !== current.category);
  return [...sameCategory, ...others].slice(0, limit);
}

export function categoryColor(category: CategoryKey): string {
  return `var(--cat-${category})`;
}

/* ------------------------------------------------------------------ *
 *  Activities — §5, §6, §7, §18
 * ------------------------------------------------------------------ */

/** The eight groups the brief lists under Activities, in its own order. */
export const ACTIVITY_GROUPS: {
  key: ActivityCategory;
  label: string;
  blurb: string;
  colorVar: string;
  icon: string;
}[] = [
  { key: "sports", label: "Sports", blurb: "Outdoor and indoor games and athletics.", colorVar: "var(--cat-sports)", icon: "trophy" },
  { key: "cultural", label: "Cultural", blurb: "Dramatics, music, dance, fine arts, photography and film.", colorVar: "var(--cat-cultural)", icon: "mask" },
  { key: "technical", label: "Technical", blurb: "Coding, robotics, aeromodelling, astronomy and energy.", colorVar: "var(--cat-technical)", icon: "chip" },
  { key: "literary", label: "Literary", blurb: "Debate, creative writing, quizzing and the annual magazine.", colorVar: "var(--pop-5)", icon: "book" },
  { key: "innovation", label: "Innovation & Entrepreneurship", blurb: "The E-Cell and innovation activities.", colorVar: "var(--cat-initiatives)", icon: "rocket" },
  { key: "fitness", label: "Fitness & Yoga", blurb: "Gymnasium, weight training and yoga.", colorVar: "var(--pop-6)", icon: "yoga" },
  { key: "personality", label: "Personality Development", blurb: "Communication and personality development activities.", colorVar: "var(--pop-3)", icon: "users" },
  { key: "social", label: "Social & Leadership", blurb: "Community development, mentorship and alumni relations.", colorVar: "var(--pop-2)", icon: "network" },
];

export function activityGroup(key: ActivityCategory) {
  return ACTIVITY_GROUPS.find((g) => g.key === key);
}

export function getActivity(slug: string): Activity | undefined {
  return activities.find((a) => a.slug === slug);
}

export function getActivitiesByCategory(category: ActivityCategory): Activity[] {
  return activities.filter((a) => a.category === category);
}

/** §5 — Sports & Games, split into Outdoor and Indoor. */
export function getSports(): { outdoor: Activity[]; indoor: Activity[] } {
  const sports = getActivitiesByCategory("sports");
  return {
    outdoor: sports.filter((a) => a.venue === "outdoor"),
    indoor: sports.filter((a) => a.venue === "indoor"),
  };
}

export function getActivitiesForClub(slug: string): Activity[] {
  return activities.filter((a) => a.clubSlug === slug);
}

/** §4 — Activity | Faculty In-Charge | Faculty Coordinator | Contact. */
export function facultyTable() {
  return activities.map((a) => ({
    slug: a.slug,
    activity: a.name,
    category: a.category,
    inCharge: a.facultyInCharge,
    coordinator: a.facultyCoordinator,
    specific: a.activityFaculty,
  }));
}

/* ------------------------------------------------------------------ *
 *  Events — §8
 * ------------------------------------------------------------------ */

export function getEvent(slug: string): MajorEvent | undefined {
  return events.find((event) => event.slug === slug);
}

/** Every year any event has an edition for, newest first — the archive rail. */
export function eventYears(): string[] {
  const years = new Set<string>();
  events.forEach((e) => e.editions.forEach((ed) => years.add(ed.year)));
  return [...years].sort((a, b) => b.localeCompare(a));
}

export function galleryForEvent(slug: string) {
  const event = getEvent(slug);
  if (!event?.gallerySlug) return undefined;
  return gallery.events.find((g) => g.slug === event.gallerySlug);
}

/* ------------------------------------------------------------------ *
 *  News & announcements — §14
 * ------------------------------------------------------------------ */

export const ANNOUNCEMENT_KINDS: { key: Announcement["kind"]; label: string; blurb: string }[] = [
  { key: "announcement", label: "Announcements", blurb: "Official notices, selections, trials and registrations." },
  { key: "news", label: "SAC News", blurb: "Reports of recently completed activities." },
  { key: "upcoming", label: "Upcoming", blurb: "Future programmes." },
];

export function announcementsOfKind(kind: Announcement["kind"]): Announcement[] {
  return announcements.filter((a) => a.kind === kind);
}

/** Anything dated before the current calendar year is treated as archived. */
export function isArchived(a: Announcement): boolean {
  const year = Number(a.date.match(/\b(20\d{2})\b/)?.[1]);
  return Number.isFinite(year) && year < new Date().getFullYear();
}

export function currentAnnouncements(): Announcement[] {
  return announcements.filter((a) => !isArchived(a));
}

export function archivedAnnouncements(): Announcement[] {
  return announcements.filter(isArchived);
}

/* ------------------------------------------------------------------ *
 *  Calendar — §12
 * ------------------------------------------------------------------ */

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

export function calendarBuckets(now = new Date()) {
  const today = startOfDay(now);
  const weekEnd = new Date(today);
  weekEnd.setDate(today.getDate() + 7);
  const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const parsed = calendar
    .map((entry) => ({ entry, start: new Date(entry.date), end: new Date(entry.endDate || entry.date) }))
    .filter((x) => !Number.isNaN(x.start.getTime()))
    .sort((a, b) => a.start.getTime() - b.start.getTime());

  const covers = (x: (typeof parsed)[number], from: Date, to: Date) =>
    startOfDay(x.start) <= to && startOfDay(x.end) >= from;

  return {
    today: parsed.filter((x) => covers(x, today, today)).map((x) => x.entry),
    week: parsed.filter((x) => covers(x, today, weekEnd)).map((x) => x.entry),
    month: parsed.filter((x) => covers(x, today, monthEnd)).map((x) => x.entry),
    all: parsed.map((x) => x.entry),
  };
}

/* ------------------------------------------------------------------ *
 *  Completed activities — §9
 * ------------------------------------------------------------------ */

export function archiveFacets() {
  const uniq = (values: string[]) => [...new Set(values.filter(Boolean))];
  return {
    years: uniq(archive.map((r) => r.academicYear)).sort((a, b) => b.localeCompare(a)),
    types: uniq(archive.map((r) => String(r.type))),
    clubs: uniq(archive.map((r) => r.clubSlug)),
    months: uniq(archive.map((r) => r.month)),
  };
}

/* ------------------------------------------------------------------ *
 *  Achievements — §10
 * ------------------------------------------------------------------ */

export const ACHIEVEMENT_CATEGORIES: { key: AchievementCategory; label: string }[] = [
  { key: "international", label: "International" },
  { key: "national", label: "National" },
  { key: "inter-nit", label: "Inter-NIT" },
  { key: "sports", label: "Sports" },
  { key: "cultural", label: "Cultural" },
  { key: "technical", label: "Technical" },
  { key: "innovation", label: "Innovation" },
  { key: "entrepreneurship", label: "Entrepreneurship" },
  { key: "individual", label: "Individual" },
  { key: "team", label: "Team" },
];

export function countAchievements(): number {
  return achievements.reduce((total, year) => total + year.achievements.length, 0);
}

export function achievementCategoryCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  achievements.forEach((group) =>
    group.achievements.forEach((a) =>
      a.categories.forEach((c) => (counts[c] = (counts[c] ?? 0) + 1)),
    ),
  );
  return counts;
}

/* ------------------------------------------------------------------ *
 *  People & counts
 * ------------------------------------------------------------------ */

export function countFaculty(): number {
  return committee.reduce((total, group) => total + group.members.length, 0);
}

export function countPhotos(): number {
  return gallery.events.reduce((total, event) => total + event.photos.length, 0);
}

export function countDocuments(): number {
  return documents.reduce((total, category) => total + category.files.length, 0);
}

export function countFacilities(): number {
  return facilities.reduce((total, group) => total + group.items.length, 0);
}

/** §15 — photo sets grouped by academic session; untagged sets group last. */
export function gallerySessions() {
  const map = new Map<string, typeof gallery.events>();
  gallery.events.forEach((event) => {
    const key = event.session || "";
    map.set(key, [...(map.get(key) ?? []), event]);
  });
  return [...map.entries()]
    .sort((a, b) => (a[0] === "" ? 1 : b[0] === "" ? -1 : b[0].localeCompare(a[0])))
    .map(([session, events]) => ({ session, events }));
}

/* ------------------------------------------------------------------ *
 *  §19 — search facility
 * ------------------------------------------------------------------ */

export interface SearchDoc {
  href: string;
  title: string;
  kind: string;
  blurb: string;
  /** Lower-cased haystack, built once at module load. */
  haystack: string;
}

const doc = (href: string, title: string, kind: string, blurb: string, extra = ""): SearchDoc => ({
  href,
  title,
  kind,
  blurb,
  haystack: `${title} ${kind} ${blurb} ${extra}`.toLowerCase(),
});

/**
 * A flat index over everything the site publishes. Built at module scope so
 * it is computed once during the static build and shipped as plain data.
 */
export const searchIndex: SearchDoc[] = [
  ...activities.map((a) =>
    doc(
      `/activities/${a.slug}`,
      a.name,
      "Activity",
      a.about[0] ?? a.committeeName,
      `${a.category} ${a.venue ?? ""} ${a.facultyInCharge?.name ?? ""} ${a.committeeName}`,
    ),
  ),
  ...clubs.map((c) => doc(`/clubs/${c.slug}`, c.name, "Club", c.description, c.categoryLabel)),
  ...events.map((e) =>
    doc(`/events/${e.slug}`, e.title, "Event", e.subtitle || e.about[0] || "", e.category),
  ),
  ...announcements.map((a) => doc("/news", a.title, "Announcement", a.summary, a.date)),
  ...achievements.flatMap((year) =>
    year.achievements.map((a) =>
      doc(
        "/achievements",
        a.title,
        "Achievement",
        a.description,
        `${year.year} ${a.teams.flatMap((t) => t.members.map((m) => m.name)).join(" ")}`,
      ),
    ),
  ),
  ...facilities.flatMap((group) =>
    group.items.map((f) => doc(`/facilities#${f.slug}`, f.name, "Facility", group.title, f.location)),
  ),
  ...documents.map((d) => doc(`/documents#${d.id}`, d.title, "Documents", d.group)),
  ...committee.map((g) =>
    doc(
      `/committee#${g.id}`,
      g.activity,
      "Committee",
      `${g.members.length} faculty members`,
      g.members.map((m) => `${m.name} ${m.role}`).join(" "),
    ),
  ),
  doc("/about", "About the Centre", "Page", site.website.statement),
  doc("/people", "People & Governance", "Page", "President, faculty team, coaches and student leadership"),
  doc("/join", "Join a club", "Page", "How a student can participate"),
  doc("/calendar", "Events calendar", "Page", "Today, this week and this month"),
  doc("/archive", "Completed activities", "Page", "The archive of everything the Centre has conducted"),
  doc("/reports", "Annual SAC Report", "Page", "The Centre's yearly account"),
  doc("/gallery", "Gallery", "Page", "Photographs and video"),
  doc("/contact", "Contact", "Page", `${site.contact.address}, ${site.contact.city}`),
];
