"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Close, Menu, Search } from "@/components/ui/Icons";
import { useLockBodyScroll, useScrollPosition } from "@/lib/hooks";
import { cn } from "@/lib/utils";

interface NavChild {
  label: string;
  href: string;
}

interface NavEntry {
  label: string;
  /** Top-level destination. Groups navigate to their first child instead. */
  href?: string;
  dot: string;
  children?: NavChild[];
}

/**
 * §18 asks for twelve labels across the top. Twelve pills crowd the bar, so
 * the related ones are grouped — every label the brief names is still here,
 * either as a top-level item or as the first thing inside its group.
 */
const NAV: NavEntry[] = [
  { label: "Home", href: "/", dot: "var(--pop-1)" },
  {
    label: "About",
    dot: "var(--pop-6)",
    children: [
      { label: "About the SAC", href: "/about" },
      { label: "People & Governance", href: "/people" },
      { label: "Faculty Committee", href: "/committee" },
      { label: "Facilities", href: "/facilities" },
      { label: "Contact", href: "/contact" },
      { label: "Web Team", href: "/web-team" },
    ],
  },
  {
    label: "Activities",
    dot: "var(--pop-2)",
    children: [
      { label: "All Activities", href: "/activities" },
      { label: "Sports", href: "/sports" },
      { label: "Join a Club", href: "/join" },
    ],
  },
  { label: "Clubs", href: "/clubs", dot: "var(--pop-3)" },
  {
    label: "Events",
    dot: "var(--pop-4)",
    children: [
      { label: "Major Events", href: "/events" },
      { label: "Events Calendar", href: "/calendar" },
      { label: "News & Announcements", href: "/news" },
      { label: "Completed Activities", href: "/archive" },
    ],
  },
  { label: "Achievements", href: "/achievements", dot: "var(--pop-5)" },
  { label: "Gallery", href: "/gallery", dot: "var(--pop-3)" },
  {
    label: "Documents",
    dot: "var(--pop-4)",
    children: [
      { label: "Documents & Downloads", href: "/documents" },
      { label: "Annual Report", href: "/reports" },
    ],
  },
];

export function Header() {
  const pathname = usePathname();
  const scrollY = useScrollPosition();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLUListElement | null>(null);
  const scrolled = scrollY > 8;

  useLockBodyScroll(open);

  // Any navigation closes the sheet and any open menu. Adjusting during render
  // rather than in an effect avoids a second paint with them still open.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    if (open) setOpen(false);
    if (menu) setMenu(null);
  }

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setMenu(null);
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setMenu(null);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const entryActive = (entry: NavEntry) =>
    entry.href
      ? isActive(entry.href)
      : (entry.children ?? []).some((child) => isActive(child.href));

  return (
    <>
      {/* The bar is fully opaque — a solid plate, never frosted, so nothing
          scrolling underneath ever bleeds through it. */}
      <header
        className={cn(
          "nav-solid fixed inset-x-0 top-0 z-50 border-b-2 border-line-strong transition-shadow duration-300",
          scrolled && "shadow-[0_4px_0_0_var(--brand)]",
        )}
      >
        {/* Confetti rail — six activity colours, one sliver each */}
        <div className="flex h-1 w-full" aria-hidden>
          {["--pop-1", "--pop-2", "--pop-3", "--pop-4", "--pop-5", "--pop-6"].map((token) => (
            <span key={token} className="flex-1" style={{ backgroundColor: `var(${token})` }} />
          ))}
        </div>

        <nav className="container-page flex h-16 items-center justify-between gap-4">
          {/* Mark */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-3"
            aria-label="Student Activity Centre, MNNIT Allahabad — home"
          >
            <Image
              src="/images/brand/sac-logo.webp"
              alt=""
              width={356}
              height={480}
              priority
              sizes="44px"
              className="h-11 w-auto transition-transform duration-300 ease-[cubic-bezier(0.34,1.5,0.64,1)] group-hover:scale-110"
            />
            <span className="hidden text-[0.78rem] font-semibold leading-tight text-ink-muted sm:block">
              Student Activity Centre
              <span className="block text-[0.7rem] font-normal text-ink-subtle">
                MNNIT Allahabad
              </span>
            </span>
          </Link>

          {/* Links — plain pills, or a pill that opens a panel of related pages */}
          <ul ref={navRef} className="hidden items-center gap-0.5 lg:flex">
            {NAV.map((entry) => {
              const active = entryActive(entry);
              const pill = cn(
                "group relative block rounded-full px-2 py-2 text-[0.75rem] font-semibold transition-all duration-300 ease-out xl:px-2.5 xl:text-[0.8rem]",
                active
                  ? "bg-ink text-bg"
                  : "text-ink-muted hover:-translate-y-0.5 hover:bg-surface-2 hover:text-ink",
              );

              if (!entry.children) {
                return (
                  <li key={entry.label}>
                    <Link
                      href={entry.href!}
                      aria-current={active ? "page" : undefined}
                      className={pill}
                    >
                      {entry.label}
                      <Dot active={active} color={entry.dot} />
                    </Link>
                  </li>
                );
              }

              const expanded = menu === entry.label;

              return (
                <li
                  key={entry.label}
                  className="relative"
                  onMouseEnter={() => setMenu(entry.label)}
                  onMouseLeave={() => setMenu(null)}
                >
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-haspopup="true"
                    onClick={() => setMenu(expanded ? null : entry.label)}
                    className={cn(pill, "inline-flex items-center gap-1")}
                  >
                    {entry.label}
                    <Chevron open={expanded} />
                    <Dot active={active} color={entry.dot} />
                  </button>

                  {/* Panel — the group's pages, one per row */}
                  <div
                    className={cn(
                      "absolute left-0 top-full z-50 w-60 pt-2 transition-all duration-200",
                      expanded
                        ? "visible translate-y-0 opacity-100"
                        : "invisible -translate-y-1 opacity-0",
                    )}
                  >
                    <ul className="overflow-hidden rounded-2xl border-2 border-line-strong bg-surface p-1.5 shadow-[5px_5px_0_0_var(--sticker)]">
                      {entry.children.map((child) => {
                        const childActive = isActive(child.href);
                        return (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              aria-current={childActive ? "page" : undefined}
                              className={cn(
                                "flex items-center gap-2.5 rounded-xl px-3 py-2 text-[0.8rem] font-semibold transition-colors",
                                childActive
                                  ? "bg-ink text-bg"
                                  : "text-ink-muted hover:bg-surface-2 hover:text-ink",
                              )}
                            >
                              <span
                                className="size-1.5 shrink-0 rounded-full"
                                style={{ backgroundColor: entry.dot }}
                                aria-hidden
                              />
                              {child.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/search"
              aria-label="Search the site"
              aria-current={isActive("/search") ? "page" : undefined}
              className="grid size-10 place-items-center rounded-xl border-2 border-line-strong bg-surface text-ink shadow-[3px_3px_0_0_var(--sticker)] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none"
            >
              <Search className="size-4.5" />
            </Link>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid size-10 place-items-center rounded-xl border-2 border-line-strong bg-surface text-ink shadow-[3px_3px_0_0_var(--sticker)] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none lg:hidden"
            >
              {open ? <Close className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile sheet — the same groups, opened out into sections */}
      <div
        className={cn("fixed inset-0 z-40 lg:hidden", !open && "pointer-events-none")}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 bg-ink/40 transition-opacity duration-200",
            open ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          className={cn(
            "absolute inset-x-0 top-0 max-h-[100dvh] overflow-y-auto border-b-2 border-line-strong bg-bg bg-dot-grid px-5 pb-9 pt-24 transition-transform duration-300 ease-out",
            open ? "translate-y-0" : "-translate-y-full",
          )}
        >
          <ul className="flex flex-col gap-1">
            {NAV.map((entry) => {
              if (!entry.children) {
                const active = isActive(entry.href!);
                return (
                  <li key={entry.label}>
                    <Link
                      href={entry.href!}
                      className={cn(
                        "flex items-center gap-4 rounded-2xl px-4 py-2.5 font-display text-xl font-bold transition-colors",
                        active ? "bg-ink text-bg" : "text-ink hover:bg-surface-2",
                      )}
                    >
                      <span
                        className="size-3 shrink-0 rounded-full border-2 border-line-strong"
                        style={{ backgroundColor: entry.dot }}
                        aria-hidden
                      />
                      {entry.label}
                    </Link>
                  </li>
                );
              }

              return (
                <li key={entry.label} className="mt-3 first:mt-0">
                  <p className="flex items-center gap-3 px-4 pb-1 pt-2 label-caps text-ink-subtle">
                    <span
                      className="size-2.5 shrink-0 rounded-full border-2 border-line-strong"
                      style={{ backgroundColor: entry.dot }}
                      aria-hidden
                    />
                    {entry.label}
                  </p>
                  <ul>
                    {entry.children.map((child) => {
                      const active = isActive(child.href);
                      return (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={cn(
                              "flex items-center rounded-2xl px-4 py-2 pl-9 font-display text-lg font-bold transition-colors",
                              active ? "bg-ink text-bg" : "text-ink hover:bg-surface-2",
                            )}
                          >
                            {child.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>

          <Link
            href="/search"
            className="mt-6 flex items-center gap-3 rounded-2xl border-2 border-line-strong bg-surface px-4 py-3 font-semibold shadow-[3px_3px_0_0_var(--sticker)]"
          >
            <Search className="size-4" />
            Search the site
          </Link>
        </div>
      </div>
    </>
  );
}

function Dot({ active, color }: { active: boolean; color: string }) {
  return (
    <span
      className={cn(
        "absolute -bottom-0.5 left-1/2 size-1.5 -translate-x-1/2 rounded-full transition-all duration-300",
        active ? "scale-0" : "scale-0 group-hover:-bottom-1.5 group-hover:scale-100",
      )}
      style={{ backgroundColor: color }}
      aria-hidden
    />
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-2.5 transition-transform duration-200", open && "rotate-180")}
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
