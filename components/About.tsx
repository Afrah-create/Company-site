"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useRef } from "react";
import { useCountUp } from "@/hooks/useCountUp";

const differentiators = [
  "Deep engineering paired with strategic business thinking",
  "Security-first delivery across every product lifecycle",
  "Agile collaboration with transparent communication",
  "Long-term partnership focused on measurable outcomes",
];

const stats = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 30, suffix: "+", label: "Happy Clients" },
  { value: 5, suffix: "+", label: "Years Experience" },
  { value: 99, suffix: "%", label: "Client Satisfaction" },
];

function StatItem({
  value,
  suffix,
  label,
  shouldStart,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  shouldStart: boolean;
  delay: number;
}) {
  const count = useCountUp({ end: value, shouldStart, durationMs: 1400 + delay * 120 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.45, delay }}
      className="rounded-xl border border-[var(--border)] bg-[var(--bg)]/65 px-4 py-5 text-center"
    >
      <p className="font-heading text-3xl text-[var(--white)]">
        {count}
        {suffix}
      </p>
      <p className="mt-1 text-sm text-[var(--muted)]">{label}</p>
    </motion.div>
  );
}

export default function About() {
  const statsRef = useRef<HTMLDivElement | null>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.35 });

  return (
    <section id="about" className="mx-auto mt-12 w-full max-w-6xl rounded-2xl bg-[#111] px-6 py-10 md:px-10 md:py-12">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--cyan)]">
            ABOUT US
          </p>
          <h2 className="max-w-xl text-3xl leading-tight text-[var(--white)] sm:text-4xl">
            We Are Engineers Who Think Like Strategists
          </h2>
          <p className="mt-5 text-[15px] leading-8 text-[var(--muted)]">
            At SlimCyberTech, our mission is to build technology that creates lasting impact.
            We help organizations transform complex ideas into resilient digital products that
            drive growth, efficiency, and competitive advantage.
          </p>
          <p className="mt-4 text-[15px] leading-8 text-[var(--muted)]">
            Our approach blends strong technical execution with strategic planning. From concept
            to deployment, we align every decision with business outcomes, ensuring every release
            is secure, scalable, and built for long-term value.
          </p>

          <ul className="mt-6 space-y-3">
            {differentiators.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-[var(--white)]/90">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--cyan)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <Link
            href="#team"
            className="mt-8 inline-flex rounded-full border border-[var(--cyan)]/65 px-6 py-2.5 text-sm font-semibold text-[var(--white)] transition-colors duration-300 hover:bg-[var(--surface2)]"
          >
            Meet The Team
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="relative"
        >
          <div className="pointer-events-none absolute -inset-2 -z-10 rounded-3xl bg-[radial-gradient(circle_at_center,rgba(0,198,255,0.2),transparent_62%)] blur-2xl" />
          <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[#0d0d0d] shadow-[0_0_0_1px_rgba(0,198,255,0.06),0_24px_60px_-32px_rgba(0,114,255,0.4)]">
            <div className="flex items-center gap-2 border-b border-[var(--border)] bg-black/25 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
            </div>
            <pre className="overflow-x-auto p-5 text-sm leading-7 text-[var(--white)]">
              <code>
                <span className="text-[var(--cyan)]">const</span>{" "}
                <span className="text-[var(--white)]">solution</span>{" "}
                <span className="text-[var(--blue)]">=</span>{" "}
                <span className="text-[var(--white)]">SlimCyberTech</span>
                <span className="text-[var(--blue)]">.</span>
                <span className="text-[var(--cyan)]">build</span>
                <span className="text-[var(--white)]">({"{"}</span>
                {"\n  "}
                <span className="text-[var(--white)]">strategy:</span>{" "}
                <span className="text-[var(--blue)]">&quot;outcome-driven&quot;</span>
                <span className="text-[var(--white)]">,</span>
                {"\n  "}
                <span className="text-[var(--white)]">architecture:</span>{" "}
                <span className="text-[var(--blue)]">&quot;secure-by-design&quot;</span>
                <span className="text-[var(--white)]">,</span>
                {"\n  "}
                <span className="text-[var(--white)]">delivery:</span>{" "}
                <span className="text-[var(--blue)]">&quot;scalable&quot;</span>
                {"\n"}
                <span className="text-[var(--white)]">{"}"});</span>
              </code>
            </pre>
          </div>
        </motion.div>
      </div>

      <div ref={statsRef} className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatItem
            key={stat.label}
            value={stat.value}
            suffix={stat.suffix}
            label={stat.label}
            shouldStart={statsInView}
            delay={index * 0.08}
          />
        ))}
      </div>
    </section>
  );
}
