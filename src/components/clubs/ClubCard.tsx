import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Icon, Trophy } from "@/components/ui/Icons";
import type { Club } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ClubCard({ club, priority = false }: { club: Club; priority?: boolean }) {
  const color = `var(--cat-${club.category})`;
  // Club logos must not be cropped; only real photographs fill the frame.
  const isLogo = club.imageFit === "contain";

  return (
    <Link
      href={`/clubs/${club.slug}`}
      className="sticker-accent group relative flex h-full flex-col overflow-hidden rounded-3xl bg-surface"
      style={{ ["--card-accent" as string]: color }}
    >
      <div
        className={cn(
          "relative aspect-[16/10] overflow-hidden border-b-2 border-line-strong",
          isLogo ? (club.imageBg === "dark" ? "bg-ink p-8" : "bg-surface-2 p-8") : "bg-surface-3",
        )}
      >
        {/* Colour wash that lifts as the card is approached */}
        <span
          className="absolute inset-0 z-[1] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ backgroundColor: `color-mix(in oklab, ${color} 22%, transparent)` }}
          aria-hidden
        />

        {club.image ? (
          <Image
            src={club.image}
            alt={club.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={cn(
              "transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]",
              isLogo ? "object-contain" : "object-cover",
            )}
          />
        ) : (
          /* No logo supplied yet — an icon tile rather than an empty frame. */
          <span
            className="absolute inset-0 grid place-items-center bg-dot-grid"
            style={{ color }}
            aria-hidden
          >
            <Icon name={club.icon} className="size-16 opacity-70" />
          </span>
        )}

        {!isLogo ? (
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        ) : null}

        {/* Category chip */}
        <span
          className="absolute left-3.5 top-3.5 z-10 inline-flex items-center gap-1.5 rounded-full border-2 border-line-strong px-2.5 py-1 label-caps text-[0.62rem]"
          style={{ backgroundColor: color, color: "#fff" }}
        >
          <Icon name={club.icon} className="size-3.5" />
          {club.categoryLabel}
        </span>
      </div>

      <div className="relative flex flex-1 flex-col p-5 sm:p-6">
        {/* Icon medallion straddling the seam — tips upright on hover */}
        <span
          className="absolute -top-7 right-5 grid size-14 -rotate-6 place-items-center rounded-2xl border-2 border-line-strong shadow-[3px_3px_0_0_var(--sticker)] transition-transform duration-400 ease-[cubic-bezier(0.34,1.5,0.64,1)] group-hover:rotate-6 group-hover:scale-110"
          style={{ backgroundColor: "var(--surface)", color }}
          aria-hidden
        >
          <Icon name={club.icon} className="size-7" />
        </span>

        <h3 className="max-w-[calc(100%-4rem)] text-xl leading-snug">{club.name}</h3>

        {club.tagline ? (
          <p className="mt-1.5 text-sm font-semibold" style={{ color }}>
            {club.tagline}
          </p>
        ) : null}

        <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-ink-muted">
          {club.description}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3">
          {club.achievements.length > 0 ? (
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold tabular-nums"
              style={{
                color,
                backgroundColor: `color-mix(in oklab, ${color} 14%, transparent)`,
              }}
            >
              <Trophy className="size-3.5" />
              {club.achievements.length}
            </span>
          ) : (
            <span aria-hidden />
          )}

          <span
            className="relative grid size-9 place-items-center overflow-hidden rounded-full border-2 border-line-strong text-ink transition-colors duration-300 group-hover:text-white"
            style={{ backgroundColor: "var(--surface)" }}
          >
            <span
              className="absolute inset-0 scale-0 rounded-full transition-transform duration-300 ease-[cubic-bezier(0.34,1.5,0.64,1)] group-hover:scale-100"
              style={{ backgroundColor: color }}
              aria-hidden
            />
            <ArrowRight className="relative size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
