import type { Metadata } from "next";
import { Suspense } from "react";
import BookDemoButton from "@/components/BookDemoButton";
import PageShell from "@/components/PageShell";
import ProjectsIndex from "@/components/ProjectsIndex";
import { getAllProjects, getCategories } from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description: "Products and studies from SlimCyberTech in West Nile, Uganda.",
  path: "/projects",
});

export default function ProjectsPage() {
  const projects = getAllProjects();
  const categories = getCategories();

  return (
    <PageShell
      eyebrow="Projects"
      title="Work from West Nile"
      description="Products and a few studies from the team."
    >
      <Suspense fallback={<div className="mt-10 h-64 rounded-2xl bg-[var(--surface)]" />}>
        <ProjectsIndex projects={projects} categories={categories} />
      </Suspense>
      <div className="mt-12">
        <BookDemoButton />
      </div>
    </PageShell>
  );
}
