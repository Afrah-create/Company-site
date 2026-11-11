import { Cpu, Handshake, ShieldCheck, Timer } from "lucide-react";
import FadeUp from "@/components/motion/FadeUp";

const items = [
  {
    title: "We learn how you work",
    body: "We spend time on how the business runs, not only on the screens.",
    icon: Cpu,
  },
  {
    title: "Security in the build",
    body: "Security is part of the work from the start, not a pass at the end.",
    icon: ShieldCheck,
  },
  {
    title: "You can see progress",
    body: "Short cycles, clear updates. You should not have to chase us.",
    icon: Timer,
  },
  {
    title: "We stay after launch",
    body: "Fixes, growth, and the next release. The same team remains reachable.",
    icon: Handshake,
  },
];

export default function AboutDifferentiators() {
  return (
    <section className="mx-auto mt-16 w-full max-w-6xl px-4 sm:px-6 md:px-10">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--cyan)]">
        Approach
      </p>
      <h2 className="mt-3 text-2xl text-[var(--white)] sm:text-4xl">How we work with you</h2>
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <FadeUp key={item.title} index={index} className="h-full">
              <article className="flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6 sm:p-7">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--cyan)]/40 bg-[var(--bg)] text-[var(--cyan)]">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <p className="font-heading text-[11px] tracking-[0.2em] text-[var(--cyan)]">
                    {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                  </p>
                </div>
                <h3 className="mt-5 font-heading text-xl leading-tight text-[var(--white)] sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{item.body}</p>
              </article>
            </FadeUp>
          );
        })}
      </div>
    </section>
  );
}
