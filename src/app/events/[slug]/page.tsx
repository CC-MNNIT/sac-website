import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ActivitySection } from "@/components/activities/ActivitySection";
import { PersonCard } from "@/components/people/PersonCard";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";
import { PageHeader } from "@/components/ui/PageHeader";
import { Pending } from "@/components/ui/Pending";
import { Reveal } from "@/components/ui/Reveal";
import { announcements, events, galleryForEvent, getEvent } from "@/lib/data";
import type { EventEdition } from "@/lib/types";

const CATEGORY_COLOR: Record<string, string> = {
  Technical: "var(--cat-technical)",
  Cultural: "var(--cat-cultural)",
  Sports: "var(--cat-sports)",
};

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) return { title: "Event not found" };
  return {
    title: event.title,
    description:
      event.about[0] ??
      `${event.title}${event.subtitle ? ` — ${event.subtitle}` : ""} at MNNIT Allahabad, run by the Student Activity Centre.`,
  };
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();

  const color = CATEGORY_COLOR[event.category] ?? "var(--brand)";
  const photos = galleryForEvent(event.slug);
  const related = announcements.filter((a) => a.eventSlug === event.slug);
  const editions = [...event.editions].sort((a, b) => b.year.localeCompare(a.year));

  return (
    <>
      <PageHeader
        images={photos ? photos.photos.slice(0, 3).map((p) => p.src) : []}
        eyebrow={event.category || "Major event"}
        title={event.title}
        description={event.subtitle || undefined}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Events", href: "/events" },
          { label: event.title },
        ]}
      >
        {editions.length > 0 ? (
          <div className="mt-8 flex flex-wrap gap-2">
            {editions.map((edition) => (
              <a
                key={edition.year}
                href={`#year-${edition.year}`}
                className="rounded-full border-2 border-line-strong bg-surface px-4 py-2 text-sm font-bold shadow-[3px_3px_0_0_var(--sticker)] transition-transform hover:-translate-y-1"
              >
                {edition.year}
              </a>
            ))}
          </div>
        ) : null}
      </PageHeader>

      <div className="container-page py-14 sm:py-18">
        <div className="space-y-12">
          <ActivitySection id="about" title="About" color={color}>
            {event.about.length > 0 ? (
              <div className="space-y-4">
                {event.about.map((paragraph, i) => (
                  <p key={i} className="leading-relaxed text-ink-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : (
              <Pending what={`A description of ${event.title}`} who="event organising team" />
            )}
          </ActivitySection>

          {/* §8 — year-wise archive */}
          <ActivitySection id="archive" title="Year-wise archive" count={editions.length} color={color}>
            {editions.length > 0 ? (
              <div className="space-y-10">
                {editions.map((edition) => (
                  <EditionBlock key={edition.year} edition={edition} color={color} />
                ))}
              </div>
            ) : (
              <Pending
                what="The year-wise record — event dates, theme, organising team, participating students, major competitions, winners, guest details, results, photographs, videos, reports and downloads"
                who="event organising team, through the SAC Web Team"
              />
            )}
          </ActivitySection>

          {/* Announcements published about this event */}
          {related.length > 0 ? (
            <ActivitySection id="announcements" title="Announcements" count={related.length} color={color}>
              <ul className="space-y-3">
                {related.map((item) => (
                  <li key={item.slug} className="rounded-2xl border-2 border-line-strong bg-surface p-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="font-bold">{item.title}</p>
                      <span className="text-xs tabular-nums text-ink-subtle">{item.date}</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.summary}</p>
                  </li>
                ))}
              </ul>
              <Link
                href="/news"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold transition hover:opacity-80"
                style={{ color }}
              >
                All announcements
                <ArrowRight className="size-3.5" />
              </Link>
            </ActivitySection>
          ) : null}

          {/* Photographs already held for this event */}
          <ActivitySection
            id="gallery"
            title="Photographs"
            count={photos?.photos.length ?? 0}
            color={color}
          >
            {photos && photos.photos.length > 0 ? (
              <>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {photos.photos.slice(0, 8).map((photo) => (
                    <Reveal key={photo.src} variant="scale">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border-2 border-line-strong">
                        <Image
                          src={photo.src}
                          alt=""
                          fill
                          sizes="(max-width: 640px) 50vw, 25vw"
                          className="object-cover"
                        />
                      </div>
                    </Reveal>
                  ))}
                </div>
                <ButtonLink href={`/gallery#${photos.slug}`} variant="outline" size="sm" className="mt-6">
                  All {photos.photos.length} photographs
                  <ArrowRight className="size-3.5" />
                </ButtonLink>
              </>
            ) : (
              <Pending what="Photographs of this event" who="event organising team" />
            )}
          </ActivitySection>
        </div>
      </div>
    </>
  );
}

/** §8 — one year of a major event, with every field the brief lists. */
function EditionBlock({ edition, color }: { edition: EventEdition; color: string }) {
  return (
    <section id={`year-${edition.year}`} className="scroll-mt-28 rounded-3xl border-2 border-line-strong bg-surface p-6 sm:p-7">
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b-2 border-line-strong pb-4">
        <h3 className="font-display text-3xl" style={{ color }}>
          {edition.year}
        </h3>
        {edition.dates ? <span className="text-sm text-ink-muted">{edition.dates}</span> : null}
      </div>

      <dl className="mt-5 grid gap-x-8 gap-y-4 text-sm sm:grid-cols-2">
        {edition.theme ? <Field label="Theme">{edition.theme}</Field> : null}
        {edition.participants ? <Field label="Participating students">{edition.participants}</Field> : null}
      </dl>

      {edition.competitions.length > 0 ? (
        <Block label="Major competitions">
          <ul className="flex flex-wrap gap-2">
            {edition.competitions.map((c) => (
              <li key={c} className="rounded-full border-2 border-line-strong bg-surface-2 px-3 py-1 text-xs font-semibold">
                {c}
              </li>
            ))}
          </ul>
        </Block>
      ) : null}

      {edition.winners.length > 0 ? (
        <Block label="Winners">
          <ul className="space-y-2 text-sm">
            {edition.winners.map((w, i) => (
              <li key={i} className="flex flex-wrap gap-x-3">
                <span className="font-semibold">{w.title}</span>
                <span className="text-ink-muted">{w.name}</span>
                {w.position ? <span style={{ color }}>{w.position}</span> : null}
              </li>
            ))}
          </ul>
        </Block>
      ) : null}

      {edition.results.length > 0 ? (
        <Block label="Results">
          <ul className="list-disc space-y-1 pl-5 text-sm text-ink-muted">
            {edition.results.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </Block>
      ) : null}

      {edition.organisingTeam.length > 0 ? (
        <Block label="Organising team">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {edition.organisingTeam.map((member) => (
              <PersonCard key={member.name} person={member} label={member.role ?? "Organiser"} color={color} />
            ))}
          </div>
        </Block>
      ) : null}

      {edition.guests.length > 0 ? (
        <Block label="Guests">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {edition.guests.map((guest) => (
              <PersonCard key={guest.name} person={guest} label={guest.role ?? "Guest"} color={color} />
            ))}
          </div>
        </Block>
      ) : null}

      {edition.report ? (
        <Block label="Report">
          <p className="text-sm leading-relaxed text-ink-muted">{edition.report}</p>
        </Block>
      ) : null}

      {edition.photos.length > 0 ? (
        <Block label="Photographs">
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
            {edition.photos.map((photo) => (
              <div key={photo} className="relative aspect-[4/3] overflow-hidden rounded-xl border-2 border-line-strong">
                <Image src={photo} alt="" fill sizes="20vw" className="object-cover" />
              </div>
            ))}
          </div>
        </Block>
      ) : null}

      {edition.videos.length > 0 ? (
        <Block label="Videos">
          <ul className="flex flex-wrap gap-2">
            {edition.videos.map((video) => (
              <li key={video.url}>
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-line-strong bg-surface px-4 py-2 text-sm font-bold transition-transform hover:-translate-y-0.5"
                >
                  {video.title}
                  <ArrowRight className="size-3.5" />
                </a>
              </li>
            ))}
          </ul>
        </Block>
      ) : null}

      {edition.downloads.length > 0 ? (
        <Block label="Downloads">
          <ul className="flex flex-wrap gap-2">
            {edition.downloads.map((file) => (
              <li key={file.href}>
                <a
                  href={file.href}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-line-strong bg-surface-2 px-4 py-2 text-sm font-bold transition-transform hover:-translate-y-0.5"
                >
                  {file.label}
                </a>
              </li>
            ))}
          </ul>
        </Block>
      ) : null}
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="label-caps text-[0.6rem] text-ink-subtle">{label}</dt>
      <dd className="mt-1 text-ink-muted">{children}</dd>
    </div>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-6 border-t border-line pt-5">
      <p className="label-caps text-[0.6rem] text-ink-subtle">{label}</p>
      <div className="mt-3">{children}</div>
    </div>
  );
}
