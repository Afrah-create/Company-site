"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useEffect, useState } from "react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  avatarGradient: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "SlimCyberTech transformed our legacy platform into a fast, secure system that our team can scale confidently.",
    name: "Amina Patel",
    role: "Head of Product",
    company: "NorthBridge Commerce",
    initials: "AP",
    avatarGradient: "from-cyan-500 to-blue-600",
  },
  {
    quote:
      "Their engineering depth and strategic guidance helped us launch our mobile banking experience ahead of schedule.",
    name: "Daniel Brooks",
    role: "CTO",
    company: "Summit Financial",
    initials: "DB",
    avatarGradient: "from-blue-500 to-indigo-600",
  },
  {
    quote:
      "From architecture to delivery, every milestone was clear, collaborative, and focused on measurable business outcomes.",
    name: "Lina Romero",
    role: "Operations Director",
    company: "MediCore Systems",
    initials: "LR",
    avatarGradient: "from-sky-500 to-cyan-600",
  },
  {
    quote:
      "Their cybersecurity and DevOps expertise strengthened our infrastructure while reducing deployment risk across teams.",
    name: "Ethan Cole",
    role: "VP Engineering",
    company: "Vertex Digital",
    initials: "EC",
    avatarGradient: "from-cyan-500 to-purple-600",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const goToIndex = (nextIndex: number) => {
    const normalized = (nextIndex + testimonials.length) % testimonials.length;
    setDirection(normalized > activeIndex ? 1 : -1);
    setActiveIndex(normalized);
  };

  const goNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goPrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = window.setInterval(() => {
      goNext();
    }, 5000);

    return () => window.clearInterval(interval);
  }, [isPaused]);

  const active = testimonials[activeIndex];

  return (
    <section
      className="relative mt-8 w-full overflow-hidden bg-[#0d0d0d] py-14"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,198,255,0.12),transparent_55%)]" />

      <div className="relative mx-auto w-full max-w-6xl px-6 md:px-10">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--cyan)]">
            Testimonials
          </p>
          <h2 className="mt-3 text-3xl text-[var(--white)] sm:text-4xl">What Clients Say</h2>
        </div>

        <div className="relative mt-10 flex items-center justify-center">
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-0 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-[var(--border)] bg-[var(--surface)]/85 p-2 text-[var(--white)] transition-colors hover:border-[var(--cyan)] hover:text-[var(--cyan)] md:inline-flex"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="w-full max-w-3xl overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.article
                key={active.name}
                initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
                transition={{ duration: 0.42, ease: "easeOut" }}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/90 p-7 text-center shadow-[0_18px_50px_-30px_rgba(0,198,255,0.4)] md:p-10"
              >
                <Quote className="mx-auto h-12 w-12 fill-current text-transparent [background:var(--gradient)] [background-clip:text]" />

                <p className="mt-4 text-lg leading-8 text-[var(--white)]">{active.quote}</p>

                <div className="mt-6 flex justify-center gap-1 text-[#facc15]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={`${active.name}-star-${index}`} className="h-4 w-4 fill-current" />
                  ))}
                </div>

                <div className="mt-7 flex flex-col items-center">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${active.avatarGradient} text-sm font-semibold text-white`}
                  >
                    {active.initials}
                  </div>
                  <p className="mt-4 font-heading text-lg text-[var(--white)]">{active.name}</p>
                  <p className="text-sm text-[var(--muted)]">
                    {active.role} - {active.company}
                  </p>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={goNext}
            className="absolute right-0 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-[var(--border)] bg-[var(--surface)]/85 p-2 text-[var(--white)] transition-colors hover:border-[var(--cyan)] hover:text-[var(--cyan)] md:inline-flex"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((item, index) => (
            <button
              key={item.name}
              type="button"
              onClick={() => goToIndex(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "w-8 bg-[var(--cyan)]"
                  : "w-2.5 bg-[var(--white)]/30 hover:bg-[var(--white)]/50"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <div className="mt-5 flex items-center justify-center gap-3 md:hidden">
          <button
            type="button"
            onClick={goPrev}
            className="inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)]/85 p-2 text-[var(--white)]"
            aria-label="Previous testimonial mobile"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)]/85 p-2 text-[var(--white)]"
            aria-label="Next testimonial mobile"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
