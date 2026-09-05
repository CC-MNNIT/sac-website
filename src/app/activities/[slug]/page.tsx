import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ActivitySection } from "@/components/activities/ActivitySection";
import { PersonCard } from "@/components/people/PersonCard";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight, Icon, LinkedIn, Trophy } from "@/components/ui/Icons";
import { PageHeader } from "@/components/ui/PageHeader";
import { Pending } from "@/components/ui/Pending";
import { activities, activityGroup, getActivity, getClub, site } from "@/lib/data";

export function generateStaticParams() {
  return activities.map((activity) => ({ slug: activity.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const activity = getActivity(slug);
  if (!activity) return { title: "Activity not found" };
  return {
    title: activity.name,
    description:
      activity.about[0] ??
      `${activity.name} at the Student Activity Centre, MNNIT Allahabad — run under ${activity.committeeName}.`,
  };
}

/** §7 — technical and innovation activities carry the extra club sections. */
const TECHNICAL = new Set(["technical", "innovation"]);

export default async function ActivityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const activity = getActivity(slug);
  if (!activity) notFound();

  const group = activityGroup(activity.category);
  const color = group?.colorVar ?? "var(--brand)";
  const club = activity.clubSlug ? getClub(activity.clubSlug) : undefined;
  const isTechnical = TECHNICAL.has(activity.category);
  const coordinators = "Club/Activity Coordinator";

  return (
    <>
      <PageHeader
        images={[]}
        eyebrow={group?.label ?? "Activity"}
        title={activity.name}
        description={
          activity.venue
            ? `${activity.venue === "outdoor" ? "Outdoor" : "Indoor"} — ${activity.committeeName}`
            : activity.committeeName
        }
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Activities", href: "/activities" },
          { label: activity.name },
        ]}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          {club ? (
            <ButtonLink href={`/clubs/${club.slug}`} size="sm">
              {club.name}
              <ArrowRight className="size-3.5" />
            </ButtonLink>
          ) : null}
          <ButtonLink href="/join" variant="outline" size="sm">
            How to join
          </ButtonLink>
          <ButtonLink href={`/committee#${activity.committeeId}`} variant="outline" size="sm">
            Faculty committee
          </ButtonLink>
        </div>
      </PageHeader>

      <div className="container-page py-14 sm:py-18">
        <div className="grid gap-12 lg:grid-cols-[1fr_18rem] lg:gap-14">
          <div className="min-w-0 space-y-12">
            {/* ---------------- About ---------------- */}
            <ActivitySection id="about" title="About" color={color}>
              {activity.about.length > 0 ? (
                <div className="space-y-4">
                  {activity.about.map((paragraph, i) => (
                    <p key={i} className="leading-relaxed text-ink-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : (
                <Pending
                  what={`A description of ${activity.name}`}
                  who={coordinators}
                >
                  <p>
                    Recognised under <strong className="text-ink">{activity.committeeName}</strong>{" "}
                    of the Student Activity Centre.
                  </p>
                </Pending>
              )}
            </ActivitySection>

            {/* ---------------- §7 Domains ---------------- */}
            {isTechnical ? (
              <ActivitySection id="domains" title="Domains" count={activity.domains.length} color={color}>
                {activity.domains.length > 0 ? (
                  <ul className="flex flex-wrap gap-2">
                    {activity.domains.map((domain) => (
                      <li
                        key={domain}
                        className="rounded-full border-2 border-line-strong bg-surface px-3.5 py-1.5 text-sm font-semibold"
                      >
                        {domain}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Pending what="Domains worked in" who={coordinators} />
                )}
              </ActivitySection>
            ) : null}

            {/* ---------------- Team ---------------- */}
            <ActivitySection
              id="team"
              title={isTechnical ? "Current team" : "Team"}
              count={activity.team.length}
              color={color}
            >
              {activity.captain || activity.viceCaptain || activity.team.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {activity.captain ? (
                    <PersonCard person={activity.captain} label="Captain" color={color} />
                  ) : null}
                  {activity.viceCaptain ? (
                    <PersonCard person={activity.viceCaptain} label="Vice-Captain" color={color} />
                  ) : null}
                  {activity.team.map((member) => (
                    <PersonCard key={member.name} person={member} label={member.role} color={color} />
                  ))}
                </div>
              ) : (
                <Pending
                  what={activity.venue ? "Captain, vice-captain and squad" : "Student team"}
                  who={coordinators}
                />
              )}
            </ActivitySection>

            {/* ---------------- Practice schedule ---------------- */}
            <ActivitySection
              id="schedule"
              title={isTechnical ? "Meeting schedule" : "Practice schedule"}
              count={activity.schedule.length}
              color={color}
            >
              {activity.schedule.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[34rem] border-collapse text-sm">
                    <thead>
                      <tr className="border-b-2 border-line-strong text-left">
                        <th className="pb-3 label-caps text-ink-subtle">Days</th>
                        <th className="pb-3 label-caps text-ink-subtle">Time</th>
                        <th className="pb-3 label-caps text-ink-subtle">Venue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activity.schedule.map((slot, i) => (
                        <tr key={i} className="border-b border-line">
                          <td className="py-3 font-semibold">{slot.days}</td>
                          <td className="py-3 text-ink-muted">{slot.time}</td>
                          <td className="py-3 text-ink-muted">{slot.venue}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <Pending what="Practice schedule" who={`coach or ${coordinators}`} />
              )}
            </ActivitySection>

            {/* ---------------- Facilities ---------------- */}
            <ActivitySection id="facilities" title="Facilities" count={activity.facilities.length} color={color}>
              {activity.facilities.length > 0 ? (
                <ul className="grid gap-2 sm:grid-cols-2">
                  {activity.facilities.map((item) => (
                    <li key={item} className="rounded-xl border-2 border-line-strong bg-surface px-4 py-3 text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <Pending what="Facilities used by this activity" who="SAC office">
                  <Link href="/facilities" className="font-bold text-ink underline-offset-4 hover:underline">
                    See all SAC facilities →
                  </Link>
                </Pending>
              )}
            </ActivitySection>

            {/* ---------------- §7 Projects / Workshops ---------------- */}
            {isTechnical ? (
              <>
                <ActivitySection id="projects" title="Projects" count={activity.projects.length} color={color}>
                  {activity.projects.length > 0 ? (
                    <ul className="space-y-3">
                      {activity.projects.map((project) => (
                        <li key={project.title} className="rounded-2xl border-2 border-line-strong bg-surface p-4">
                          <p className="font-bold">{project.title}</p>
                          {project.description ? (
                            <p className="mt-1 text-sm leading-relaxed text-ink-muted">{project.description}</p>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <Pending what="Projects" who={coordinators} />
                  )}
                </ActivitySection>

                <ActivitySection id="workshops" title="Workshops" count={activity.workshops.length} color={color}>
                  {activity.workshops.length > 0 ? (
                    <ul className="space-y-3">
                      {activity.workshops.map((workshop) => (
                        <li key={workshop.title} className="rounded-2xl border-2 border-line-strong bg-surface p-4">
                          <p className="font-bold">{workshop.title}</p>
                          {workshop.date ? (
                            <p className="mt-1 text-xs text-ink-subtle">{workshop.date}</p>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <Pending what="Workshops conducted" who={coordinators} />
                  )}
                </ActivitySection>
              </>
            ) : null}

            {/* ---------------- Events / Competitions ---------------- */}
            <ActivitySection
              id="events"
              title={isTechnical ? "Competitions" : "Events"}
              count={isTechnical ? activity.competitions.length : activity.events.length}
              color={color}
            >
              {isTechnical && activity.competitions.length > 0 ? (
                <ul className="space-y-3">
                  {activity.competitions.map((c) => (
                    <li key={c.title} className="rounded-2xl border-2 border-line-strong bg-surface p-4">
                      <p className="font-bold">{c.title}</p>
                      {c.result ? <p className="mt-1 text-sm text-ink-muted">{c.result}</p> : null}
                    </li>
                  ))}
                </ul>
              ) : activity.events.length > 0 ? (
                <ul className="space-y-3">
                  {activity.events.map((event) => (
                    <li key={event} className="rounded-2xl border-2 border-line-strong bg-surface p-4 text-sm">
                      {event}
                    </li>
                  ))}
                </ul>
              ) : (
                <Pending what="Events and fixtures" who={coordinators}>
                  <Link href="/events" className="font-bold text-ink underline-offset-4 hover:underline">
                    See the SAC major events →
                  </Link>
                </Pending>
              )}
            </ActivitySection>

            {/* ---------------- Results ---------------- */}
            <ActivitySection id="results" title="Results" count={activity.results.length} color={color}>
              {activity.results.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[34rem] border-collapse text-sm">
                    <thead>
                      <tr className="border-b-2 border-line-strong text-left">
                        <th className="pb-3 label-caps text-ink-subtle">Year</th>
                        <th className="pb-3 label-caps text-ink-subtle">Event</th>
                        <th className="pb-3 label-caps text-ink-subtle">Position</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activity.results.map((result, i) => (
                        <tr key={i} className="border-b border-line">
                          <td className="py-3 font-semibold tabular-nums">{result.year}</td>
                          <td className="py-3 text-ink-muted">{result.event}</td>
                          <td className="py-3 font-semibold" style={{ color }}>{result.position}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <Pending what="Match and competition results" who={coordinators} />
              )}
            </ActivitySection>

            {/* ---------------- Achievements ---------------- */}
            <ActivitySection id="achievements" title="Achievements" count={activity.achievements.length} color={color}>
              {activity.achievements.length > 0 ? (
                <ol className="space-y-3">
                  {activity.achievements.map((item, i) => (
                    <li key={`${item.title}-${i}`} className="rounded-2xl border-2 border-line-strong bg-surface p-5">
                      <div className="flex items-start gap-3">
                        <Trophy className="mt-0.5 size-4 shrink-0" style={{ color }} />
                        <div className="min-w-0">
                          <p className="font-bold leading-snug">{item.title}</p>
                          {item.description ? (
                            <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{item.description}</p>
                          ) : null}
                          {item.teams?.length ? (
                            <ul className="mt-3 flex flex-wrap gap-1.5">
                              {item.teams.flatMap((team) => team.members).map((member) => (
                                <li key={member.name}>
                                  {member.linkedin ? (
                                    <a
                                      href={member.linkedin}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1.5 rounded-lg border border-line-strong px-2 py-1 text-xs text-ink-muted transition hover:text-brand"
                                    >
                                      <LinkedIn className="size-3" />
                                      {member.name}
                                    </a>
                                  ) : (
                                    <span className="inline-flex rounded-lg border border-line-strong px-2 py-1 text-xs text-ink-muted">
                                      {member.name}
                                    </span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              ) : (
                <Pending what="Achievements in this activity" who={coordinators}>
                  <Link href="/achievements" className="font-bold text-ink underline-offset-4 hover:underline">
                    See the Hall of Fame →
                  </Link>
                </Pending>
              )}
            </ActivitySection>

            {/* ---------------- §7 Resources ---------------- */}
            {isTechnical ? (
              <ActivitySection id="resources" title="Resources" count={activity.resources.length} color={color}>
                {activity.resources.length > 0 ? (
                  <ul className="flex flex-wrap gap-2">
                    {activity.resources.map((resource) => (
                      <li key={resource.href}>
                        <a
                          href={resource.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border-2 border-line-strong bg-surface px-4 py-2 text-sm font-bold shadow-[3px_3px_0_0_var(--sticker)] transition-transform hover:-translate-y-0.5"
                        >
                          {resource.label}
                          <ArrowRight className="size-3.5" />
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Pending what="Learning resources" who={coordinators} />
                )}
              </ActivitySection>
            ) : null}

            {/* ---------------- Gallery ---------------- */}
            <ActivitySection id="gallery" title="Gallery" count={activity.gallery.length} color={color}>
              {activity.gallery.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {activity.gallery.map((src) => (
                    <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-2xl border-2 border-line-strong">
                      <Image src={src} alt="" fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover" />
                    </div>
                  ))}
                </div>
              ) : (
                <Pending what="Photographs of this activity" who={coordinators}>
                  <Link href="/gallery" className="font-bold text-ink underline-offset-4 hover:underline">
                    See the SAC gallery →
                  </Link>
                </Pending>
              )}
            </ActivitySection>

            {/* ---------------- §13 How to join ---------------- */}
            <ActivitySection id="join" title="How to join" color={color}>
              {activity.join.whatWeDo || activity.join.whoCanJoin || activity.join.process ? (
                <dl className="space-y-4">
                  {site.participationModel.map((question) => {
                    const map: Record<string, string> = {
                      "What we do": activity.join.whatWeDo,
                      "Who can join": activity.join.whoCanJoin,
                      "Selection/registration process": activity.join.process,
                      "When recruitment takes place": activity.join.recruitment,
                    };
                    const answer = map[question];
                    if (answer === undefined) return null;
                    return (
                      <div key={question} className="rounded-2xl border-2 border-line-strong bg-surface p-4">
                        <dt className="label-caps text-ink-subtle">{question}</dt>
                        <dd className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                          {answer || "—"}
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              ) : (
                <Pending what="Recruitment details for this activity" who={coordinators}>
                  <Link href="/join" className="font-bold text-ink underline-offset-4 hover:underline">
                    General guidance on joining an activity →
                  </Link>
                </Pending>
              )}
            </ActivitySection>
          </div>

          {/* ---------------- Sidebar: who is responsible ---------------- */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="space-y-4">
              <p className="label-caps text-ink-subtle">Who is responsible</p>

              {/* The faculty named against this activity itself, where the
                  committee lists one. This is the specific answer. */}
              {activity.activityFaculty.length > 0 ? (
                activity.activityFaculty.map((member) => (
                  <PersonCard
                    key={member.name}
                    person={member}
                    label={`Faculty · ${member.role}`}
                    color={color}
                  />
                ))
              ) : (
                <Pending
                  what={`A faculty member named specifically for ${activity.name}`}
                  who="SAC office"
                >
                  <p>
                    The committee below covers this activity as part of its domain, but does not
                    name anyone against {activity.name} on its own.
                  </p>
                </Pending>
              )}

              <p className="border-t border-line pt-4 label-caps text-ink-subtle">
                {activity.committeeName}
              </p>

              {activity.facultyInCharge ? (
                <PersonCard
                  person={activity.facultyInCharge}
                  label="Faculty In-Charge, this domain"
                  color={color}
                />
              ) : (
                <Pending what="Faculty In-Charge" who="SAC office" />
              )}

              {activity.facultyCoordinator ? (
                <PersonCard
                  person={activity.facultyCoordinator}
                  label="Faculty Coordinator, this domain"
                  color={color}
                />
              ) : (
                <Pending what="Faculty Coordinator" who="SAC office" />
              )}

              {activity.coach ? (
                <PersonCard person={activity.coach} label="Coach" color={color}>
                  {activity.coach.schedule ? (
                    <p className="mt-2 text-xs text-ink-subtle">{activity.coach.schedule}</p>
                  ) : null}
                </PersonCard>
              ) : (
                <Pending what="Coach / trainer" who="SAC office" />
              )}

              <div className="rounded-2xl border-2 border-line-strong bg-surface-2 p-4">
                <p className="label-caps text-ink-subtle">Committee</p>
                <Link
                  href={`/committee#${activity.committeeId}`}
                  className="mt-2 flex items-center gap-2.5 font-bold transition hover:text-brand"
                >
                  <Icon name={activity.icon} className="size-4" style={{ color }} />
                  {activity.committeeName}
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
