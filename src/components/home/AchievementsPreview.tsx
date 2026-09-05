import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight, LinkedIn, Trophy } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import type { AchievementYear } from "@/lib/types";

export function AchievementsPreview({ years }: { years: AchievementYear[] }) {
  // Flatten the newest few honours across the most recent years.
  const recent = years
    .slice(0, 4)
    .flatMap((year) => year.achievements.map((item) => ({ ...item, year: year.year })))
    .slice(0, 5);

  return (
    <Section>
      <div className="container-page">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            align="left"
            eyebrow="On the record"
            title="Wins worth framing"
          />
          <Reveal delay={120}>
            <ButtonLink href="/achievements" variant="outline">
              Full record
              <ArrowRight className="size-4" />
            </ButtonLink>
          </Reveal>
        </div>

        <ol className="mt-12 grid gap-5 lg:grid-cols-2">
          {recent.map((item, i) => (
            <Reveal key={`${item.year}-${item.title}`} variant="pop" delay={i * 70} as="li">
              <div
                className="group relative flex h-full gap-5 rounded-3xl border-2 border-line-strong bg-surface p-5 shadow-[4px_4px_0_0_var(--sticker)] transition-transform duration-300 ease-[cubic-bezier(0.34,1.4,0.64,1)] hover:-translate-x-0.5 hover:-translate-y-1.5 sm:p-6"
                style={{ ["--mark" as string]: `var(--pop-${(i % 6) + 1})` }}
              >
                {/* Year plate — a rosette pinned to the left edge */}
                <span
                  className="grid size-14 shrink-0 -rotate-6 place-items-center rounded-2xl border-2 border-line-strong bg-[var(--mark)] font-display text-sm font-bold tabular-nums text-white shadow-[3px_3px_0_0_var(--sticker)] transition-transform duration-400 ease-[cubic-bezier(0.34,1.5,0.64,1)] group-hover:rotate-6"
                >
                  {item.year}
                </span>

                <div className="min-w-0 flex-1">
                  <h3 className="text-lg leading-snug text-ink">{item.title}</h3>
                  {item.description ? (
                    <p className="mt-1.5 line-clamp-2 text-sm text-ink-muted">{item.description}</p>
                  ) : null}

                  {item.teams.length > 0 ? (
                    <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5">
                      {item.teams.flatMap((team) =>
                        team.members.map((member) => (
                          <li key={`${team.name}-${member.name}`}>
                            {member.linkedin ? (
                              <a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-2.5 py-1 text-xs font-medium text-ink-muted transition hover:text-ink"
                              >
                                <LinkedIn className="size-3" />
                                {member.name}
                              </a>
                            ) : (
                              <span className="inline-flex rounded-full bg-surface-2 px-2.5 py-1 text-xs text-ink-subtle">
                                {member.name}
                              </span>
                            )}
                          </li>
                        )),
                      )}
                    </ul>
                  ) : null}
                </div>

                <Trophy className="absolute right-4 top-4 size-5 text-[var(--mark)] opacity-40 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </Reveal>
          ))}
        </ol>

      </div>
    </Section>
  );
}
