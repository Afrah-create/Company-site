"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem, VIEWPORT_ONCE } from "@/lib/motion";

const proofItems = [
  { value: "50+", label: "Projects Delivered" },
  { value: "30+", label: "Trusted Clients" },
  { value: "99%", label: "Client Satisfaction" },
  { value: "24h", label: "Average Response Time" },
];

export default function ProofStrip() {
  return (
    <section className="mx-auto mt-8 w-full max-w-6xl px-4 sm:px-6 md:px-10">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)]/90 p-4 backdrop-blur-sm sm:p-5"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          {proofItems.map((item, index) => (
            <motion.div key={item.label} variants={staggerItem} custom={index} className="text-center">
              <p className="font-heading text-2xl text-[var(--white)] sm:text-3xl">{item.value}</p>
              <p className="mt-1 text-xs text-[var(--muted)] sm:text-sm">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
