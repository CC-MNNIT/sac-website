import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Icon } from "@/components/ui/Icons";
import { PageHeader } from "@/components/ui/PageHeader";
import { Pending } from "@/components/ui/Pending";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { countDocuments, documents } from "@/lib/data";
import type { DocumentCategory } from "@/lib/types";

export const metadata: Metadata = {
  title: "Documents & Downloads",
  description:
    "The document repository of the Student Activity Centre, MNNIT Allahabad — constitution and guidelines, office orders, forms, and annual, event and achievement reports.",
};

const GROUPS: { key: DocumentCategory["group"]; title: string; blurb: string; icon: string; color: string }[] = [
  {
    key: "policy",
    title: "Policy & guidelines",
    blurb: "The rules the Centre and its clubs operate under.",
    icon: "book",
    color: "var(--pop-1)",
  },
  {
    key: "forms",
    title: "Forms",
    blurb: "Forms students and coordinators submit to the Centre.",
    icon: "pen",
    color: "var(--pop-2)",
  },
  {
    key: "reports",
    title: "Reports",
    blurb: "The published record of what the Centre has done.",
    icon: "trophy",
    color: "var(--pop-4)",
  },
];

export default function DocumentsPage() {
  const total = countDocuments();

  return (
    <>
      <PageHeader
        images={[]}
        eyebrow="Repository"
        title="Documents & downloads"
        description={`A transparent repository of the Centre's guidelines, office orders, forms and reports across ${documents.length} categories.`}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Documents" }]}
      />

      <div className="container-page py-14 sm:py-18">
        {total === 0 ? (
          <Reveal>
            <Pending
              what="All document categories below are set up, but no files have been uploaded yet"
              who="SAC Web Team, on receipt from the SAC office"
              className="mb-12"
            />
          </Reveal>
        ) : null}

        <div className="space-y-14">
          {GROUPS.map((group, groupIndex) => {
            const categories = documents.filter((d) => d.group === group.key);
            if (categories.length === 0) return null;

            return (
              <section key={group.key} id={group.key} className="scroll-mt-28">
                <Reveal>
                  <div className="flex items-center gap-4 border-b-2 border-line-strong pb-5">
                    <span
                      className="grid size-11 shrink-0 place-items-center rounded-2xl border-2 border-line-strong"
                      style={{
                        color: group.color,
                        backgroundColor: `color-mix(in oklab, ${group.color} 13%, var(--surface))`,
                      }}
                    >
                      <Icon name={group.icon} className="size-5" />
                    </span>
                    <div>
                      <h2 className="text-xl sm:text-2xl">{group.title}</h2>
                      <p className="mt-0.5 text-sm text-ink-subtle">{group.blurb}</p>
                    </div>
                    <span
                      className="ml-auto hidden font-display text-4xl font-bold opacity-30 sm:block"
                      style={{ color: group.color }}
                    >
                      {String(groupIndex + 1).padStart(2, "0")}
                    </span>
                  </div>
                </Reveal>

                <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {categories.map((category, i) => (
                    <Reveal key={category.id} delay={Math.min(i, 6) * 55} variant="pop" className="h-full">
                      <article
                        id={category.id}
                        className="sticker flex h-full scroll-mt-28 flex-col rounded-3xl bg-surface p-5"
                        style={{ ["--card-accent" as string]: group.color }}
                      >
                        <h3 className="text-base leading-snug">{category.title}</h3>

                        {category.files.length > 0 ? (
                          <ul className="mt-4 flex-1 space-y-2">
                            {category.files.map((file) => (
                              <li key={file.href}>
                                <a
                                  href={file.href}
                                  className="flex items-center justify-between gap-3 rounded-xl border-2 border-line-strong bg-surface-2 px-3.5 py-2.5 text-sm font-semibold transition-transform hover:-translate-y-0.5"
                                >
                                  <span className="min-w-0 truncate">{file.label}</span>
                                  <ArrowRight className="size-3.5 shrink-0" style={{ color: group.color }} />
                                </a>
                                {file.updated ? (
                                  <span className="mt-1 block text-xs text-ink-subtle">
                                    Updated {file.updated}
                                    {file.size ? ` · ${file.size}` : ""}
                                  </span>
                                ) : null}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="mt-4 flex-1 text-sm text-ink-subtle">
                            No files published in this category yet.
                          </p>
                        )}
                      </article>
                    </Reveal>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      <Section tint className="border-t-2 border-line-strong">
        <div className="container-page">
          <SectionHeading
            align="left"
            eyebrow="Annual report"
            title="SAC Annual Report"
            description="The Centre's yearly account of activities organised, participation, performance, facilities, awards and photographs."
          />
          <Link
            href="/reports"
            className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-line-strong bg-surface px-5 py-2.5 text-sm font-bold shadow-[4px_4px_0_0_var(--sticker)] transition-transform hover:-translate-y-1"
          >
            Annual reports
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </Section>
    </>
  );
}
