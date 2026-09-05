import Image from "next/image";
import Link from "next/link";
import { AnnouncementCard } from "@/components/news/AnnouncementCard";
import { ActivityCard } from "@/components/activities/ActivityCard";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight, Icon } from "@/components/ui/Icons";
import { CountBadge } from "@/components/ui/Pending";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import {
  ACTIVITY_GROUPS,
  activities,
  countFacilities,
  facilities,
  gallery,
  site,
} from "@/lib/data";
import type { Activity, Announcement, ArchiveRecord, CalendarEntry } from "@/lib/types";

/* ------------------------------------------------------------------ *
 *  A section heading with a trailing "explore" button — the pattern the
 *  brief asks the homepage to be built from (§19).
 * ------------------------------------------------------------------ */

function Head({
  eyebrow,
  title,
  description,
  href,
  cta,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <SectionHeading align="left" eyebrow={eyebrow} title={title} description={description} />
      <Reveal delay={120}>
        <ButtonLink href={href} variant="outline">
          {cta}
          <ArrowRight className="size-4" />
        </ButtonLink>
      </Reveal>
    </div>
  );
}

/** Small note used when a homepage section has nothing published yet. */
function Nothing({ children }: { children: React.ReactNode }) {
  return (
    <Reveal delay={80}>
      <p className="mt-10 rounded-3xl border-2 border-dashed border-line-strong bg-surface-2 px-6 py-8 text-center text-sm leading-relaxed text-ink-muted">
        {children}
      </p>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ *
 *  §2 — Latest Announcements
 * ------------------------------------------------------------------ */

export function AnnouncementsPreview({ items }: { items: Announcement[] }) {
  const shown = items.slice(0, 3);

  return (
    <Section tint className="border-y-2 border-line-strong">
      <div className="container-page">
        <Head
          eyebrow="Notices"
          title="Latest announcements"
          description="Official notices, selections, trials and registrations."
          href="/news"
          cta="All announcements"
        />

        {shown.length > 0 ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((item, i) => (
              <Reveal key={item.slug} delay={i * 80} className="h-full">
                <AnnouncementCard item={item} />
              </Reveal>
            ))}
          </div>
        ) : (
          <Nothing>
            No announcements are currently published. Club and activity coordinators submit notices
            to the SAC Web Team, who publish them here and on the{" "}
            <Link href="/news" className="font-bold text-ink underline-offset-4 hover:underline">
              news page
            </Link>
            .
          </Nothing>
        )}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 *  §2 — Upcoming Events · Activities This Month
 * ------------------------------------------------------------------ */

export function UpcomingAndThisMonth({
  upcoming,
  month,
}: {
  upcoming: CalendarEntry[];
  month: CalendarEntry[];
}) {
  return (
    <Section>
      <div className="container-page">
        <Head
          eyebrow="When"
          title="What's coming up"
          description="Programmes scheduled in the days ahead, and everything on this month's calendar."
          href="/calendar"
          cta="Events calendar"
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <Reveal>
            <Panel title="Upcoming events" count={upcoming.length} color="var(--pop-4)">
              {upcoming.length > 0 ? (
                <ul className="space-y-3">
                  {upcoming.slice(0, 4).map((entry) => (
                    <EntryRow key={entry.slug} entry={entry} />
                  ))}
                </ul>
              ) : (
                <p className="text-sm leading-relaxed text-ink-muted">
                  Nothing is scheduled yet. Programmes appear here as soon as coordinators submit
                  them.
                </p>
              )}
            </Panel>
          </Reveal>

          <Reveal delay={100}>
            <Panel title="Activities this month" count={month.length} color="var(--pop-2)">
              {month.length > 0 ? (
                <ul className="space-y-3">
                  {month.slice(0, 4).map((entry) => (
                    <EntryRow key={entry.slug} entry={entry} />
                  ))}
                </ul>
              ) : (
                <p className="text-sm leading-relaxed text-ink-muted">
                  No competitions, workshops or practice sessions are listed for this month yet.
                </p>
              )}
            </Panel>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

function Panel({
  title,
  count,
  color,
  children,
}: {
  title: string;
  count: number;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div className="h-full rounded-3xl border-2 border-line-strong bg-surface p-6 sm:p-7">
      <div className="flex items-baseline gap-3 border-b-2 border-line-strong pb-4">
        <h3 className="text-lg">{title}</h3>
        <CountBadge value={count} color={color} />
      </div>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function EntryRow({ entry }: { entry: CalendarEntry }) {
  const date = new Date(entry.date);
  const valid = !Number.isNaN(date.getTime());
  return (
    <li className="flex gap-4 rounded-2xl border-2 border-line-strong bg-surface-2 p-4">
      <span className="shrink-0 text-center">
        <span className="block font-display text-xl font-bold leading-none tabular-nums">
          {valid ? date.getDate() : "—"}
        </span>
        <span className="mt-0.5 block label-caps text-[0.55rem] text-ink-subtle">
          {valid ? date.toLocaleString("en-IN", { month: "short" }) : ""}
        </span>
      </span>
      <span className="min-w-0">
        <span className="block font-bold leading-snug">{entry.title}</span>
        <span className="mt-0.5 block text-xs text-ink-subtle">
          {[entry.time, entry.venue].filter(Boolean).join(" · ")}
        </span>
      </span>
    </li>
  );
}

/* ------------------------------------------------------------------ *
 *  §2 — Sports · Cultural Activities · Technical Activities
 * ------------------------------------------------------------------ */

export function ActivityAreaPreview({
  group,
  title,
  description,
  href,
  tint = false,
}: {
  group: string;
  title: string;
  description: string;
  href: string;
  tint?: boolean;
}) {
  const shown: Activity[] = activities.filter((a) => a.category === group).slice(0, 3);
  const meta = ACTIVITY_GROUPS.find((g) => g.key === group);

  return (
    <Section tint={tint} className={tint ? "border-y-2 border-line-strong" : undefined}>
      <div className="container-page">
        <Head
          eyebrow={meta?.label ?? title}
          title={title}
          description={description}
          href={href}
          cta={`All ${meta?.label.toLowerCase() ?? title.toLowerCase()}`}
        />

        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((activity, i) => (
            <Reveal key={activity.slug} delay={i * 80} className="h-full">
              <ActivityCard activity={activity} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 *  §2 — Recently Completed Activities
 * ------------------------------------------------------------------ */

export function CompletedPreview({ records }: { records: ArchiveRecord[] }) {
  const shown = records.slice(0, 3);

  return (
    <Section>
      <div className="container-page">
        <Head
          eyebrow="The record"
          title="Recently completed"
          description="Every programme the Centre conducts stays on the record once it is over."
          href="/archive"
          cta="Activity archive"
        />

        {shown.length > 0 ? (
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((record, i) => (
              <Reveal key={record.slug} delay={i * 80} className="h-full">
                <li className="sticker flex h-full flex-col rounded-3xl bg-surface p-5">
                  <span className="label-caps text-[0.6rem] text-ink-subtle">{record.month}</span>
                  <h3 className="mt-2 text-lg leading-snug">{record.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                    {[record.venue, record.participants && `${record.participants} participants`]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                  {record.result ? (
                    <p className="mt-3 border-t border-line pt-3 text-sm font-semibold text-brand">
                      {record.result}
                    </p>
                  ) : null}
                </li>
              </Reveal>
            ))}
          </ul>
        ) : (
          <Nothing>
            The archive is empty. Each completed programme is submitted by its coordinator in the
            standard format and published in the{" "}
            <Link href="/archive" className="font-bold text-ink underline-offset-4 hover:underline">
              activity archive
            </Link>
            .
          </Nothing>
        )}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 *  §2 — SAC Facilities
 * ------------------------------------------------------------------ */

export function FacilitiesPreview() {
  return (
    <Section tint className="border-y-2 border-line-strong">
      <div className="container-page">
        <Head
          eyebrow="Where"
          title="SAC facilities"
          description={`${countFacilities()} grounds, courts, halls and training spaces across sports, fitness and cultural infrastructure.`}
          href="/facilities"
          cta="All facilities"
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {facilities.map((group, i) => (
            <Reveal key={group.id} delay={i * 80} variant="pop" className="h-full">
              <Link
                href={`/facilities#${group.id}`}
                className="sticker sticker-hover flex h-full flex-col rounded-3xl bg-surface p-6"
              >
                <span className="grid size-11 place-items-center rounded-2xl border-2 border-line-strong bg-surface-2 text-brand">
                  <Icon name={group.icon} className="size-5" />
                </span>
                <h3 className="mt-4 text-lg">{group.title}</h3>
                <ul className="mt-3 flex-1 space-y-1 text-sm text-ink-muted">
                  {group.items.slice(0, 4).map((item) => (
                    <li key={item.slug}>{item.name}</li>
                  ))}
                  {group.items.length > 4 ? (
                    <li className="text-ink-subtle">+ {group.items.length - 4} more</li>
                  ) : null}
                </ul>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 *  §2 — Photo / Video Highlights
 * ------------------------------------------------------------------ */

export function MediaHighlights() {
  const photos = gallery.events.flatMap((event) => event.photos.slice(0, 2)).slice(0, 8);

  return (
    <Section>
      <div className="container-page">
        <Head
          eyebrow="Highlights"
          title="Photo & video"
          description={`${gallery.events.reduce((n, e) => n + e.photos.length, 0)} photographs from the Centre's events, and the video gallery.`}
          href="/gallery"
          cta="Full gallery"
        />

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {photos.map((photo, i) => (
            <Reveal key={photo.src} delay={Math.min(i, 6) * 50} variant="scale">
              <div className="relative aspect-square overflow-hidden rounded-2xl border-2 border-line-strong">
                <Image
                  src={photo.src}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </Reveal>
          ))}
        </div>

        {gallery.videos.length === 0 ? (
          <Reveal delay={120}>
            <p className="mt-6 text-sm text-ink-subtle">
              The video gallery is set up and awaiting its first uploads.
            </p>
          </Reveal>
        ) : null}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 *  §2 — Quick Links
 * ------------------------------------------------------------------ */

const QUICK = [
  { label: "Activities", href: "/activities" },
  { label: "Clubs", href: "/clubs" },
  { label: "Sports", href: "/sports" },
  { label: "Major events", href: "/events" },
  { label: "Events calendar", href: "/calendar" },
  { label: "News & announcements", href: "/news" },
  { label: "Join a club", href: "/join" },
  { label: "Hall of Fame", href: "/achievements" },
  { label: "Completed activities", href: "/archive" },
  { label: "Facilities", href: "/facilities" },
  { label: "People & governance", href: "/people" },
  { label: "Gallery", href: "/gallery" },
  { label: "Documents & downloads", href: "/documents" },
  { label: "Annual report", href: "/reports" },
  { label: "Contact", href: "/contact" },
];

export function QuickLinks() {
  return (
    <Section tint className="border-t-2 border-line-strong">
      <div className="container-page">
        <SectionHeading align="left" eyebrow="Quick links" title="Everything on this site" />

        <div className="mt-10 flex flex-wrap gap-3">
          {QUICK.map((link, i) => (
            <Reveal key={link.href} delay={Math.min(i, 10) * 35} variant="pop">
              <Link
                href={link.href}
                className="inline-flex items-center gap-2 rounded-full border-2 border-line-strong bg-surface px-4 py-2.5 text-sm font-bold shadow-[3px_3px_0_0_var(--sticker)] transition-transform duration-250 hover:-translate-y-1 active:translate-y-0.5 active:shadow-none"
              >
                <span
                  className="size-2 rounded-full"
                  style={{ backgroundColor: `var(--pop-${(i % 6) + 1})` }}
                  aria-hidden
                />
                {link.label}
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-x-5 gap-y-2 border-t-2 border-line-strong pt-6">
          {site.quickLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-ink-subtle underline-offset-4 transition hover:text-brand hover:underline"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}
