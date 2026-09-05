import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/Icons";
import type { Announcement } from "@/lib/types";
import { cn } from "@/lib/utils";

const KIND_COLOR: Record<Announcement["kind"], string> = {
  announcement: "var(--pop-1)",
  news: "var(--pop-2)",
  upcoming: "var(--pop-4)",
};

const KIND_LABEL: Record<Announcement["kind"], string> = {
  announcement: "Announcement",
  news: "SAC News",
  upcoming: "Upcoming",
};

export function AnnouncementCard({
  item,
  featured = false,
}: {
  item: Announcement;
  featured?: boolean;
}) {
  const color = KIND_COLOR[item.kind];

  return (
    <article
      className={cn(
        "sticker flex h-full flex-col overflow-hidden rounded-3xl bg-surface",
        featured && "md:flex-row",
      )}
      style={{ ["--card-accent" as string]: color }}
    >
      {item.image ? (
        <div
          className={cn(
            "relative border-line-strong bg-surface-2",
            featured
              ? "aspect-[16/10] border-b-2 md:aspect-auto md:w-[42%] md:border-b-0 md:border-r-2"
              : "aspect-[16/10] border-b-2",
          )}
        >
          <Image
            src={item.image}
            alt=""
            fill
            sizes={featured ? "(max-width: 768px) 100vw, 42vw" : "(max-width: 640px) 100vw, 33vw"}
            className="object-cover"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2.5">
          <span
            className="rounded-full border-2 border-line-strong px-2.5 py-0.5 text-[0.62rem] font-bold uppercase tracking-[0.1em]"
            style={{ color, backgroundColor: `color-mix(in oklab, ${color} 14%, var(--surface))` }}
          >
            {KIND_LABEL[item.kind]}
          </span>
          {item.category ? (
            <span className="text-xs font-semibold text-ink-subtle">{item.category}</span>
          ) : null}
          <span className="ml-auto text-xs tabular-nums text-ink-subtle">{item.date}</span>
        </div>

        <h3 className={cn("mt-3 leading-snug", featured ? "text-2xl" : "text-lg")}>{item.title}</h3>

        <p
          className={cn(
            "mt-2.5 flex-1 text-sm leading-relaxed text-ink-muted",
            featured ? "line-clamp-5" : "line-clamp-3",
          )}
        >
          {item.summary}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-line pt-4 text-sm">
          {item.eventSlug ? (
            <Link
              href={`/events/${item.eventSlug}`}
              className="inline-flex items-center gap-1.5 font-bold transition hover:opacity-80"
              style={{ color }}
            >
              About the event
              <ArrowRight className="size-3.5" />
            </Link>
          ) : null}
          {item.link ? (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-bold text-ink-muted transition hover:text-ink"
            >
              Details
              <ArrowRight className="size-3.5" />
            </a>
          ) : null}
          {item.attachments.map((file) => (
            <a
              key={file.href}
              href={file.href}
              className="inline-flex items-center gap-1.5 font-bold text-ink-muted transition hover:text-ink"
            >
              {file.label}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
