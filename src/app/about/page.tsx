import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PresidentMessage } from "@/components/home/PresidentMessage";
import { Stats } from "@/components/home/Stats";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight, Icon } from "@/components/ui/Icons";
import { PageHeader } from "@/components/ui/PageHeader";
import { Pending } from "@/components/ui/Pending";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ACTIVITY_GROUPS, activities, gallery, site } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description:
    "What the Student Activity Centre of MNNIT Allahabad is, its vision and objectives, how it is administered, and how students take part.",
};

/* §3 — the brief's section list, in its order. Each is rendered below; the
   ones the brief names without supplying text carry a Pending note. */
const SECTIONS = [
  { id: "introduction", label: "Introduction" },
  { id: "vision", label: "Vision" },
  { id: "mission", label: "Mission" },
  { id: "objectives", label: "Objectives" },
  { id: "role", label: "Role of SAC" },
  { id: "structure", label: "Administrative structure" },
  { id: "participation", label: "Student participation model" },
  { id: "history", label: "History and evolution" },
  { id: "development", label: "Holistic development" },
  { id: "website", label: "This website" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        images={[
          "/images/campus/mnnit.webp",
          "/images/campus/academic-building.webp",
          "/images/gallery/culrav/culrav-01.webp",
        ]}
        eyebrow="About"
        title="About the Centre"
        description={site.tagline}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About" }]}
      >
        <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-2">
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="rounded-full border-2 border-line-strong bg-surface px-3.5 py-1.5 text-xs font-bold shadow-[3px_3px_0_0_var(--sticker)] transition-transform hover:-translate-y-1"
            >
              {section.label}
            </a>
          ))}
        </nav>
      </PageHeader>

      <Stats stats={site.stats} />

      {/* ---------------- §3 Introduction ---------------- */}
      <Section id="introduction">
        <div className="container-page">
          <SectionHeading align="left" eyebrow="01" title="Introduction" />
          <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-12">
            {site.about.map((block, i) => (
              <Reveal key={block.title} delay={i * 100}>
                <article className="h-full rounded-3xl border-2 border-line-strong bg-surface p-7 sm:p-9">
                  <span className="font-display text-5xl leading-none text-line-strong">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 text-2xl leading-snug">{block.title}</h3>
                  <p className="mt-4 leading-relaxed text-ink-muted">{block.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ---------------- §3 Vision (the Centre's own) ---------------- */}
      <Section id="vision" tint className="border-y-2 border-line-strong">
        <div className="container-page">
          <SectionHeading align="left" eyebrow="02" title="Vision" />
          <div className="mt-8 max-w-3xl">
            {site.vision.statement ? (
              <blockquote className="rounded-3xl border-2 border-line-strong bg-surface p-7 shadow-[7px_7px_0_0_var(--brand)] sm:p-9">
                <p className="font-display text-xl leading-snug sm:text-2xl">
                  {site.vision.statement}
                </p>
                {site.vision.body.length > 0 ? (
                  <div className="mt-6 space-y-4 border-t-2 border-line-strong pt-5">
                    {site.vision.body.map((paragraph, i) => (
                      <p key={i} className="leading-relaxed text-ink-muted">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ) : null}
              </blockquote>
            ) : (
              <Pending
                what="The Centre's vision statement"
                who="SAC office, approved by the President, SAC"
              >
                <p>
                  The vision for <em>this website</em> is a separate thing, and is set out under{" "}
                  <a href="#website" className="font-bold text-ink underline-offset-4 hover:underline">
                    This website
                  </a>{" "}
                  below.
                </p>
              </Pending>
            )}
          </div>
        </div>
      </Section>

      {/* ---------------- §3 Mission ---------------- */}
      <Section id="mission">
        <div className="container-page">
          <SectionHeading align="left" eyebrow="03" title="Mission" />
          <div className="mt-8 max-w-3xl">
            <Pending
              what="The Centre's mission statement"
              who="SAC office, approved by the President, SAC"
            />
          </div>
        </div>
      </Section>

      {/* ---------------- §3 Core objectives ---------------- */}
      <Section id="objectives" tint className="border-y-2 border-line-strong">
        <div className="container-page">
          <SectionHeading
            align="left"
            eyebrow="04"
            title="Core objectives"
            description={site.objectivesIntro}
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {site.objectives.map((objective, i) => (
              <Reveal key={objective} delay={Math.min(i, 8) * 45} variant="pop">
                <div
                  className="flex h-full items-center gap-4 rounded-2xl border-2 border-line-strong bg-surface p-5"
                  style={{ borderLeftWidth: 6, borderLeftColor: `var(--pop-${(i % 6) + 1})` }}
                >
                  <span
                    className="font-display text-2xl font-bold tabular-nums"
                    style={{ color: `var(--pop-${(i % 6) + 1})` }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-semibold leading-snug">{objective}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ---------------- §3 Role of SAC ---------------- */}
      <Section id="role">
        <div className="container-page">
          <SectionHeading
            align="left"
            eyebrow="05"
            title="Role of the SAC"
            description={`The Centre currently runs ${activities.length} recognised activities across ${ACTIVITY_GROUPS.length} areas.`}
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ACTIVITY_GROUPS.map((group, i) => {
              const count = activities.filter((a) => a.category === group.key).length;
              return (
                <Reveal key={group.key} delay={i * 50} variant="pop">
                  <Link
                    href={`/activities?group=${group.key}`}
                    className="sticker sticker-hover flex h-full flex-col rounded-3xl bg-surface p-5"
                  >
                    <span
                      className="grid size-10 place-items-center rounded-2xl border-2 border-line-strong"
                      style={{
                        color: group.colorVar,
                        backgroundColor: `color-mix(in oklab, ${group.colorVar} 14%, var(--surface))`,
                      }}
                    >
                      <Icon name={group.icon} className="size-5" />
                    </span>
                    <h3 className="mt-4 text-base leading-snug">{group.label}</h3>
                    <p className="mt-1.5 flex-1 text-xs leading-relaxed text-ink-muted">
                      {group.blurb}
                    </p>
                    <p className="mt-3 font-display text-2xl font-bold" style={{ color: group.colorVar }}>
                      {count}
                    </p>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-8 max-w-3xl">
            <Pending
              what="A written statement of the Centre's role"
              who="SAC office"
            />
          </div>
        </div>
      </Section>

      {/* ---------------- §4 Administrative structure ---------------- */}
      <Section id="structure" tint className="border-y-2 border-line-strong">
        <div className="container-page">
          <SectionHeading
            align="left"
            eyebrow="06"
            title="Administrative structure"
            description="Four tiers, from the President of the Centre down to the students who run each club and team."
          />

          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {site.structure.map((tier, i) => (
              <Reveal key={tier.title} delay={i * 70} variant="pop">
                <li
                  className="flex h-full flex-col rounded-3xl border-2 border-line-strong bg-surface p-6"
                  style={{ borderTopWidth: 6, borderTopColor: `var(--pop-${(i % 6) + 1})` }}
                >
                  <span
                    className="font-display text-4xl font-bold leading-none"
                    style={{ color: `var(--pop-${(i % 6) + 1})` }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-lg leading-snug">{tier.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{tier.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>

          <ButtonLink href="/people" className="mt-10" size="sm">
            Who holds each role
            <ArrowRight className="size-3.5" />
          </ButtonLink>
        </div>
      </Section>

      {/* ---------------- §13 Student participation model ---------------- */}
      <Section id="participation">
        <div className="container-page">
          <SectionHeading
            align="left"
            eyebrow="07"
            title="Student participation model"
            description="Every club and activity answers the same seven questions, so a student can compare them directly and know exactly how to take part."
          />

          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {site.participationModel.map((question, i) => (
              <Reveal key={question} delay={i * 50} variant="pop">
                <li className="flex h-full items-start gap-3 rounded-2xl border-2 border-line-strong bg-surface p-5">
                  <span className="grid size-7 shrink-0 place-items-center rounded-lg border-2 border-line-strong bg-surface-2 text-xs font-bold tabular-nums">
                    {i + 1}
                  </span>
                  <span className="font-semibold leading-snug">{question}</span>
                </li>
              </Reveal>
            ))}
          </ol>

          <ButtonLink href="/join" className="mt-10" size="sm">
            How can I participate?
            <ArrowRight className="size-3.5" />
          </ButtonLink>
        </div>
      </Section>

      {/* ---------------- §3 History & holistic development ---------------- */}
      <Section id="history" tint className="border-y-2 border-line-strong">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <SectionHeading align="left" eyebrow="08" title="History and evolution" />
              <div className="mt-8">
                <Pending
                  what="The history and evolution of the Centre"
                  who="SAC office"
                />
              </div>
            </div>

            <div id="development" className="scroll-mt-28">
              <SectionHeading
                align="left"
                eyebrow="09"
                title="Contribution towards holistic student development"
              />
              <div className="mt-8">
                <Pending
                  what="A written account of the Centre's contribution to holistic student development"
                  who="SAC office"
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      <PresidentMessage />

      {/* ---------------- §1 What this website is for ---------------- */}
      <Section id="website" tint className="border-y-2 border-line-strong">
        <div className="container-page">
          <SectionHeading
            align="left"
            eyebrow="This website"
            title="What this site is for"
            description="Distinct from the Centre's own vision above: this is what the website itself is meant to do."
          />

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
            <Reveal>
              <blockquote className="rounded-3xl border-2 border-line-strong bg-surface p-7 shadow-[7px_7px_0_0_var(--brand)] sm:p-9">
                <p className="font-display text-xl leading-snug sm:text-2xl">
                  {site.website.statement}
                </p>
                <footer className="mt-6 border-t-2 border-line-strong pt-5 text-sm font-bold text-brand">
                  {site.website.principle}
                </footer>
              </blockquote>
            </Reveal>

            <Reveal delay={120}>
              <div>
                <p className="label-caps text-ink-subtle">What this site documents</p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {site.website.documents.map((item, i) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 rounded-xl border-2 border-line-strong bg-surface px-3.5 py-2.5 text-sm"
                    >
                      <span
                        className="mt-1.5 size-2 shrink-0 rounded-full"
                        style={{ backgroundColor: `var(--pop-${(i % 6) + 1})` }}
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ---------------- Campus ---------------- */}
      <Section>
        <div className="container-page">
          <SectionHeading
            eyebrow="On campus"
            title="On campus"
            description="The prime locations of the Centre are the Students' Clubs, Boys' and Girls' SAC, the Multipurpose Hall, the Athletics Ground and the Gymkhana."
          />

          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {gallery.campus.map((src, i) => (
              <Reveal key={src} delay={i * 60} variant="scale">
                <div
                  className={
                    i % 5 === 0
                      ? "relative aspect-[4/5] overflow-hidden rounded-2xl border-2 border-line-strong"
                      : "relative aspect-[4/3] overflow-hidden rounded-2xl border-2 border-line-strong"
                  }
                >
                  <Image
                    src={src}
                    alt="MNNIT Allahabad campus life"
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover transition-transform duration-[900ms] hover:scale-105"
                  />
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <ButtonLink href="/facilities" size="sm">
              SAC facilities
              <ArrowRight className="size-3.5" />
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline" size="sm">
              Contact the Centre
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
