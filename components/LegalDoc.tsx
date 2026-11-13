import type { ReactNode } from "react";

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="font-heading text-xl text-[var(--white)] sm:text-2xl">{title}</h2>
      <div className="mt-3 space-y-4">{children}</div>
    </section>
  );
}

export default function LegalDoc({
  updated,
  children,
}: {
  updated: string;
  children: ReactNode;
}) {
  return (
    <article className="mt-10 max-w-3xl space-y-10 text-sm leading-7 text-[var(--muted)] sm:text-[0.95rem] sm:leading-8">
      <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">Updated {updated}</p>
      {children}
    </article>
  );
}
