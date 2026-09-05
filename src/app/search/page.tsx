import type { Metadata } from "next";
import { SiteSearch } from "@/components/search/SiteSearch";
import { PageHeader } from "@/components/ui/PageHeader";
import { searchIndex } from "@/lib/data";

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search every activity, club, event, result, facility and document of the Student Activity Centre, MNNIT Allahabad.",
};

export default function SearchPage() {
  return (
    <>
      <PageHeader
        images={[]}
        eyebrow="Find it"
        title="Search"
        description="One box across every activity, club, major event, recorded result, facility, committee and document on this site."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Search" }]}
      />

      <div className="container-page py-14 sm:py-18">
        <SiteSearch index={searchIndex} />
      </div>
    </>
  );
}
