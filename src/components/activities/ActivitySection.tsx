import type { ReactNode } from "react";
import { CountBadge } from "@/components/ui/Pending";
import { Reveal } from "@/components/ui/Reveal";

/**
 * One of the sections the brief mandates on an activity page
 * (§5 About | Faculty | Coach | Captain | Team | Schedule | Facilities |
 * Events | Results | Achievements | Gallery).
 * The heading is always rendered even when the content is pending, so the
 * page shows the full record structure rather than hiding what is missing.
 */
export function ActivitySection({
  id,
  title,
  count,
  color = "var(--brand)",
  children,
}: {
  id: string;
  title: string;
  count?: number;
  color?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-t-2 border-line-strong pt-8 first:border-t-0 first:pt-0">
      <Reveal>
        <div className="flex items-baseline gap-3">
          <h2 className="text-xl sm:text-2xl">{title}</h2>
          {count !== undefined && count > 0 ? (
            <CountBadge value={count} color={color} />
          ) : null}
        </div>
      </Reveal>
      <div className="mt-5">{children}</div>
    </section>
  );
}
