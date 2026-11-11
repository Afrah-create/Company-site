"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import BookDemoButton from "@/components/BookDemoButton";
import StatusBadge from "@/components/StatusBadge";
import RevealSplitRow from "@/components/motion/RevealSplitRow";
import {
  getProjectHoverCopy,
  showStatusBadge,
  type Project,
  type ProjectCategory,
} from "@/lib/projects";

type CategoryFilter = "all" | ProjectCategory;

export default function ProjectsIndex({
  projects,
  categories,
}: {
  projects: Project[];
  categories: ProjectCategory[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categoryParam = searchParams.get("category");
  const category: CategoryFilter =
    categoryParam && categories.includes(categoryParam as ProjectCategory)
      ? (categoryParam as ProjectCategory)
      : "all";

  const setCategory = (next: CategoryFilter) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("kind");
    if (next === "all") params.delete("category");
    else params.set("category", next);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const visible = useMemo(() => {
    return projects.filter((project) => category === "all" || project.category === category);
  }, [category, projects]);

  const categoryFilters: CategoryFilter[] = ["all", ...categories];

  return (
    <div className="mt-10">
      <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <div className="flex min-w-max gap-2 pb-1 sm:min-w-0 sm:flex-wrap">
          {categoryFilters.map((item) => {
            const active = item === category;
            const label = item === "all" ? "All" : item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`min-h-11 snap-start whitespace-nowrap rounded-full border px-4 py-2 text-sm transition-colors ${
                  active
                    ? "border-[var(--cyan)] bg-[var(--cyan)]/12 text-[var(--white)]"
                    : "border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--cyan)]/50 hover:text-[var(--white)]"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="mt-12 text-sm text-[var(--muted)]">No projects in this filter.</p>
      ) : (
        <div className="mt-12 space-y-14 md:space-y-16">
          <AnimatePresence mode="popLayout">
            {visible.map((project, index) => {
              const hover = getProjectHoverCopy(project);
              return (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                >
                  <RevealSplitRow
                    index={index}
                    total={visible.length}
                    href={`/projects/${project.slug}`}
                    imageSrc={project.heroImage}
                    imageAlt={project.imageAlt}
                    imageLayout="compact"
                    eyebrow={project.category}
                    title={project.name}
                    description={project.summary}
                    hoverEyebrow={hover.eyebrow}
                    hoverBody={hover.body}
                    chips={project.features ?? project.stack}
                    badge={
                      showStatusBadge(project) ? (
                        <StatusBadge status={project.status} tone="onSurface" />
                      ) : null
                    }
                    actions={
                      <>
                        <BookDemoButton className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[var(--gradient)] px-6 py-2.5 text-sm font-semibold text-white sm:w-auto" />
                        <Link
                          href={`/projects/${project.slug}`}
                          className="inline-flex min-h-11 items-center text-sm font-semibold text-[var(--cyan)]"
                        >
                          View project →
                        </Link>
                      </>
                    }
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
