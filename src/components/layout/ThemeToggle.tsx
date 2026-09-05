"use client";

import { useTheme } from "@/components/providers/ThemeProvider";
import { Moon, Sun } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme, mounted } = useTheme();
  const isDark = mounted && theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
      className={cn(
        "group grid size-10 place-items-center overflow-hidden rounded-xl border-2 border-line-strong bg-surface text-ink shadow-[3px_3px_0_0_var(--sticker)] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none",
        className,
      )}
    >
      {/* The two faces sit on a strip that slides by exactly one cell height,
          so the icon rolls over rather than blinking out of existence. */}
      <span
        className="block h-9 w-5 transition-transform duration-400 ease-[cubic-bezier(0.34,1.4,0.64,1)]"
        style={{ transform: isDark ? "translateY(-2.25rem)" : "none" }}
      >
        <span className="grid h-9 place-items-center">
          <Sun className="size-5 text-accent" />
        </span>
        <span className="grid h-9 place-items-center">
          <Moon className="size-5 text-brand" />
        </span>
      </span>
    </button>
  );
}
