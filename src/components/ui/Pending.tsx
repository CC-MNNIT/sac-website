import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The brief names a great many sections the Institute has not supplied content
 * for yet. Rather than filling them with invented text — or showing a bare
 * zero — the section is built and this stands in its place: a clear
 * "Updating soon" marker naming what is coming and, per §20, who supplies it.
 */
export function Pending({
  what,
  who,
  className,
  children,
}: {
  /** What is on its way, e.g. "Practice schedule". */
  what: ReactNode;
  /** §20 — who supplies it. */
  who?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border-2 border-dashed border-line-strong bg-surface-2 p-5",
        className,
      )}
    >
      {/* A quiet barber-stripe corner, so the block reads as deliberate
          rather than as something that failed to load. */}
      <span
        className="pointer-events-none absolute -right-6 -top-6 size-24 rotate-12 opacity-[0.12]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, var(--brand) 0 5px, transparent 5px 11px)",
        }}
        aria-hidden
      />

      <UpdatingSoon />

      <p className="mt-3 text-sm leading-relaxed text-ink-muted">
        <span className="font-bold text-ink">{what}</span>
        {who ? <> — to be supplied by the {who}.</> : "."}
      </p>

      {children ? <div className="mt-3 text-sm text-ink-muted">{children}</div> : null}
    </div>
  );
}

/** The shared "Updating soon" badge — one look everywhere it appears. */
export function UpdatingSoon({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border-2 border-line-strong bg-surface px-3 py-1 label-caps text-[0.62rem] text-brand shadow-[2px_2px_0_0_var(--sticker)]",
        className,
      )}
    >
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-70" />
        <span className="relative inline-flex size-2 rounded-full bg-accent" />
      </span>
      Updating soon
    </span>
  );
}

/**
 * A single empty field inside a table or a dense list. Repeating the full
 * badge in every cell would be noise, so this is the quiet version.
 */
export function Blank({ label }: { label?: string }) {
  return (
    <span
      className="text-xs italic text-ink-subtle"
      title={label ? `${label} — updating soon` : "Updating soon"}
    >
      Updating soon
    </span>
  );
}

/**
 * A count badge that never renders a bare zero — when there is nothing to
 * count yet it says so instead.
 */
export function CountBadge({
  value,
  color = "var(--brand)",
}: {
  value: number;
  color?: string;
}) {
  if (value > 0) {
    return (
      <span
        className="rounded-full border-2 border-line-strong px-2 py-0.5 text-xs font-bold tabular-nums"
        style={{ color, backgroundColor: `color-mix(in oklab, ${color} 14%, var(--surface))` }}
      >
        {value}
      </span>
    );
  }
  return <UpdatingSoon />;
}
