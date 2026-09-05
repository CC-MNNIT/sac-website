import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight, Icon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { Scene } from "@/components/ui/Scenes";
import { Section, SectionHeading } from "@/components/ui/Section";
import type { CategoryKey, CommitteeGroup, FacultyMember } from "@/lib/types";

/**
 * Four committees get a live scene of their own — the circuit board, the
 * bouncing football, the masks and the launch. Every committee, scene or not,
 * shows the face of every faculty member on it.
 */
const SPOTLIT: Record<string, CategoryKey> = {
  "technological-activities": "technical",
  "sports-indoor-outdoor-activities": "sports",
  "cultural-activities": "cultural",
  "literary-personality-development-activities": "initiatives",
};

const CHIP_COLOR = ["var(--pop-5)", "var(--pop-6)", "var(--pop-2)", "var(--pop-4)"];

function isLead(member: FacultyMember) {
  return member.role.toLowerCase().includes("in-charge");
}

/** Every face on the committee, the In-Charge first and ringed. */
function Faces({ members, color }: { members: FacultyMember[]; color: string }) {
  const ordered = [...members].sort((a, b) => Number(isLead(b)) - Number(isLead(a)));

  return (
    <ul className="flex flex-wrap gap-2">
      {ordered.map((member) => (
        <li key={member.name} className="group/face relative">
          <Avatar
            src={member.photo}
            name={member.name}
            size={38}
            className="border-2 transition-transform duration-250 ease-[cubic-bezier(0.34,1.5,0.64,1)] group-hover/face:-translate-y-1 group-hover/face:scale-110"
            // The In-Charge is ringed in the committee colour, everyone else in ink.
            {...{ style: { borderColor: isLead(member) ? color : "var(--line-strong)" } }}
          />
          {/* Name on hover, so 43 faces do not become 43 captions */}
          <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg border-2 border-line-strong bg-surface px-2 py-1 text-[0.68rem] font-semibold text-ink shadow-[2px_2px_0_0_var(--sticker)] group-hover/face:block">
            {member.name}
            <span className="block text-[0.62rem] font-normal text-ink-subtle">
              {member.role}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}

export function CommitteePreview({ groups }: { groups: CommitteeGroup[] }) {
  const spotlight = groups.filter((group) => group.id in SPOTLIT);
  const rest = groups.filter((group) => !(group.id in SPOTLIT));

  return (
    <Section tint className="border-y-2 border-line-strong">
      <div className="container-page">
        <SectionHeading eyebrow="Faculty-led" title="Meet everyone" />

        <div className="mt-12 grid gap-7 lg:grid-cols-2">
          {spotlight.map((group, i) => {
            const category = SPOTLIT[group.id];
            const color = `var(--cat-${category})`;
            const lead = group.members.find(isLead);

            return (
              <Reveal key={group.id} variant="pop" delay={i * 80}>
                <Link
                  href={`/committee#${group.id}`}
                  aria-label={`${group.activity} — see all ${group.members.length} faculty`}
                  className="sticker-accent group flex h-full flex-col overflow-hidden rounded-4xl bg-surface"
                  style={{ ["--card-accent" as string]: color }}
                >
                  {/* Live scene */}
                  <div
                    className="relative h-40 border-b-2 border-line-strong sm:h-44"
                    style={{
                      color,
                      backgroundColor: `color-mix(in oklab, ${color} 11%, var(--surface))`,
                    }}
                  >
                    <Scene
                      category={category}
                      className="transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <span
                      className="absolute left-4 top-4 grid size-10 place-items-center rounded-xl border-2 border-line-strong bg-surface"
                      style={{ color }}
                    >
                      <Icon name={group.icon} className="size-5" />
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h3 className="text-lg leading-snug sm:text-xl">{group.activity}</h3>

                    {lead ? (
                      <p className="mt-1.5 text-xs font-bold" style={{ color }}>
                        {lead.name} · Faculty In-Charge
                      </p>
                    ) : null}

                    <div className="mt-5">
                      <Faces members={group.members} color={color} />
                    </div>

                    <span
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold"
                      style={{ color }}
                    >
                      See all {group.members.length}
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        {/* The remaining committees — no scene, but every face still shows */}
        <div className="mt-7 grid gap-7 sm:grid-cols-2">
          {rest.map((group, i) => {
            const color = CHIP_COLOR[i % CHIP_COLOR.length];
            const lead = group.members.find(isLead);

            return (
              <Reveal key={group.id} variant="pop" delay={i * 70}>
                <Link
                  href={`/committee#${group.id}`}
                  aria-label={`${group.activity} — see all ${group.members.length} faculty`}
                  className="sticker-accent group flex h-full flex-col rounded-4xl bg-surface p-5 sm:p-6"
                  style={{ ["--card-accent" as string]: color }}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className="grid size-11 shrink-0 place-items-center rounded-xl border-2 border-line-strong"
                      style={{ color, backgroundColor: `color-mix(in oklab, ${color} 12%, var(--surface))` }}
                    >
                      <Icon name={group.icon} className="size-5" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-base leading-snug sm:text-lg">{group.activity}</h3>
                      {lead ? (
                        <p className="mt-1 text-xs font-bold" style={{ color }}>
                          {lead.name} · Faculty In-Charge
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="mt-5">
                    <Faces members={group.members} color={color} />
                  </div>

                  <span
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold"
                    style={{ color }}
                  >
                    See all {group.members.length}
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <ButtonLink href="/committee" variant="outline" size="lg">
            Full committee
            <ArrowRight className="size-4" />
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
