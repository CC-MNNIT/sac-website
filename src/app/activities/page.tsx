import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ActivitiesExplorer } from "@/components/activities/ActivitiesExplorer";
import { Icon } from "@/components/ui/Icons";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ACTIVITY_GROUPS, activities, getSports } from "@/lib/data";

export const metadata: Metadata = {
  title: "Activities",
  description:
    "Every activity of the Student Activity Centre, MNNIT Allahabad — sports, cultural, technical, literary, innovation, fitness and yoga, personality development and social activities.",
};

export default function ActivitiesPage() {
  const { outdoor, indoor } = getSports();

  return (
    <>
      <PageHeader
        images={[
          "/images/clubs/basketball.webp",
          "/images/gallery/culrav/culrav-04.webp",
          "/images/gallery/hack36/hack-36-03.webp",
        ]}
        eyebrow="What we do"
        title="Activities"
        description={`${activities.length} recognised activities across ${ACTIVITY_GROUPS.length} areas. Every one names the faculty responsible for it, the club that runs it, and how to take part.`}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Activities" }]}
      />

      {/* §18 — the eight groups listed under Activities */}
      <div className="border-b-2 border-line-strong bg-bg-tint bg-dot-grid">
        <div className="container-page py-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ACTIVITY_GROUPS.map((group, i) => {
              const count = activities.filter((a) => a.category === group.key).length;
              return (
                <Reveal key={group.key} delay={i * 50} variant="pop">
                  <Link
                    href={`/activities?group=${group.key}`}
                    className="sticker sticker-hover flex h-full flex-col rounded-3xl bg-surface p-5"
                  >
                    <span
                      className="grid size-10 place-items-center rounded-2xl border-2 border-line-strong"
                      style={{
                        color: group.colorVar,
                        backgroundColor: `color-mix(in oklab, ${group.colorVar} 14%, var(--surface))`,
                      }}
                    >
                      <Icon name={group.icon} className="size-5" />
                    </span>
                    <h2 className="mt-4 text-base leading-snug">{group.label}</h2>
                    <p className="mt-1.5 flex-1 text-xs leading-relaxed text-ink-muted">
                      {group.blurb}
                    </p>
                    <p
                      className="mt-3 font-display text-2xl font-bold"
                      style={{ color: group.colorVar }}
                    >
                      {count}
                    </p>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          {/* §5 — Sports & Games are additionally classified outdoor / indoor */}
          <Reveal delay={200}>
            <p className="mt-8 text-sm text-ink-muted">
              Sports &amp; Games are further classified as{" "}
              <Link href="/sports#outdoor" className="font-bold text-ink underline-offset-4 hover:underline">
                Outdoor ({outdoor.length})
              </Link>{" "}
              and{" "}
              <Link href="/sports#indoor" className="font-bold text-ink underline-offset-4 hover:underline">
                Indoor ({indoor.length})
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </div>

      <div className="container-page py-12 sm:py-16">
        <Suspense
          fallback={<div className="h-24 animate-pulse rounded-3xl border-2 border-line-strong bg-surface-2" />}
        >
          <ActivitiesExplorer activities={activities} />
        </Suspense>
      </div>
    </>
  );
}
