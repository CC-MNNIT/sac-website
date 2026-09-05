import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icons";
import type { MajorEvent } from "@/lib/types";
import { cn } from "@/lib/utils";

const CATEGORY_COLOR: Record<string, string> = {
  Technical: "var(--cat-technical)",
  Cultural: "var(--cat-cultural)",
  Sports: "var(--cat-sports)",
};

/** §19 — Photograph + Heading + 2–3 lines + Explore button. */
export function EventCard({ event, featured = false }: { event: MajorEvent; featured?: boolean }) {
  const color = CATEGORY_COLOR[event.category] ?? "var(--brand)";
  const years = event.editions.map((e) => e.year);

  return (
    <Link
      href={`/events/${event.slug}`}
      className={cn(
        "sticker sticker-hover group flex h-full flex-col overflow-hidden rounded-3xl bg-surface",
        featured && "md:flex-row",
      )}
      style={{ ["--card-accent" as string]: color }}
    >
      <div
        className={cn(
          "relative border-line-strong bg-surface-2",
          featured
            ? "aspect-[16/10] border-b-2 md:aspect-auto md:w-[46%] md:border-b-0 md:border-r-2"
            : "aspect-[16/10] border-b-2",
        )}
      >
        {event.image ? (
          <Image
            src={event.image}
            alt=""
            fill
            sizes={featured ? "(max-width: 768px) 100vw, 46vw" : "(max-width: 640px) 100vw, 33vw"}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <span className="absolute inset-0 grid place-items-center bg-dot-grid" style={{ color }} aria-hidden>
            <Icon name="trophy" className="size-12 opacity-60" />
          </span>
        )}

        {event.category ? (
          <span
            className="absolute left-3 top-3 rounded-full border-2 border-line-strong bg-surface px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.1em]"
            style={{ color }}
          >
            {event.category}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className={cn("leading-snug", featured ? "text-2xl sm:text-3xl" : "text-lg")}>
          {event.title}
        </h3>

        {event.subtitle ? (
          <p className="mt-1.5 text-sm font-semibold" style={{ color }}>
            {event.subtitle}
          </p>
        ) : null}

        <p className={cn("mt-3 flex-1 text-sm leading-relaxed text-ink-muted", featured ? "line-clamp-4" : "line-clamp-3")}>
          {event.about[0] ??
            (years.length > 0
              ? `Editions recorded for ${years.join(", ")}.`
              : "A major event of the Student Activity Centre. Its year-wise record is being compiled.")}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-xs">
          <span className="text-ink-subtle">
            {years.length > 0
              ? `${years.length} edition${years.length > 1 ? "s" : ""} archived`
              : "Archive to be compiled"}
          </span>
          <span className="font-bold transition-transform duration-250 group-hover:translate-x-0.5" style={{ color }}>
            Explore →
          </span>
        </div>
      </div>
    </Link>
  );
}
