import type { Metadata } from "next";
import { FacultyCard } from "@/components/committee/FacultyCard";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { ArrowRight, Icon } from "@/components/ui/Icons";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { committee, countFaculty, site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Faculty Committee",
  description:
    "The Faculty In-Charges, Coordinators and committee members who guide every activity domain of the SAC, MNNIT Allahabad.",
};

/* One colour per committee, cycled through the confetti palette. */
const GROUP_COLOR = [
  "var(--pop-1)",
  "var(--pop-2)",
  "var(--pop-3)",
  "var(--pop-4)",
  "var(--pop-5)",
  "var(--pop-6)",
];

export default function CommitteePage() {
  const total = countFaculty();

  return (
    <>
      <PageHeader
        images={[
          "/images/campus/academic-building.webp",
          "/images/gallery/chitrasangam/chitrasangam-and-eloquence-07.webp",
          "/images/campus/mnnit.webp",
        ]}
        eyebrow="Governance"
        title="Faculty committee"
        description={`${total} Faculty In-Charges, Coordinators and committee members across ${committee.length} activity domains, working alongside the student teams.`}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Committee" }]}
      />

      <div className="container-page py-16 sm:py-20">
        {/* President */}
        <Reveal variant="pop">
          <section className="overflow-hidden rounded-4xl border-2 border-line-strong bg-surface shadow-[7px_7px_0_0_var(--brand)]">
            <div className="grid gap-0 sm:grid-cols-[15rem_1fr] lg:grid-cols-[18rem_1fr]">
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

                <a
                  href={site.president.profile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border-2 border-line-strong bg-surface px-4 py-2 text-sm font-bold shadow-[3px_3px_0_0_var(--sticker)] transition-transform duration-250 ease-[cubic-bezier(0.34,1.4,0.64,1)] hover:-translate-y-1 active:translate-y-0.5 active:shadow-none"
                >
                  Faculty profile
                  <ArrowRight className="size-4" />
                </a>
              </div>
            </div>
          </section>
        </Reveal>

        {/* Activity committees */}
        <div className="mt-16 space-y-16">
          {committee.map((group, groupIndex) => {
            const color = GROUP_COLOR[groupIndex % GROUP_COLOR.length];

            return (
            <section key={group.id} id={group.id} className="scroll-mt-28">
              <Reveal>
                <div className="flex items-center gap-4 border-b-2 border-line-strong pb-5">
                  <span
                    className="flex size-11 shrink-0 items-center justify-center rounded-2xl border-2 border-line-strong"
                    style={{ color, backgroundColor: `color-mix(in oklab, ${color} 13%, var(--surface))` }}
                  >
                    <Icon name={group.icon} className="size-5" />
                  </span>
                  <div>
                    <h2 className="text-xl sm:text-2xl">{group.activity}</h2>
                    <p className="mt-0.5 text-sm text-ink-subtle">
                      {group.members.length} member{group.members.length > 1 ? "s" : ""}
                    </p>
                  </div>
                  <span
                    className="ml-auto hidden font-display text-4xl font-bold opacity-30 sm:block"
                    style={{ color }}
                  >
                    {String(groupIndex + 1).padStart(2, "0")}
                  </span>
                </div>
              </Reveal>

              <div className="mt-7 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {group.members.map((member, i) => (
                  <Reveal
                    key={`${group.id}-${member.name}`}
                    variant="pop"
                    delay={Math.min(i, 8) * 45}
                    className="h-full"
                  >
                    <FacultyCard member={member} color={color} />
                  </Reveal>
                ))}
              </div>
            </section>
            );
          })}
        </div>
      </div>
    </>
  );
}
