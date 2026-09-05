import type { Metadata } from "next";
import Link from "next/link";
import { AnnouncementCard } from "@/components/news/AnnouncementCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import {
  ANNOUNCEMENT_KINDS,
  announcements,
  archivedAnnouncements,
  currentAnnouncements,
} from "@/lib/data";
import type { Announcement } from "@/lib/types";

export const metadata: Metadata = {
  title: "News & Announcements",
  description:
    "Official notices, reports of completed activities and upcoming programmes from the Student Activity Centre, MNNIT Allahabad.",
};

export default function NewsPage() {
  const current = currentAnnouncements();
  const archived = archivedAnnouncements();

  return (
    <>
      <PageHeader
        images={[]}
        eyebrow="Notices"
        title="News & announcements"
        description="Official notices, selections, trials and registrations; reports of recently completed activities; and programmes still to come."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "News" }]}
      />

      <div className="container-page py-14 sm:py-18">
        {ANNOUNCEMENT_KINDS.map((kind, index) => {
          const items = current.filter((a) => a.kind === kind.key);
          return (
            <section
              key={kind.key}
              id={kind.key}
              className={index > 0 ? "mt-16 scroll-mt-28 border-t-2 border-line-strong pt-14" : "scroll-mt-28"}
            >
              <SectionHeading
                align="left"
                eyebrow={`0${index + 1}`}
                title={kind.label}
                description={kind.blurb}
              />

              <div className="mt-8">
                {items.length > 0 ? (
                  <Grid items={items} />
                ) : (
                  <EmptyState
                    title={`No current ${kind.label.toLowerCase()}.`}
                    body="Coordinators submit these to the SAC Web Team, who publish them here."
                  />
                )}
              </div>
            </section>
          );
        })}
      </div>

      {/* §14 — old announcements move to an archive */}
      {archived.length > 0 ? (
        <Section id="archive" tint className="border-t-2 border-line-strong">
          <div className="container-page">
            <SectionHeading
              align="left"
              eyebrow="Archive"
              title="Earlier announcements"
              description={`${archived.length} notices published in previous sessions, retained as part of the record.`}
            />
            <div className="mt-8">
              <Grid items={archived} />
            </div>
            <p className="mt-10 text-sm text-ink-muted">
              Reports of completed programmes are also indexed in the{" "}
              <Link href="/archive" className="font-bold text-ink underline-offset-4 hover:underline">
                completed activities archive
              </Link>
              .
            </p>
          </div>
        </Section>
      ) : null}

      {announcements.length === 0 ? null : null}
    </>
  );
}

function Grid({ items }: { items: Announcement[] }) {
  const [featured, ...rest] = items;
  return (
    <>
      <Reveal>
        <AnnouncementCard item={featured} featured />
      </Reveal>
      {rest.length > 0 ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((item, i) => (
            <Reveal key={item.slug} delay={Math.min(i, 6) * 60} className="h-full">
              <AnnouncementCard item={item} />
            </Reveal>
          ))}
        </div>
      ) : null}
    </>
  );
}
