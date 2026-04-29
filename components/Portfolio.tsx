"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { X } from "lucide-react";
import { useMemo, useState } from "react";
import { fadeUp, VIEWPORT_ONCE } from "@/lib/motion";

type Category = "All" | "Web Apps" | "Mobile" | "Cybersecurity" | "Consulting";

type Project = {
  name: string;
  stack: string[];
  category: Exclude<Category, "All">;
  imageSrc: string;
  imageAlt: string;
  spanClass: string;
  summary: string;
  result: string;
};

const filters: Category[] = ["All", "Web Apps", "Mobile", "Cybersecurity", "Consulting"];

const projects: Project[] = [
  {
    name: "E-Commerce Platform",
    stack: ["React", "Node.js", "PostgreSQL"],
    category: "Web Apps",
    imageSrc: "/images/Gemini_Generated_Image_lrj1vslrj1vslrj1.png",
    imageAlt: "E-commerce dashboard development screens",
    spanClass: "md:col-span-2 lg:col-span-1 lg:row-span-2",
    summary: "Rebuilt storefront and admin workflows for conversion, speed, and maintainability.",
    result: "+42% checkout conversion",
  },
  {
    name: "Banking Mobile App",
    stack: ["Flutter", "Firebase"],
    category: "Mobile",
    imageSrc: "/images/Gemini_Generated_Image_v2mvw4v2mvw4v2mv.png",
    imageAlt: "Secure mobile application interface",
    spanClass: "md:col-span-1 lg:col-span-1",
    summary: "Delivered a secure mobile banking flow with offline-safe architecture.",
    result: "10k+ monthly active users",
  },
  {
    name: "Security Audit Dashboard",
    stack: ["Next.js", "Python"],
    category: "Cybersecurity",
    imageSrc: "/images/Gemini_Generated_Image_b1llneb1llneb1ll.png",
    imageAlt: "Cybersecurity dashboard on mobile devices",
    spanClass: "md:col-span-1 lg:col-span-1",
    summary: "Unified vulnerability reporting and remediation lifecycle across teams.",
    result: "63% faster incident response",
  },
  {
    name: "Hospital Management System",
    stack: ["React", "Express", "MySQL"],
    category: "Web Apps",
    imageSrc: "/images/Gemini_Generated_Image_i7tu12i7tu12i7tu.png",
    imageAlt: "Analytics workstation for healthcare operations",
    spanClass: "md:col-span-2 lg:col-span-2",
    summary: "Modernized legacy modules and introduced role-aware analytics workflows.",
    result: "300% faster reporting",
  },
  {
    name: "DevOps Pipeline Tool",
    stack: ["Docker", "Kubernetes", "CI/CD"],
    category: "Consulting",
    imageSrc: "/images/Gemini_Generated_Image_j5kqdlj5kqdlj5kq.png",
    imageAlt: "Performance dashboard for infrastructure monitoring",
    spanClass: "md:col-span-1 lg:col-span-1",
    summary: "Implemented deployment pipelines with observability and rollback protections.",
    result: "75% fewer deployment errors",
  },
  {
    name: "Corporate Website Redesign",
    stack: ["Next.js", "Framer Motion"],
    category: "Consulting",
    imageSrc: "/images/Gemini_Generated_Image_fbrzw4fbrzw4fbrz (1).png",
    imageAlt: "Brand and interface design board on monitor",
    spanClass: "md:col-span-1 lg:col-span-1",
    summary: "Redesigned UX hierarchy and brand system for trust and conversion.",
    result: "+58% session engagement",
  },
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<Category>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <section
      id="portfolio"
      aria-label="Our Portfolio"
      className="mx-auto mt-10 w-full max-w-6xl px-4 sm:mt-8 sm:px-6 md:px-10"
    >
      <motion.div
        className="text-center"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--cyan)]">
          Portfolio
        </p>
        <h2 className="mt-3 text-2xl text-[var(--white)] sm:text-4xl">Our Work</h2>
        <div className="mx-auto mt-4 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-[var(--cyan)]/50" />
          <span className="h-2 w-2 rounded-full bg-[var(--cyan)]" />
          <span className="h-px w-10 bg-[var(--blue)]/60" />
        </div>
      </motion.div>

      <motion.div
        className="mt-7 -mx-4 overflow-x-auto px-4 sm:mt-8 sm:mx-0 sm:px-0"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
      >
        <div className="flex min-w-max snap-x snap-mandatory items-center justify-start gap-2 pb-1 sm:min-w-0 sm:flex-wrap sm:justify-center">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`snap-start whitespace-nowrap rounded-full border px-3.5 py-2 text-xs transition-all duration-300 sm:px-4 sm:text-sm ${
                activeFilter === filter
                  ? "border-[var(--cyan)] bg-[var(--cyan)]/12 text-[var(--white)]"
                  : "border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--cyan)]/50 hover:text-[var(--white)]/90"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </motion.div>

      <LayoutGroup>
        <motion.div
          layout
          className="mt-7 grid auto-rows-[230px] grid-cols-1 gap-4 sm:mt-8 sm:auto-rows-[210px] sm:gap-5 md:auto-rows-[220px] md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.article
                key={project.name}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className={`group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] ${project.spanClass}`}
              >
                <Image
                  src={project.imageSrc}
                  alt={project.imageAlt}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(180deg,var(--image-gradient-to),var(--image-overlay-medium),transparent)",
                  }}
                />

                <div className="absolute inset-x-0 bottom-0 z-10 p-4 [text-shadow:0_1px_2px_rgba(0,0,0,0.55)] sm:p-5">
                  <h3 className="font-heading text-[1.05rem] leading-snug text-white sm:text-xl">
                    {project.name}
                  </h3>
                  <p className="mt-2 text-xs font-medium text-[var(--cyan)]">{project.result}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span
                        key={`${project.name}-${item}`}
                        className="rounded-full border border-[var(--cyan)]/75 bg-black/45 px-2 py-1 text-[11px] text-[var(--cyan)] sm:px-2.5 sm:text-xs"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="mt-4 inline-flex items-center text-sm font-medium text-white transition-transform duration-300 group-hover:translate-x-1"
                  >
                    View Project <span className="ml-1">→</span>
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      <div className="mt-10 text-center">
        <Link
          href="#"
          className="inline-flex items-center rounded-full border border-[var(--cyan)]/65 px-6 py-2.5 text-sm font-semibold text-[var(--white)] transition-colors duration-300 hover:bg-[var(--surface2)]"
        >
          View All Projects <span className="ml-1">→</span>
        </Link>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-end justify-center p-4 md:items-center"
            style={{ backgroundColor: "var(--image-overlay-strong)" }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-2xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-heading text-xl text-[var(--white)]">{selectedProject.name}</h3>
                  <p className="mt-1 text-xs text-[var(--cyan)]">{selectedProject.result}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] text-[var(--white)]"
                  aria-label="Close project details"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="relative h-44 overflow-hidden rounded-xl border border-[var(--border)]">
                <Image
                  src={selectedProject.imageSrc}
                  alt={selectedProject.imageAlt}
                  fill
                  className="object-cover"
                />
              </div>

              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{selectedProject.summary}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {selectedProject.stack.map((item) => (
                  <span
                    key={`${selectedProject.name}-modal-${item}`}
                    className="rounded-full border border-[var(--cyan)]/60 bg-[var(--bg)]/40 px-2.5 py-1 text-xs text-[var(--cyan)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
