import type { Metadata } from "next";
import { Suspense } from "react";
import { ClubsExplorer } from "@/components/clubs/ClubsExplorer";
import { PageHeader } from "@/components/ui/PageHeader";
import { CATEGORIES, clubs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Clubs",
  description:
    "All 20 clubs of the Student Activity Centre, MNNIT Allahabad — technical, sports, cultural and student initiatives.",
};

export default function ClubsPage() {
  return (
    <>
      <PageHeader
        images={[
          "/images/clubs/cricket.webp",
          "/images/clubs/basketball.webp",
          "/images/gallery/hack36/hack-36-06.webp",
        ]}
        eyebrow="Directory"
        title="Clubs"
        description="Twenty clubs across four activity areas. Filter by area or search by name."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Clubs" }]}
      />

      <div className="container-page py-12 sm:py-16">
        <Suspense
          fallback={
            <div className="h-24 animate-pulse rounded-3xl border-2 border-line-strong bg-surface-2" />
          }
        >
          <ClubsExplorer clubs={clubs} categories={CATEGORIES} />
        </Suspense>
      </div>
    </>
  );
}
