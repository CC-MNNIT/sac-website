import type { Club } from "@/lib/types";

/**
 * An edge-to-edge rail of club names on a loop. The list is rendered twice
 * and the strip travels exactly -50%, so the seam lands on an identical frame
 * and the scroll never visibly jumps.
 */
export function Ticker({ clubs }: { clubs: Club[] }) {
  const names = clubs.map((club) => club.name);

  return (
    <div className="relative overflow-hidden border-y-2 border-line-strong bg-ink py-3.5">
      <div className="anim-marquee flex w-max items-center gap-8">
        {[0, 1].map((pass) => (
          <div key={pass} className="flex shrink-0 items-center gap-8" aria-hidden={pass === 1}>
            {names.map((name, i) => (
              <span key={`${pass}-${name}`} className="flex shrink-0 items-center gap-8">
                <span className="whitespace-nowrap font-display text-lg font-bold text-bg sm:text-xl">
                  {name}
                </span>
                {/* Each separator takes the next colour off the confetti palette. */}
                <span
                  className="size-2 shrink-0 rounded-full"
                  style={{ backgroundColor: `var(--pop-${(i % 6) + 1})` }}
                  aria-hidden
                />
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Soft fade at both ends so names slide in rather than pop. Written as
          a plain gradient so it tracks --ink through a theme switch. */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-20"
        style={{ background: "linear-gradient(to right, var(--ink), transparent)" }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-20"
        style={{ background: "linear-gradient(to left, var(--ink), transparent)" }}
      />
    </div>
  );
}
