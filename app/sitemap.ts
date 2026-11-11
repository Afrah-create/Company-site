import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/projects";
import { SITE_URL } from "@/lib/seo";

/** Fully static so crawlers always get plain XML from the build (no runtime surprises). */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages: MetadataRoute.Sitemap = [
    { path: "", priority: 1 },
    { path: "/services", priority: 0.8 },
    { path: "/about", priority: 0.8 },
    { path: "/projects", priority: 0.8 },
    { path: "/contact", priority: 0.8 },
  ].map((page) => ({
    url: `${SITE_URL}${page.path}`,
    lastModified,
    changeFrequency: "weekly",
    priority: page.priority,
  }));

  const projectPages: MetadataRoute.Sitemap = getAllProjects().map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...pages, ...projectPages];
}
