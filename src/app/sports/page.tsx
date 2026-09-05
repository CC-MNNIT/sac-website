import type { Metadata } from "next";
import { ActivityCard } from "@/components/activities/ActivityCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { getSports } from "@/lib/data";
import type { Activity } from "@/lib/types";

const { outdoor, indoor } = getSports();

export const metadata: Metadata = {
  title: "Sports",
  description: `Sports & Games at the Student Activity Centre, MNNIT Allahabad — ${outdoor.length} outdoor and ${indoor.length} indoor activities, each with its faculty in-charge, coach, team and record.`,
};

export default function SportsPage() {
  return (
    <>
      <PageHeader
        images={[
          "/images/clubs/cricket.webp",
          "/images/clubs/football.webp",
          "/images/clubs/basketball.webp",
        ]}
        eyebrow="Sports & Games"
        title="Sports"
        description={`${outdoor.length + indoor.length} recognised sports, classified as outdoor and indoor. Each carries its faculty in-charge, coach, captain, squad, practice schedule, facilities, results and achievements.`}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Sports" }]}
      />

      <SportsGroup
        id="outdoor"
        eyebrow="Outdoor"
        title="Outdoor games"
        description="Played on the Athletics Ground, the cricket and football fields and the outdoor courts."
        items={outdoor}
      />

      <SportsGroup
        id="indoor"
        eyebrow="Indoor"
        title="Indoor games"
        description="Played in the Boys' and Girls' SAC halls, the Gymkhana and the indoor courts."
        items={indoor}
        tint
      />
    </>
  );
}

function SportsGroup({
  id,
  eyebrow,
  title,
  description,
  items,
  tint = false,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  items: Activity[];
  tint?: boolean;
}) {
  return (
    <Section id={id} tint={tint} className={tint ? "border-t-2 border-line-strong" : undefined}>
      <div className="container-page">
        <SectionHeading align="left" eyebrow={eyebrow} title={title} description={description} />
        <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((activity, i) => (
            <Reveal key={activity.slug} delay={Math.min(i, 6) * 60} variant="pop">
              <ActivityCard activity={activity} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
