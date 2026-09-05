import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ClubCard } from "@/components/clubs/ClubCard";
import { Avatar } from "@/components/ui/Avatar";
import {
  ArrowLeft,
  ArrowRight,
  External,
  Github,
  Icon,
  Instagram,
  LinkedIn,
  Mail,
  Trophy,
  Users,
} from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { PersonCard } from "@/components/people/PersonCard";
import { Blank, Pending } from "@/components/ui/Pending";
import { clubs, getActivitiesForClub, getClub, getRelatedClubs } from "@/lib/data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Pre-render every club at build time. */
export function generateStaticParams() {
  return clubs.map((club) => ({ slug: club.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const club = getClub(slug);
  if (!club) return { title: "Club not found" };

  return {
    title: club.name,
    description: club.description,
    openGraph: {
      title: `${club.name} — SAC, MNNIT Allahabad`,
      description: club.description,
      images: [{ url: club.image }],
    },
  };
}

export default async function ClubPage({ params }: PageProps) {
  const { slug } = await params;
  const club = getClub(slug);
  if (!club) notFound();

  const color = `var(--cat-${club.category})`;
  const related = getRelatedClubs(club.slug, 3);
  /* §13 — a club's recruitment record lives on the activity it runs. */
  const linked = getActivitiesForClub(club.slug);
  const join = linked[0]?.join;
  const hasSocials = Object.values(club.socials).some(Boolean);

  return (
    <>
      {/* ------------------------------- Banner ------------------------------- *
       * The source artwork is a mix of logos and photographs at wildly
       * different resolutions, so the image is never stretched across the
       * banner. It is blurred into a colour wash behind, and shown crisp
       * inside a plate beside the title.
       * ---------------------------------------------------------------------- */}
      <header className="relative isolate overflow-hidden bg-[#0b0f14] pb-14 pt-32 sm:pb-18 sm:pt-40">
        <Image
          src={club.image}
          alt=""
          fill
          priority
          sizes="100vw"
          aria-hidden
          className="scale-125 object-cover opacity-55 blur-3xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/94 via-black/78 to-black/60" />
        <div
          className="absolute inset-x-0 bottom-0 h-1"
          style={{ backgroundColor: color }}
          aria-hidden
        />

        <div className="container-page relative z-10">
          <Link
            href="/clubs"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/65 transition hover:text-white"
          >
            <ArrowLeft className="size-4" />
            All clubs
          </Link>

          <div className="mt-8 grid items-center gap-10 sm:grid-cols-[1fr_auto] sm:gap-12">
            <div>
              <span
                className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 label-caps text-white"
                style={{ backgroundColor: color }}
              >
                <Icon name={club.icon} className="size-3.5" />
                {club.categoryLabel}
              </span>

              <h1 className="mt-5 max-w-3xl text-[2.4rem] leading-[1.04] text-white sm:text-[3.4rem]">
                {club.name}
              </h1>

              {club.tagline ? (
                <p className="mt-4 max-w-2xl text-lg text-white/75">{club.tagline}</p>
              ) : null}
            </div>

            {/* Crisp plate — contained for logos, filled for photographs */}
            <div
              className={
                "relative hidden aspect-square w-56 shrink-0 overflow-hidden rounded-2xl border border-white/15 shadow-2xl sm:block lg:w-64 " +
                (club.imageFit === "contain"
                  ? club.imageBg === "dark"
                    ? "bg-[#111318] p-6"
                    : "bg-[#f2f4f7] p-6"
                  : "bg-black/30")
              }
            >
              <Image
                src={club.image}
                alt={club.name}
                fill
                sizes="16rem"
                className={club.imageFit === "contain" ? "object-contain" : "object-cover"}
              />
            </div>
          </div>
        </div>
      </header>

      {/* ------------------------------ Body grid ----------------------------- */}
      <div className="container-page py-16 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="min-w-0">
            {/* About */}
            <Reveal>
              <h2 className="text-2xl sm:text-3xl">About the club</h2>
              <div className="mt-5 space-y-4">
                {club.about.map((paragraph, i) => (
                  <p key={i} className="text-lg leading-relaxed text-ink-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            {/* Ways to reach the club — previously in the right-hand panel */}
            {club.website || club.email || hasSocials ? (
              <Reveal delay={60}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  {club.website ? (
                    <a
                      href={club.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 items-center gap-2 rounded-full border-2 border-line-strong px-5 text-sm font-bold text-white shadow-[4px_4px_0_0_var(--sticker)] transition-transform duration-250 ease-[cubic-bezier(0.34,1.4,0.64,1)] hover:-translate-x-0.5 hover:-translate-y-1 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_0_var(--sticker)]"
                      style={{ backgroundColor: color }}
                    >
                      Official website
                      <External className="size-4" />
                    </a>
                  ) : null}

                  {club.email ? (
                    <a
                      href={`mailto:${club.email}`}
                      className="inline-flex h-11 items-center gap-2 rounded-full border-2 border-line-strong bg-surface px-5 text-sm font-bold shadow-[4px_4px_0_0_var(--sticker)] transition-transform duration-250 ease-[cubic-bezier(0.34,1.4,0.64,1)] hover:-translate-x-0.5 hover:-translate-y-1 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_0_var(--sticker)]"
                    >
                      <Mail className="size-4" />
                      Email the club
                    </a>
                  ) : null}

                  {club.socials.instagram ? (
                    <SocialDot href={club.socials.instagram} label="Instagram">
                      <Instagram className="size-4" />
                    </SocialDot>
                  ) : null}
                  {club.socials.linkedin ? (
                    <SocialDot href={club.socials.linkedin} label="LinkedIn">
                      <LinkedIn className="size-4" />
                    </SocialDot>
                  ) : null}
                  {club.socials.github ? (
                    <SocialDot href={club.socials.github} label="GitHub">
                      <Github className="size-4" />
                    </SocialDot>
                  ) : null}
                </div>
              </Reveal>
            ) : null}

            {/* Highlights */}
            {club.highlights.length > 0 ? (
              <Reveal delay={80}>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {club.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-3 rounded-2xl border-2 border-line-strong bg-surface p-4 text-sm"
                    >
                      <Trophy className="mt-0.5 size-4 shrink-0" style={{ color }} />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}

            {/* Achievements */}
            <section className="mt-16">
              <Reveal>
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="text-2xl sm:text-3xl">Achievements</h2>
                  {club.achievements.length > 0 ? (
                    <span className="text-sm text-ink-subtle">
                      {club.achievements.length} recorded
                    </span>
                  ) : null}
                </div>
              </Reveal>

              {club.achievements.length > 0 ? (
                <ol className="mt-7 border-t border-line">
                  {club.achievements.map((achievement, i) => (
                    <Reveal key={`${achievement.year}-${achievement.title}-${i}`} delay={i * 40} as="li">
                      <div className="grid gap-3 border-b border-line py-6 sm:grid-cols-[5.5rem_1fr] sm:gap-6">
                        <span
                          className="font-display text-xl tabular-nums"
                          style={{ color }}
                        >
                          {achievement.year}
                        </span>
                        <div>
                          <h3 className="text-base font-semibold leading-snug">
                            {achievement.title}
                          </h3>
                          {achievement.description ? (
                            <p className="mt-1.5 text-sm text-ink-muted">
                              {achievement.description}
                            </p>
                          ) : null}

                          {achievement.teams && achievement.teams.length > 0 ? (
                            <div className="mt-3 space-y-2">
                              {achievement.teams.map((team, teamIndex) => (
                                <div key={`${team.name}-${teamIndex}`}>
                                  <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
                                    {team.members.map((member) => (
                                      <li key={member.name}>
                                        {member.linkedin ? (
                                          <a
                                            href={member.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 text-xs text-ink-subtle underline-offset-4 transition hover:text-brand hover:underline"
                                          >
                                            <LinkedIn className="size-3" />
                                            {member.name}
                                          </a>
                                        ) : (
                                          <span className="text-xs text-ink-subtle">
                                            {member.name}
                                          </span>
                                        )}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </ol>
              ) : (
                <EmptyNote>
                  This club&apos;s competition record is being compiled and will appear here
                  shortly.
                </EmptyNote>
              )}
            </section>

            {/* Current team */}
            <section className="mt-16">
              <Reveal>
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="text-2xl sm:text-3xl">Current team</h2>
                  {club.team.length > 0 ? (
                    <span className="text-sm text-ink-subtle">{club.team.length} members</span>
                  ) : null}
                </div>
              </Reveal>

              {club.team.length > 0 ? (
                <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {club.team.map((member, i) => (
                    <Reveal key={member.name} delay={i * 60}>
                      <div className="flex h-full items-center gap-4 rounded-3xl border-2 border-line-strong bg-surface p-5 shadow-[4px_4px_0_0_var(--sticker)] transition-all duration-300 ease-[cubic-bezier(0.34,1.4,0.64,1)] hover:-translate-x-0.5 hover:-translate-y-1.5 hover:shadow-[7px_8px_0_0_var(--sticker)]">
                        <Avatar src={member.photo} name={member.name} size={56} rounded="xl" />
                        <div className="min-w-0">
                          <p className="truncate font-semibold">{member.name}</p>
                          <p className="truncate text-sm" style={{ color }}>
                            {member.role}
                          </p>
                          {member.year ? (
                            <p className="truncate text-xs text-ink-subtle">{member.year}</p>
                          ) : null}
                          {member.linkedin ? (
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-1 inline-flex items-center gap-1 text-xs text-ink-subtle transition hover:text-brand"
                            >
                              <LinkedIn className="size-3" />
                              LinkedIn
                            </a>
                          ) : null}
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              ) : (
                <EmptyNote icon="users">
                  The office bearers and members for the current session will be published here
                  once recruitment closes.
                </EmptyNote>
              )}
            </section>

            {/* Activities — projects and events. A photograph, where the club
                has supplied one, turns the entry into a picture card. */}
            {club.activities.length > 0 ? (
              <section className="mt-16">
                <Reveal>
                  <h2 className="text-2xl sm:text-3xl">
                    {club.activities.some((activity) => activity.image)
                      ? "Projects"
                      : "Activities & events"}
                  </h2>
                </Reveal>
                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  {club.activities.map((activity, i) => (
                    <Reveal key={activity.title} delay={i * 60}>
                      <div
                        className="flex h-full flex-col overflow-hidden rounded-3xl border-2 border-line-strong bg-surface"
                        style={{ ["--card-accent" as string]: color }}
                      >
                        {activity.image ? (
                          <div className="relative aspect-[16/10] border-b-2 border-line-strong bg-surface-2">
                            <Image
                              src={activity.image}
                              alt={activity.title}
                              fill
                              sizes="(max-width: 640px) 100vw, 50vw"
                              className="object-cover"
                            />
                          </div>
                        ) : null}

                        <div className="flex flex-1 flex-col p-6">
                          {activity.date ? (
                            <span className="label-caps text-ink-subtle">{activity.date}</span>
                          ) : null}
                          <h3 className={activity.date ? "mt-2 text-lg" : "text-lg"}>
                            {activity.title}
                          </h3>
                          {activity.description ? (
                            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                              {activity.description}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </section>
            ) : null}

            {/* Gallery */}
            {club.gallery.length > 0 ? (
              <section className="mt-16">
                <Reveal>
                  <h2 className="text-2xl sm:text-3xl">Gallery</h2>
                </Reveal>
                <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {club.gallery.map((src, i) => (
                    <Reveal key={src} delay={i * 50} variant="scale">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border-2 border-line-strong">
                        <Image
                          src={src}
                          alt={`${club.name} photo ${i + 1}`}
                          fill
                          sizes="(max-width: 640px) 50vw, 30vw"
                          className="object-cover transition-transform duration-700 hover:scale-105"
                        />
                      </div>
                    </Reveal>
                  ))}
                </div>
              </section>
            ) : null}
          </div>

        </div>

        {/* §13 — How to join */}
        <section id="join" className="mt-20 scroll-mt-28 border-t-2 border-line-strong pt-14">
          <Reveal>
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-2xl sm:text-3xl">How to join</h2>
              <Link
                href="/join"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand underline-offset-4 hover:underline"
              >
                All clubs
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </Reveal>

          <dl className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            <JoinField label="What we do">{club.description}</JoinField>
            <JoinField label="Who can join">
              {join?.whoCanJoin || <Blank label="Who can join" />}
            </JoinField>
            <JoinField label="Selection / registration process">
              {join?.process || <Blank label="Selection process" />}
            </JoinField>
            <JoinField label="When recruitment takes place">
              {join?.recruitment || <Blank label="Recruitment window" />}
            </JoinField>
          </dl>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
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
            <a
              href={join.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-line-strong bg-brand px-5 py-2.5 text-sm font-bold text-brand-ink shadow-[4px_4px_0_0_var(--sticker)] transition-transform hover:-translate-y-1"
            >
              Join / Register
              <ArrowRight className="size-3.5" />
            </a>
          ) : (
            <p className="mt-8 text-sm leading-relaxed text-ink-muted">
              A registration link is to be supplied by the club coordinator. Recruitment notices are
              published under{" "}
              <Link href="/news" className="font-bold text-ink underline-offset-4 hover:underline">
                announcements
              </Link>
              .
            </p>
          )}
        </section>

        {/* Activities this club runs */}
        {linked.length > 0 ? (
          <section className="mt-20 border-t-2 border-line-strong pt-14">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl">Activities run by this club</h2>
            </Reveal>
            <div className="mt-8 flex flex-wrap gap-3">
              {linked.map((activity) => (
                <Link
                  key={activity.slug}
                  href={`/activities/${activity.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-line-strong bg-surface px-4 py-2.5 text-sm font-bold shadow-[3px_3px_0_0_var(--sticker)] transition-transform hover:-translate-y-1"
                >
                  {activity.name}
                  <ArrowRight className="size-3.5" />
                </Link>
              ))}
            </div>
            <p className="mt-5 text-sm text-ink-muted">
              The activity page carries the faculty in-charge, coach, captain, squad, practice
              schedule, facilities, results and achievements for each.
            </p>
          </section>
        ) : null}

        {/* Related */}
        {related.length > 0 ? (
          <section className="mt-20 border-t border-line pt-14">
            <Reveal>
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-2xl sm:text-3xl">More from the SAC</h2>
                <Link
                  href="/clubs"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand underline-offset-4 hover:underline"
                >
                  All clubs
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </Reveal>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, i) => (
                <Reveal key={item.slug} delay={i * 80}>
                  <ClubCard club={item} />
                </Reveal>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </>
  );
}

function JoinField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="label-caps text-[0.6rem] text-ink-subtle">{label}</dt>
      <dd className="mt-1.5 text-sm leading-relaxed text-ink-muted">{children}</dd>
    </div>
  );
}

function EmptyNote({
  children,
  icon = "trophy",
}: {
  children: React.ReactNode;
  icon?: string;
}) {
  return (
    <div className="mt-7 flex items-start gap-4 rounded-xl border border-dashed border-line-strong bg-surface-2 p-6">
      {icon === "users" ? (
        <Users className="mt-0.5 size-5 shrink-0 text-ink-subtle" />
      ) : (
        <Trophy className="mt-0.5 size-5 shrink-0 text-ink-subtle" />
      )}
      <p className="text-sm leading-relaxed text-ink-muted">{children}</p>
    </div>
  );
}

function SocialDot({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid size-11 place-items-center rounded-full border-2 border-line-strong bg-surface text-ink shadow-[4px_4px_0_0_var(--sticker)] transition-transform duration-250 ease-[cubic-bezier(0.34,1.4,0.64,1)] hover:-translate-y-1 hover:text-brand active:translate-y-0.5 active:shadow-none"
    >
      {children}
    </a>
  );
}
