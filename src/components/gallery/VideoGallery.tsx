import Image from "next/image";
import { ArrowRight } from "@/components/ui/Icons";
import { Pending } from "@/components/ui/Pending";
import { Reveal } from "@/components/ui/Reveal";
import type { GalleryVideo } from "@/lib/types";

/** §15 — short videos of major competitions, performances, student projects,
 *  sports and event highlights. */
export function VideoGallery({ videos }: { videos: GalleryVideo[] }) {
  if (videos.length === 0) {
    return (
      <Pending
        what="The video gallery — competitions, performances, student projects, sports and event highlights"
        who="club and activity coordinators, through the SAC Web Team"
      />
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((video, i) => (
        <Reveal key={video.url} delay={Math.min(i, 6) * 60} variant="pop" className="h-full">
          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="sticker sticker-hover group flex h-full flex-col overflow-hidden rounded-3xl bg-surface"
          >
            <div className="relative aspect-video border-b-2 border-line-strong bg-surface-2">
              {video.thumbnail ? (
                <Image
                  src={video.thumbnail}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover"
                />
              ) : null}

              <span className="absolute inset-0 grid place-items-center" aria-hidden>
                <span className="grid size-14 place-items-center rounded-full border-2 border-line-strong bg-surface shadow-[4px_4px_0_0_var(--sticker)] transition-transform duration-300 group-hover:scale-110">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 size-5 text-brand">
                    <path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.3-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14z" />
                  </svg>
                </span>
              </span>

              {video.duration ? (
                <span className="absolute bottom-3 right-3 rounded-lg border-2 border-line-strong bg-surface px-2 py-0.5 text-[0.65rem] font-bold tabular-nums">
                  {video.duration}
                </span>
              ) : null}
            </div>

            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-base leading-snug">{video.title}</h3>
              {video.session ? (
                <p className="mt-1.5 text-xs text-ink-subtle">{video.session}</p>
              ) : null}
              <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand">
                Watch
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </a>
        </Reveal>
      ))}
    </div>
  );
}
