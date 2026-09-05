import type { Metadata } from "next";
import { PhotoGallery } from "@/components/gallery/PhotoGallery";
import { VideoGallery } from "@/components/gallery/VideoGallery";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { countPhotos, gallery, gallerySessions } from "@/lib/data";

const total = countPhotos();

export const metadata: Metadata = {
  title: "Gallery",
  description: `${total} photographs and the video gallery of the Student Activity Centre, MNNIT Allahabad — Culrav, Avishkar, Chitrasangam & Eloquence, Hack 36 and Padmgandhi.`,
};

export default function GalleryPage() {
  const sessions = gallerySessions();

  return (
    <>
      <PageHeader
        images={[
          "/images/gallery/culrav/culrav-06.webp",
          "/images/gallery/padmgandhi/padmgandhi-07.webp",
          "/images/gallery/chitrasangam/chitrasangam-and-eloquence-03.webp",
        ]}
        eyebrow="Photographs & video"
        title="Gallery"
        description={`${total} photographs from ${gallery.events.length} events, and the video gallery.`}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
      >
        {/* Jump links — the event names double as the section index */}
        <div className="mt-8 flex flex-wrap gap-2.5">
          {gallery.events.map((event) => (
            <a
              key={event.slug}
              href={`#${event.slug}`}
              className="inline-flex items-center gap-2 rounded-full border-2 border-line-strong bg-surface px-4 py-2 text-sm font-bold shadow-[3px_3px_0_0_var(--sticker)] transition-transform duration-250 ease-[cubic-bezier(0.34,1.4,0.64,1)] hover:-translate-y-1 active:translate-y-0.5 active:shadow-none"
            >
              <span
                className="size-2.5 rounded-full"
                style={{ backgroundColor: event.color }}
                aria-hidden
              />
              {event.name}
              <span className="text-xs tabular-nums text-ink-subtle">{event.photos.length}</span>
            </a>
          ))}
          <a
            href="#videos"
            className="inline-flex items-center gap-2 rounded-full border-2 border-line-strong bg-surface px-4 py-2 text-sm font-bold shadow-[3px_3px_0_0_var(--sticker)] transition-transform duration-250 hover:-translate-y-1"
          >
            <span className="size-2.5 rounded-full bg-accent" aria-hidden />
            Videos
            {gallery.videos.length > 0 ? (
              <span className="text-xs tabular-nums text-ink-subtle">{gallery.videos.length}</span>
            ) : (
              <span className="text-[0.62rem] italic text-ink-subtle">soon</span>
            )}
          </a>
        </div>
      </PageHeader>

      {/* §15 — photo gallery, grouped by academic session */}
      <div className="container-page py-14 sm:py-18">
        {sessions.map((group, i) => (
          <section key={group.session || "untagged"} className={i > 0 ? "mt-20" : undefined}>
            <Reveal>
              <div className="mb-10 flex items-baseline gap-4 border-b-2 border-line-strong pb-4">
                <h2 className="font-display text-2xl sm:text-3xl">
                  {group.session || "Session not recorded"}
                </h2>
                <span className="text-sm text-ink-subtle">
                  {group.events.reduce((n, e) => n + e.photos.length, 0)} photographs
                </span>
              </div>
            </Reveal>

            {!group.session ? (
              <p className="mb-8 rounded-2xl border-2 border-dashed border-line-strong bg-surface-2 p-4 text-sm leading-relaxed text-ink-muted">
                <span className="font-bold text-ink">Session not tagged.</span> The academic session
                these sets were photographed in is not recorded in the source. The SAC Web Team tags
                each set as it is added.
              </p>
            ) : null}

            <PhotoGallery events={group.events} />
          </section>
        ))}
      </div>

      {/* §15 — video gallery */}
      <Section id="videos" tint className="border-t-2 border-line-strong">
        <div className="container-page">
          <SectionHeading
            align="left"
            eyebrow="Video"
            title="Video gallery"
            description="Short videos of major competitions, performances, student projects, sports and event highlights."
          />
          <div className="mt-10">
            <VideoGallery videos={gallery.videos} />
          </div>
        </div>
      </Section>
    </>
  );
}
