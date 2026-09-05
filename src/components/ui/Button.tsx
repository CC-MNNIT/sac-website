import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

/* Every solid variant carries the same hard offset shadow, so buttons read as
   the same physical objects as the cards they sit next to. */
const VARIANTS: Record<Variant, string> = {
  primary:
    "border-2 border-line-strong bg-brand text-brand-ink shadow-[4px_4px_0_0_var(--sticker)] hover:-translate-x-0.5 hover:-translate-y-1 hover:shadow-[7px_8px_0_0_var(--sticker)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_0_var(--sticker)]",
  secondary:
    "border-2 border-line-strong bg-accent text-white shadow-[4px_4px_0_0_var(--sticker)] hover:-translate-x-0.5 hover:-translate-y-1 hover:shadow-[7px_8px_0_0_var(--sticker)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_0_var(--sticker)]",
  outline:
    "border-2 border-line-strong bg-surface text-ink shadow-[4px_4px_0_0_var(--sticker)] hover:-translate-x-0.5 hover:-translate-y-1 hover:shadow-[7px_8px_0_0_var(--brand)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_0_var(--sticker)]",
  ghost:
    "border-2 border-transparent text-ink-muted hover:border-line-strong hover:bg-surface-2 hover:text-ink",
};

const SIZES: Record<Size, string> = {
  sm: "h-9 px-4 text-sm gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-13 px-7 text-base gap-2.5",
};

const BASE =
  "inline-flex items-center justify-center rounded-full font-semibold whitespace-nowrap transition-all duration-250 ease-[cubic-bezier(0.34,1.4,0.64,1)] disabled:pointer-events-none disabled:opacity-50";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: CommonProps & ComponentPropsWithoutRef<"button">) {
  return (
    <button className={cn(BASE, VARIANTS[variant], SIZES[size], className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  external,
  ...props
}: CommonProps & { href: string; external?: boolean } & Omit<
    ComponentPropsWithoutRef<"a">,
    "href"
  >) {
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className);

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
