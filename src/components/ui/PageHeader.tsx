import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

/* Shown when a page does not name its own set. */
const DEFAULT_IMAGES = [
  "/images/gallery/culrav/culrav-01.webp",
  "/images/gallery/avishkar/avishkar-05.webp",
  "/images/gallery/chitrasangam/chitrasangam-and-eloquence-07.webp",
];

/* Each photo is tilted a little differently so the stack reads as a handful
   of prints dropped on the page rather than a tidy grid. */
const TILT = ["-rotate-3", "rotate-2", "-rotate-1"];

export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumb,
  images = DEFAULT_IMAGES,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  breadcrumb?: { label: string; href?: string }[];
  /** Two or three photographs for the band. Pass [] for a text-only header. */
  images?: string[];
  children?: ReactNode;
}) {
  const shown = images.slice(0, 3);

  return (
    <header className="relative overflow-hidden border-b-2 border-line-strong bg-bg-tint pb-16 pt-32 sm:pb-20 sm:pt-40">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-70" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
        style={{ background: "linear-gradient(to top, var(--bg-tint), transparent)" }}
      />

      <div
        className={cn(
          "container-page relative",
          shown.length > 0 && "lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-14",
        )}
      >
        <div className="min-w-0">
          {breadcrumb ? (
            <Reveal>
              <nav aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink-subtle">
                  {breadcrumb.map((crumb, i) => (
                    <li key={crumb.label} className="flex items-center gap-1.5">
                      {i > 0 ? <span aria-hidden>/</span> : null}
                      {crumb.href ? (
                        <Link href={crumb.href} className="transition hover:text-brand">
                          {crumb.label}
                        </Link>
                      ) : (
                        <span className="text-ink-muted">{crumb.label}</span>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            </Reveal>
          ) : null}

          <Reveal delay={60}>
            <span className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-line-strong bg-surface px-3.5 py-1.5 label-caps text-brand shadow-[3px_3px_0_0_var(--sticker)]">
              <span className="size-2 rounded-full bg-accent" aria-hidden />
              {eyebrow}
            </span>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="mt-5 max-w-3xl text-[2.4rem] leading-[1.06] sm:text-[3.2rem] lg:text-[3.6rem]">
              {title}
            </h1>
          </Reveal>

          {description ? (
            <Reveal delay={180}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
                {description}
              </p>
            </Reveal>
          ) : null}

          {children ? <Reveal delay={240}>{children}</Reveal> : null}
        </div>

        {/* Photographs — a fanned stack beside the title on wide screens, a
            plain row underneath it on narrow ones. */}
        {shown.length > 0 ? (
          <Reveal
            variant="pop"
            delay={200}
            className="mt-10 flex justify-start gap-3 sm:gap-4 lg:mt-0 lg:shrink-0"
          >
            {shown.map((src, i) => (
              <span
                key={src}
                className={cn(
                  "relative block aspect-[4/5] w-1/3 shrink-0 overflow-hidden rounded-2xl border-2 border-line-strong bg-surface-2 shadow-[5px_5px_0_0_var(--sticker)]",
                  "transition-transform duration-400 ease-[cubic-bezier(0.34,1.5,0.64,1)] hover:-translate-y-2 hover:rotate-0",
                  "sm:w-32 lg:w-28 xl:w-36",
                  TILT[i % TILT.length],
                )}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 33vw, 9rem"
                  className="object-cover"
                />
              </span>
            ))}
          </Reveal>
        ) : null}
      </div>
    </header>
  );
}
