import {
  Basketball,
  Football,
  Mask,
  Music,
  Pen,
  Robot,
  Rocket,
  Star,
  Terminal,
  Trophy,
  Yoga,
} from "@/components/ui/Icons";

/**
 * The hero's backdrop — built from what the Centre actually is rather than a
 * flat colour: stage beams over an athletics track, with the sports, cultural
 * and technical glyphs scattered across it like a noticeboard.
 *
 * Everything is drawn from the theme tokens, so it inverts with the site
 * instead of being two separate artworks. Nothing here is interactive or
 * announced — it sits behind the content at -z-10.
 */

/* Outlined activity glyphs, positioned as percentages so they hold their
   composition at any width. Hidden below `lg`, where the copy needs the room. */
const GLYPHS = [
  { Icon: Football, className: "left-[3%] top-[16%] size-16 -rotate-12", color: "--pop-2" },
  { Icon: Mask, className: "left-[14%] bottom-[14%] size-14 rotate-6", color: "--pop-3" },
  { Icon: Terminal, className: "left-[7%] top-[62%] size-11 -rotate-6", color: "--pop-1" },
  { Icon: Trophy, className: "right-[4%] top-[10%] size-14 rotate-12", color: "--pop-4" },
  { Icon: Music, className: "right-[13%] bottom-[10%] size-12 -rotate-12", color: "--pop-5" },
  { Icon: Rocket, className: "right-[2%] bottom-[30%] size-12 rotate-6", color: "--pop-6" },
  { Icon: Basketball, className: "left-[26%] top-[6%] size-10 rotate-12", color: "--pop-4" },
  { Icon: Yoga, className: "left-[38%] bottom-[6%] size-11 -rotate-6", color: "--pop-6" },
  { Icon: Robot, className: "right-[27%] top-[4%] size-10 -rotate-12", color: "--pop-1" },
  { Icon: Pen, className: "left-[47%] top-[13%] size-9 rotate-[18deg]", color: "--pop-5" },
  { Icon: Star, className: "right-[38%] bottom-[16%] size-9 rotate-6", color: "--pop-3" },
];

export function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* Ground: a soft lift from the page colour towards the tint, so the
          hero reads as its own plate without a hard edge. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(175deg, var(--bg) 0%, var(--bg-tint) 55%, var(--bg) 100%)",
        }}
      />

      {/* Athletics track — concentric lanes sweeping out of the bottom-left,
          the shape every Annual Athletic Meet is run on. */}
      <svg
        className="absolute -bottom-[26rem] -left-[18rem] size-[62rem] opacity-[0.5] dark:opacity-[0.42] sm:-bottom-[30rem]"
        viewBox="0 0 400 400"
        fill="none"
      >
        {[168, 148, 128, 108, 88].map((r, i) => (
          <circle
            key={r}
            cx="200"
            cy="200"
            r={r}
            stroke={`var(--pop-${(i % 6) + 1})`}
            strokeWidth="1.25"
            strokeDasharray={i % 2 ? "5 9" : undefined}
            opacity={0.3 - i * 0.03}
          />
        ))}
      </svg>

      {/* Stage beams — two soft shafts raking down from the top right, the way
          the Multipurpose Hall lights a Culrav performance. */}
      <div
        className="absolute -top-48 right-[4%] h-[48rem] w-[22rem] rotate-[17deg] opacity-[0.5] blur-[46px] dark:opacity-[0.6]"
        style={{
          background:
            "linear-gradient(to bottom, color-mix(in oklab, var(--brand) 30%, transparent), transparent 70%)",
          clipPath: "polygon(43% 0%, 57% 0%, 100% 100%, 0% 100%)",
        }}
      />
      <div
        className="absolute -top-40 right-[24%] h-[42rem] w-[17rem] rotate-[-13deg] opacity-[0.45] blur-[42px] dark:opacity-[0.55]"
        style={{
          background:
            "linear-gradient(to bottom, color-mix(in oklab, var(--accent) 28%, transparent), transparent 70%)",
          clipPath: "polygon(44% 0%, 56% 0%, 100% 100%, 0% 100%)",
        }}
      />

      {/* Ambient colour wash, blurred right out so it reads as light on the
          page rather than as a shape sitting on it. */}
      <div className="absolute -right-52 -top-56 size-[38rem] rounded-full bg-brand opacity-[0.13] blur-[110px] dark:opacity-[0.2]" />
      <div className="absolute -bottom-64 -left-48 size-[32rem] rounded-full bg-accent opacity-[0.12] blur-[110px] dark:opacity-[0.18]" />

      {/* Halftone field, faded out towards the middle so it never fights the
          headline or the photograph. */}
      <div
        className="absolute inset-0 bg-dot-grid opacity-[0.55] dark:opacity-40"
        style={{
          maskImage:
            "radial-gradient(115% 85% at 50% 0%, transparent 34%, #000 78%)",
          WebkitMaskImage:
            "radial-gradient(115% 85% at 50% 0%, transparent 34%, #000 78%)",
        }}
      />

      {/* Activity glyphs — sports, culture and technology, scattered like
          stickers on a noticeboard. */}
      <div className="absolute inset-0 hidden lg:block">
        {GLYPHS.map(({ Icon, className, color }, i) => (
          <Icon
            key={i}
            className={`absolute ${className} opacity-[0.09] dark:opacity-[0.14]`}
            style={{ color: `var(${color})`, strokeWidth: 1.1 }}
          />
        ))}
      </div>

      {/* Confetti — the six activity colours, as a scatter of dots. */}
      <div className="absolute inset-0 hidden sm:block">
        {[
          ["9%", "34%", "--pop-3"], ["21%", "72%", "--pop-6"], ["33%", "22%", "--pop-4"],
          ["44%", "80%", "--pop-1"], ["57%", "12%", "--pop-2"], ["68%", "66%", "--pop-5"],
          ["79%", "26%", "--pop-3"], ["88%", "58%", "--pop-4"], ["96%", "38%", "--pop-1"],
        ].map(([left, top, color], i) => (
          <span
            key={i}
            className="absolute rounded-full opacity-25 dark:opacity-35"
            style={{
              left,
              top,
              width: i % 3 === 0 ? 9 : 6,
              height: i % 3 === 0 ? 9 : 6,
              backgroundColor: `var(${color})`,
            }}
          />
        ))}
      </div>

      {/* Barber stripes along the foot, picking up the rail under the header. */}
      <div
        className="absolute inset-x-0 bottom-0 h-14 opacity-[0.13] dark:opacity-[0.18]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, var(--brand) 0 6px, transparent 6px 14px)",
          maskImage: "linear-gradient(to top, #000, transparent)",
          WebkitMaskImage: "linear-gradient(to top, #000, transparent)",
        }}
      />
    </div>
  );
}
