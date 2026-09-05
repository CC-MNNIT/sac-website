"use client";

import { useCountUp, useInView } from "@/lib/hooks";
import type { SiteConfig } from "@/lib/types";

/* One colour per cell, so the strip reads as four objects rather than a
   table of numbers. */
const MARKS = ["var(--pop-1)", "var(--pop-2)", "var(--pop-3)", "var(--pop-4)"];

export function Stats({ stats }: { stats: SiteConfig["stats"] }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.35 });

  return (
    <div ref={ref} className="border-y-2 border-line-strong bg-surface bg-dot-grid">
      <div className="container-page grid grid-cols-2 gap-5 py-12 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <StatCell key={stat.label} stat={stat} active={inView} index={i} />
        ))}
      </div>
    </div>
  );
}

function StatCell({
  stat,
  active,
  index,
}: {
  stat: SiteConfig["stats"][number];
  active: boolean;
  index: number;
}) {
  const value = useCountUp(stat.value, active, 1400 + index * 160);
  const mark = MARKS[index % MARKS.length];

  return (
    <div
      className="group relative overflow-hidden rounded-3xl border-2 border-line-strong bg-bg p-5 shadow-[4px_4px_0_0_var(--sticker)] transition-transform duration-300 ease-[cubic-bezier(0.34,1.4,0.64,1)] hover:-translate-y-1 sm:p-6"
      style={{ ["--mark" as string]: mark }}
    >
      <div className="font-display text-[2.6rem] font-bold leading-none tabular-nums text-ink sm:text-[3.2rem]">
        {value}
        <span style={{ ["--mark" as string]: mark }}>{stat.suffix}</span>
      </div>
      <div className="mt-2 text-sm font-bold text-ink">{stat.label}</div>
      <div className="mt-1 text-xs leading-relaxed text-ink-subtle">{stat.hint}</div>
    </div>
  );
}
