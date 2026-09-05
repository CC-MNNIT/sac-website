import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  children,
  color,
  className,
}: {
  children: ReactNode;
  /** Any CSS colour — usually a category token like var(--cat-sports). */
  color?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border-2 border-line-strong px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-[0.1em]",
        className,
      )}
      style={
        color
          ? {
              color,
              backgroundColor: `color-mix(in oklab, ${color} 16%, var(--surface))`,
            }
          : { backgroundColor: "var(--surface)" }
      }
    >
      {children}
    </span>
  );
}
