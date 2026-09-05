import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Icon, Mail, MapPin, Phone } from "@/components/ui/Icons";
import { site } from "@/lib/data";

const EXPLORE = [
  { label: "About the SAC", href: "/about" },
  { label: "Activities", href: "/activities" },
  { label: "All Clubs", href: "/clubs" },
  { label: "Sports", href: "/sports" },
  { label: "Major Events", href: "/events" },
  { label: "Achievements", href: "/achievements" },
];

const PARTICIPATE = [
  { label: "Join a Club", href: "/join" },
  { label: "Search", href: "/search" },
  { label: "Events Calendar", href: "/calendar" },
  { label: "News & Announcements", href: "/news" },
  { label: "Completed Activities", href: "/archive" },
  { label: "Gallery", href: "/gallery" },
];

const CENTRE = [
  { label: "People & Governance", href: "/people" },
  { label: "Faculty Committee", href: "/committee" },
  { label: "Facilities", href: "/facilities" },
  { label: "Documents & Downloads", href: "/documents" },
  { label: "Annual Report", href: "/reports" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const { contact } = site;

  return (
    <footer className="relative mt-auto overflow-hidden border-t-2 border-line-strong bg-bg-tint bg-dot-grid">
      {/* Confetti rail, mirroring the one under the header */}
      <div className="flex h-1.5 w-full" aria-hidden>
        {["--pop-1", "--pop-2", "--pop-3", "--pop-4", "--pop-5", "--pop-6"].map((token) => (
          <span key={token} className="flex-1" style={{ backgroundColor: `var(${token})` }} />
        ))}
      </div>

      <div className="container-page relative py-16 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="group flex items-center gap-3">
              <Image
                src="/images/brand/sac-logo.webp"
                alt=""
                width={356}
                height={480}
                sizes="52px"
                className="h-13 w-auto transition-transform duration-300 ease-[cubic-bezier(0.34,1.5,0.64,1)] group-hover:scale-110"
              />
              <span className="leading-tight">
                <span className="block font-display text-base font-bold">
                  Student Activity Centre
                </span>
                <span className="block text-xs text-ink-subtle">{site.instituteShort}</span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-muted">
              {site.description}
            </p>

            <div className="mt-6 flex items-center gap-2.5">
              {site.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="grid size-10 place-items-center rounded-xl border-2 border-line-strong bg-surface text-ink shadow-[3px_3px_0_0_var(--sticker)] transition-transform duration-250 ease-[cubic-bezier(0.34,1.4,0.64,1)] hover:-translate-y-1 hover:rotate-6 hover:text-brand active:translate-y-0.5 active:shadow-none"
                >
                  <Icon name={social.icon} className="size-4.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <FooterColumn title="Explore">
            {EXPLORE.map((item, i) => (
              <FooterLink key={item.href} href={item.href} dot={`var(--pop-${(i % 6) + 1})`}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>

          {/* Participate */}
          <FooterColumn title="Participate">
            {PARTICIPATE.map((item, i) => (
              <FooterLink key={item.href} href={item.href} dot={`var(--pop-${(i % 6) + 1})`}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>

          {/* The Centre */}
          <FooterColumn title="The Centre">
            {CENTRE.map((item, i) => (
              <FooterLink key={item.href} href={item.href} dot={`var(--pop-${(i % 6) + 1})`}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>

          {/* Contact + institute links */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.12em] text-ink">
              Reach us
            </h3>
            <ul className="mt-5 space-y-4 text-sm text-ink-muted">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand" />
                <span>
                  {contact.address}
                  <br />
                  {contact.city} – {contact.pin}, {contact.state}, {contact.country}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-brand" />
                <span className="flex flex-col">
                  {contact.phone.map((number) => (
                    <a
                      key={number}
                      href={`tel:${number.replace(/[^+\d]/g, "")}`}
                      className="transition hover:text-brand"
                    >
                      {number}
                    </a>
                  ))}
                </span>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-brand" />
                <a href={`mailto:${contact.email}`} className="transition hover:text-brand">
                  {contact.email}
                </a>
              </li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
              {site.quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-ink-subtle underline-offset-4 transition hover:text-brand hover:underline"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t-2 border-line-strong pt-8 text-xs text-ink-subtle sm:flex-row">
          <p>
            © {year} Student Activity Centre, {site.instituteShort}. All rights reserved.
          </p>
          <Link
            href="/web-team"
            className="group inline-flex items-center gap-1.5 font-semibold text-ink transition-colors hover:text-brand"
          >
            Made by the web team
            <ArrowRight className="size-3 transition-transform duration-250 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-display text-sm font-bold uppercase tracking-[0.12em] text-ink">
        {title}
      </h3>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
  dot = "var(--brand)",
}: {
  href: string;
  children: React.ReactNode;
  dot?: string;
}) {
  return (
    <li>
      <Link
        href={href}
        className="group inline-flex items-center gap-2 text-sm text-ink-muted transition-all duration-250 hover:translate-x-1 hover:text-ink"
      >
        <span
          className="size-2 rounded-full transition-transform duration-250 group-hover:scale-150"
          style={{ backgroundColor: dot }}
        />
        {children}
      </Link>
    </li>
  );
}
