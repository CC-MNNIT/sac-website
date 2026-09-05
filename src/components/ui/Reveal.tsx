"use client";

import type { ElementType, ReactNode } from "react";
import { useInView } from "@/lib/hooks";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  /** Direction the element travels in from. */
  variant?: "up" | "left" | "right" | "scale" | "pop";
  /** Stagger in milliseconds. */
  delay?: number;
  className?: string;
  as?: ElementType;
}

/**
 * Scroll-triggered entrance. The actual transition lives in globals.css
 * against [data-reveal] / [data-visible] so it costs no runtime styling
 * and switches itself off under prefers-reduced-motion.
 */
export function Reveal({
  children,
  variant = "up",
  delay = 0,
  className,
  as: Tag = "div",
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      data-visible={inView ? "true" : "false"}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
      className={cn(className)}
    >
      {children}
    </Tag>
  );
}
