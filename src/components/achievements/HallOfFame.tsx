"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { EmptyState } from "@/components/ui/EmptyState";
import { FilterChips } from "@/components/ui/FilterChips";
import { LinkedIn, Trophy } from "@/components/ui/Icons";
import { Blank } from "@/components/ui/Pending";
import { SearchInput } from "@/components/ui/SearchInput";
import { ACHIEVEMENT_CATEGORIES } from "@/lib/data";
import type { AchievementEntry, AchievementYear } from "@/lib/types";

const CATEGORY_COLOR: Record<string, string> = {
  international: "var(--pop-5)",
  national: "var(--pop-1)",
  "inter-nit": "var(--pop-6)",
  sports: "var(--cat-sports)",
  cultural: "var(--cat-cultural)",
  technical: "var(--cat-technical)",
  innovation: "var(--cat-initiatives)",
  entrepreneurship: "var(--pop-4)",
  individual: "var(--pop-3)",
  team: "var(--pop-2)",
};

/** §10 — the Hall of Fame, filterable by category and searchable by name. */
export function HallOfFame({ years }: { years: AchievementYear[] }) {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");

  const total = useMemo(
    () => years.reduce((n, y) => n + y.achievements.length, 0),
    [years],
  );

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    years.forEach((y) =>
      y.achievements.forEach((a) => a.categories.forEach((c) => (map[c] = (map[c] ?? 0) + 1))),
    );
    return map;
  }, [years]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return years
      .map((year) => ({
        ...year,
        achievements: year.achievements.filter((a) => {
          if (category !== "all" && !a.categories.includes(category as never)) return false;
          if (!needle) return true;
          const names = a.teams.flatMap((t) => t.members.map((m) => m.name)).join(" ");
          return (
            a.title.toLowerCase().includes(needle) ||
            a.description.toLowerCase().includes(needle) ||
            names.toLowerCase().includes(needle)
          );
        }),
      }))
      .filter((year) => year.achievements.length > 0);
  }, [years, category, query]);

  const shown = filtered.reduce((n, y) => n + y.achievements.length, 0);

  const chips = [
    { key: "all", label: "All results", count: total },
    ...ACHIEVEMENT_CATEGORIES.filter((c) => counts[c.key]).map((c) => ({
      key: c.key as string,
      label: c.label,
      count: counts[c.key],
      color: CATEGORY_COLOR[c.key],
    })),
  ];

  const untagged = ACHIEVEMENT_CATEGORIES.filter((c) => !counts[c.key]).map((c) => c.label);

  return (
    <>
      <div className="sticky top-18 z-30 -mx-5 border-b-2 border-line-strong bg-bg px-5 py-4 sm:mx-0 sm:rounded-3xl sm:border-2 sm:shadow-[4px_4px_0_0_var(--sticker)]">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <FilterChips
            label="Filter achievements by category"
            value={category}
            onChange={setCategory}
            chips={chips}
          />
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Search students or results…"
            label="Search achievements"
            className="xl:w-64 xl:shrink-0"
          />
        </div>
      </div>

      <p className="mt-8 text-sm text-ink-subtle" aria-live="polite">
        Showing <span className="font-semibold text-ink">{shown}</span> of {total} results
      </p>

      {untagged.length > 0 ? (
        <p className="mt-3 rounded-2xl border-2 border-dashed border-line-strong bg-surface-2 p-4 text-sm leading-relaxed text-ink-muted">
          <span className="font-bold text-ink">
            {untagged.join(", ")} {untagged.length > 1 ? "categories are" : "category is"} not yet
            tagged.
          </span>{" "}
          The source record does not classify results by domain, so only Individual and Team are
          derived automatically. The SAC office tags the rest.
        </p>
      ) : null}

      {filtered.length > 0 ? (
        <div className="mt-10 space-y-14">
          {filtered.map((year) => (
            <section
              key={year.year}
              id={`year-${year.year.toString().replace(/\s+/g, "-")}`}
              className="scroll-mt-28"
            >
              <div className="flex items-baseline gap-4 border-b-2 border-line-strong pb-4">
                <h2 className="font-display text-3xl text-brand sm:text-4xl">{year.year}</h2>
                <span className="text-sm text-ink-subtle">
                  {year.achievements.length} result{year.achievements.length > 1 ? "s" : ""}
                </span>
              </div>

              <ol className="mt-6 grid gap-4 lg:grid-cols-2">
                {year.achievements.map((item, i) => (
                  <li key={`${item.title}-${i}`}>
                    <AchievementCard item={item} />
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      ) : (
        <div className="mt-10">
          <EmptyState
            title="No results match these filters."
            action={
              <button
                type="button"
                onClick={() => {
                  setCategory("all");
                  setQuery("");
                }}
                className="rounded-full border-2 border-line-strong bg-surface px-5 py-2.5 text-sm font-bold shadow-[4px_4px_0_0_var(--sticker)] transition-transform hover:-translate-y-1"
              >
                Reset filters
              </button>
            }
          />
        </div>
      )}
    </>
  );
}

/** §10 — Student/Team | Event | Institution/Organisation | Position/Award | Date | Photograph */
function AchievementCard({ item }: { item: AchievementEntry }) {
  const members = item.teams.flatMap((team) => team.members);
  const primary = item.categories[0];
  const color = CATEGORY_COLOR[primary] ?? "var(--brand)";

  return (
    <article
      className="sticker flex h-full flex-col overflow-hidden rounded-3xl bg-surface"
      style={{ ["--card-accent" as string]: color }}
    >
      {item.photo ? (
        <div className="relative aspect-[16/9] border-b-2 border-line-strong">
          <Image src={item.photo} alt="" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start gap-3">
          <Trophy className="mt-0.5 size-5 shrink-0" style={{ color }} />
          <div className="min-w-0 flex-1">
            <h3 className="text-lg leading-snug">{item.title}</h3>

            {item.categories.length > 0 ? (
              <ul className="mt-2.5 flex flex-wrap gap-1.5">
                {item.categories.map((c) => (
                  <li
                    key={c}
                    className="rounded-full border-2 border-line-strong px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.1em]"
                    style={{
                      color: CATEGORY_COLOR[c],
                      backgroundColor: `color-mix(in oklab, ${CATEGORY_COLOR[c]} 14%, var(--surface))`,
                    }}
                  >
                    {ACHIEVEMENT_CATEGORIES.find((x) => x.key === c)?.label ?? c}
                  </li>
                ))}
              </ul>
            ) : null}

            {item.description ? (
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.description}</p>
            ) : null}
          </div>
        </div>

        <dl className="mt-5 grid gap-x-6 gap-y-3 border-t border-line pt-4 text-sm sm:grid-cols-2">
          <Field label="Event">{item.event || <Blank label="Event" />}</Field>
          <Field label="Institution / organisation">
            {item.organisation || <Blank label="Organisation" />}
          </Field>
          <Field label="Position / award">{item.position || <Blank label="Position" />}</Field>
          <Field label="Date">{item.date || <Blank label="Date" />}</Field>
        </dl>

        {members.length > 0 ? (
          <div className="mt-5 border-t border-line pt-4">
            <p className="label-caps text-[0.6rem] text-ink-subtle">
              {members.length > 1 ? "Team" : "Student"}
            </p>
            <ul className="mt-2.5 flex flex-wrap gap-2">
              {members.map((member) => (
                <li key={member.name}>
                  {member.linkedin ? (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl border-2 border-line-strong px-2.5 py-1.5 text-xs text-ink-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:text-brand"
                    >
                      <LinkedIn className="size-3" />
                      {member.name}
                    </a>
                  ) : (
                    <span className="inline-flex rounded-xl border-2 border-line-strong px-2.5 py-1.5 text-xs text-ink-muted">
                      {member.name}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </article>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="label-caps text-[0.6rem] text-ink-subtle">{label}</dt>
      <dd className="mt-0.5 text-ink-muted">{children}</dd>
    </div>
  );
}
