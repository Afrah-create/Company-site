"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { type ReactNode, useRef } from "react";
import { useDesktopParallax } from "@/components/motion/useDesktopParallax";

type ParallaxHeroProps = {
  src: string;
  alt: string;
  children: ReactNode;
  className?: string;
};

/**
 * Usage: <ParallaxHero src="/images/hero.jpg" alt="Workspace">…copy…</ParallaxHero>
 * Background moves slower than copy; overlay opacity and scale change as the hero scrolls away.
 */
export default function ParallaxHero({ src, alt, children, className = "" }: ParallaxHeroProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const enabled = useDesktopParallax();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.48, 0.84]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section
      ref={sectionRef}
      className={`relative isolate min-h-[88svh] overflow-hidden ${className}`.trim()}
    >
      <motion.div
        className="absolute inset-0 -z-20"
        style={{
          y: enabled ? backgroundY : 0,
          scale: enabled ? backgroundScale : 1,
          willChange: enabled ? "transform" : "auto",
        }}
      >
        <Image src={src} alt={alt} fill priority sizes="100vw" className="object-cover" />
      </motion.div>
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          backgroundColor: "var(--image-overlay-strong)",
          opacity: enabled ? overlayOpacity : 0.48,
        }}
      />
      <div className="relative z-10">{children}</div>
    </section>
  );
}
