import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight, Icon, Mail, MapPin, Phone } from "@/components/ui/Icons";
import { PageHeader } from "@/components/ui/PageHeader";
import { Pending } from "@/components/ui/Pending";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "How to reach the Student Activity Centre, MNNIT Allahabad — address, telephone, email and the people responsible for each activity.",
};

export default function ContactPage() {
  const { contact } = site;

  return (
    <>
      <PageHeader
        images={["/images/campus/mnnit.webp", "/images/campus/academic-building.webp"]}
        eyebrow="Find us"
        title="Contact"
        description="The Centre is located on the MNNIT Allahabad campus at Prayagraj."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <div className="container-page py-14 sm:py-18">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Institute contact */}
          <Reveal>
            <div className="h-full rounded-3xl border-2 border-line-strong bg-surface p-7 sm:p-9">
              <h2 className="text-xl">Student Activity Centre</h2>
              <ul className="mt-6 space-y-6">
                <li className="flex gap-4">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-brand" />
                  <div>
                    <p className="label-caps text-ink-subtle">Address</p>
                    <p className="mt-1.5 leading-relaxed text-ink-muted">
                      {contact.address}
                      <br />
                      {contact.city} – {contact.pin}, {contact.state}, {contact.country}
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Phone className="mt-0.5 size-5 shrink-0 text-brand" />
                  <div>
                    <p className="label-caps text-ink-subtle">Telephone</p>
                    <p className="mt-1.5 flex flex-col text-ink-muted">
                      {contact.phone.map((number) => (
                        <a
                          key={number}
                          href={`tel:${number.replace(/[^+\d]/g, "")}`}
                          className="transition hover:text-brand"
                        >
                          {number}
                        </a>
                      ))}
                      <span className="mt-1 text-xs text-ink-subtle">Fax {contact.fax}</span>
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Mail className="mt-0.5 size-5 shrink-0 text-brand" />
                  <div>
                    <p className="label-caps text-ink-subtle">Email</p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="mt-1.5 block text-ink-muted transition hover:text-brand"
                    >
                      {contact.email}
                    </a>
                  </div>
                </li>
              </ul>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.mapQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 flex h-11 w-full items-center justify-center gap-2 rounded-full border-2 border-line-strong bg-brand text-sm font-bold text-brand-ink shadow-[4px_4px_0_0_var(--sticker)] transition-transform hover:-translate-y-1"
              >
                Open in Maps
                <ArrowRight className="size-4" />
              </a>

              <div className="mt-6 flex items-center gap-2.5">
                {site.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="grid size-10 place-items-center rounded-xl border-2 border-line-strong bg-surface text-ink shadow-[3px_3px_0_0_var(--sticker)] transition-transform hover:-translate-y-1 hover:text-brand"
                  >
                    <Icon name={social.icon} className="size-4.5" />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          {/* President */}
          <Reveal delay={100}>
            <div className="flex h-full flex-col overflow-hidden rounded-3xl border-2 border-line-strong bg-surface">
              <div className="grid sm:grid-cols-[10rem_1fr]">
                <PhotoFrame
                  src={site.president.photo}
                  alt={site.president.name}
                  sizes="10rem"
                  className="aspect-[4/5] border-b-2 border-line-strong sm:aspect-auto sm:border-b-0 sm:border-r-2"
                />
                <div className="p-6">
                  <p className="label-caps text-brand">Heading the Centre</p>
                  <h2 className="mt-2 text-xl leading-tight">{site.president.name}</h2>
                  <p className="mt-1 text-sm font-semibold text-ink-muted">{site.president.role}</p>
                  <p className="mt-0.5 text-sm text-ink-subtle">{site.president.dept}</p>
                  <ButtonLink href={site.president.profile} external variant="outline" size="sm" className="mt-5">
                    Faculty profile
                    <ArrowRight className="size-3.5" />
                  </ButtonLink>
                </div>
              </div>

              <div className="border-t-2 border-line-strong p-6">
                <Pending
                  what="A direct email address and telephone number for the SAC office"
                  who="SAC office"
                />
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                  For an individual activity, the Faculty In-Charge and Faculty Coordinator
                  responsible are listed on the{" "}
                  <Link href="/people#faculty-team" className="font-bold text-ink underline-offset-4 hover:underline">
                    people &amp; governance page
                  </Link>
                  .
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <Section tint className="border-t-2 border-line-strong">
        <div className="container-page">
          <SectionHeading
            align="left"
            eyebrow="Institute links"
            title="Elsewhere at MNNIT"
          />
          <div className="mt-8 flex flex-wrap gap-3">
            {site.quickLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-line-strong bg-surface px-4 py-2.5 text-sm font-bold shadow-[3px_3px_0_0_var(--sticker)] transition-transform hover:-translate-y-1"
              >
                {link.label}
                <ArrowRight className="size-3.5" />
              </a>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
