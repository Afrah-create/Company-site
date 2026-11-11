"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useDesktopParallax } from "@/components/motion/useDesktopParallax";

type ParallaxImageProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  aspect?: string;
  className?: string;
};

/**
 * Usage: <ParallaxImage src="/images/x.jpg" alt="Desk" sizes="50vw" />
 * Image is 120% tall inside an overflow-hidden frame; translateY maps roughly -8% to 8%.
 */
export default function ParallaxImage({
  src,
  alt,
  sizes,
  priority = false,
  aspect = "16 / 10",
  className = "",
}: ParallaxImageProps) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const enabled = useDesktopParallax();
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div
      ref={frameRef}
      className={`relative overflow-hidden ${className}`.trim()}
      style={{ aspectRatio: aspect }}
    >
      <motion.div
        className="absolute inset-x-0"
        style={{
          top: "-10%",
          height: "120%",
          y: enabled ? y : 0,
          willChange: enabled ? "transform" : "auto",
        }}
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
