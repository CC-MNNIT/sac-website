"use client";

import { Close, Search } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export function SearchInput({
  value,
  onChange,
  placeholder,
  label,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-subtle" />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={label}
        className="h-11 w-full rounded-2xl border-2 border-line-strong bg-surface pl-10 pr-10 text-sm text-ink outline-none transition placeholder:text-ink-subtle focus:border-brand"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-subtle transition hover:text-ink"
        >
          <Close className="size-4" />
        </button>
      ) : null}
    </div>
  );
}
