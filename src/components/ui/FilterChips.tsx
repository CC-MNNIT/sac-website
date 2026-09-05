"use client";

import { cn } from "@/lib/utils";

export interface Chip {
  key: string;
  label: string;
  count?: number;
  color?: string;
}

/** The filter row used by the activity, archive and Hall of Fame explorers. */
export function FilterChips({
  chips,
  value,
  onChange,
  label,
  size = "md",
}: {
  chips: Chip[];
  value: string;
  onChange: (key: string) => void;
  label: string;
  size?: "sm" | "md";
}) {
  return (
    <div
      role="tablist"
      aria-label={label}
      className="hide-scrollbar flex gap-2 overflow-x-auto px-1.5 py-2.5 -mx-1.5 -my-2.5"
    >
      {chips.map((chip) => {
        const selected = chip.key === value;
        const color = chip.color ?? "var(--ink)";
        return (
          <button
            key={chip.key}
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(chip.key)}
            className={cn(
              "shrink-0 rounded-full border-2 border-line-strong font-bold transition-all duration-250 ease-[cubic-bezier(0.34,1.4,0.64,1)]",
              size === "sm" ? "px-3.5 py-1.5 text-xs" : "px-4 py-2 text-sm",
              selected
                ? "translate-x-0.5 translate-y-0.5 shadow-none"
                : "bg-surface text-ink-muted shadow-[3px_3px_0_0_var(--sticker)] hover:-translate-y-1 hover:text-ink hover:shadow-[5px_6px_0_0_var(--sticker)]",
            )}
            style={
              selected
                ? { backgroundColor: color, color: color === "var(--ink)" ? "var(--bg)" : "#fff" }
                : undefined
            }
          >
            {chip.label}
            {chip.count !== undefined ? (
              <span
                className={cn(
                  "ml-2 text-xs font-medium tabular-nums",
                  selected ? "opacity-75" : "text-ink-subtle",
                )}
              >
                {chip.count}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
