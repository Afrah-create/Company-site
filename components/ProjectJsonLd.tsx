import { canonicalUrl } from "@/lib/seo";
import type { Project } from "@/lib/projects";

export default function ProjectJsonLd({ project }: { project: Project }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: canonicalUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: canonicalUrl("/projects"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.name,
        item: canonicalUrl(`/projects/${project.slug}`),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
