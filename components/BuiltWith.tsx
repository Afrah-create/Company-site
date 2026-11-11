import { SERVICE_TECH } from "@/lib/services";

const TECH_ROWS = [
  SERVICE_TECH.filter((_, index) => index % 2 === 0),
  SERVICE_TECH.filter((_, index) => index % 2 === 1),
] as const;

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: readonly string[];
  reverse?: boolean;
}) {
  return (
    <div className="tech-marquee">
      <div
        className={
          reverse ? "tech-marquee-track tech-marquee-track-reverse" : "tech-marquee-track"
        }
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="tech-marquee-group">
            {Array.from({ length: 4 }, (_, repeat) =>
              items.map((name) => (
                <span
                  key={`${copy}-${repeat}-${name}`}
                  className="whitespace-nowrap rounded-full border border-[var(--border)] bg-[var(--card-bg)] px-4 py-2 text-sm text-[var(--white)]"
                >
                  {name}
                </span>
              )),
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BuiltWith() {
  return (
    <section className="mt-8 w-full overflow-x-hidden md:mt-12">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--cyan)]">
          Built with
        </p>
        <h2 className="mt-3 text-2xl text-[var(--white)] sm:text-3xl">Tools we already use</h2>
        <ul className="sr-only">
          {SERVICE_TECH.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>

      <div className="relative mt-6 hidden space-y-3 motion-reduce:block">
        <ul className="mx-auto flex w-full max-w-6xl flex-wrap justify-center gap-2 px-4 sm:px-6 md:px-10">
          {SERVICE_TECH.map((name) => (
            <li
              key={name}
              className="rounded-full border border-[var(--border)] bg-[var(--card-bg)] px-4 py-2 text-sm text-[var(--white)]"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mt-6 space-y-3 motion-reduce:hidden" aria-hidden="true">
        {TECH_ROWS.map((items, index) => (
          <MarqueeRow key={items.join("-")} items={items} reverse={index === 1} />
        ))}
      </div>
    </section>
  );
}
