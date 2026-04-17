"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-[var(--bg)]"
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex items-center"
      >
        <Image
          src="/images/Logo.jpeg"
          alt="SlimCyberTech logo"
          width={220}
          height={64}
          priority
          className="h-14 w-auto object-contain"
        />
      </motion.div>

      <div className="mt-8 h-1.5 w-56 overflow-hidden rounded-full bg-[var(--surface2)]">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="h-full w-full bg-[var(--gradient)]"
        />
      </div>
    </motion.div>
  );
}
