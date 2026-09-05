import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * A photo frame that never crops.
 *
 * Faculty portraits arrive at anything from 0.58 to 1.33 wide-to-tall, so
 * `object-cover` inevitably cut the top or bottom off someone. Here the
 * portrait is contained — always whole — and a blurred, over-scaled copy of
 * the same file fills the frame behind it, so the card still reads as a solid
 * block of colour rather than a letterboxed photograph.
 */
export function PhotoFrame({
  src,
  alt,
  sizes,
  priority = false,
  className,
  imageClassName,
}: {
  src?: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
}) {
  if (!src) {
    return (
      <div className={cn("grid place-items-center bg-surface-2 text-ink-subtle", className)}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-2/5 opacity-40" aria-hidden>
          <circle cx="12" cy="8.4" r="4.1" />
          <path d="M12 14.2c-4 0-7.1 2.3-7.1 5.2 0 .6.5 1 1.1 1h12c.6 0 1.1-.4 1.1-1 0-2.9-3.1-5.2-7.1-5.2z" />
        </svg>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden bg-surface-2", className)}>
      {/* Blurred backdrop — decorative, so it carries no alt text */}
      <Image
        src={src}
        alt=""
        fill
        aria-hidden
        sizes={sizes}
        className="scale-125 object-cover opacity-45 blur-2xl saturate-150"
      />

      {/* The portrait itself, complete — nothing trimmed off any edge */}
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn("object-contain", imageClassName)}
      />
    </div>
  );
}
