import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export function AboutIntro() {
  return (
    <Section id="about" className="overflow-hidden">
      <div className="container-page">
        <div className="grid items-start gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          {/* Copy */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2.5 label-caps text-brand">
                <span className="h-px w-8 bg-brand" />
                Who we are
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h2 className="mt-6 text-[2rem] leading-[1.12] sm:text-[2.6rem] lg:text-[3.1rem]">
                What the Student Activity Centre does
              </h2>
            </Reveal>

            <Reveal delay={140}>
              <p className="mt-7 leading-relaxed text-ink-muted">
                An extremely crucial role is played by the Student Activity Centre of the
                institute in facilitating the activities and reaching out to the students,
                under the supervision of the President, SAC.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-4 leading-relaxed text-ink-muted">
                All activities are managed by students under the guidance of the President, SAC,
                and a team of Faculty In-Charges, Faculty Coordinators and committees. The Centre
                provides a platform for cultural, technical and managerial events, personality
                development, athletics, indoor and outdoor games and yoga.
              </p>
            </Reveal>

            <Reveal delay={260}>
              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink href="/about">
                  Read the full story
                  <ArrowRight className="size-4" />
                </ButtonLink>
                <ButtonLink href="/clubs" variant="outline">
                  Browse all clubs
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          {/* Image pair */}
          <Reveal variant="right" delay={120} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border-2 border-line-strong sm:aspect-[4/4.4]">
              <Image
                src="/images/campus/mnnit.webp"
                alt="MNNIT Allahabad campus"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>

            {/* Overlapping second frame — deliberately off-grid */}
            <div className="absolute -bottom-8 -left-4 hidden w-52 overflow-hidden rounded-3xl border-4 border-bg shadow-[6px_6px_0_0_var(--sticker)] sm:block lg:-left-10 lg:w-64">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/campus/academic-building.webp"
                  alt="Academic building, MNNIT Allahabad"
                  fill
                  sizes="256px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Founding-style caption block */}
            <div className="absolute -right-3 top-8 hidden rounded-2xl border-2 border-line-strong bg-surface px-5 py-4 shadow-[5px_5px_0_0_var(--accent)] lg:block">
              <div className="font-display text-3xl font-semibold leading-none text-brand">~10</div>
              <div className="mt-1.5 max-w-32 text-[0.7rem] leading-snug text-ink-muted">
                part-time coaches, two hours every day
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
