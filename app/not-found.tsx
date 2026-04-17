import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,198,255,0.12),transparent_55%)]" />

      <div className="relative z-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--cyan)]">Error</p>
        <h1 className="glitch-404 mt-3 font-heading text-8xl text-[var(--white)] sm:text-9xl">
          404
        </h1>
        <p className="mt-4 text-[var(--muted)]">
          The page you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-[var(--gradient)] px-6 py-2.5 text-sm font-semibold text-[var(--white)]"
        >
          Go Home
        </Link>
      </div>
    </main>
  );
}
