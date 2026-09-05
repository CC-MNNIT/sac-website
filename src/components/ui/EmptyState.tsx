import type { ReactNode } from "react";

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-4xl border-2 border-dashed border-line-strong bg-surface px-6 py-16 text-center">
      <p className="font-display text-xl">{title}</p>
      {body ? (
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-muted">{body}</p>
      ) : null}
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </div>
  );
}
