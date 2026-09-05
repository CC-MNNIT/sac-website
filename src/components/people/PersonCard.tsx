import { Avatar } from "@/components/ui/Avatar";
import { Mail, Phone } from "@/components/ui/Icons";
import type { Person } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * A person in a role — used for Faculty In-Charge, Faculty Coordinator,
 * coaches, captains and student coordinators (§4, §5, §7).
 */
export function PersonCard({
  person,
  label,
  color = "var(--brand)",
  className,
  children,
}: {
  person: Person;
  /** The role this card is filling, e.g. "Faculty In-Charge". */
  label: string;
  color?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <article
      className={cn(
        "flex h-full gap-4 rounded-2xl border-2 border-line-strong bg-surface p-4",
        className,
      )}
      style={{ ["--card-accent" as string]: color }}
    >
      <Avatar src={person.photo} name={person.name} size={56} rounded="xl" className="border-2 border-line-strong" />

      <div className="min-w-0 flex-1">
        <p className="label-caps text-[0.6rem]" style={{ color }}>
          {label}
        </p>
        <p className="mt-1 font-bold leading-snug">{person.name}</p>
        {person.role && person.role !== label ? (
          <p className="mt-0.5 text-xs text-ink-muted">{person.role}</p>
        ) : null}
        {person.dept ? <p className="mt-0.5 text-xs text-ink-subtle">{person.dept}</p> : null}

        {(person.email || person.phone) && (
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">
            {person.email ? (
              <a href={`mailto:${person.email}`} className="inline-flex items-center gap-1.5 text-ink-muted transition hover:text-brand">
                <Mail className="size-3.5" />
                {person.email}
              </a>
            ) : null}
            {person.phone ? (
              <a href={`tel:${person.phone.replace(/[^+\d]/g, "")}`} className="inline-flex items-center gap-1.5 text-ink-muted transition hover:text-brand">
                <Phone className="size-3.5" />
                {person.phone}
              </a>
            ) : null}
          </div>
        )}

        {children}
      </div>
    </article>
  );
}
