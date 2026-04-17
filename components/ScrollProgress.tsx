"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const CIRCLE_RADIUS = 22;
const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

const sectionMap: { id: string; label: string }[] = [
  { id: "hero", label: "Hero" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "portfolio", label: "Portfolio" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

export default function ScrollProgress() {
  const scrollPercent = useScrollProgress();
  const [isHovered, setIsHovered] = useState(false);
  const [currentSection, setCurrentSection] = useState("Hero");

  useEffect(() => {
    const sectionElements = sectionMap
      .map((section) => ({
        ...section,
        element: document.getElementById(section.id),
      }))
      .filter((section) => section.element) as Array<{ id: string; label: string; element: HTMLElement }>;

    if (!sectionElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!activeEntries.length) return;

        const bestMatch = sectionElements.find((section) => section.element === activeEntries[0].target);
        if (bestMatch) {
          setCurrentSection(bestMatch.label);
        }
      },
      { threshold: 0.3 },
    );

    sectionElements.forEach((section) => observer.observe(section.element));
    return () => observer.disconnect();
  }, []);

  const strokeDashoffset = useMemo(
    () => CIRCUMFERENCE - (scrollPercent / 100) * CIRCUMFERENCE,
    [scrollPercent],
  );

  const showWidget = scrollPercent >= 5;

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[9999] h-[3px] bg-transparent">
        <div
          className="relative h-full bg-[linear-gradient(90deg,#00c6ff,#0072ff)] transition-[width] duration-100 ease-linear will-change-transform"
          style={{ width: `${scrollPercent}%` }}
        >
          <div
            className="absolute right-0 top-0 h-full w-[4px] rounded-full bg-cyan-300"
            style={{
              boxShadow: "0 0 10px #00c6ff, 0 0 20px #0072ff",
            }}
          />
        </div>
      </div>

      <AnimatePresence>
        {showWidget && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-4 right-4 z-[9998] flex items-center gap-2 md:bottom-6 md:right-6"
            style={{ willChange: "transform" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSection}
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 6, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="hidden rounded-full border border-[var(--cyan)]/70 bg-[#111] px-3 py-1 text-xs font-heading text-[var(--white)] md:flex"
              >
                {currentSection}
              </motion.div>
            </AnimatePresence>

            <motion.button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              whileHover={{ scale: 1.1 }}
              aria-label="Scroll to top"
              className="relative inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-[#222] bg-[#111] md:h-14 md:w-14"
              style={{
                boxShadow: isHovered
                  ? "0 0 16px #00c6ff44, 0 8px 20px rgba(0,0,0,0.45)"
                  : "0 8px 20px rgba(0,0,0,0.4)",
              }}
            >
              <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 56 56" aria-hidden="true">
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00c6ff" />
                    <stop offset="100%" stopColor="#0072ff" />
                  </linearGradient>
                </defs>
                <circle cx="28" cy="28" r={CIRCLE_RADIUS} fill="none" stroke="#222" strokeWidth="3" />
                <circle
                  cx="28"
                  cy="28"
                  r={CIRCLE_RADIUS}
                  fill="none"
                  stroke="url(#progressGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={strokeDashoffset}
                  style={{ transition: "stroke-dashoffset 0.2s ease" }}
                />
              </svg>

              <AnimatePresence mode="wait" initial={false}>
                {isHovered ? (
                  <motion.span
                    key="arrow"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.16 }}
                    className="relative z-10 inline-flex"
                  >
                    <ArrowUp className="h-3 w-3 text-[var(--white)] md:h-[10px] md:w-[10px]" />
                  </motion.span>
                ) : (
                  <motion.span
                    key={`percent-${scrollPercent}`}
                    initial={{ opacity: 0.6 }}
                    animate={{ opacity: [0.6, 1] }}
                    exit={{ opacity: 0.5 }}
                    transition={{ duration: 0.2 }}
                    className="relative z-10 flex flex-col items-center leading-none"
                  >
                    <span className="font-heading text-[9px] font-bold text-[var(--white)] md:text-[11px]">
                      {scrollPercent}
                    </span>
                    <span className="mt-[1px] text-[7px] text-[var(--cyan)] md:text-[8px]">%</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
