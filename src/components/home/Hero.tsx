"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { HeroBackdrop } from "@/components/home/HeroBackdrop";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowLeft, ArrowRight } from "@/components/ui/Icons";
import { usePrefersReducedMotion } from "@/lib/hooks";
import type { HeroSlide } from "@/lib/types";
import { cn } from "@/lib/utils";

const SLIDE_DURATION = 6500;

export function Hero({
  slides,
  title,
  tagline,
  motto,
}: {
  slides: HeroSlide[];
  /** §2 — the fixed hero copy, which does not rotate with the banner. */
  title: string;
  tagline: string;
  motto: string[];
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();
  const touchStart = useRef<number | null>(null);
  const rootRef = useRef<HTMLElement | null>(null);

  const count = slides.length;

  const goTo = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count],
  );
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  /* Autoplay — stops while hovered/focused, off-screen or on a hidden tab. */
  useEffect(() => {
    if (paused || reduced || count < 2) return;
    const timer = window.setTimeout(next, SLIDE_DURATION);
    return () => window.clearTimeout(timer);
  }, [index, paused, reduced, count, next]);

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  /* Pause once the hero is scrolled past — no point animating off-screen. */
  useEffect(() => {
    const node = rootRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setPaused(!entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      prev();
    }
  };

  const onTouchStart = (event: React.TouchEvent) => {
    touchStart.current = event.touches[0].clientX;
  };
  const onTouchEnd = (event: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(delta) > 55) (delta < 0 ? next : prev)();
    touchStart.current = null;
  };

  const active = slides[index];

  return (
    <section
      ref={rootRef}
      className="relative isolate overflow-hidden border-b-2 border-line-strong bg-bg pb-20 pt-28 sm:pb-24 sm:pt-32 lg:pb-28 lg:pt-40"
      aria-roledescription="carousel"
      aria-label="Student Activity Centre highlights"
    >
      <HeroBackdrop />

      <div className="grid w-full items-center gap-12 px-5 md:px-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-12 lg:px-10 xl:gap-14 xl:px-14">
        {/* Copy — fixed. The banner beside it is what rotates. */}
        <div className="relative order-1">
          <h1 className="text-[clamp(2.1rem,5.4vw,3.6rem)] uppercase leading-[1.02] tracking-[-0.01em]">
            {title}
          </h1>

          <p className="mt-5 font-display text-[clamp(1.25rem,2.4vw,1.75rem)] font-bold leading-tight text-brand">
            {tagline}
          </p>

          {/* Explore • Participate • Perform • Lead • Achieve */}
          <ul className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-2.5">
            {motto.map((word, i) => (
              <li key={word} className="flex items-center gap-2">
                {i > 0 ? (
                  <span className="size-1.5 rounded-full bg-accent" aria-hidden />
                ) : null}
                <span className="label-caps text-ink-muted">{word}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href={active.cta.href} size="lg">
              {active.cta.label}
              <ArrowRight className="size-4" />
            </ButtonLink>
            <ButtonLink href="/join" variant="outline" size="lg">
              How can I participate?
            </ButtonLink>
          </div>

          {/* What the banner is currently showing */}
          <div className="mt-9 border-t-2 border-line-strong pt-5" aria-live="polite">
            <span
              key={`eyebrow-${index}`}
              className="inline-flex animate-[fade-up_0.5s_ease-out_both] items-center gap-2 rounded-full border-2 border-line-strong bg-surface px-3 py-1 label-caps text-[0.6rem] text-brand"
            >
              <span className="size-1.5 rounded-full bg-accent" aria-hidden />
              {active.eyebrow}
            </span>
            <p
              key={`sub-${index}`}
              className="mt-3 max-w-lg animate-[fade-up_0.5s_ease-out_both] text-sm leading-relaxed text-ink-muted"
              style={{ animationDelay: "70ms" }}
            >
              <span className="font-bold text-ink">{active.title}.</span> {active.subtitle}
            </p>
          </div>
        </div>

        {/* Slider — its own framed object, nothing laid over the photograph */}
        <div
          className="relative order-2 min-w-0"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-4xl border-2 border-line-strong bg-surface-3 shadow-[12px_12px_0_0_var(--brand)] sm:rounded-5xl lg:aspect-[3/2]">
            {slides.map((slide, i) => (
              <div
                key={slide.image}
                className={cn(
                  "absolute inset-0 transition-opacity duration-700 ease-out",
                  i === index ? "opacity-100" : "opacity-0",
                )}
                aria-hidden={i !== index}
              >
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  priority={i === 0}
                  sizes="(max-width: 1024px) 100vw, 72vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* Controls, below the frame so they never cover the image */}
          <div className="mt-5 flex items-center justify-between gap-5">
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous slide"
                className="grid size-10 place-items-center rounded-full border-2 border-line-strong bg-surface text-ink shadow-[3px_3px_0_0_var(--sticker)] transition-transform duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none"
              >
                <ArrowLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next slide"
                className="grid size-10 place-items-center rounded-full border-2 border-line-strong bg-surface text-ink shadow-[3px_3px_0_0_var(--sticker)] transition-transform duration-200 hover:-translate-y-0.5 hover:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              >
                <ArrowRight className="size-4" />
              </button>
              <span className="ml-1 font-display text-sm font-bold tabular-nums text-ink-subtle">
                <span className="text-ink">{String(index + 1).padStart(2, "0")}</span>
                {" / "}
                {String(count).padStart(2, "0")}
              </span>
            </div>

            {/* Progress bars double as slide selectors */}
            <div className="flex flex-1 justify-end gap-1.5 sm:max-w-[14rem]">
              {slides.map((slide, i) => (
                <button
                  key={slide.image}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}: ${slide.title}`}
                  aria-current={i === index}
                  className="group h-8 flex-1 py-3"
                >
                  <span className="relative block h-1.5 w-full overflow-hidden rounded-full bg-surface-3 transition-colors group-hover:bg-line-strong">
                    <span
                      className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-brand"
                      style={{
                        transform:
                          i < index ? "scaleX(1)" : i > index ? "scaleX(0)" : undefined,
                        animation:
                          i === index && !paused && !reduced
                            ? `slide-progress ${SLIDE_DURATION}ms linear both`
                            : undefined,
                        ...(i === index && (paused || reduced) ? { transform: "scaleX(1)" } : {}),
                      }}
                    />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
