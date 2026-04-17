"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

const rotatingText = [
  "Software Development",
  "Cybersecurity",
  "Mobile Apps",
  "Tech Consulting",
];

type Particle = {
  id: number;
  size: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.1 + index * 0.12,
    },
  }),
};

export default function Hero() {
  const [activeTextIndex, setActiveTextIndex] = useState(0);
  const [visibleLength, setVisibleLength] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 18 }).map((_, index) => ({
        id: index,
        size: 2 + Math.random() * 2.2,
        x: Math.random() * 100,
        y: Math.random() * 100,
        dx: -0.018 + Math.random() * 0.036,
        dy: -0.02 + Math.random() * 0.04,
      })),
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTextIndex((prev) => (prev + 1) % rotatingText.length);
      setVisibleLength(0);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const current = rotatingText[activeTextIndex];

    const typing = setInterval(() => {
      setVisibleLength((prev) => {
        if (prev >= current.length) {
          clearInterval(typing);
          return prev;
        }
        return prev + 1;
      });
    }, 36);

    return () => clearInterval(typing);
  }, [activeTextIndex]);

  const displayedText = rotatingText[activeTextIndex].slice(0, visibleLength);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pb-16 pt-28 sm:pt-32"
    >
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/Gemini_Generated_Image_wsz9hbwsz9hbwsz9.png"
          alt="Futuristic analytics visualization background"
          fill
          priority
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxNicgaGVpZ2h0PSc5Jz48cmVjdCB3aWR0aD0nMTYnIGhlaWdodD0nOScgZmlsbD0nIzA0MGExNScvPjwvc3ZnPg=="
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-black/65" />

      <div className="pointer-events-none absolute inset-0 opacity-35">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {particles.map((particle, index) => (
            <g key={particle.id}>
              {particles.slice(index + 1).map((other) => {
                const distance = Math.hypot(other.x - particle.x, other.y - particle.y);
                if (distance > 23) return null;

                return (
                  <motion.line
                    key={`${particle.id}-${other.id}`}
                    x1={`${particle.x}%`}
                    y1={`${particle.y}%`}
                    x2={`${other.x}%`}
                    y2={`${other.y}%`}
                    stroke="url(#lineGradient)"
                    strokeOpacity={0.16}
                    strokeWidth="0.08"
                    initial={{ opacity: 0.06 }}
                    animate={{ opacity: [0.04, 0.2, 0.04] }}
                    transition={{
                      duration: 5 + ((particle.id + other.id) % 4),
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                );
              })}

              <motion.circle
                cx={`${particle.x}%`}
                cy={`${particle.y}%`}
                r={particle.size / 6}
                fill={particle.id % 2 ? "var(--cyan)" : "var(--blue)"}
                fillOpacity={0.4}
                animate={{
                  cx: [`${particle.x}%`, `${particle.x + particle.dx * 80}%`, `${particle.x}%`],
                  cy: [`${particle.y}%`, `${particle.y + particle.dy * 80}%`, `${particle.y}%`],
                }}
                transition={{
                  duration: 14 + (particle.id % 5) * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </g>
          ))}
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--cyan)" />
              <stop offset="100%" stopColor="var(--blue)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 text-center md:px-10">
        <motion.h1
          custom={0}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl font-bold leading-tight text-[var(--white)] sm:text-5xl lg:text-7xl"
        >
          Building The Future with Code
        </motion.h1>

        <motion.p
          custom={1}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="mt-6 max-w-3xl text-base leading-8 text-[var(--muted)] sm:text-lg"
        >
          We craft cutting-edge software solutions that push the boundaries of what&apos;s
          possible.
        </motion.p>

        <motion.div
          custom={2}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="mt-4 min-h-8 text-sm text-[var(--cyan)] sm:text-base"
        >
          <span className="text-[var(--muted)]">Expertise: </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={activeTextIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="inline-block min-w-[200px] text-left"
            >
              {displayedText}
              <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-[var(--cyan)] align-middle" />
            </motion.span>
          </AnimatePresence>
        </motion.div>

        <motion.div
          custom={3}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="mt-10 flex w-full max-w-md flex-col gap-4 sm:flex-row sm:justify-center"
        >
          <Link
            href="#contact"
            className="rounded-full bg-[var(--gradient)] px-7 py-3 text-sm font-semibold text-[var(--white)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            Start a Project
          </Link>
          <Link
            href="#portfolio"
            className="rounded-full border border-[var(--cyan)]/60 bg-transparent px-7 py-3 text-sm font-semibold text-[var(--white)] transition-colors duration-300 hover:border-[var(--blue)] hover:bg-[var(--surface2)]"
          >
            View Our Work
          </Link>
        </motion.div>

        <motion.div
          custom={4}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="mt-8 w-full max-w-3xl"
        >
          <div className="relative h-[170px] overflow-hidden rounded-2xl border border-[var(--border)] bg-black/40">
            <Image
              src="/images/Gemini_Generated_Image_lyyz1qlyyz1qlyyz.png"
              alt="SlimCyberTech engineering control room"
              fill
              loading="lazy"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-black/50" />
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-[var(--cyan)]/75"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="h-7 w-7" />
      </motion.div>
    </section>
  );
}
