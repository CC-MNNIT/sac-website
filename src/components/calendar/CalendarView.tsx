"use client";

import { useMemo, useState } from "react";
import { EmptyState } from "@/components/ui/EmptyState";
import { FilterChips } from "@/components/ui/FilterChips";
import { ArrowRight, MapPin } from "@/components/ui/Icons";
import { Blank } from "@/components/ui/Pending";
import { useMounted } from "@/lib/hooks";
import type { CalendarEntry } from "@/lib/types";

type Bucket = "today" | "week" | "month" | "all";

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

/**
 * §12 — Today · This Week · This Month, computed against the viewer's own
 * clock. `now` is set after mount so the server and client render the same
 * markup on first paint.
 */
export function CalendarView({ entries }: { entries: CalendarEntry[] }) {
  /* Null during SSR and the hydration render, so the server and client agree
     on first paint; the viewer's own clock takes over immediately after. */
  const mounted = useMounted();
  const now = useMemo(() => (mounted ? new Date() : null), [mounted]);
  const [bucket, setBucket] = useState<Bucket>("month");

  const parsed = useMemo(
    () =>
      entries
        .map((entry) => ({
          entry,
          start: new Date(entry.date),
          end: new Date(entry.endDate || entry.date),
        }))
        .filter((x) => !Number.isNaN(x.start.getTime()))
        .sort((a, b) => a.start.getTime() - b.start.getTime()),
    [entries],
  );

  const counts = useMemo(() => {
    if (!now) return { today: 0, week: 0, month: 0, all: parsed.length };
    const today = startOfDay(now);
    const weekEnd = new Date(today);
    weekEnd.setDate(today.getDate() + 7);
    const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const covers = (x: (typeof parsed)[number], to: Date) =>
      startOfDay(x.start) <= to && startOfDay(x.end) >= today;
    return {
      today: parsed.filter((x) => covers(x, today)).length,
      week: parsed.filter((x) => covers(x, weekEnd)).length,
      month: parsed.filter((x) => covers(x, monthEnd)).length,
      all: parsed.length,
    };
  }, [parsed, now]);

  const shown = useMemo(() => {
    if (bucket === "all" || !now) return parsed.map((x) => x.entry);
    const today = startOfDay(now);
    const to =
      bucket === "today"
        ? today
        : bucket === "week"
          ? (() => {
              const d = new Date(today);
              d.setDate(today.getDate() + 7);
              return d;
            })()
          : new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return parsed
      .filter((x) => startOfDay(x.start) <= to && startOfDay(x.end) >= today)
      .map((x) => x.entry);
  }, [parsed, bucket, now]);

  const labels: { key: Bucket; label: string }[] = [
    { key: "today", label: "Today" },
    { key: "week", label: "This week" },
    { key: "month", label: "This month" },
    { key: "all", label: "All scheduled" },
  ];

  return (
    <>
      <FilterChips
        label="Filter the calendar"
        value={bucket}
        onChange={(key) => setBucket(key as Bucket)}
        chips={labels.map((l) => ({ key: l.key, label: l.label, count: counts[l.key] }))}
      />

      <div className="mt-8">
        {shown.length > 0 ? (
          <ol className="space-y-4">
            {shown.map((entry) => (
              <li key={entry.slug}>
                <EntryCard entry={entry} />
              </li>
            ))}
          </ol>
        ) : (
          <EmptyState
            title={
              entries.length === 0
                ? "No programmes are scheduled on the calendar yet."
                : "Nothing scheduled in this period."
            }
            body={
              entries.length === 0 ? (
                <>
                  Club and activity coordinators submit programmes to the SAC Web Team, who publish
                  them here with the date, time, venue, organiser, eligibility, registration and
                  contact for each.
                </>
              ) : (
                "Try a wider period."
              )
            }
          />
        )}
      </div>
    </>
  );
}

/** §12 — Date | Time | Venue | Organiser | Eligibility | Registration | Contact */
function EntryCard({ entry }: { entry: CalendarEntry }) {
  const date = new Date(entry.date);
  const valid = !Number.isNaN(date.getTime());

  return (
    <article className="sticker flex flex-col gap-5 rounded-3xl bg-surface p-5 sm:flex-row sm:items-start">
      <div className="flex shrink-0 items-center gap-4 sm:flex-col sm:gap-0 sm:rounded-2xl sm:border-2 sm:border-line-strong sm:bg-surface-2 sm:px-4 sm:py-3">
        <span className="font-display text-3xl font-bold leading-none tabular-nums">
          {valid ? date.getDate() : "—"}
        </span>
        <span className="label-caps text-ink-subtle sm:mt-1">
          {valid ? date.toLocaleString("en-IN", { month: "short" }) : ""}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-lg leading-snug">{entry.title}</h3>
          {entry.category ? (
            <span className="rounded-full border-2 border-line-strong bg-surface-2 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-ink-muted">
              {entry.category}
            </span>
          ) : null}
        </div>

        <dl className="mt-4 grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Time">{entry.time || <Blank label="Time" />}</Field>
          <Field label="Venue">
            {entry.venue ? (
              <span className="inline-flex items-start gap-1.5">
                <MapPin className="mt-0.5 size-3.5 shrink-0 text-brand" />
                {entry.venue}
              </span>
            ) : (
              <Blank label="Venue" />
            )}
          </Field>
          <Field label="Organiser">{entry.organiser || <Blank label="Organiser" />}</Field>
          <Field label="Eligibility">{entry.eligibility || <Blank label="Eligibility" />}</Field>
          <Field label="Registration">{entry.registration || <Blank label="Registration" />}</Field>
          <Field label="Contact">{entry.contact || <Blank label="Contact" />}</Field>
        </dl>

        {entry.link ? (
          <a
            href={entry.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full border-2 border-line-strong bg-surface px-4 py-2 text-sm font-bold shadow-[3px_3px_0_0_var(--sticker)] transition-transform hover:-translate-y-0.5"
          >
            Register
            <ArrowRight className="size-3.5" />
          </a>
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
