"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useDesktopParallax } from "@/components/motion/useDesktopParallax";

type FeaturedRevealImageProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  aspect?: string;
  className?: string;
  direction?: "left" | "right";
  objectPosition?: "center" | "top";
  fit?: "cinematic" | "portrait";
  hoverEyebrow?: string;
  hoverBody?: string;
};

/**
 * Usage: <FeaturedRevealImage src="/images/x.jpg" alt="Product" sizes="50vw" direction="left" />
 * Clip-path wipe on enter, then a slow parallax/scale while the frame stays in view.
 */
export default function FeaturedRevealImage({
  src,
  alt,
  sizes,
  priority = false,
  aspect = "16 / 10",
  className = "",
  direction = "left",
  objectPosition = "center",
  fit = "cinematic",
  hoverEyebrow,
  hoverBody,
}: FeaturedRevealImageProps) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();
  const parallax = useDesktopParallax();
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });

  const cinematic = fit === "cinematic" && parallax;
  const y = useTransform(scrollYProgress, [0, 1], cinematic ? ["-11%", "11%"] : ["0%", "0%"]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    cinematic ? [1.16, 1.04, 1.1] : [1, 1, 1],
  );
  const glow = useTransform(scrollYProgress, [0.15, 0.45, 0.85], [0.18, 0.45, 0.22]);

  const clipHidden =
    direction === "right" ? "inset(10% 6% 10% 32%)" : "inset(10% 32% 10% 6%)";

  return (
    <div ref={frameRef} className={`relative ${className}`.trim()}>
      <motion.div
        aria-hidden="true"
        className={`pointer-events-none absolute rounded-[2rem] bg-[radial-gradient(circle_at_center,rgba(0,198,255,0.22),transparent_68%)] blur-2xl ${
          fit === "portrait" ? "-inset-3" : "-inset-6"
        }`}
        style={{ opacity: reducedMotion ? 0.2 : glow }}
      />
      <div className="relative rounded-3xl bg-[linear-gradient(135deg,rgba(0,198,255,0.5),rgba(0,114,255,0.12)_42%,rgba(0,114,255,0.45))] p-px shadow-[0_24px_60px_-28px_rgba(0,114,255,0.55)]">
        <div className="relative overflow-hidden rounded-[1.4rem] bg-[var(--surface)]" style={{ aspectRatio: aspect }}>
          <motion.div
            className="absolute inset-0"
            initial={
              reducedMotion
                ? { opacity: 1 }
                : { opacity: 0.35, clipPath: clipHidden }
            }
            whileInView={
              reducedMotion
                ? { opacity: 1 }
                : { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }
            }
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className={fit === "portrait" ? "absolute inset-0" : "absolute inset-x-0"}
              style={{
                top: fit === "portrait" ? 0 : "-12%",
                height: fit === "portrait" ? "100%" : "124%",
                y: reducedMotion ? 0 : y,
                scale: reducedMotion ? 1 : scale,
                willChange: cinematic ? "transform" : "auto",
              }}
            >
              <Image
                src={src}
                alt={alt}
                fill
                sizes={sizes}
                priority={priority}
                className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${
                  objectPosition === "top" ? "object-top" : "object-center"
                }`}
              />
            </motion.div>
          </motion.div>
          {hoverBody ? (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10 flex items-end bg-gradient-to-t from-black/80 via-black/30 to-transparent px-5 py-5 opacity-0 transition duration-300 ease-out group-focus-within:opacity-100 [@media(hover:hover)]:group-hover:opacity-100 motion-reduce:transition-none"
            >
              <div className="translate-y-2 transition duration-300 ease-out group-hover:translate-y-0 group-focus-within:translate-y-0 motion-reduce:translate-y-0 motion-reduce:transition-none">
                {hoverEyebrow ? (
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#00c6ff]">
                    {hoverEyebrow}
                  </p>
                ) : null}
                <p className="mt-1.5 max-w-[36ch] text-sm leading-6 text-white">{hoverBody}</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
