import Link from "next/link";
import { Check } from "lucide-react";
import BookDemoButton from "@/components/BookDemoButton";

const trustItems = [
  "West Nile, Uganda",
  "Software and mobile",
  "Security work",
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      <div className="hero-wash" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center px-4 pt-[calc(6.75rem+env(safe-area-inset-top))] text-center sm:px-6 md:px-10">
        <p className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/80 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)] backdrop-blur-sm sm:text-xs">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--cyan)] opacity-40 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--cyan)]" />
          </span>
          Building the future with code
        </p>

        <h1 className="mt-6 max-w-[14ch] text-balance font-heading text-[clamp(2rem,11vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.03em] sm:mt-8 sm:max-w-none">
          <span className="text-[var(--white)]">Slim</span>
          <span className="text-[var(--cyan)]">Cyber</span>
          <span className="text-[var(--blue)]">Tech</span>
        </h1>

        <p className="mt-4 max-w-[36ch] text-base leading-relaxed text-[var(--muted)] sm:mt-5 sm:max-w-xl sm:text-lg sm:leading-8">
          Software, mobile apps, and security work from West Nile. We build for
          organisations in Africa and beyond.
        </p>

        <div className="mt-8 flex w-full max-w-sm flex-col gap-3 sm:mt-9 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4">
          <BookDemoButton className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[var(--white)] px-8 py-3.5 text-base font-semibold text-[var(--bg)] transition-opacity hover:opacity-90 sm:w-auto" />
          <Link
            href="/projects"
            className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-[var(--border)] bg-transparent px-8 py-3.5 text-base font-semibold text-[var(--white)] transition-colors hover:border-[var(--cyan)]/55 sm:w-auto"
          >
            View our work
          </Link>
        </div>

        <ul className="mt-auto flex flex-col items-center gap-2.5 px-4 pb-[calc(5.25rem+env(safe-area-inset-bottom))] pt-10 text-sm text-[var(--muted)] sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8 sm:gap-y-2 sm:px-24 sm:pb-16">
          {trustItems.map((item) => (
            <li key={item} className="inline-flex items-center gap-2">
              <Check className="h-4 w-4 text-[var(--cyan)]" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
