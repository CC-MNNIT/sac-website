import type { Metadata } from "next";
import { HallOfFame } from "@/components/achievements/HallOfFame";
import { PageHeader } from "@/components/ui/PageHeader";
import { achievements, countAchievements } from "@/lib/data";

export const metadata: Metadata = {
  title: "Hall of Fame",
  description:
    "The Hall of Fame of the Student Activity Centre, MNNIT Allahabad — international, national, Inter-NIT, sports, cultural and technical results won by its students.",
};

export default function AchievementsPage() {
  const total = countAchievements();
  const years = achievements.map((y) => y.year);

  return (
    <>
      <PageHeader
        images={[
          "/images/gallery/avishkar/avishkar-05.webp",
          "/images/clubs/cricket.webp",
          "/images/gallery/hack36/hack-36-04.webp",
        ]}
        eyebrow="Achievement"
        title="Hall of Fame"
        description={`${total} results recorded across ${years.length} years. Filter by category, or search for a student or a competition.`}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Achievements" }]}
      />

      <div className="container-page py-12 sm:py-16">
        <HallOfFame years={achievements} />
      </div>
    </>
  );
}
