import type { Metadata } from "next";
import Link from "next/link";
import { EventCard } from "@/components/events/EventCard";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";
import { PageHeader } from "@/components/ui/PageHeader";
import { Pending } from "@/components/ui/Pending";
import { Reveal } from "@/components/ui/Reveal";
import { events, eventYears } from "@/lib/data";

export const metadata: Metadata = {
  title: "Major Events",
  description:
    "Avishkar, Culrav, the Annual Athletic Meet, Josh, Gnosiomania and the other major events of the Student Activity Centre, MNNIT Allahabad, with their year-wise archives.",
};

export default function EventsPage() {
  const [featured, ...rest] = events;
  const years = eventYears();

  return (
    <>
      <PageHeader
        images={[
          "/images/gallery/culrav/culrav-03.webp",
          "/images/gallery/avishkar/avishkar-06.webp",
          "/images/gallery/hack36/hack-36-01.webp",
        ]}
        eyebrow="Flagship events"
        title="Major events"
        description={`${events.length} major events run by the Centre. Every one keeps a year-wise archive of its dates, theme, organising team, competitions, winners, results and photographs.`}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Events" }]}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/calendar" size="sm">
            Events calendar
            <ArrowRight className="size-3.5" />
          </ButtonLink>
          <ButtonLink href="/news" variant="outline" size="sm">
            News &amp; announcements
          </ButtonLink>
          <ButtonLink href="/archive" variant="outline" size="sm">
            Completed activities
          </ButtonLink>
        </div>
      </PageHeader>

      <div className="container-page py-14 sm:py-18">
        {featured ? (
          <Reveal>
            <EventCard event={featured} featured />
          </Reveal>
        ) : null}

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((event, i) => (
            <Reveal key={event.slug} delay={Math.min(i, 6) * 60} className="h-full">
              <EventCard event={event} />
            </Reveal>
          ))}
        </div>

        {years.length === 0 ? (
          <Reveal delay={160}>
            <div className="mt-12">
              <Pending
                what="The year-wise archive for every event — dates, theme, organising team, participants, competitions, winners, guests, results, photographs, videos, reports and downloads"
                who="event organising teams, through the SAC Web Team"
              >
                <p>
                  Photographs already held for some of these events are on the{" "}
                  <Link href="/gallery" className="font-bold text-ink underline-offset-4 hover:underline">
                    gallery
                  </Link>
                  .
                </p>
              </Pending>
            </div>
          </Reveal>
        ) : null}
      </div>
    </>
  );
}
