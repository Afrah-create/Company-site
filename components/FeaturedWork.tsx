import Link from "next/link";
import BookDemoButton from "@/components/BookDemoButton";
import StatusBadge from "@/components/StatusBadge";
import RevealSplitRow from "@/components/motion/RevealSplitRow";
import SectionFade from "@/components/motion/SectionFade";
import { getHomeFeaturedProjects, getProjectHoverCopy, showStatusBadge } from "@/lib/projects";

export default function FeaturedWork() {
  const projects = getHomeFeaturedProjects();

  return (
    <SectionFade className="mx-auto mt-20 w-full max-w-6xl px-4 sm:px-6 md:px-10">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--cyan)]">
        Selected work
      </p>
      <h2 className="mt-3 text-2xl text-[var(--white)] sm:text-4xl">Featured projects</h2>

      <div className="mt-12 space-y-14 md:space-y-16">
        {projects.map((project, index) => {
          const hover = getProjectHoverCopy(project);
          return (
          <RevealSplitRow
            key={project.slug}
            index={index}
            total={projects.length}
            href={`/projects/${project.slug}`}
            imageSrc={project.heroImage}
            imageAlt={project.imageAlt}
            imageLayout="compact"
            eyebrow={project.category}
            title={project.name}
            description={project.summary}
            hoverEyebrow={hover.eyebrow}
            hoverBody={hover.body}
            chips={project.features}
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
          );
        })}
      </div>

      <div className="mt-14">
        <Link
          href="/projects"
          className="inline-flex min-h-11 items-center text-sm font-semibold text-[var(--cyan)]"
        >
          View all projects →
        </Link>
      </div>
    </SectionFade>
  );
}
