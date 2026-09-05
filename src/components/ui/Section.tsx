import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function Section({
  children,
  className,
  id,
  tint = false,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tint?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 py-20 sm:py-28",
        tint && "bg-bg-tint",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <span className="inline-flex items-center gap-2 rounded-full border-2 border-line-strong bg-surface px-3.5 py-1.5 label-caps text-brand shadow-[3px_3px_0_0_var(--sticker)]">
          <span className="size-2 rounded-full bg-accent" aria-hidden />
          {eyebrow}
        </span>
      ) : null}

      <h2 className="max-w-3xl text-[2.1rem] leading-[1.08] sm:text-[2.7rem] lg:text-[3.2rem]">
        {title}
      </h2>

      {description ? (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
