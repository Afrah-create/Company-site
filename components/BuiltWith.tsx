import { SERVICE_TECH } from "@/lib/services";

export default function BuiltWith() {
  return (
    <section className="mx-auto mt-8 w-full max-w-6xl px-4 sm:px-6 md:mt-12 md:px-10">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--cyan)]">
        Built with
      </p>
      <h2 className="mt-3 text-2xl text-[var(--white)] sm:text-3xl">Tools we already use</h2>
      <ul className="mt-6 flex flex-wrap gap-2">
        {SERVICE_TECH.map((name) => (
          <li
            key={name}
            className="rounded-full border border-[var(--border)] bg-[var(--card-bg)] px-4 py-2 text-sm text-[var(--white)]"
          >
            {name}
          </li>
        ))}
      </ul>
    </section>
  );
}
