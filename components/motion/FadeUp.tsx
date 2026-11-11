"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type FadeUpProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  index?: number;
};

/**
 * Usage: <FadeUp index={i}>card</FadeUp>
 * Simple whileInView fade-up. Use index to stagger siblings (0.08s each).
 */
export default function FadeUp({ children, className, delay = 0, index = 0 }: FadeUpProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{
        duration: 0.55,
        delay: delay + index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
