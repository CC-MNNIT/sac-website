import Image from "next/image";
import { External, Quote } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { site } from "@/lib/data";

export function PresidentMessage() {
  const { president, director } = site;

  return (
    <Section id="presidents-message" tint className="border-y-2 border-line-strong">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Portrait */}
          <Reveal variant="left" className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative mx-auto w-full max-w-sm">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border-2 border-line-strong">
                <Image
                  src={president.photo}
                  alt={president.name}
                  fill
                  sizes="(max-width: 1024px) 24rem, 30vw"
                  className="object-cover object-top"
                />
              </div>

              <div className="mt-5">
                <h3 className="text-xl">{president.name}</h3>
                <p className="mt-1 text-sm font-medium text-brand">{president.role}</p>
                <p className="mt-0.5 text-sm text-ink-muted">{president.dept}</p>
                <a
                  href={president.profile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted underline-offset-4 transition hover:text-brand hover:underline"
                >
                  Faculty profile
                  <External className="size-3.5" />
                </a>
              </div>
            </div>
          </Reveal>

          {/* Message */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2.5 label-caps text-brand">
                <span className="h-px w-8 bg-brand" />
                From the President&apos;s desk
              </span>
            </Reveal>

            <Reveal delay={80}>
              <Quote className="mt-7 size-9 text-line-strong" />
            </Reveal>

            <div className="mt-5 space-y-5">
              {president.message.map((paragraph, i) => (
                <Reveal key={i} delay={120 + i * 70}>
                  <p
                    className={
                      i === 0
                        ? "text-lg leading-relaxed text-ink"
                        : "leading-relaxed text-ink-muted"
                    }
                  >
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={340}>
              <div className="mt-10 rounded-3xl border-2 border-line-strong bg-surface p-6">
                <p className="label-caps text-ink-subtle">Under the leadership of</p>
                <p className="mt-2.5 font-display text-lg">{director.name}</p>
                <p className="text-sm text-ink-muted">{director.role}</p>
                <a
                  href={director.profile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand underline-offset-4 hover:underline"
                >
                  Director&apos;s office
                  <External className="size-3.5" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
