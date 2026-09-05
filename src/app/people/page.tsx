import type { Metadata } from "next";
import Link from "next/link";
import { FacultyTable } from "@/components/people/FacultyTable";
import { PersonCard } from "@/components/people/PersonCard";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight, Mail } from "@/components/ui/Icons";
import { PageHeader } from "@/components/ui/PageHeader";
import { Pending } from "@/components/ui/Pending";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { activities, committee, countFaculty, people, site } from "@/lib/data";

export const metadata: Metadata = {
  title: "People & Governance",
  description:
    "Who runs the Student Activity Centre of MNNIT Allahabad — the President, the Faculty In-Charge and Coordinator for every activity, the coaches and trainers, and the student leadership.",
};

export default function PeoplePage() {
  const total = countFaculty();

  return (
    <>
      <PageHeader
        images={[]}
        eyebrow="Who is responsible"
        title="People & Governance"
        description={`The President of the Centre, ${total} faculty members across ${committee.length} activity domains, the coaches and trainers, and the student leadership that runs each club and team.`}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "People" }]}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="#faculty-team" size="sm">
            Faculty team
          </ButtonLink>
          <ButtonLink href="#coaches" variant="outline" size="sm">
            Coaches &amp; trainers
          </ButtonLink>
          <ButtonLink href="#student-leadership" variant="outline" size="sm">
            Student leadership
          </ButtonLink>
          <ButtonLink href="#previous-teams" variant="outline" size="sm">
            Previous teams
          </ButtonLink>
        </div>
      </PageHeader>

      {/* ---------------- §4 President, SAC ---------------- */}
      <div className="container-page py-14 sm:py-18">
        <Reveal variant="pop">
          <section id="president" className="scroll-mt-28 overflow-hidden rounded-4xl border-2 border-line-strong bg-surface shadow-[7px_7px_0_0_var(--brand)]">
            <div className="grid sm:grid-cols-[15rem_1fr] lg:grid-cols-[18rem_1fr]">
              <PhotoFrame
                src={site.president.photo}
                alt={site.president.name}
                sizes="(max-width: 640px) 100vw, 18rem"
                priority
                className="aspect-[4/5] border-line-strong sm:aspect-auto sm:border-r-2"
              />

              <div className="flex flex-col justify-center p-7 sm:p-9">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border-2 border-line-strong bg-surface px-3.5 py-1.5 label-caps text-brand shadow-[3px_3px_0_0_var(--sticker)]">
                  <span className="size-2 rounded-full bg-accent" aria-hidden />
                  Heading the Centre
                </span>

                <h2 className="mt-5 text-[1.8rem] leading-tight sm:text-[2.2rem]">
                  {site.president.name}
                </h2>
                <p className="mt-2 font-semibold text-brand">{site.president.role}</p>
                <p className="mt-1 text-sm text-ink-muted">{site.president.dept}</p>

                <p className="mt-5 line-clamp-4 text-sm leading-relaxed text-ink-muted">
                  {site.president.message[0]}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <ButtonLink href={site.president.profile} external size="sm" variant="outline">
                    Faculty profile
                    <ArrowRight className="size-3.5" />
                  </ButtonLink>
                  <ButtonLink href="/about#presidents-message" size="sm" variant="ghost">
                    Read the full message
                  </ButtonLink>
                </div>

                <p className="mt-5 flex items-center gap-2 text-xs text-ink-subtle">
                  <Mail className="size-3.5" />
                  An official email address for the President, SAC is to be supplied by the SAC office.
                </p>
              </div>
            </div>
          </section>
        </Reveal>
      </div>

      {/* ---------------- §4 Faculty team ---------------- */}
      <Section id="faculty-team" tint className="border-y-2 border-line-strong">
        <div className="container-page">
          <SectionHeading
            align="left"
            eyebrow="Faculty team"
            title="Faculty In-Charge and Coordinator for every activity"
            description={`All ${activities.length} recognised activities, with the faculty responsible for each. Names are taken from the Institute's activity committees.`}
          />
          <div className="mt-10">
            <FacultyTable />
          </div>
          <p className="mt-8 text-sm text-ink-muted">
            The full committee rosters, including every activity-specific faculty member, are on the{" "}
            <Link href="/committee" className="font-bold text-ink underline-offset-4 hover:underline">
              faculty committee page
            </Link>
            .
          </p>
        </div>
      </Section>

      {/* ---------------- §4 Coaches & trainers ---------------- */}
      <Section id="coaches">
        <div className="container-page">
          <SectionHeading
            align="left"
            eyebrow="Coaching"
            title="Coaches & trainers"
            description="The Centre engages part-time coaches and trainers each year to develop student talent. At present about ten coaches are working, each extending their services two hours every day."
          />
          <div className="mt-10">
            {people.coaches.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {people.coaches.map((coach) => (
                  <PersonCard key={coach.name} person={coach} label={coach.activity} color="var(--cat-sports)">
                    <dl className="mt-3 space-y-1 border-t border-line pt-3 text-xs text-ink-muted">
                      {coach.qualification ? (
                        <div><dt className="inline font-semibold text-ink">Qualification: </dt><dd className="inline">{coach.qualification}</dd></div>
                      ) : null}
                      {coach.experience ? (
                        <div><dt className="inline font-semibold text-ink">Experience: </dt><dd className="inline">{coach.experience}</dd></div>
                      ) : null}
                      {coach.schedule ? (
                        <div><dt className="inline font-semibold text-ink">Training: </dt><dd className="inline">{coach.schedule}</dd></div>
                      ) : null}
                    </dl>
                  </PersonCard>
                ))}
              </div>
            ) : (
              <Pending
                what="Coach and trainer profiles — name, activity/sport, qualification, experience and training schedule"
                who="SAC office"
              />
            )}
          </div>
        </div>
      </Section>

      {/* ---------------- §4 Student leadership ---------------- */}
      <Section id="student-leadership" tint className="border-y-2 border-line-strong">
        <div className="container-page">
          <SectionHeading
            align="left"
            eyebrow="Students"
            title="Student leadership"
            description="General Secretaries, club coordinators, captains, vice-captains and the student executive committees who run the Centre's activities day to day."
          />
          <div className="mt-10">
            {people.studentLeadership.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {people.studentLeadership.map((member) => (
                  <PersonCard
                    key={`${member.name}-${member.role}`}
                    person={member}
                    label={member.role ?? "Student coordinator"}
                    color="var(--cat-cultural)"
                  />
                ))}
              </div>
            ) : (
              <Pending
                what="Student leadership — General Secretaries, club coordinators, captains, vice-captains and executive committees"
                who="club and activity coordinators"
              />
            )}
          </div>
        </div>
      </Section>

      {/* ---------------- §4 Previous SAC teams ---------------- */}
      <Section id="previous-teams">
        <div className="container-page">
          <SectionHeading
            align="left"
            eyebrow="Archive"
            title="Previous SAC teams"
            description="Year-wise record of the students who have led the Centre's clubs and teams."
          />
          <div className="mt-10">
            {people.previousTeams.length > 0 ? (
              <div className="space-y-10">
                {people.previousTeams.map((team) => (
                  <section key={team.session}>
                    <h3 className="font-display text-2xl text-brand">{team.session}</h3>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {team.members.map((member) => (
                        <PersonCard
                          key={`${team.session}-${member.name}`}
                          person={member}
                          label={member.role ?? member.activity ?? "Member"}
                        />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <Pending
                what="The year-wise archive of previous SAC teams"
                who="SAC Web Team, at the end of each session"
              />
            )}
          </div>
        </div>
      </Section>

      {/* ---------------- §20 Content responsibility ---------------- */}
      <Section id="content-responsibility" tint className="border-t-2 border-line-strong">
        <div className="container-page">
          <SectionHeading
            align="left"
            eyebrow="Keeping this site current"
            title="Content management responsibility"
            description={site.contentPolicy.intro}
          />

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
            <Reveal>
              <ul className="space-y-3">
                {site.contentPolicy.roles.map((entry, i) => (
                  <li
                    key={entry.role}
                    className="rounded-2xl border-2 border-line-strong bg-surface p-5"
                    style={{ ["--card-accent" as string]: `var(--pop-${(i % 6) + 1})` }}
                  >
                    <p className="font-display text-lg" style={{ color: `var(--pop-${(i % 6) + 1})` }}>
                      {entry.role}
                    </p>
                    <p className="mt-1 text-sm text-ink-muted">{entry.duty}</p>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={120}>
              <div className="rounded-3xl border-2 border-line-strong bg-surface p-6 sm:p-7">
                <h3 className="text-lg">Standard event submission format</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {site.contentPolicy.submissionIntro}
                </p>
                <ol className="mt-5 grid gap-2 sm:grid-cols-2">
                  {site.contentPolicy.submission.map((field, i) => (
                    <li key={field} className="flex items-center gap-2.5 text-sm">
                      <span className="grid size-6 shrink-0 place-items-center rounded-lg border-2 border-line-strong bg-surface-2 text-[0.65rem] font-bold tabular-nums">
                        {i + 1}
                      </span>
                      {field}
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
