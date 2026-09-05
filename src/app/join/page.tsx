import type { Metadata } from "next";
import Link from "next/link";
import { PersonCard } from "@/components/people/PersonCard";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight, Icon } from "@/components/ui/Icons";
import { PageHeader } from "@/components/ui/PageHeader";
import { Blank, Pending } from "@/components/ui/Pending";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { activities, clubs, getActivitiesForClub, site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Join a Club",
  description:
    "How to take part in the Student Activity Centre at MNNIT Allahabad — what each club does, who can join, how selection works and when recruitment takes place.",
};

/** §13 — Sports | Technology | Culture | Literature | Innovation | Fitness | Leadership */
const INTERESTS = [
  { label: "Sports", group: "sports", icon: "trophy", color: "var(--cat-sports)" },
  { label: "Technology", group: "technical", icon: "chip", color: "var(--cat-technical)" },
  { label: "Culture", group: "cultural", icon: "mask", color: "var(--cat-cultural)" },
  { label: "Literature", group: "literary", icon: "book", color: "var(--pop-5)" },
  { label: "Innovation", group: "innovation", icon: "rocket", color: "var(--cat-initiatives)" },
  { label: "Fitness", group: "fitness", icon: "yoga", color: "var(--pop-6)" },
  { label: "Leadership", group: "social", icon: "network", color: "var(--pop-2)" },
];

export default function JoinPage() {
  return (
    <>
      <PageHeader
        images={[
          "/images/gallery/hack36/hack-36-02.webp",
          "/images/gallery/culrav/culrav-05.webp",
          "/images/clubs/cricket.webp",
        ]}
        eyebrow="How can I participate?"
        title="Explore your interest"
        description="Pick an area, find the club or team that runs it, and see exactly how to take part."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Join a club" }]}
      />

      {/* ---------------- Interest tiles ---------------- */}
      <div className="border-b-2 border-line-strong bg-bg-tint bg-dot-grid">
        <div className="container-page py-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
            {INTERESTS.map((interest, i) => {
              const count = activities.filter((a) => a.category === interest.group).length;
              return (
                <Reveal key={interest.label} delay={i * 45} variant="pop">
                  <Link
                    href={`/activities?group=${interest.group}`}
                    className="sticker sticker-hover flex h-full flex-col items-center gap-2 rounded-3xl bg-surface p-5 text-center"
                  >
                    <span
                      className="grid size-11 place-items-center rounded-2xl border-2 border-line-strong"
                      style={{
                        color: interest.color,
                        backgroundColor: `color-mix(in oklab, ${interest.color} 14%, var(--surface))`,
                      }}
                    >
                      <Icon name={interest.icon} className="size-5" />
                    </span>
                    <span className="mt-1 font-display text-base font-bold">{interest.label}</span>
                    <span className="text-xs text-ink-subtle">{count} activities</span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>

      {/* ---------------- Per-club participation record ---------------- */}
      <Section>
        <div className="container-page">
          <SectionHeading
            align="left"
            eyebrow="Club by club"
            title="What every club answers"
            description="Each entry answers the same seven questions, so a new student can compare clubs directly."
          />

          <Reveal delay={80}>
            <ol className="mt-8 flex flex-wrap gap-2">
              {site.participationModel.map((question, i) => (
                <li
                  key={question}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-line-strong bg-surface px-3.5 py-1.5 text-xs font-bold"
                >
                  <span className="text-ink-subtle tabular-nums">{i + 1}</span>
                  {question}
                </li>
              ))}
            </ol>
          </Reveal>

          <div className="mt-12 space-y-5">
            {clubs.map((club, i) => {
              const linked = getActivitiesForClub(club.slug);
              const join = linked[0]?.join;
              const hasJoinInfo = Boolean(
                join && (join.whatWeDo || join.whoCanJoin || join.process || join.recruitment),
              );

              return (
                <Reveal key={club.slug} delay={Math.min(i, 6) * 40}>
                  <article
                    className="rounded-3xl border-2 border-line-strong bg-surface p-6 sm:p-7"
                    style={{ ["--card-accent" as string]: `var(--cat-${club.category})` }}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="min-w-0">
                        <span
                          className="label-caps text-[0.6rem]"
                          style={{ color: `var(--cat-${club.category})` }}
                        >
                          {club.categoryLabel}
                        </span>
                        <h3 className="mt-1 text-xl">{club.name}</h3>
                      </div>
                      <ButtonLink href={`/clubs/${club.slug}`} variant="outline" size="sm">
                        Club page
                        <ArrowRight className="size-3.5" />
                      </ButtonLink>
                    </div>

                    <dl className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                      <Field label="What we do">{club.description}</Field>
                      <Field label="Who can join">
                        {join?.whoCanJoin || <Blank label="Who can join" />}
                      </Field>
                      <Field label="Selection / registration process">
                        {join?.process || <Blank label="Selection process" />}
                      </Field>
                      <Field label="When recruitment takes place">
                        {join?.recruitment || <Blank label="Recruitment window" />}
                      </Field>
                    </dl>

                    <div className="mt-6 grid gap-4 border-t border-line pt-6 sm:grid-cols-2">
                      {linked[0]?.facultyCoordinator ? (
                        <PersonCard
                          person={linked[0].facultyCoordinator}
                          label="Faculty Coordinator"
                          color={`var(--cat-${club.category})`}
                        />
                      ) : (
                        <Pending what="Faculty Coordinator" who="SAC office" />
                      )}

                      {join?.studentCoordinator ? (
                        <PersonCard
                          person={join.studentCoordinator}
                          label="Student Coordinator"
                          color={`var(--cat-${club.category})`}
                        />
                      ) : (
                        <Pending what="Student Coordinator" who="the club" />
                      )}
                    </div>

                    {join?.link ? (
                      <ButtonLink href={join.link} external size="sm" className="mt-6">
                        Join / Register
                        <ArrowRight className="size-3.5" />
                      </ButtonLink>
                    ) : (
                      <p className="mt-6 text-sm text-ink-subtle">
                        {hasJoinInfo
                          ? "A registration link is to be supplied by the club."
                          : "Recruitment details and a registration link are to be supplied by the club coordinator. Watch "}
                        {!hasJoinInfo ? (
                          <Link href="/news" className="font-bold text-ink underline-offset-4 hover:underline">
                            announcements
                          </Link>
                        ) : null}
                        {!hasJoinInfo ? " for the next recruitment notice." : null}
                      </p>
                    )}
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Section>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="label-caps text-[0.6rem] text-ink-subtle">{label}</dt>
      <dd className="mt-1.5 text-sm leading-relaxed text-ink-muted">{children}</dd>
    </div>
  );
}
