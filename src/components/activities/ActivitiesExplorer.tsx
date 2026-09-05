"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ActivityCard } from "@/components/activities/ActivityCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { FilterChips } from "@/components/ui/FilterChips";
import { SearchInput } from "@/components/ui/SearchInput";
import { ACTIVITY_GROUPS } from "@/lib/data";
import type { Activity } from "@/lib/types";

/** §18 activity filters + §19 search facility, over the whole activity list. */
export function ActivitiesExplorer({ activities }: { activities: Activity[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initial = searchParams.get("group") ?? "all";
  const [group, setGroup] = useState(
    ACTIVITY_GROUPS.some((g) => g.key === initial) ? initial : "all",
  );
  const [venue, setVenue] = useState(searchParams.get("venue") ?? "all");
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return activities.filter((activity) => {
      if (group !== "all" && activity.category !== group) return false;
      if (venue !== "all" && activity.venue !== venue) return false;
      if (!needle) return true;
      return (
        activity.name.toLowerCase().includes(needle) ||
        activity.committeeName.toLowerCase().includes(needle) ||
        activity.about.join(" ").toLowerCase().includes(needle) ||
        (activity.facultyInCharge?.name ?? "").toLowerCase().includes(needle)
      );
    });
  }, [activities, group, venue, query]);

  const select = (next: string) => {
    setGroup(next);
    if (next !== "sports") setVenue("all");
    router.replace(next === "all" ? "/activities" : `/activities?group=${next}`, {
      scroll: false,
    });
  };

  const chips = [
    { key: "all", label: "All activities", count: activities.length },
    ...ACTIVITY_GROUPS.map((g) => ({
      key: g.key as string,
      label: g.label,
      count: activities.filter((a) => a.category === g.key).length,
      color: g.colorVar,
    })),
  ];

  const sportsCount = (v: string) => activities.filter((a) => a.venue === v).length;

  return (
    <>
      <div className="sticky top-18 z-30 -mx-5 border-b-2 border-line-strong bg-bg px-5 py-4 sm:mx-0 sm:rounded-3xl sm:border-2 sm:shadow-[4px_4px_0_0_var(--sticker)]">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <FilterChips
            chips={chips}
            value={group}
            onChange={select}
            label="Filter activities by group"
          />
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Search activities…"
            label="Search activities"
            className="xl:w-64 xl:shrink-0"
          />
        </div>

        {/* §5 — Sports & Games are additionally split into outdoor and indoor. */}
        {group === "sports" ? (
          <div className="mt-3 border-t border-line pt-3">
            <FilterChips
              size="sm"
              label="Filter sports by venue"
              value={venue}
              onChange={setVenue}
              chips={[
                { key: "all", label: "All sports", count: activities.filter((a) => a.category === "sports").length },
                { key: "outdoor", label: "Outdoor", count: sportsCount("outdoor"), color: "var(--cat-sports)" },
                { key: "indoor", label: "Indoor", count: sportsCount("indoor"), color: "var(--pop-6)" },
              ]}
            />
          </div>
        ) : null}
      </div>

      <p className="mt-8 text-sm text-ink-subtle" aria-live="polite">
        Showing <span className="font-semibold text-ink">{results.length}</span> of{" "}
        {activities.length} activities
      </p>

      {results.length > 0 ? (
        <div key={`${group}-${venue}-${query}`} className="mt-6 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((activity, i) => (
            <div
              key={activity.slug}
              className="animate-pop-in"
              style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}
            >
              <ActivityCard activity={activity} />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6">
          <EmptyState
            title="No activities match that search."
            body="Try a different word, or clear the filters."
            action={
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setVenue("all");
                  select("all");
                }}
                className="rounded-full border-2 border-line-strong bg-surface px-5 py-2.5 text-sm font-bold shadow-[4px_4px_0_0_var(--sticker)] transition-transform duration-250 hover:-translate-y-1 active:translate-y-0.5 active:shadow-none"
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
