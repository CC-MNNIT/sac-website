import type { Metadata } from "next";
import Link from "next/link";
import { CalendarView } from "@/components/calendar/CalendarView";
import { PageHeader } from "@/components/ui/PageHeader";
import { calendar } from "@/lib/data";

export const metadata: Metadata = {
  title: "Events Calendar",
  description:
    "What is happening at the Student Activity Centre, MNNIT Allahabad today, this week and this month — competitions, workshops and practice sessions.",
};

export default function CalendarPage() {
  return (
    <>
      <PageHeader
        images={[]}
        eyebrow="When"
        title="Events calendar"
        description="Competitions, workshops and practice sessions scheduled by the Centre and its clubs. Select an entry to see its date, time, venue, organiser, eligibility, registration and contact."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Calendar" }]}
      />

      <div className="container-page py-14 sm:py-18">
        <CalendarView entries={calendar} />

        <p className="mt-12 text-sm leading-relaxed text-ink-muted">
          Past programmes move to the{" "}
          <Link href="/archive" className="font-bold text-ink underline-offset-4 hover:underline">
            completed activities archive
          </Link>
          . Official notices are published under{" "}
          <Link href="/news" className="font-bold text-ink underline-offset-4 hover:underline">
            news &amp; announcements
          </Link>
          .
        </p>
      </div>
    </>
  );
}
