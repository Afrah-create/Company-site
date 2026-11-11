"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type RevealImageProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  aspect?: string;
  className?: string;
};

/**
 * Usage: <RevealImage src="/images/x.jpg" alt="Desk" sizes="100vw" />
 * On enter: clip-path inset reveal + scale 1.08 → 1 + fade, once.
 */
export default function RevealImage({
  src,
  alt,
  sizes,
  priority = false,
  aspect = "16 / 10",
  className = "",
}: RevealImageProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={`relative overflow-hidden ${className}`.trim()} style={{ aspectRatio: aspect }}>
      <motion.div
        className="absolute inset-0"
        initial={
          reducedMotion
            ? { opacity: 1 }
            : { opacity: 0, clipPath: "inset(14% 14% 14% 14%)", scale: 1.08 }
        }
        whileInView={
          reducedMotion
            ? { opacity: 1 }
            : { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", scale: 1 }
        }
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}
