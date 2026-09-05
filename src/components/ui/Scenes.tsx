import type { CategoryKey } from "@/lib/types";
import { cn } from "@/lib/utils";

/*
 * Animated scenes, one per activity area.
 *
 * Each is a self-contained SVG on a 260 × 170 canvas that inherits its hue
 * from `currentColor`, so a parent only has to set a text colour. Motion is
 * CSS-class driven (see globals.css) which means prefers-reduced-motion
 * switches every scene to a still illustration for free.
 */

type SceneProps = { className?: string };

const CANVAS = "0 0 260 170";

/* Shorthand for a translucent shade of the scene's own colour. */
const tint = (percent: number) =>
  `color-mix(in oklab, currentColor ${percent}%, transparent)`;

/* Paper-coloured shapes read correctly in both themes. */
const PAPER = "var(--surface)";
const PAPER_2 = "var(--surface-2)";
const INK = "var(--ink)";

/* ------------------------------------------------------------------ *
 *  Sports — a football bouncing in front of the goal
 * ------------------------------------------------------------------ */

const PENTAGON = "M 0,-8 L 7.61,-2.47 L 4.7,6.47 L -4.7,6.47 L -7.61,-2.47 Z";

/* Five outer pentagons sit on the ring between the centre one and the rim,
   flipped 36° so the pattern reads like a real truncated icosahedron. */
const OUTER_PENTAGONS = [
  { x: 11.76, y: -16.18 },
  { x: 19.02, y: 6.18 },
  { x: 0, y: 20 },
  { x: -19.02, y: 6.18 },
  { x: -11.76, y: -16.18 },
];

export function SportsScene({ className }: SceneProps) {
  return (
    <svg
      viewBox={CANVAS}
      fill="none"
      className={cn("h-full w-full", className)}
      aria-hidden
    >
      <defs>
        <radialGradient id="sp-sheen" cx="34%" cy="28%" r="72%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.16" />
        </radialGradient>
        <linearGradient id="sp-turf" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.16" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.02" />
        </linearGradient>
        <clipPath id="sp-ball-clip">
          <circle cx="0" cy="0" r="24" />
        </clipPath>
      </defs>

      {/* Turf */}
      <rect x="0" y="132" width="260" height="38" fill="url(#sp-turf)" />
      <path
        d="M0 132 H260"
        stroke={tint(45)}
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Pitch markings, drawn in perspective */}
      <ellipse
        cx="60"
        cy="150"
        rx="46"
        ry="12"
        stroke={tint(28)}
        strokeWidth="2"
        strokeDasharray="5 6"
      />
      <path
        d="M186 132 v22"
        stroke={tint(28)}
        strokeWidth="2"
        strokeDasharray="5 6"
      />

      {/* Goal — posts, crossbar and a net woven from thin diagonals */}
      <g stroke={tint(38)}>
        <path
          d="M182 126 h62 v-56 h-62"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g strokeWidth="1" opacity="0.75">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <path key={`v${i}`} d={`M${184 + i * 10} 70 v56`} />
          ))}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path key={`h${i}`} d={`M182 ${72 + i * 10} h62`} />
          ))}
        </g>
      </g>

      {/* Corner flag */}
      <g
        className="anim-wobble"
        style={{ transformBox: "view-box", transformOrigin: "22px 132px" }}
      >
        <path
          d="M22 132 v-40"
          stroke={tint(50)}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path d="M22 92 l22 7 -22 7 z" fill="currentColor" />
      </g>

      {/* Flight arc the ball has just travelled */}
      <path
        d="M30 118 C 58 40, 128 34, 158 96"
        stroke={tint(30)}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="2 9"
      />

      {/* Contact shadow, tied to the same 1.5s beat as the bounce */}
      <ellipse
        cx="100"
        cy="134"
        rx="24"
        ry="5.5"
        fill={INK}
        className="anim-shadow"
      />

      {/* The ball */}
      <g transform="translate(100 108)">
        <g className="anim-ball-bounce">
          <g className="anim-ball-squash">
            <circle cx="0" cy="0" r="24" fill={PAPER} />
            <g clipPath="url(#sp-ball-clip)">
              <g className="anim-ball-spin" fill={INK}>
                <path d={PENTAGON} />
                {OUTER_PENTAGONS.map((p, i) => (
                  <path
                    key={i}
                    d={PENTAGON}
                    transform={`translate(${p.x} ${p.y}) rotate(36)`}
                  />
                ))}
                {/* Seams linking the panels */}
                <g stroke={INK} strokeWidth="1.6" fill="none" opacity="0.55">
                  <circle cx="0" cy="0" r="15" strokeDasharray="4 7" />
                  <circle cx="0" cy="0" r="23" strokeDasharray="6 9" />
                </g>
              </g>
              <circle cx="0" cy="0" r="24" fill="url(#sp-sheen)" />
            </g>
            <circle cx="0" cy="0" r="24" stroke={INK} strokeWidth="2.5" />
          </g>
        </g>
      </g>

      {/* Speed ticks trailing the ball */}
      <g
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.5"
      >
        <path d="M52 74 h16" className="anim-pulse-soft" />
        <path
          d="M44 88 h10"
          className="anim-pulse-soft"
          style={{ animationDelay: "0.3s" }}
        />
        <path
          d="M58 60 h11"
          className="anim-pulse-soft"
          style={{ animationDelay: "0.6s" }}
        />
      </g>

      {/* Whistle on its lanyard, swinging top-left */}
      <g
        className="anim-wobble"
        style={{ transformBox: "view-box", transformOrigin: "44px 14px" }}
      >
        <path d="M44 14 v6" stroke={tint(55)} strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="44" cy="24" r="5" fill="none" stroke="currentColor" strokeWidth="3" />
        <rect x="14" y="32" width="27" height="13" rx="6.5" fill="currentColor" />
        <circle cx="44" cy="38" r="13" fill="currentColor" />
        <circle cx="44" cy="34" r="3.6" fill={PAPER} />
        <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="anim-pulse-soft">
          <path d="M8 34 h-4" />
          <path d="M9 44 h-5" />
        </g>
      </g>

    </svg>
  );
}

/* ------------------------------------------------------------------ *
 *  Technical — a circuit board pushing current into a chip
 * ------------------------------------------------------------------ */

const TRACES = [
  "M40 44 h34 v22 h22",
  "M40 126 h30 v-24 h26",
  "M220 44 h-32 v26 h-22",
  "M220 126 h-28 v-22 h-26",
  "M130 20 v26",
  "M130 150 v-24",
];

const VIAS = [
  [40, 44],
  [40, 126],
  [220, 44],
  [220, 126],
  [130, 20],
  [130, 150],
] as const;

export function TechScene({ className }: SceneProps) {
  return (
    <svg
      viewBox={CANVAS}
      fill="none"
      className={cn("h-full w-full", className)}
      aria-hidden
    >
      <defs>
        <pattern
          id="tc-dots"
          width="12"
          height="12"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1.5" cy="1.5" r="1.1" fill={tint(22)} />
        </pattern>
        <linearGradient id="tc-chip" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.62" />
        </linearGradient>
        <linearGradient id="tc-board" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.09" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* Board */}
      <rect
        x="12"
        y="12"
        width="236"
        height="146"
        rx="16"
        fill="url(#tc-board)"
        stroke={tint(35)}
        strokeWidth="2"
      />
      <rect
        x="12"
        y="12"
        width="236"
        height="146"
        rx="16"
        fill="url(#tc-dots)"
      />

      {/* Traces, then a bright packet of current running along each */}
      <g strokeLinecap="round" strokeLinejoin="round" fill="none">
        {TRACES.map((d, i) => (
          <path key={`t${i}`} d={d} stroke={tint(34)} strokeWidth="3" />
        ))}
        {TRACES.map((d, i) => (
          <path
            key={`p${i}`}
            d={d}
            stroke="currentColor"
            strokeWidth="3"
            className="anim-trace"
            style={{ animationDelay: `${i * 0.34}s` }}
          />
        ))}
      </g>

      {/* Vias */}
      {VIAS.map(([x, y], i) => (
        <g key={`v${i}`}>
          <circle
            cx={x}
            cy={y}
            r="6"
            fill={PAPER}
            stroke="currentColor"
            strokeWidth="2.5"
          />
          <circle
            cx={x}
            cy={y}
            r="2"
            fill="currentColor"
            className="anim-pulse-soft"
            style={{ animationDelay: `${i * 0.25}s` }}
          />
        </g>
      ))}

      {/* Chip pins */}
      <g stroke="currentColor" strokeWidth="3.5" strokeLinecap="round">
        {[0, 1, 2, 3].map((i) => (
          <path key={`pl${i}`} d={`M88 ${70 + i * 12} h-12`} />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <path key={`pr${i}`} d={`M172 ${70 + i * 12} h12`} />
        ))}
        {[0, 1, 2].map((i) => (
          <path key={`pt${i}`} d={`M${112 + i * 18} 60 v-11`} />
        ))}
        {[0, 1, 2].map((i) => (
          <path key={`pb${i}`} d={`M${112 + i * 18} 122 v11`} />
        ))}
      </g>

      {/* Chip body */}
      <g className="anim-float">
        <rect
          x="88"
          y="58"
          width="84"
          height="66"
          rx="12"
          fill="url(#tc-chip)"
          stroke={INK}
          strokeWidth="2.5"
        />
        <rect
          x="98"
          y="68"
          width="64"
          height="46"
          rx="8"
          fill={INK}
          opacity="0.24"
        />
        {/* Etched die pattern */}
        <g stroke={PAPER} strokeWidth="2" opacity="0.55" strokeLinecap="round">
          <path d="M108 80 h20" />
          <path d="M108 90 h34" />
          <path d="M108 100 h14" />
        </g>
        {/* Status LED */}
        <circle cx="152" cy="78" r="4" fill={PAPER} className="anim-blink" />
        <circle
          cx="152"
          cy="100"
          r="3"
          fill={PAPER}
          opacity="0.5"
          className="anim-blink"
          style={{ animationDelay: "0.7s" }}
        />
      </g>

      {/* Floating terminal */}
      <g className="anim-drift">
        <rect
          x="164"
          y="18"
          width="76"
          height="48"
          rx="9"
          fill={PAPER}
          stroke={INK}
          strokeWidth="2.5"
        />
        <path d="M164 30 h76" stroke={INK} strokeWidth="1.6" opacity="0.35" />
        <g fill="currentColor">
          <circle cx="173" cy="24" r="2.4" />
          <circle cx="181" cy="24" r="2.4" opacity="0.6" />
          <circle cx="189" cy="24" r="2.4" opacity="0.35" />
        </g>
        <g stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
          <path d="M172 40 l5 5 -5 5" />
          <path d="M183 50 h16" opacity="0.6" />
          <path d="M172 58 h30" opacity="0.35" />
        </g>
        <rect
          x="206"
          y="54"
          width="8"
          height="8"
          fill="currentColor"
          className="anim-blink"
        />
      </g>

      {/* Loose bits drifting off the board */}
      <g
        fill="currentColor"
        fontSize="13"
        fontFamily="ui-monospace, monospace"
        fontWeight="700"
        opacity="0.75"
      >
        <text x="26" y="86" className="anim-float">
          1
        </text>
        <text
          x="34"
          y="104"
          className="anim-float"
          style={{ animationDelay: "1.4s" }}
        >
          0
        </text>
        <text
          x="228"
          y="92"
          className="anim-float"
          style={{ animationDelay: "0.8s" }}
        >
          0
        </text>
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ *
 *  Cultural — masks under a spotlight, with notes drifting up
 * ------------------------------------------------------------------ */

const MASK_FACE =
  "M -26,-24 C -26,-33 26,-33 26,-24 C 26,6 15,31 0,31 C -15,31 -26,6 -26,-24 Z";

export function CulturalScene({ className }: SceneProps) {
  return (
    <svg
      viewBox={CANVAS}
      fill="none"
      className={cn("h-full w-full", className)}
      aria-hidden
    >
      <defs>
        <linearGradient id="cu-beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.34" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="cu-mask" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.62" />
        </linearGradient>
        <linearGradient id="cu-stage" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.18" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Spotlight */}
      <path
        d="M96 0 L36 170 L188 170 L136 0 Z"
        fill="url(#cu-beam)"
        className="anim-pulse-soft"
      />

      {/* Curtain swags */}
      <g fill="currentColor" opacity="0.3">
        <path d="M0 0 h58 C 46 20, 20 30, 0 26 Z" />
        <path d="M260 0 h-58 C 214 20, 240 30, 260 26 Z" />
      </g>

      {/* Stage floor */}
      <rect x="0" y="140" width="260" height="30" fill="url(#cu-stage)" />
      <path
        d="M0 140 H260"
        stroke={tint(45)}
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Tragedy mask — set back, tipped away. Placement lives on the outer
          group; the CSS bob would otherwise overwrite the transform attribute. */}
      <g transform="translate(158 92) rotate(9) scale(0.9)">
        <g className="anim-bob" style={{ animationDelay: "0.5s" }}>
          <path d={MASK_FACE} fill={PAPER_2} stroke={INK} strokeWidth="2.5" />
          <path
            d="M-17,-6 Q -11,-14 -5,-6"
            stroke={INK}
            strokeWidth="2.6"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M5,-6 Q 11,-14 17,-6"
            stroke={INK}
            strokeWidth="2.6"
            strokeLinecap="round"
            fill="none"
          />
          <path d="M-13,16 Q 0,4 13,16 Q 0,10 -13,16 Z" fill={INK} />
          <path
            d="M-26,-24 C -26,-33 26,-33 26,-24"
            stroke={INK}
            strokeWidth="2.5"
            fill="none"
          />
          <g stroke={INK} strokeWidth="2" opacity="0.4">
            <path d="M-14,-26 v-5" />
            <path d="M0,-28 v-5" />
            <path d="M14,-26 v-5" />
          </g>
        </g>
      </g>

      {/* Comedy mask — front and centre */}
      <g transform="translate(96 98) rotate(-7)">
        <g className="anim-bob">
          <path
            d={MASK_FACE}
            fill="url(#cu-mask)"
            stroke={INK}
            strokeWidth="2.5"
          />
          <path
            d="M-18,-8 Q -11,-16 -4,-8"
            stroke={INK}
            strokeWidth="2.8"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M4,-8 Q 11,-16 18,-8"
            stroke={INK}
            strokeWidth="2.8"
            strokeLinecap="round"
            fill="none"
          />
          <path d="M-15,6 Q 0,22 15,6 Q 0,13 -15,6 Z" fill={INK} />
          <path
            d="M-15,6 Q 0,13 15,6"
            stroke={PAPER}
            strokeWidth="1.6"
            fill="none"
            opacity="0.7"
          />
          {/* Ribbon ties */}
          <path
            d="M-26,-14 C -40,-8 -44,6 -38,16"
            stroke={INK}
            strokeWidth="2.4"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M26,-14 C 40,-8 44,6 38,16"
            stroke={INK}
            strokeWidth="2.4"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      </g>

      {/* Notes rising out of the wings */}
      <g fill="currentColor">
        {[
          { x: 214, y: 122, d: "0s", s: 1 },
          { x: 232, y: 132, d: "1.1s", s: 0.78 },
          { x: 30, y: 118, d: "2s", s: 0.86 },
        ].map((n, i) => (
          <g key={i} transform={`translate(${n.x} ${n.y}) scale(${n.s})`}>
            <g className="anim-rise" style={{ animationDelay: n.d }}>
              <ellipse
                cx="0"
                cy="0"
                rx="5.4"
                ry="4.2"
                transform="rotate(-22)"
              />
              <path
                d="M5,-1.6 V -19"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <path
                d="M5,-19 C 12,-17 13,-11 10,-8"
                stroke="currentColor"
                strokeWidth="2.4"
                fill="none"
                strokeLinecap="round"
              />
            </g>
          </g>
        ))}
      </g>

      {/* Footlight sparkles */}
      <g fill="currentColor">
        <circle cx="58" cy="150" r="3" className="anim-twinkle" />
        <circle
          cx="130"
          cy="154"
          r="2.4"
          className="anim-twinkle"
          style={{ animationDelay: "0.9s" }}
        />
        <circle
          cx="204"
          cy="150"
          r="3"
          className="anim-twinkle"
          style={{ animationDelay: "1.6s" }}
        />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ *
 *  Initiatives — a launch, plus the numbers going up behind it
 * ------------------------------------------------------------------ */

export function InitiativesScene({ className }: SceneProps) {
  return (
    <svg
      viewBox={CANVAS}
      fill="none"
      className={cn("h-full w-full", className)}
      aria-hidden
    >
      <defs>
        <linearGradient id="in-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={PAPER} />
          <stop offset="55%" stopColor={PAPER} />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.22" />
        </linearGradient>
        <linearGradient id="in-flame" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="in-bars" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.28" />
        </linearGradient>
      </defs>

      {/* Growth bars */}
      <g fill="url(#in-bars)" stroke={INK} strokeWidth="2">
        <rect x="18" y="118" width="20" height="34" rx="5" />
        <rect x="44" y="100" width="20" height="52" rx="5" />
        <rect x="70" y="78" width="20" height="74" rx="5" />
      </g>
      <path
        d="M18 152 H240"
        stroke={tint(45)}
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Trajectory */}
      <path
        d="M96 148 C 118 132, 128 96, 150 70"
        stroke={tint(40)}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="3 9"
      />

      {/* Rocket */}
      <g transform="translate(168 78) rotate(24)">
        <g className="anim-float">
          {/* Exhaust */}
          <g className="anim-pulse-soft" style={{ transformOrigin: "50% 0%" }}>
            <path
              d="M-10,22 Q 0,62 10,22 Q 0,32 -10,22 Z"
              fill="url(#in-flame)"
            />
            <path
              d="M-5,22 Q 0,44 5,22 Q 0,28 -5,22 Z"
              fill={PAPER}
              opacity="0.7"
            />
          </g>
          {/* Fins */}
          <path
            d="M14,4 L30,26 L14,22 Z"
            fill="currentColor"
            stroke={INK}
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M-14,4 L-30,26 L-14,22 Z"
            fill="currentColor"
            stroke={INK}
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          {/* Body */}
          <path
            d="M0,-38 C 11,-22 15,-4 15,10 L 15,22 L -15,22 L -15,10 C -15,-4 -11,-22 0,-38 Z"
            fill="url(#in-body)"
            stroke={INK}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <circle
            cx="0"
            cy="-8"
            r="7"
            fill="currentColor"
            stroke={INK}
            strokeWidth="2.5"
          />
          <path d="M-15 14 H15" stroke={INK} strokeWidth="2.2" opacity="0.5" />
        </g>
      </g>

      {/* Idea bulb, top-left */}
      <g transform="translate(48 40)">
        <g className="anim-bob">
          <path
            d="M0,-20 a18,18 0 0 1 11,32 v6 h-22 v-6 a18,18 0 0 1 11,-32 z"
            fill="currentColor"
            stroke={INK}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path
            d="M-9,20 h18 M-7,26 h14"
            stroke={INK}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M0,10 V -6 M-5,-2 L0,-6 L5,-2"
            stroke={PAPER}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <g
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="anim-pulse-soft"
          >
            <path d="M-26,-24 l-7,-6" />
            <path d="M26,-24 l7,-6" />
            <path d="M0,-34 v-9" />
          </g>
        </g>
      </g>

      {/* Handshake of nodes — the network the cell builds */}
      <g transform="translate(210 128)">
        <g stroke={tint(50)} strokeWidth="2">
          <path d="M-24,6 L0,-12 L24,6" />
          <path d="M-24,6 L24,6" />
        </g>
        <circle
          cx="-24"
          cy="6"
          r="6"
          fill="currentColor"
          stroke={INK}
          strokeWidth="2"
        />
        <circle
          cx="24"
          cy="6"
          r="6"
          fill="currentColor"
          stroke={INK}
          strokeWidth="2"
        />
        <circle
          cx="0"
          cy="-12"
          r="7"
          fill={PAPER}
          stroke={INK}
          strokeWidth="2.5"
          className="anim-pulse-soft"
        />
      </g>

      {/* Stars */}
      <g fill="currentColor">
        <path
          d="M126 26 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 z"
          className="anim-twinkle"
        />
        <path
          d="M228 44 l2.4 6 6 2.4 -6 2.4 -2.4 6 -2.4 -6 -6 -2.4 6 -2.4 z"
          className="anim-twinkle"
          style={{ animationDelay: "1.2s" }}
        />
        <circle
          cx="106"
          cy="60"
          r="2.4"
          className="anim-twinkle"
          style={{ animationDelay: "0.6s" }}
        />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ *
 *  Lookup + loose decorative doodles
 * ------------------------------------------------------------------ */

export const SCENES: Record<
  CategoryKey,
  (props: SceneProps) => React.ReactElement
> = {
  technical: TechScene,
  sports: SportsScene,
  cultural: CulturalScene,
  initiatives: InitiativesScene,
};

export function Scene({
  category,
  className,
}: {
  category: CategoryKey;
  className?: string;
}) {
  const Component = SCENES[category] ?? TechScene;
  return <Component className={className} />;
}
