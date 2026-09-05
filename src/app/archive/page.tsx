import type { Metadata } from "next";
import { ArchiveExplorer } from "@/components/archive/ArchiveExplorer";
import { PageHeader } from "@/components/ui/PageHeader";
import { archive, clubs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Completed Activities",
  description:
    "The archive of activities completed by the Student Activity Centre, MNNIT Allahabad — filterable by academic year, activity type, club and month.",
};

export default function ArchivePage() {
  const clubNames = Object.fromEntries(clubs.map((club) => [club.slug, club.name]));

  return (
    <>
      <PageHeader
        images={[]}
        eyebrow="The record"
        title="Completed activities"
        description="An institutional record of everything the Centre has conducted, rather than allowing activities to disappear once they are over. Filter by academic year, activity type, club or month."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Completed activities" }]}
      />

      <div className="container-page py-14 sm:py-18">
        <ArchiveExplorer records={archive} clubNames={clubNames} />
      </div>
    </>
  );
}
