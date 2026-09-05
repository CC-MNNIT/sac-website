import type { Metadata } from "next";
import { ArrowRight, Github, LinkedIn } from "@/components/ui/Icons";
import { PageHeader } from "@/components/ui/PageHeader";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Reveal } from "@/components/ui/Reveal";
import { developers } from "@/lib/data";

export const metadata: Metadata = {
  title: "Web Team",
  description: developers.subheading,
};

const COLOURS = ["var(--pop-1)", "var(--pop-6)", "var(--pop-2)", "var(--pop-4)"];

export default function WebTeamPage() {
  return (
    <>
      <PageHeader
        images={[]}
        eyebrow="Web team"
        title={developers.heading}
        description={developers.subheading}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Web Team" }]}
      />

      <div className="container-page py-16 sm:py-20">
        <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-2">
          {developers.members.map((person, i) => {
            const color = COLOURS[i % COLOURS.length];

            return (
              <Reveal key={person.name} variant="pop" delay={i * 110} className="h-full">
                {/* A poster card: the portrait is the whole card, and the name
                    plate sits on it rather than beside it. */}
                <article
                  className="sticker-accent group relative aspect-[3/4] overflow-hidden rounded-4xl bg-surface-2"
                  style={{ ["--card-accent" as string]: color }}
                >
                  <PhotoFrame
                    src={person.photo}
                    alt={person.name}
                    sizes="(max-width: 640px) 100vw, 24rem"
                    priority={i === 0}
                    className="size-full"
                    imageClassName="transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                  />

                  {/* Colour wash that lifts as the card is approached */}
                  <span
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ backgroundColor: `color-mix(in oklab, ${color} 20%, transparent)` }}
                    aria-hidden
                  />

                  {/* Ink gradient so the plate always reads, whatever the photo */}
                  <span
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black via-black/70 to-transparent"
                    aria-hidden
                  />

                  {/* Oversized index, watermarked into the corner */}
                  <span
                    className="pointer-events-none absolute right-4 top-2 font-display text-[5rem] font-bold leading-none opacity-25"
                    style={{ color }}
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {person.batch ? (
                    <span
                      className="absolute left-4 top-4 rounded-full border-2 border-line-strong px-3 py-1 label-caps text-[0.6rem] text-white shadow-[3px_3px_0_0_var(--sticker)]"
                      style={{ backgroundColor: color }}
                    >
                      {person.batch}
                    </span>
                  ) : null}

                  {/* Name plate */}
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <span
                      className="block h-1.5 w-14 rounded-full"
                      style={{ backgroundColor: color }}
                      aria-hidden
                    />
                    <h2 className="mt-3 font-display text-[1.75rem] font-bold leading-[1.1] text-white">
                      {person.name}
                    </h2>

                    <div className="mt-4 flex flex-wrap items-center gap-2.5">
                      {person.linkedin ? (
                        <a
                          href={person.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border-2 border-white/25 bg-white/10 px-3.5 py-2 text-xs font-bold text-white backdrop-blur-sm transition-all duration-250 hover:-translate-y-0.5 hover:bg-white hover:text-ink"
                        >
                          <LinkedIn className="size-3.5" />
                          LinkedIn
                          <ArrowRight className="size-3" />
                        </a>
                      ) : null}
                      {person.github ? (
                        <a
                          href={person.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border-2 border-white/25 bg-white/10 px-3.5 py-2 text-xs font-bold text-white backdrop-blur-sm transition-all duration-250 hover:-translate-y-0.5 hover:bg-white hover:text-ink"
                        >
                          <Github className="size-3.5" />
                          GitHub
                          <ArrowRight className="size-3" />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </>
  );
}
