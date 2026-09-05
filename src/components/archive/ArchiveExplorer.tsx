"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { EmptyState } from "@/components/ui/EmptyState";
import { FilterChips } from "@/components/ui/FilterChips";
import { SearchInput } from "@/components/ui/SearchInput";
import { Blank } from "@/components/ui/Pending";
import { ACTIVITY_GROUPS } from "@/lib/data";
import type { ArchiveRecord } from "@/lib/types";

/** §9 — filter by Academic Year | Activity Type | Club | Month. */
export function ArchiveExplorer({
  records,
  clubNames,
}: {
  records: ArchiveRecord[];
  clubNames: Record<string, string>;
}) {
  const [year, setYear] = useState("all");
  const [type, setType] = useState("all");
  const [club, setClub] = useState("all");
  const [month, setMonth] = useState("all");
  const [query, setQuery] = useState("");

  const facet = (pick: (r: ArchiveRecord) => string) =>
    [...new Set(records.map(pick).filter(Boolean))];

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return records.filter((r) => {
      if (year !== "all" && r.academicYear !== year) return false;
      if (type !== "all" && String(r.type) !== type) return false;
      if (club !== "all" && r.clubSlug !== club) return false;
      if (month !== "all" && r.month !== month) return false;
      if (!needle) return true;
      return (
        r.title.toLowerCase().includes(needle) ||
        r.venue.toLowerCase().includes(needle) ||
        r.coordinator.toLowerCase().includes(needle) ||
        r.report.toLowerCase().includes(needle)
      );
    });
  }, [records, year, type, club, month, query]);

  /* Grouped by month, which is how §9 presents the archive. */
  const grouped = useMemo(() => {
    const map = new Map<string, ArchiveRecord[]>();
    results.forEach((r) => map.set(r.month, [...(map.get(r.month) ?? []), r]));
    return [...map.entries()];
  }, [results]);

  const reset = () => {
    setYear("all");
    setType("all");
    setClub("all");
    setMonth("all");
    setQuery("");
  };

  if (records.length === 0) {
    return (
      <EmptyState
        title="The activity archive is empty."
        body={
          <>
            Every completed programme is submitted by its coordinator in the standard format —
            event name, date, venue, organiser, faculty and student coordinator, number of
            participants, a brief report, results, achievements and 5–10 photographs — and
            published here. See the{" "}
            <Link href="/people#content-responsibility" className="font-bold text-ink underline-offset-4 hover:underline">
              submission format
            </Link>
            .
          </>
        }
      />
    );
  }

  return (
    <>
      <div className="space-y-3 rounded-3xl border-2 border-line-strong bg-surface p-5 shadow-[4px_4px_0_0_var(--sticker)]">
        <Facet label="Academic year" value={year} onChange={setYear} options={facet((r) => r.academicYear)} records={records} match={(r, v) => r.academicYear === v} />
        <Facet
          label="Activity type"
          value={type}
          onChange={setType}
          options={facet((r) => String(r.type))}
          records={records}
          match={(r, v) => String(r.type) === v}
          rename={(v) => ACTIVITY_GROUPS.find((g) => g.key === v)?.label ?? v}
          colorOf={(v) => ACTIVITY_GROUPS.find((g) => g.key === v)?.colorVar}
        />
        <Facet label="Club" value={club} onChange={setClub} options={facet((r) => r.clubSlug)} records={records} match={(r, v) => r.clubSlug === v} rename={(v) => clubNames[v] ?? v} />
        <Facet label="Month" value={month} onChange={setMonth} options={facet((r) => r.month)} records={records} match={(r, v) => r.month === v} />

        <div className="border-t border-line pt-3">
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Search the archive…"
            label="Search completed activities"
            className="sm:max-w-sm"
          />
        </div>
      </div>

      <p className="mt-8 text-sm text-ink-subtle" aria-live="polite">
        Showing <span className="font-semibold text-ink">{results.length}</span> of {records.length}{" "}
        completed activities
      </p>

      {grouped.length > 0 ? (
        <div className="mt-8 space-y-12">
          {grouped.map(([monthLabel, items]) => (
            <section key={monthLabel}>
              <h2 className="font-display text-2xl text-brand">{monthLabel}</h2>
              <ol className="mt-5 space-y-4">
                {items.map((record) => (
                  <li key={record.slug}>
                    <RecordCard record={record} clubNames={clubNames} />
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      ) : (
        <div className="mt-8">
          <EmptyState
            title="No completed activities match these filters."
            action={
              <button
                type="button"
                onClick={reset}
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

function Facet({
  label,
  value,
  onChange,
  options,
  records,
  match,
  rename = (v: string) => v,
  colorOf,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  records: ArchiveRecord[];
  match: (r: ArchiveRecord, v: string) => boolean;
  rename?: (v: string) => string;
  colorOf?: (v: string) => string | undefined;
}) {
  if (options.length === 0) return null;
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <span className="label-caps w-32 shrink-0 text-[0.6rem] text-ink-subtle">{label}</span>
      <FilterChips
        size="sm"
        label={`Filter by ${label.toLowerCase()}`}
        value={value}
        onChange={onChange}
        chips={[
          { key: "all", label: "All", count: records.length },
          ...options.map((option) => ({
            key: option,
            label: rename(option),
            count: records.filter((r) => match(r, option)).length,
            color: colorOf?.(option),
          })),
        ]}
      />
    </div>
  );
}

/** §9 — Date | Venue | Coordinator | Participants | Result | Photos */
function RecordCard({
  record,
  clubNames,
}: {
  record: ArchiveRecord;
  clubNames: Record<string, string>;
}) {
  return (
    <article className="sticker rounded-3xl bg-surface p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="text-lg leading-snug">{record.title}</h3>
        {record.clubSlug ? (
          <Link
            href={`/clubs/${record.clubSlug}`}
            className="rounded-full border-2 border-line-strong bg-surface-2 px-3 py-1 text-xs font-bold transition hover:text-brand"
          >
            {clubNames[record.clubSlug] ?? record.clubSlug}
          </Link>
        ) : null}
      </div>

      <dl className="mt-4 grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Date">{record.date || <Blank label="Date" />}</Field>
        <Field label="Venue">{record.venue || <Blank label="Venue" />}</Field>
        <Field label="Coordinator">{record.coordinator || <Blank label="Coordinator" />}</Field>
        <Field label="Participants">{record.participants || <Blank label="Participants" />}</Field>
        <Field label="Result">{record.result || <Blank label="Result" />}</Field>
        {record.resourcePersons.length > 0 ? (
          <Field label="Resource persons">{record.resourcePersons.join(", ")}</Field>
        ) : null}
      </dl>

      {record.report ? (
        <p className="mt-4 border-t border-line pt-4 text-sm leading-relaxed text-ink-muted">
          {record.report}
        </p>
      ) : null}

      {record.outcomes.length > 0 ? (
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-ink-muted">
          {record.outcomes.map((outcome) => (
            <li key={outcome}>{outcome}</li>
          ))}
        </ul>
      ) : null}

      {record.photos.length > 0 ? (
        <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-5">
          {record.photos.map((photo) => (
            <div key={photo} className="relative aspect-[4/3] overflow-hidden rounded-xl border-2 border-line-strong">
              <Image src={photo} alt="" fill sizes="20vw" className="object-cover" />
            </div>
          ))}
        </div>
      ) : null}
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
