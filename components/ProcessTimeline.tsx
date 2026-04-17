"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem, VIEWPORT_ONCE } from "@/lib/motion";

const steps = [
  { title: "Discover", description: "Clarify goals, users, and business constraints." },
  { title: "Design", description: "Shape architecture and UX flows for reliability and usability." },
  { title: "Build", description: "Deliver in agile cycles with transparent milestones." },
  { title: "Scale", description: "Optimize performance, security, and long-term maintainability." },
];

export default function ProcessTimeline() {
  return (
    <section id="process" className="mx-auto mt-10 w-full max-w-6xl px-4 sm:px-6 md:px-10">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE} className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--cyan)]">Our Process</p>
        <h2 className="mt-3 text-2xl text-[var(--white)] sm:text-3xl md:text-4xl">How We Deliver Results</h2>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        className="relative mt-8 grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-5"
      >
        <div className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-[linear-gradient(90deg,var(--cyan),var(--blue))] md:block" />
        {steps.map((step, index) => (
          <motion.article
            key={step.title}
            variants={staggerItem}
            custom={index}
            className="relative rounded-xl border border-[var(--border)] bg-[#0f1115] p-4 md:p-5"
          >
            <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--cyan)]/60 bg-[var(--bg)] text-xs font-semibold text-[var(--cyan)]">
              {index + 1}
            </div>
            <h3 className="font-heading text-lg text-[var(--white)]">{step.title}</h3>
            <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{step.description}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
