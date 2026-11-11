export default function AboutHero() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div className="hero-wash" aria-hidden="true" />
        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-4 pt-[calc(7.5rem+env(safe-area-inset-top))] pb-14 text-center sm:px-6 sm:pt-36 sm:pb-16 md:px-10">
          <p className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/80 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)] backdrop-blur-sm sm:text-xs">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--cyan)] opacity-40 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--cyan)]" />
            </span>
            About us
          </p>
          <h1 className="mt-5 text-balance font-heading text-[clamp(1.85rem,8vw,3.85rem)] font-bold leading-[1.1] tracking-[-0.03em]">
            <span className="text-[var(--white)]">About </span>
            <span className="text-[var(--white)]">Slim</span>
            <span className="text-[var(--cyan)]">Cyber</span>
            <span className="text-[var(--blue)]">Tech</span>
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-base leading-7 text-[var(--muted)] sm:mt-5 sm:text-lg sm:leading-8">
            A software company in West Nile, Uganda. Web, mobile, and security work for
            organisations in Africa and beyond.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-10">
        <h2 className="font-heading text-2xl font-semibold text-[var(--cyan)] sm:text-[1.75rem]">
          Our story
        </h2>
        <div className="mt-5 max-w-3xl space-y-6 text-justify text-[0.95rem] leading-8 text-[var(--muted)] hyphens-auto [text-align-last:left] sm:text-base sm:leading-8">
          <p>
            SlimCyberTech is a software company based in West Nile, Uganda. We build web platforms,
            mobile apps, and security work for organisations that need software they can keep
            running on the networks and phones people here actually use.
          </p>
          <p>
            The team works from Arua. We take on work for clients in Africa and beyond, and we stay
            with the product after launch. The same people from the first conversation through the
            releases that follow.
          </p>
        </div>
      </section>
    </>
  );
}
