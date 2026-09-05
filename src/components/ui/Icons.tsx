import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/**
 * Hand-drawn inline SVG set — keeps the bundle free of an icon package.
 * Everything is 24x24, stroke-based and inherits `currentColor`.
 */
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const solid = { viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true };

/* ---------------------------------- UI ---------------------------------- */

export const Sun = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

export const Moon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
  </svg>
);

export const Menu = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const Close = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const ArrowRight = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ArrowLeft = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M19 12H5M11 18l-6-6 6-6" />
  </svg>
);

export const ArrowUp = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </svg>
);

export const ChevronDown = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const External = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M14 4h6v6M20 4l-8.5 8.5" />
    <path d="M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" />
  </svg>
);

export const Search = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

export const Quote = (p: IconProps) => (
  <svg {...solid} {...p}>
    <path d="M9.5 5.5C6.5 7 5 9.6 5 13.2V19h6v-6H8.4c.2-2 1.2-3.4 3-4.4l-1.9-3.1Zm9 0C15.5 7 14 9.6 14 13.2V19h6v-6h-2.6c.2-2 1.2-3.4 3-4.4l-1.9-3.1Z" />
  </svg>
);

export const Sparkle = (p: IconProps) => (
  <svg {...solid} {...p}>
    <path d="M12 2.5 13.9 9l6.6 1.9-6.6 1.9L12 19.4l-1.9-6.6L3.5 11 10.1 9 12 2.5ZM19 2l.8 2.7L22.5 5.5 19.8 6.3 19 9l-.8-2.7-2.7-.8 2.7-.8L19 2Z" />
  </svg>
);

export const Calendar = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="16" rx="2.5" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </svg>
);

export const Trophy = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
    <path d="M7 6H4.5A2.5 2.5 0 0 0 7 9M17 6h2.5A2.5 2.5 0 0 1 17 9" />
    <path d="M12 14v3M9 20h6M10 17h4" />
  </svg>
);

export const Users = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3 19c0-3.1 2.7-5 6-5s6 1.9 6 5" />
    <path d="M16 5.5a3.2 3.2 0 0 1 0 5.6M18 19c0-2.4-.9-4-2.4-4.6" />
  </svg>
);

export const Mail = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m3.5 7.5 7.4 5.2a2 2 0 0 0 2.2 0l7.4-5.2" />
  </svg>
);

export const Phone = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6.5 3h2.6l1.4 4-2 1.3a12 12 0 0 0 5.2 5.2l1.3-2 4 1.4v2.6a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z" />
  </svg>
);

export const MapPin = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
);

export const Link = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M10 13.5a4 4 0 0 0 5.7 0l2.8-2.8a4 4 0 0 0-5.7-5.7l-1.4 1.4" />
    <path d="M14 10.5a4 4 0 0 0-5.7 0l-2.8 2.8a4 4 0 0 0 5.7 5.7l1.4-1.4" />
  </svg>
);

/* -------------------------------- Socials -------------------------------- */

export const LinkedIn = (p: IconProps) => (
  <svg {...solid} {...p}>
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95C21.6 8.75 23 11 23 14.4V21h-4v-5.9c0-1.6-.03-3.7-2.2-3.7-2.2 0-2.55 1.7-2.55 3.6V21h-4V9Z" />
  </svg>
);

export const Github = (p: IconProps) => (
  <svg {...solid} {...p}>
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
  </svg>
);

export const Instagram = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="3.8" />
    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
  </svg>
);

export const Facebook = (p: IconProps) => (
  <svg {...solid} {...p}>
    <path d="M14 9V7.2c0-.8.2-1.2 1.4-1.2H17V3h-2.6C11.5 3 10.4 4.6 10.4 7v2H8v3h2.4v9h3.4v-9h2.5l.4-3H14Z" />
  </svg>
);

export const XSocial = (p: IconProps) => (
  <svg {...solid} {...p}>
    <path d="M17.7 3h3.3l-7.2 8.2L22 21h-6.6l-4.4-5.7L5.9 21H2.6l7.7-8.8L2 3h6.8l4 5.3L17.7 3Zm-1.2 16h1.8L7.6 4.8H5.7L16.5 19Z" />
  </svg>
);

/* ------------------------------ Club glyphs ------------------------------ */

export const Terminal = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="4" width="18" height="16" rx="2.5" />
    <path d="m7 9 3 3-3 3M13 15h4" />
  </svg>
);

export const Robot = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="4" y="8" width="16" height="11" rx="3" />
    <path d="M12 4v4M8.5 13h.01M15.5 13h.01M9.5 16.5h5M2 12v3M22 12v3" />
  </svg>
);

export const Plane = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M10.5 13.5 3 11l1-2 8 1.5 4.4-4.4a2.3 2.3 0 0 1 3.3 3.3L15.2 14l1.5 8-2 1-2.5-7.5-3 3 .2 2.6-1.5.9-1.6-3.2-3.2-1.6.9-1.5 2.6.2 3-3Z" />
  </svg>
);

export const Star = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v3M12 19v3M4.2 7l2.6 1.5M17.2 15.5 19.8 17M4.2 17l2.6-1.5M17.2 8.5 19.8 7" />
  </svg>
);

export const Cricket = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M14.5 3.5 20 9l-8 8-5.5-5.5 8-8Z" />
    <path d="M6.5 11.5 3 15l6 6 3.5-3.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

export const Chess = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M9 3h6l-1 3h2l-2 5h1l1 6H8l1-6h1L8 6h2L9 3Z" />
    <path d="M6 21h12" />
  </svg>
);

export const TableTennis = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M13.5 3a6.5 6.5 0 0 0-6 9l-3 3a2.1 2.1 0 0 0 3 3l3-3a6.5 6.5 0 0 0 3-12Z" />
    <circle cx="18" cy="16" r="2.2" />
  </svg>
);

export const Tennis = (p: IconProps) => (
  <svg {...base} {...p}>
    <ellipse cx="10.5" cy="8.5" rx="5.5" ry="6.5" transform="rotate(-30 10.5 8.5)" />
    <path d="m13.5 13.5 5 6.5" />
    <path d="M6 6c3 2 6 6 8 9" />
  </svg>
);

export const Kabaddi = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="15" cy="4.6" r="1.9" />
    <path d="M16.5 8.5 12 11l-3.5-2M16.5 8.5 18 13l-2 3 1 5M16.5 8.5 14 15l-4.5 2.5L7 21" />
  </svg>
);

export const Skate = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 6h5l3 6h7v3H7L4 6Z" />
    <circle cx="8" cy="19" r="2" />
    <circle cx="17" cy="19" r="2" />
  </svg>
);

export const Basketball = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3v18M3 12h18M5.6 5.6c3.6 3.6 3.6 9.2 0 12.8M18.4 5.6c-3.6 3.6-3.6 9.2 0 12.8" />
  </svg>
);

export const Lift = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 9v6M7 7v10M17 7v10M20 9v6M7 12h10" />
  </svg>
);

export const Football = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="m12 7.5 3.6 2.6-1.4 4.2H9.8L8.4 10.1 12 7.5Z" />
    <path d="M12 3v4.5M4.2 9.6l4.2.5M19.8 9.6l-4.2.5M7.2 19.7l2.6-5.4M16.8 19.7l-2.6-5.4" />
  </svg>
);

export const Book = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 4.5A2 2 0 0 1 6 3h13v15H6a2 2 0 0 0-2 2V4.5Z" />
    <path d="M4 20a2 2 0 0 0 2 1h13v-3" />
  </svg>
);

export const Mask = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 6h16v6a8 8 0 0 1-16 0V6Z" />
    <path d="M8.5 11h.01M15.5 11h.01M9 15.5c1.8 1.4 4.2 1.4 6 0" />
  </svg>
);

export const Pen = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M15.5 4.5l4 4L8 20l-5 1 1-5L15.5 4.5Z" />
    <path d="m13.5 6.5 4 4" />
  </svg>
);

export const Network = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="4.5" r="2.2" />
    <circle cx="4.8" cy="18" r="2.2" />
    <circle cx="19.2" cy="18" r="2.2" />
    <path d="M12 6.7v4.8M10.4 12.6 6.4 16M13.6 12.6l4 3.4" />
  </svg>
);

export const Rocket = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M14 4c3.5 1 5.5 4 6 7.5-3 3-6 5-9 6l-3-3c1-3 3-6 6-9 0 0 0 0 0 0Z" />
    <circle cx="14.5" cy="9.5" r="1.6" />
    <path d="m8 16-3 3M5.5 13.5 4 15M10.5 18.5 9 20" />
  </svg>
);

export const Mentor = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="8.5" cy="7" r="2.8" />
    <path d="M3 19c0-3 2.5-4.8 5.5-4.8S14 16 14 19" />
    <path d="M17 6.5 19 8.5 22.5 5" />
    <path d="M17.5 12.5h4M17.5 16h4" />
  </svg>
);

export const Chip = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="7" y="7" width="10" height="10" rx="2" />
    <path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4" />
  </svg>
);

export const Music = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M9 18V5l11-2v13" />
    <circle cx="6.5" cy="18" r="2.5" />
    <circle cx="17.5" cy="16" r="2.5" />
  </svg>
);

export const Veena = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="8" cy="16" r="5" />
    <path d="M11.5 12.5 20 4M17 3h4v4" />
    <path d="M8 11v10M5 16h6" />
  </svg>
);

export const Run = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="14.5" cy="4.6" r="1.9" />
    <path d="M8 21l3-5 3-2-1-4-3 2-2 3" />
    <path d="m13 10 3.5 2 .5 4M6 11l3-2" />
  </svg>
);

export const Yoga = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="4.5" r="2" />
    <path d="M12 7v6M12 13l-5 5M12 13l5 5M5 11h14" />
  </svg>
);

export const Building = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 21V6l7-3 7 3v15" />
    <path d="M2 21h20M9 21v-4h4v4M8 9h.01M12 9h.01M8 13h.01M12 13h.01" />
  </svg>
);

/* --------------------------- Lookup by data key --------------------------- */

const ICON_MAP: Record<string, (p: IconProps) => React.ReactElement> = {
  terminal: Terminal,
  robot: Robot,
  plane: Plane,
  star: Star,
  cricket: Cricket,
  chess: Chess,
  tt: TableTennis,
  tennis: Tennis,
  kabaddi: Kabaddi,
  skate: Skate,
  basketball: Basketball,
  lift: Lift,
  football: Football,
  book: Book,
  mask: Mask,
  pen: Pen,
  network: Network,
  rocket: Rocket,
  mentor: Mentor,
  chip: Chip,
  music: Music,
  veena: Veena,
  trophy: Trophy,
  run: Run,
  yoga: Yoga,
  building: Building,
  users: Users,
  facebook: Facebook,
  instagram: Instagram,
  x: XSocial,
  linkedin: LinkedIn,
  github: Github,
};

export function Icon({ name, ...props }: IconProps & { name: string }) {
  const Component = ICON_MAP[name] ?? Sparkle;
  return <Component {...props} />;
}
