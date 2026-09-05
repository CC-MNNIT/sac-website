import { AboutIntro } from "@/components/home/AboutIntro";
import { AchievementsPreview } from "@/components/home/AchievementsPreview";
import { ClubsShowcase } from "@/components/home/ClubsShowcase";
import { CommitteePreview } from "@/components/home/CommitteePreview";
import { EventsPreview } from "@/components/home/EventsPreview";
import { Hero } from "@/components/home/Hero";
import { PresidentMessage } from "@/components/home/PresidentMessage";
import {
  ActivityAreaPreview,
  AnnouncementsPreview,
  CompletedPreview,
  FacilitiesPreview,
  MediaHighlights,
  QuickLinks,
  UpcomingAndThisMonth,
} from "@/components/home/Sections";
import { Stats } from "@/components/home/Stats";
import { Ticker } from "@/components/home/Ticker";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import {
  CATEGORIES,
  achievements,
  activities,
  archive,
  calendarBuckets,
  clubs,
  committee,
  currentAnnouncements,
  events,
  gallery,
  site,
} from "@/lib/data";

/**
 * The homepage follows the section order in §2 of the reform brief:
 * hero · statistics · about · announcements · upcoming · this month ·
 * major events · clubs · sports · cultural · technical · achievements ·
 * recently completed · facilities · photo & video · President's message ·
 * quick links.
 */
export default function HomePage() {
  const buckets = calendarBuckets();

  return (
    <>
      <Hero
        slides={gallery.hero}
        title={site.name}
        tagline={site.tagline}
        motto={site.motto}
      />

      <Ticker clubs={clubs} />

      <Stats stats={site.stats} />

      <AboutIntro />

      <AnnouncementsPreview items={currentAnnouncements()} />

      <UpcomingAndThisMonth upcoming={buckets.week} month={buckets.month} />

      <EventsPreview events={events} />

      <ClubsShowcase clubs={clubs} categories={CATEGORIES} />

      <ActivityAreaPreview
        group="sports"
        title="Sports"
        description="Outdoor and indoor games, each with its faculty in-charge, coach, squad and record."
        href="/sports"
        tint
      />

      <ActivityAreaPreview
        group="cultural"
        title="Cultural activities"
        description="Dramatics, music, dance, fine arts, photography and film."
        href="/activities?group=cultural"
      />

      <ActivityAreaPreview
        group="technical"
        title="Technical activities"
        description="Coding, robotics, aeromodelling, astronomy and energy."
        href="/activities?group=technical"
        tint
      />

      <AchievementsPreview years={achievements} />

      <CompletedPreview records={archive} />

      <FacilitiesPreview />

      <MediaHighlights />

      <PresidentMessage />

      <CommitteePreview groups={committee} />

      {/* Closing call to action */}
      <section className="relative overflow-hidden border-t-2 border-line-strong bg-bg-tint bg-dot-grid">
        <div className="container-page py-20 sm:py-24">
          <Reveal variant="pop" className="mx-auto max-w-2xl">
            <div className="relative rounded-4xl border-2 border-line-strong bg-surface px-6 py-12 text-center shadow-[8px_8px_0_0_var(--brand)] sm:px-12">
              <h2 className="text-[2.2rem] leading-[1.06] sm:text-[2.9rem]">
                {activities.length} activities. <span className="highlight-swipe">Pick one.</span>
              </h2>

              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <ButtonLink href="/join" size="lg">
                  How can I participate?
                  <ArrowRight className="size-4" />
                </ButtonLink>
                <ButtonLink href="/activities" variant="outline" size="lg">
                  All activities
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <QuickLinks />
    </>
  );
}
