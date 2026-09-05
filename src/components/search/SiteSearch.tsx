"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { EmptyState } from "@/components/ui/EmptyState";
import { FilterChips } from "@/components/ui/FilterChips";
import { SearchInput } from "@/components/ui/SearchInput";
import type { SearchDoc } from "@/lib/data";

/** §19 — search across every activity, club, event, result and page. */
export function SiteSearch({ index }: { index: SearchDoc[] }) {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState("all");

  const kinds = useMemo(() => [...new Set(index.map((d) => d.kind))], [index]);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return [];
    const words = needle.split(/\s+/);
    return index
      .filter((d) => words.every((word) => d.haystack.includes(word)))
      .filter((d) => kind === "all" || d.kind === kind)
      .slice(0, 60);
  }, [index, query, kind]);

  const counts = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return {} as Record<string, number>;
    const words = needle.split(/\s+/);
    const matched = index.filter((d) => words.every((word) => d.haystack.includes(word)));
    const map: Record<string, number> = {};
    matched.forEach((d) => (map[d.kind] = (map[d.kind] ?? 0) + 1));
    return map;
  }, [index, query]);

  const matchedTotal = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <>
      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="Search activities, clubs, events, results, facilities…"
        label="Search the site"
        className="max-w-2xl"
      />

      {query.trim() ? (
        <>
          <div className="mt-6">
            <FilterChips
              size="sm"
              label="Filter results by type"
              value={kind}
              onChange={setKind}
              chips={[
                { key: "all", label: "Everything", count: matchedTotal },
                ...kinds
                  .filter((k) => counts[k])
                  .map((k) => ({ key: k, label: k, count: counts[k] })),
              ]}
            />
          </div>

          <p className="mt-6 text-sm text-ink-subtle" aria-live="polite">
            {results.length > 0
              ? `${results.length} result${results.length > 1 ? "s" : ""} for “${query.trim()}”`
              : ""}
          </p>

          {results.length > 0 ? (
            <ul className="mt-4 space-y-3">
              {results.map((result) => (
                <li key={`${result.kind}-${result.href}-${result.title}`}>
                  <Link
                    href={result.href}
                    className="sticker sticker-hover block rounded-2xl bg-surface p-5"
                  >
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="font-bold">{result.title}</span>
                      <span className="rounded-full border-2 border-line-strong bg-surface-2 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.1em] text-ink-subtle">
                        {result.kind}
                      </span>
                    </div>
                    {result.blurb ? (
                      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-muted">
                        {result.blurb}
                      </p>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-6">
              <EmptyState
                title={`Nothing matches “${query.trim()}”.`}
                body="Try a shorter phrase, a club name, a sport, or a student's name."
              />
            </div>
          )}
        </>
      ) : (
        <p className="mt-8 text-sm leading-relaxed text-ink-muted">
          {index.length} entries indexed — every activity, club, major event, recorded result,
          facility, committee and document category on this site.
        </p>
      )}
    </>
  );
}
