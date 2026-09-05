import { EventCard } from "@/components/events/EventCard";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import type { MajorEvent } from "@/lib/types";

export function EventsPreview({ events }: { events: MajorEvent[] }) {
  const [featured, ...rest] = events.slice(0, 4);

  return (
    <Section>
      <div className="container-page">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Major events"
            title="The big nights"
          />
          <Reveal delay={120}>
            <ButtonLink href="/events" variant="outline">
              All major events
              <ArrowRight className="size-4" />
            </ButtonLink>
          </Reveal>
        </div>

        {featured ? (
          <Reveal delay={80} className="mt-12">
            <EventCard event={featured} featured />
          </Reveal>
        ) : null}

        <div className="mt-7 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((event, i) => (
            <Reveal key={event.slug} delay={i * 90}>
              <EventCard event={event} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
