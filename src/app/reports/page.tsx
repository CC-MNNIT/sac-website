import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/Icons";
import { PageHeader } from "@/components/ui/PageHeader";
import { Pending } from "@/components/ui/Pending";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { reports } from "@/lib/data";

export const metadata: Metadata = {
  title: "Annual SAC Report",
  description:
    "The annual report of the Student Activity Centre, MNNIT Allahabad — activities organised, student participation, major events, performance, facilities, awards and photographs.",
};

export default function ReportsPage() {
  return (
    <>
      <PageHeader
        images={[]}
        eyebrow="Annual performance"
        title="Annual SAC Report"
        description="A yearly account of everything the Centre organised, who took part and what was achieved. Previous annual reports remain downloadable."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Annual report" }]}
      />

      <div className="container-page py-14 sm:py-18">
        <div className="grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
          {/* Editions */}
          <div className="min-w-0">
            <h2 className="text-2xl">Published reports</h2>

            <div className="mt-6">
              {reports.editions.length > 0 ? (
                <ul className="space-y-4">
                  {reports.editions.map((edition) => (
                    <li key={edition.session}>
                      <article className="sticker rounded-3xl bg-surface p-6">
                        <div className="flex flex-wrap items-baseline justify-between gap-3">
                          <h3 className="text-xl">{edition.title || `SAC Annual Report ${edition.session}`}</h3>
                          <span className="text-sm tabular-nums text-ink-subtle">{edition.published}</span>
                        </div>
                        {edition.summary ? (
                          <p className="mt-3 text-sm leading-relaxed text-ink-muted">{edition.summary}</p>
                        ) : null}
                        {edition.file ? (
                          <a
                            href={edition.file}
                            className="mt-5 inline-flex items-center gap-2 rounded-full border-2 border-line-strong bg-brand px-5 py-2.5 text-sm font-bold text-brand-ink shadow-[4px_4px_0_0_var(--sticker)] transition-transform hover:-translate-y-1"
                          >
                            Download
                            <ArrowRight className="size-3.5" />
                          </a>
                        ) : null}
                      </article>
                    </li>
                  ))}
                </ul>
              ) : (
                <Pending
                  what="Annual reports"
                  who="SAC office, published annually by the SAC Web Team"
                >
                  <p>
                    Each edition is compiled from the{" "}
                    <Link href="/archive" className="font-bold text-ink underline-offset-4 hover:underline">
                      completed activities archive
                    </Link>{" "}
                    and the{" "}
                    <Link href="/achievements" className="font-bold text-ink underline-offset-4 hover:underline">
                      Hall of Fame
                    </Link>{" "}
                    for that session.
                  </p>
                </Pending>
              )}
            </div>
          </div>

          {/* Contents */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border-2 border-line-strong bg-surface-2 p-6">
              <p className="label-caps text-ink-subtle">What each report contains</p>
              <ol className="mt-4 space-y-2 text-sm">
                {reports.contents.map((item, i) => (
                  <li key={item} className="flex gap-3">
                    <span className="w-5 shrink-0 text-right font-bold tabular-nums text-ink-subtle">
                      {i + 1}
                    </span>
                    <span className="text-ink-muted">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </div>

      <Section tint className="border-t-2 border-line-strong">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Also available"
              title="Other documents"
              description="Office orders, club recognition and event guidelines, sports rules and the Centre's forms."
            />
            <Link
              href="/documents"
              className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-line-strong bg-surface px-5 py-2.5 text-sm font-bold shadow-[4px_4px_0_0_var(--sticker)] transition-transform hover:-translate-y-1"
            >
              Documents &amp; downloads
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
