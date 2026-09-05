"use client";

import { useState } from "react";
import { ClubCard } from "@/components/clubs/ClubCard";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { Scene } from "@/components/ui/Scenes";
import { Section, SectionHeading } from "@/components/ui/Section";
import type { CategoryKey, Club } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Category {
  key: CategoryKey;
  label: string;
  blurb: string;
}

export function ClubsShowcase({
  clubs,
  categories,
}: {
  clubs: Club[];
  categories: Category[];
}) {
  const [active, setActive] = useState<CategoryKey>("technical");
  const shown = clubs.filter((club) => club.category === active);
  const current = categories.find((category) => category.key === active);
  const color = `var(--cat-${active})`;

  return (
    <Section tint className="overflow-hidden border-y-2 border-line-strong">
      <div className="container-page">
        <SectionHeading eyebrow="Twenty clubs" title="Pick your thing" />

        {/* Category tabs — sticker pills that press in when chosen */}
        <Reveal delay={80} className="mt-10">
          <div
            role="tablist"
            aria-label="Club categories"
            className="hide-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:justify-center sm:px-0"
          >
            {categories.map((category) => {
              const selected = category.key === active;
              const tint = `var(--cat-${category.key})`;
              return (
                <button
                  key={category.key}
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(category.key)}
                  className={cn(
                    "shrink-0 rounded-full border-2 border-line-strong px-5 py-2.5 text-sm font-bold transition-all duration-250 ease-[cubic-bezier(0.34,1.4,0.64,1)]",
                    selected
                      ? "translate-x-0.5 translate-y-0.5 text-white shadow-none"
                      : "bg-surface text-ink-muted shadow-[4px_4px_0_0_var(--sticker)] hover:-translate-y-1 hover:text-ink hover:shadow-[6px_7px_0_0_var(--sticker)]",
                  )}
                  style={selected ? { backgroundColor: tint } : undefined}
                >
                  {category.label}
                  <span
                    className={cn(
                      "ml-2 text-xs tabular-nums",
                      selected ? "text-white/75" : "text-ink-subtle",
                    )}
                  >
                    {clubs.filter((club) => club.category === category.key).length}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* The stage — an animated scene that changes with the tab */}
        <div
          key={active}
          className="animate-pop-in relative mt-10 overflow-hidden rounded-4xl border-2 border-line-strong shadow-[6px_6px_0_0_var(--sticker)]"
          style={{
            backgroundColor: `color-mix(in oklab, ${color} 9%, var(--surface))`,
            ["--card-accent" as string]: color,
          }}
        >
          <div className="bg-stripes h-3 w-full" aria-hidden />

          <div className="grid items-center gap-6 p-6 sm:grid-cols-[1fr_1.05fr] sm:gap-10 sm:p-9">
            <div>
              <span className="label-caps" style={{ color }}>
                {shown.length} clubs
              </span>
              <h3 className="mt-2 text-[2rem] leading-[1.1] sm:text-[2.6rem]">
                {current?.label}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted sm:text-base">
                {current?.blurb}
              </p>
            </div>

            <div className="h-44 sm:h-56" style={{ color }}>
              <Scene category={active} />
            </div>
          </div>
        </div>

        {/* Grid — re-keyed so cards re-animate when the tab changes */}
        <div key={`grid-${active}`} className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((club, i) => (
            <div
              key={club.slug}
              className="animate-pop-in"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <ClubCard club={club} />
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <ButtonLink href="/clubs" variant="outline" size="lg">
            See all twenty
            <ArrowRight className="size-4" />
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
