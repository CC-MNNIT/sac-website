import Image from "next/image";
import { cn } from "@/lib/utils";

export function Avatar({
  src,
  name,
  size = 96,
  className,
  rounded = "full",
}: {
  src?: string;
  name: string;
  size?: number;
  className?: string;
  rounded?: "full" | "xl";
}) {
  const shape = rounded === "full" ? "rounded-full" : "rounded-2xl";

  // A handful of faculty records have no photograph. Rather than stamping
  // initials over a colour block, fall back to a neutral silhouette so the
  // row of faces still reads as a row of faces.
  if (!src) {
    return (
      <div
        className={cn(shape, "grid shrink-0 place-items-center bg-surface-3 text-ink-subtle", className)}
        style={{ width: size, height: size }}
        aria-hidden
      >
        <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: size * 0.62, height: size * 0.62 }}>
          <circle cx="12" cy="8.4" r="4.1" />
          <path d="M12 14.2c-4 0-7.1 2.3-7.1 5.2 0 .6.5 1 1.1 1h12c.6 0 1.1-.4 1.1-1 0-2.9-3.1-5.2-7.1-5.2z" />
        </svg>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={name}
      width={size}
      height={size}
      className={cn(shape, "shrink-0 object-cover", className)}
      style={{ width: size, height: size }}
      sizes={`${size}px`}
    />
  );
}
