"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ClubCard } from "@/components/clubs/ClubCard";
import { Close, Search } from "@/components/ui/Icons";
import type { CategoryKey, Club } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Category {
  key: CategoryKey;
  label: string;
  blurb: string;
}

type Filter = CategoryKey | "all";

export function ClubsExplorer({
  clubs,
  categories,
}: {
  clubs: Club[];
  categories: Category[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initial = (searchParams.get("category") as Filter) || "all";
  const [filter, setFilter] = useState<Filter>(
    categories.some((category) => category.key === initial) ? initial : "all",
  );
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return clubs.filter((club) => {
      const matchesCategory = filter === "all" || club.category === filter;
      const matchesQuery =
        !needle ||
        club.name.toLowerCase().includes(needle) ||
        club.tagline.toLowerCase().includes(needle) ||
        club.description.toLowerCase().includes(needle) ||
        club.categoryLabel.toLowerCase().includes(needle);
      return matchesCategory && matchesQuery;
    });
  }, [clubs, filter, query]);

  const select = (next: Filter) => {
    setFilter(next);
    // Keep the URL shareable without a full navigation.
    const url = next === "all" ? "/clubs" : `/clubs?category=${next}`;
    router.replace(url, { scroll: false });
  };

  const chips: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: "All clubs", count: clubs.length },
    ...categories.map((category) => ({
      key: category.key as Filter,
      label: category.label,
      count: clubs.filter((club) => club.category === category.key).length,
    })),
  ];

  return (
    <>
      {/* Controls */}
      <div className="sticky top-18 z-30 -mx-5 border-b-2 border-line-strong bg-bg px-5 py-4 sm:mx-0 sm:rounded-3xl sm:border-2 sm:px-5 sm:shadow-[4px_4px_0_0_var(--sticker)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div
            role="tablist"
            aria-label="Filter clubs by category"
            className="hide-scrollbar flex gap-2 overflow-x-auto px-1.5 py-2.5 -mx-1.5 -my-2.5"
          >
            {chips.map((chip) => {
              const selected = chip.key === filter;
              return (
                <button
                  key={chip.key}
                  role="tab"
                  aria-selected={selected}
                  onClick={() => select(chip.key)}
                  className={cn(
                    "shrink-0 rounded-full border-2 border-line-strong px-4 py-2 text-sm font-bold transition-all duration-250 ease-[cubic-bezier(0.34,1.4,0.64,1)]",
                    selected
                      ? "translate-x-0.5 translate-y-0.5 text-white shadow-none"
                      : "bg-surface text-ink-muted shadow-[3px_3px_0_0_var(--sticker)] hover:-translate-y-1 hover:text-ink hover:shadow-[5px_6px_0_0_var(--sticker)]",
                  )}
                  style={
                    selected
                      ? {
                          backgroundColor:
                            chip.key === "all" ? "var(--ink)" : `var(--cat-${chip.key})`,
                          color: chip.key === "all" ? "var(--bg)" : "#fff",
                        }
                      : undefined
                  }
                >
                  {chip.label}
                  <span
                    className={cn(
                      "ml-2 text-xs font-medium tabular-nums",
                      selected ? "opacity-70" : "text-ink-subtle",
                    )}
                  >
                    {chip.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative lg:w-72">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-subtle" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search clubs…"
              aria-label="Search clubs"
              className="h-11 w-full rounded-2xl border-2 border-line-strong bg-surface pl-10 pr-10 text-sm text-ink outline-none transition placeholder:text-ink-subtle focus:border-brand"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-subtle transition hover:text-ink"
              >
                <Close className="size-4" />
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {/* Results */}
      <p className="mt-8 text-sm text-ink-subtle" aria-live="polite">
        Showing <span className="font-semibold text-ink">{results.length}</span> of {clubs.length}{" "}
        clubs
      </p>

      {results.length > 0 ? (
        <div
          key={`${filter}-${query}`}
          className="mt-6 grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
        >
          {results.map((club, i) => (
            <div
              key={club.slug}
              className="animate-pop-in"
              style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}
            >
              <ClubCard club={club} priority={i < 3} />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-4xl border-2 border-dashed border-line-strong bg-surface px-6 py-16 text-center">
          <p className="font-display text-xl">No clubs match that search.</p>
          <p className="mt-2 text-sm text-ink-muted">
            Try a different word, or clear the filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              select("all");
            }}
            className="mt-6 rounded-full border-2 border-line-strong bg-surface px-5 py-2.5 text-sm font-bold shadow-[4px_4px_0_0_var(--sticker)] transition-transform duration-250 hover:-translate-y-1 active:translate-y-0.5 active:shadow-none"
          >
            Reset filters
          </button>
        </div>
      )}
    </>
  );
}
