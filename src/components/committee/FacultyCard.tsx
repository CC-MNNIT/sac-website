import { PhotoFrame } from "@/components/ui/PhotoFrame";
import type { FacultyMember } from "@/lib/types";
import { cn } from "@/lib/utils";

/** The In-Charge leads each committee and is called out on the card. */
export function isLead(member: FacultyMember) {
  return member.role.toLowerCase().includes("in-charge");
}

/**
 * A faculty profile card built around the photograph. PhotoFrame keeps every
 * portrait whole, so no one loses the top of their head or their chin to the
 * 4:5 frame regardless of how the original was shot.
 */
export function FacultyCard({
  member,
  color,
  className,
}: {
  member: FacultyMember;
  /** Committee colour, used for the lead's outline and badge. */
  color: string;
  className?: string;
}) {
  const lead = isLead(member);

  return (
    <article
      className={cn(
        "sticker-accent group flex h-full flex-col overflow-hidden rounded-3xl bg-surface",
        className,
      )}
      style={{ ["--card-accent" as string]: lead ? color : "var(--sticker)" }}
    >
      <div className="relative aspect-[4/5] border-b-2 border-line-strong">
        <PhotoFrame
          src={member.photo}
          alt={member.name}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 22vw"
          className="size-full"
          imageClassName="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />

        {lead ? (
          <span
            className="absolute left-3 top-3 rounded-full border-2 border-line-strong px-2.5 py-1 label-caps text-[0.58rem] text-white"
            style={{ backgroundColor: color }}
          >
            In-Charge
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-sans text-[0.95rem] font-bold leading-snug">{member.name}</h3>

        <p
          className={cn("mt-1.5 text-xs leading-snug", !lead && "text-ink-muted")}
          style={lead ? { color } : undefined}
        >
          {member.role}
        </p>

        {member.dept ? (
          <p className="mt-auto pt-3 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-ink-subtle">
            {member.dept}
          </p>
        ) : null}
      </div>
    </article>
  );
}
