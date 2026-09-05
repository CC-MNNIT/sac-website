import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/Icons";
import { developers } from "@/lib/data";

/**
 * A compact credit band directly above the footer on every page. The whole
 * band is one link, so clicking anywhere on it — a face, a name, the button —
 * opens the web team page. The button is a span for that reason: an anchor
 * inside an anchor is invalid.
 */
export function WebTeamStrip() {
  return (
    <section className="border-t-2 border-line-strong bg-bg-tint">
      <div className="container-page py-9">
        <Link
          href="/web-team"
          aria-label="See the web team"
          className="group flex flex-col items-center gap-6 rounded-4xl outline-offset-4 sm:flex-row sm:justify-between"
        >
          <div className="flex items-center gap-4">
            {/* Overlapping portraits — they fan apart as the band is hovered */}
            <ul className="flex -space-x-4">
              {developers.members.map((person, i) => (
                <li
                  key={person.name}
                  className="transition-transform duration-300 ease-[cubic-bezier(0.34,1.5,0.64,1)] group-hover:translate-x-0"
                  style={{
                    zIndex: developers.members.length - i,
                    transform: `translateX(${i === 0 ? 0 : 0}px)`,
                  }}
                >
                  <span className="block size-14 overflow-hidden rounded-full border-2 border-line-strong bg-surface-2 shadow-[3px_3px_0_0_var(--sticker)] transition-transform duration-300 ease-[cubic-bezier(0.34,1.5,0.64,1)] group-hover:-translate-y-1">
                    <Image
                      src={person.photo}
                      alt={person.name}
                      width={56}
                      height={56}
                      sizes="56px"
                      style={{
                        objectPosition: person.objectPosition ?? "center",
                      }}
                      className="size-full object-cover"
                    />
                  </span>
                </li>
              ))}
            </ul>

            <div className="text-center sm:text-left">
              <p className="font-display text-lg font-bold leading-tight transition-colors group-hover:text-brand">
                {developers.heading}
              </p>
              <p className="mt-0.5 text-sm text-ink-muted">
                {developers.members.map((person) => person.name).join(" & ")}
                <span className="text-ink-subtle">
                  {" "}
                  · {developers.members[0].batch}
                </span>
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-2 rounded-full border-2 border-line-strong bg-surface px-5 py-2.5 text-sm font-bold shadow-[4px_4px_0_0_var(--sticker)] transition-transform duration-250 ease-[cubic-bezier(0.34,1.4,0.64,1)] group-hover:-translate-x-0.5 group-hover:-translate-y-1 group-active:translate-x-0.5 group-active:translate-y-0.5 group-active:shadow-[1px_1px_0_0_var(--sticker)]">
            See the web team
            <ArrowRight className="size-4 transition-transform duration-250 group-hover:translate-x-0.5" />
          </span>
        </Link>
      </div>
    </section>
  );
}
