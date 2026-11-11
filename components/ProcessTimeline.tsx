"use client";

import { Compass, Hammer, PenTool, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem, VIEWPORT_ONCE } from "@/lib/motion";

const steps = [
  {
    title: "Discover",
    description: "Work out what you need and who will use it.",
    icon: Compass,
  },
  {
    title: "Design",
    description: "Plan the system and how people move through it.",
    icon: PenTool,
  },
  {
    title: "Build",
    description: "Ship in short cycles so you can see what is happening.",
    icon: Hammer,
  },
  {
    title: "Maintain",
    description: "Keep it fast, secure, and possible to look after.",
    icon: TrendingUp,
  },
];

export default function ProcessTimeline({
  eyebrow = "Process",
  title = "How we work",
}: {
  eyebrow?: string;
  title?: string;
}) {
  return (
    <section id="process" className="mx-auto mt-8 w-full max-w-6xl px-4 sm:px-6 md:mt-12 md:px-10">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--cyan)]">
          {eyebrow}
        </p>
        <h2 className="mt-3 text-2xl text-[var(--white)] sm:text-3xl md:text-4xl">{title}</h2>
      </motion.div>

      <motion.ol
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5"
      >
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.li
              key={step.title}
              variants={staggerItem}
              custom={index}
              className="flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6 sm:p-7"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--cyan)]/50 bg-[var(--bg)] text-[var(--cyan)] shadow-[0_0_24px_rgba(0,198,255,0.12)]">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <p className="font-heading text-[11px] tracking-[0.2em] text-[var(--cyan)]">
                  Step {String(index + 1).padStart(2, "0")}
                </p>
              </div>
              <h3 className="mt-5 font-heading text-xl text-[var(--white)] sm:text-2xl">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{step.description}</p>
            </motion.li>
          );
        })}
      </motion.ol>
    </section>
  );
}
