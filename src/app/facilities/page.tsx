import type { Metadata } from "next";
import Image from "next/image";
import { Icon, MapPin } from "@/components/ui/Icons";
import { PageHeader } from "@/components/ui/PageHeader";
import { Blank, Pending } from "@/components/ui/Pending";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { countFacilities, facilities } from "@/lib/data";
import type { Facility } from "@/lib/types";

export const metadata: Metadata = {
  title: "Facilities",
  description:
    "The sports, fitness and cultural infrastructure of the Student Activity Centre, MNNIT Allahabad — grounds, courts, gymnasium, yoga facilities, the Multipurpose Hall and the Boys' and Girls' SAC.",
};

const GROUP_COLOR: Record<string, string> = {
  "sports-infrastructure": "var(--cat-sports)",
  fitness: "var(--pop-6)",
  "cultural-infrastructure": "var(--cat-cultural)",
};

export default function FacilitiesPage() {
  return (
    <>
      <PageHeader
        images={[
          "/images/campus/mnnit.webp",
          "/images/campus/academic-building.webp",
          "/images/clubs/basketball.webp",
        ]}
        eyebrow="Infrastructure"
        title="Facilities"
        description={`${countFacilities()} facilities across sports infrastructure, fitness and cultural infrastructure. The prime locations of the Centre are the Students' Clubs, the Boys' and Girls' SAC, the Multipurpose Hall, the Athletics Ground and the Gymkhana.`}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Facilities" }]}
      />

      {facilities.map((group, index) => (
        <Section
          key={group.id}
          id={group.id}
          tint={index % 2 === 1}
          className={index > 0 ? "border-t-2 border-line-strong" : undefined}
        >
          <div className="container-page">
            <SectionHeading
              align="left"
              eyebrow={`0${index + 1}`}
              title={group.title}
              description={`${group.items.length} facilities.`}
            />

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {group.items.map((item, i) => (
                <Reveal key={item.slug} delay={Math.min(i, 6) * 60} variant="pop" className="h-full">
                  <FacilityCard facility={item} icon={group.icon} color={GROUP_COLOR[group.id] ?? "var(--brand)"} />
                </Reveal>
              ))}
            </div>
          </div>
        </Section>
      ))}
    </>
  );
}

/** §11 — Photographs | Location | Facilities | Timings | Rules | Contact Person */
function FacilityCard({
  facility,
  icon,
  color,
}: {
  facility: Facility;
  icon: string;
  color: string;
}) {
  const empty =
    facility.photos.length === 0 &&
    !facility.location &&
    facility.facilities.length === 0 &&
    !facility.timings &&
    facility.rules.length === 0 &&
    !facility.contact;

  return (
    <article
      id={facility.slug}
      className="sticker flex h-full scroll-mt-28 flex-col overflow-hidden rounded-3xl bg-surface"
      style={{ ["--card-accent" as string]: color }}
    >
      <div className="relative aspect-[16/10] border-b-2 border-line-strong bg-surface-2">
        {facility.photos.length > 0 ? (
          <Image
            src={facility.photos[0]}
            alt={facility.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        ) : (
          <span className="absolute inset-0 grid place-items-center bg-dot-grid" style={{ color }} aria-hidden>
            <Icon name={icon} className="size-12 opacity-60" />
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg leading-snug">{facility.name}</h3>

        {empty ? (
          <div className="mt-4 flex-1">
            <Pending
              what="Photographs, location, timings, rules and contact person"
              who="SAC office"
            />
          </div>
        ) : (
          <dl className="mt-4 flex-1 space-y-3 text-sm">
            <Row label="Location">
              {facility.location ? (
                <span className="inline-flex items-start gap-1.5">
                  <MapPin className="mt-0.5 size-3.5 shrink-0" style={{ color }} />
                  {facility.location}
                </span>
              ) : (
                <Blank label="Location" />
              )}
            </Row>
            <Row label="Facilities">
              {facility.facilities.length > 0 ? facility.facilities.join(", ") : <Blank label="Facilities" />}
            </Row>
            <Row label="Timings">{facility.timings || <Blank label="Timings" />}</Row>
            <Row label="Rules">
              {facility.rules.length > 0 ? (
                <ul className="list-disc space-y-1 pl-4">
                  {facility.rules.map((rule) => (
                    <li key={rule}>{rule}</li>
                  ))}
                </ul>
              ) : (
                <Blank label="Rules" />
              )}
            </Row>
            <Row label="Contact person">
              {facility.contact ? facility.contact.name : <Blank label="Contact person" />}
            </Row>
          </dl>
        )}
      </div>
    </article>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-line pt-3 first:border-t-0 first:pt-0">
      <dt className="label-caps text-[0.6rem] text-ink-subtle">{label}</dt>
      <dd className="mt-1 leading-relaxed text-ink-muted">{children}</dd>
    </div>
  );
}
