import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icons";
import { activityGroup } from "@/lib/data";
import type { Activity } from "@/lib/types";
import { cn } from "@/lib/utils";

/** §19 — Photograph + Heading + 2–3 lines + Explore button. */
export function ActivityCard({ activity }: { activity: Activity }) {
  const group = activityGroup(activity.category);
  const color = group?.colorVar ?? "var(--brand)";
  const lead = activity.about[0] ?? "";

  return (
    <Link
      href={`/activities/${activity.slug}`}
      className="sticker sticker-hover group flex h-full flex-col overflow-hidden rounded-3xl bg-surface"
      style={{ ["--card-accent" as string]: color }}
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b-2 border-line-strong bg-surface-2">
        {activity.image ? (
          <Image
            src={activity.image}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={cn(
              "transition-transform duration-500",
              activity.imageFit === "contain"
                ? "object-contain p-6"
                : "object-cover group-hover:scale-105",
            )}
          />
        ) : (
          <span
            className="absolute inset-0 grid place-items-center bg-dot-grid"
            style={{ color }}
            aria-hidden
          >
            <Icon name={activity.icon} className="size-14 opacity-70" />
          </span>
        )}

        <span
          className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border-2 border-line-strong bg-surface px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.1em]"
          style={{ color }}
        >
          {activity.venue ? activity.venue : group?.label}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg leading-snug">{activity.name}</h3>

        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-muted">
          {lead || activity.committeeName}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-line pt-3.5 text-xs">
          <span className="text-ink-subtle">
            {activity.facultyInCharge ? activity.facultyInCharge.name : "Faculty to be listed"}
          </span>
          <span className="font-bold transition-transform duration-250 group-hover:translate-x-0.5" style={{ color }}>
            Explore →
          </span>
        </div>
      </div>
    </Link>
  );
}
