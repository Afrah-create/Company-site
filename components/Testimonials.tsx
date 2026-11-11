"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TouchEvent, useCallback, useEffect, useRef, useState } from "react";
import { TESTIMONIALS } from "@/lib/testimonials";

const AUTO_ADVANCE_MS = 7000;
const SWIPE_THRESHOLD = 50;

export default function Testimonials() {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const count = TESTIMONIALS.length;

  const go = useCallback(
    (delta: number) => {
      setDirection(delta > 0 ? 1 : -1);
      setActiveIndex((prev) => (prev + delta + count) % count);
    },
    [count],
  );

  const goTo = (index: number) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 },
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !inView || reducedMotion) return;
    const interval = window.setInterval(() => go(1), AUTO_ADVANCE_MS);
    return () => window.clearInterval(interval);
  }, [paused, inView, reducedMotion, go]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!inView) return;
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [inView, go]);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
    touchEndX.current = null;
  };

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    touchEndX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const delta = touchStartX.current - touchEndX.current;
    if (Math.abs(delta) > SWIPE_THRESHOLD) go(delta > 0 ? 1 : -1);
  };

  const active = TESTIMONIALS[activeIndex];
  const offset = reducedMotion ? 0 : 36;

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      aria-label="Client testimonials"
      className="mx-auto mt-20 w-full max-w-6xl scroll-mt-28 px-4 sm:px-6 md:px-10"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--cyan)]">
        Clients
      </p>
      <h2 className="mt-3 text-2xl text-[var(--white)] sm:text-4xl">What clients say</h2>

      <div
        className="relative mt-10"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="rounded-3xl bg-[linear-gradient(135deg,rgba(0,198,255,0.5),rgba(0,114,255,0.12)_42%,rgba(0,114,255,0.45))] p-px shadow-[0_24px_60px_-28px_rgba(0,114,255,0.45)]">
          <div className="relative overflow-hidden rounded-[1.4rem] bg-[var(--card-bg)] px-6 py-8 sm:px-10 sm:py-12">
            <p
              aria-hidden="true"
              className="pointer-events-none absolute left-5 top-2 font-heading text-7xl leading-none text-[var(--cyan)]/20 sm:left-8 sm:text-8xl"
            >
              “
            </p>
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.blockquote
                key={`${active.name}-${active.company}`}
                custom={direction}
                initial={{ opacity: 0, x: direction * offset }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -offset }}
                transition={{ duration: reducedMotion ? 0.2 : 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
                aria-live="polite"
              >
                <p className="max-w-3xl text-base leading-7 text-[var(--white)] sm:text-xl sm:leading-9">
                  {active.quote}
                </p>
                <footer className="mt-8">
                  <p className="font-heading text-sm font-semibold text-[var(--white)]">
                    {active.name}
                  </p>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {active.role}, {active.company}
                  </p>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--white)] transition-colors hover:border-[var(--cyan)] hover:text-[var(--cyan)]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--white)] transition-colors hover:border-[var(--cyan)] hover:text-[var(--cyan)]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center gap-2" role="tablist" aria-label="Choose a testimonial">
            {TESTIMONIALS.map((item, index) => (
              <button
                key={`${item.name}-${item.company}`}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Go to testimonial ${index + 1}`}
                onClick={() => goTo(index)}
                className={`h-2.5 rounded-full transition-all ${
                  index === activeIndex
                    ? "w-7 bg-[var(--cyan)]"
                    : "w-2.5 bg-[var(--border)] hover:bg-[var(--muted)]"
                }`}
              />
            ))}
          </div>

          <p className="font-heading text-xs tracking-[0.22em] text-[var(--cyan)]">
            {String(activeIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </p>
        </div>
      </div>
    </section>
  );
}
