import type { ReactNode } from "react";

type PageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
};

/** Shared inner-page frame: clears the fixed navbar and keeps stub/full pages aligned. */
export default function PageShell({
  eyebrow,
  title,
  description,
  children,
}: PageShellProps) {
  return (
    <main className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-[calc(7.5rem+env(safe-area-inset-top))] sm:px-6 sm:pb-24 sm:pt-36 md:px-10">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--cyan)]">
        {eyebrow}
      </p>
      <h1 className="mt-3 max-w-[18ch] text-2xl leading-tight text-[var(--white)] sm:max-w-none sm:text-5xl">
        {title}
      </h1>
      <p className="mt-4 max-w-[40ch] text-sm leading-7 text-[var(--muted)] sm:max-w-2xl sm:text-base sm:leading-8">
        {description}
      </p>
      {children}
    </main>
  );
}
