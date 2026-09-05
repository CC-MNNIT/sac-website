import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { Blank } from "@/components/ui/Pending";
import type { FacultyMember } from "@/lib/types";
import { ACTIVITY_GROUPS, facultyTable } from "@/lib/data";

/**
 * §4 — "For every activity: Activity | Faculty In-Charge | Faculty
 * Coordinator | Contact". Rows are generated from activities.json, and the
 * names come from committee.json.
 *
 * Note the distinction the source data actually makes: the In-Charge and
 * Coordinator head an entire activity *domain* (Technological Activities,
 * Sports, and so on), while some activities additionally have a faculty
 * member named against them specifically — that name is shown under the
 * activity. Where none is listed, none has been published.
 *
 * No contact addresses appear in the source data, so that column stays empty
 * until the SAC office supplies it.
 */
export function FacultyTable() {
  const rows = facultyTable();

  return (
    <div className="space-y-10">
      {ACTIVITY_GROUPS.map((group) => {
        const groupRows = rows.filter((row) => row.category === group.key);
        if (groupRows.length === 0) return null;

        return (
          <section key={group.key} id={`faculty-${group.key}`} className="scroll-mt-28">
            <h3
              className="flex items-center gap-2.5 text-lg"
              style={{ color: group.colorVar }}
            >
              <span
                className="size-3 rounded-full border-2 border-line-strong"
                style={{ backgroundColor: group.colorVar }}
                aria-hidden
              />
              {group.label}
            </h3>

            <div className="mt-4 overflow-x-auto rounded-3xl border-2 border-line-strong bg-surface">
              <table className="w-full min-w-[46rem] border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-line-strong bg-surface-2 text-left">
                    <th className="px-5 py-3.5 label-caps text-ink-subtle">Activity</th>
                    <th className="px-5 py-3.5 label-caps text-ink-subtle">
                      In-Charge <span className="font-normal normal-case tracking-normal">(domain)</span>
                    </th>
                    <th className="px-5 py-3.5 label-caps text-ink-subtle">
                      Coordinator <span className="font-normal normal-case tracking-normal">(domain)</span>
                    </th>
                    <th className="px-5 py-3.5 label-caps text-ink-subtle">Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {groupRows.map((row) => (
                    <tr key={row.slug} className="border-b border-line last:border-b-0">
                      <td className="px-5 py-3.5">
                        <Link
                          href={`/activities/${row.slug}`}
                          className="font-bold underline-offset-4 transition hover:text-brand hover:underline"
                        >
                          {row.activity}
                        </Link>
                        {row.specific.length > 0 ? (
                          <div className="mt-2 space-y-2">
                            {row.specific.map((member) => (
                              <PersonCell
                                key={member.name}
                                member={member}
                                color={group.colorVar}
                                note="Faculty for this activity"
                              />
                            ))}
                          </div>
                        ) : null}
                      </td>
                      <td className="px-5 py-3.5">
                        {row.inCharge ? (
                          <PersonCell member={row.inCharge} color={group.colorVar} />
                        ) : (
                          <Blank label="Faculty In-Charge" />
                        )}
                      </td>
                      <td className="px-5 py-3.5">
                        {row.coordinator ? (
                          <PersonCell member={row.coordinator} color={group.colorVar} />
                        ) : (
                          <Blank label="Faculty Coordinator" />
                        )}
                      </td>
                      <td className="px-5 py-3.5">
                        <Blank label="Contact" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        );
      })}
    </div>
  );
}

/** A faculty member as a face, a name and their department. */
function PersonCell({
  member,
  color,
  note,
}: {
  member: FacultyMember;
  color: string;
  note?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <Avatar
        src={member.photo}
        name={member.name}
        size={38}
        rounded="xl"
        className="border-2 border-line-strong"
      />
      <span className="min-w-0">
        {note ? (
          <span className="block text-[0.62rem] font-bold uppercase tracking-[0.1em]" style={{ color }}>
            {note}
          </span>
        ) : null}
        <span className="block font-semibold leading-snug text-ink">{member.name}</span>
        {member.dept ? (
          <span className="block text-xs text-ink-subtle">{member.dept}</span>
        ) : null}
      </span>
    </div>
  );
}
