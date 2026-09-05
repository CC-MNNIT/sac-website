"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Close } from "@/components/ui/Icons";
import { useLockBodyScroll } from "@/lib/hooks";
import type { GalleryEvent } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Every photograph laid out in CSS columns rather than a fixed grid: the
 * source shots run from 16:9 through 4:3 to portrait, and columns let each
 * one keep its own shape instead of being cropped into a common frame.
 */
export function PhotoGallery({ events }: { events: GalleryEvent[] }) {
  // A single flat list backs the lightbox, so next/previous walks the whole
  // gallery rather than stopping at an event boundary.
  const flat = events.flatMap((event) =>
    event.photos.map((photo) => ({ ...photo, event: event.name, color: event.color })),
  );

  const [open, setOpen] = useState<number | null>(null);
  useLockBodyScroll(open !== null);

  const step = useCallback(
    (delta: number) =>
      setOpen((current) =>
        current === null ? null : (current + delta + flat.length) % flat.length,
      ),
    [flat.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  /* Where each event's photos start in the flat list, so a thumbnail knows
     its own position without a counter mutating during render. */
  const offsets = events.reduce<number[]>((acc, event, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + events[i - 1].photos.length);
    return acc;
  }, []);

  const active = open === null ? null : flat[open];

  return (
    <>
      <div className="space-y-16 sm:space-y-20">
        {events.map((event, eventIndex) => (
          <section key={event.slug} id={event.slug} className="scroll-mt-28">
            <div className="flex items-center gap-4 border-b-2 border-line-strong pb-5">
              <span
                className="size-4 shrink-0 rounded-full border-2 border-line-strong"
                style={{ backgroundColor: event.color }}
                aria-hidden
              />
              <h2 className="text-xl sm:text-2xl">{event.name}</h2>
              <span
                className="ml-auto font-display text-lg font-bold tabular-nums"
                style={{ color: event.color }}
              >
                {String(event.photos.length).padStart(2, "0")}
              </span>
            </div>

            <div className="mt-7 columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
              {event.photos.map((photo, i) => {
                const position = offsets[eventIndex] + i;
                return (
                  <button
                    key={photo.src}
                    type="button"
                    onClick={() => setOpen(position)}
                    aria-label={`Open ${event.name} photograph ${position + 1}`}
                    className="group block w-full break-inside-avoid overflow-hidden rounded-2xl border-2 border-line-strong shadow-[4px_4px_0_0_var(--sticker)] transition-transform duration-300 ease-[cubic-bezier(0.34,1.4,0.64,1)] hover:-translate-x-0.5 hover:-translate-y-1.5 hover:shadow-[7px_8px_0_0_var(--sticker)] active:translate-y-0.5 active:shadow-none"
                  >
                    <Image
                      src={photo.src}
                      alt={`${event.name}, MNNIT Allahabad`}
                      width={photo.width}
                      height={photo.height}
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* Lightbox */}
      {active ? (
        <div
          className="fixed inset-0 z-[60] flex flex-col bg-ink/95 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${active.event} photograph`}
          onClick={() => setOpen(null)}
        >
          <div className="flex shrink-0 items-center justify-between gap-4">
            <span
              className="rounded-full border-2 px-3.5 py-1.5 label-caps text-bg"
              style={{ borderColor: active.color, backgroundColor: active.color }}
            >
              {active.event}
            </span>

            <span className="ml-auto font-display text-sm font-bold tabular-nums text-bg/70">
              <span className="text-bg">{String((open ?? 0) + 1).padStart(2, "0")}</span>
              {" / "}
              {String(flat.length).padStart(2, "0")}
            </span>

            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Close"
              className="grid size-10 place-items-center rounded-full border-2 border-bg text-bg transition-transform duration-200 hover:scale-110 active:scale-95"
            >
              <Close className="size-5" />
            </button>
          </div>

          <div
            className="relative mt-4 flex min-h-0 flex-1 items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              key={active.src}
              src={active.src}
              alt={`${active.event}, MNNIT Allahabad`}
              width={active.width}
              height={active.height}
              sizes="100vw"
              className="max-h-full w-auto max-w-full animate-pop-in rounded-2xl border-2 border-bg/20 object-contain"
            />
          </div>

          <div
            className="mt-4 flex shrink-0 items-center justify-center gap-3"
            onClick={(event) => event.stopPropagation()}
          >
            {[
              { label: "Previous photograph", delta: -1, Icon: ArrowLeft },
              { label: "Next photograph", delta: 1, Icon: ArrowRight },
            ].map(({ label, delta, Icon }) => (
              <button
                key={label}
                type="button"
                onClick={() => step(delta)}
                aria-label={label}
                className={cn(
                  "grid size-12 place-items-center rounded-full border-2 border-bg text-bg transition-transform duration-200 active:scale-95",
                  delta < 0 ? "hover:-translate-x-1" : "hover:translate-x-1",
                )}
              >
                <Icon className="size-5" />
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
