"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { type ReactNode, useRef } from "react";

type SectionFadeProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Usage: <SectionFade><section>…</section></SectionFade>
 * Scales 1 → 0.96 and fades as the section leaves the top of the viewport.
 */
export default function SectionFade({ children, className = "" }: SectionFadeProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.4]);

  return (
    <motion.div
      ref={sectionRef}
      className={className}
      style={
        reducedMotion
          ? undefined
          : {
              scale,
              opacity,
              willChange: "transform, opacity",
            }
      }
    >
      {children}
    </motion.div>
  );
}
