import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookDemoButton from "@/components/BookDemoButton";
import ProjectJsonLd from "@/components/ProjectJsonLd";
import StatusBadge from "@/components/StatusBadge";
import FadeUp from "@/components/motion/FadeUp";
import FeaturedRevealImage from "@/components/motion/FeaturedRevealImage";
import RevealSplitRow from "@/components/motion/RevealSplitRow";
import StickySplit from "@/components/motion/StickySplit";
import {
  getAdjacentProjects,
  getProjectBySlug,
  getProjectStaticParams,
  getProjectHoverCopy,
  getRelatedProjects,
  showStatusBadge,
} from "@/lib/projects";
import { canonicalUrl } from "@/lib/seo";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getProjectStaticParams();
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const description =
    project.summary ||
    `${project.name} is ${project.category.toLowerCase()} work from SlimCyberTech.`;
  const url = canonicalUrl(`/projects/${project.slug}`);

  return {
    title: project.name,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${project.name} | SlimCyberTech`,
      description,
      url,
      images: [{ url: project.heroImage, alt: project.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} | SlimCyberTech`,
      description,
      images: [project.heroImage],
    },
  };
}

export default function ProjectDetailPage({ params }: PageProps) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const related = getRelatedProjects(project.slug, 2);
  const { previous, next } = getAdjacentProjects(project.slug);
  const isLive = project.status === "live" && Boolean(project.liveUrl);
  const hover = getProjectHoverCopy(project);
  const facts = [
    project.client ? { label: "Client", value: project.client } : null,
    project.year ? { label: "Year", value: project.year } : null,
    { label: "Category", value: project.category },
  ].filter((item): item is { label: string; value: string } => Boolean(item));

  return (
    <article>
      <ProjectJsonLd project={project} />
      <header className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 px-4 pt-[calc(7.5rem+env(safe-area-inset-top))] sm:px-6 sm:pt-36 md:px-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--cyan)]">
            {project.category}
          </p>
          <h1 className="mt-3 max-w-[16ch] text-2xl leading-tight text-[var(--white)] break-words sm:text-4xl lg:text-5xl">
            {project.name}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {showStatusBadge(project) ? (
              <StatusBadge status={project.status} tone="onSurface" />
            ) : null}
            {project.year ? (
              <span className="text-sm text-[var(--muted)]">{project.year}</span>
            ) : null}
            {project.client ? (
              <span className="text-sm text-[var(--muted)]">{project.client}</span>
            ) : null}
          </div>
          {project.summary ? (
            <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--muted)] sm:text-[0.95rem] sm:leading-8">
              {project.summary}
            </p>
          ) : null}
          <div className="mt-8 flex flex-wrap gap-3">
            <BookDemoButton />
            {isLive && project.liveUrl ? (
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center rounded-full border border-[var(--border)] px-6 py-2.5 text-sm font-semibold text-[var(--white)]"
              >
                Visit live site
              </Link>
            ) : null}
          </div>
        </div>
        <div className="group mx-auto w-full max-w-[34rem] lg:col-span-7 lg:mx-0 lg:ml-auto">
          <FeaturedRevealImage
            src={project.heroImage}
            alt={project.imageAlt}
            sizes="(min-width: 1024px) 34rem, 100vw"
            aspect="16 / 10"
            direction="right"
            fit="portrait"
            priority
            hoverEyebrow={hover.eyebrow}
            hoverBody={hover.body}
          />
        </div>
      </header>

      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 md:px-10">
        {facts.length > 0 ? (
          <dl className="grid grid-cols-2 gap-4 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-5 sm:grid-cols-3">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">
                  {fact.label}
                </dt>
                <dd className="mt-1 text-sm text-[var(--white)]">{fact.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        {project.features && project.features.length > 0 ? (
          <div className="mt-14">
            <StickySplit
              sticky={
                <figure className="group mx-auto w-full max-w-[34rem] lg:mx-0">
                  <FeaturedRevealImage
                    src={project.gallery[0] ?? project.heroImage}
                    alt={project.imageAlt}
                    sizes="(min-width: 1024px) 34rem, 100vw"
                    aspect="16 / 10"
                    fit="portrait"
                  />
                  <figcaption className="mt-3 text-xs text-[var(--muted)]">{project.name}</figcaption>
                </figure>
              }
            >
              <FadeUp>
                <h2 className="font-heading text-2xl text-[var(--white)]">Scope</h2>
                <ul className="mt-4 space-y-2 text-sm text-[var(--white)]">
                  {project.features.map((feature) => (
                    <li key={feature} className="border-b border-[var(--border)] py-2">
                      {feature}
                    </li>
                  ))}
                </ul>
              </FadeUp>
            </StickySplit>
          </div>
        ) : null}

        {project.status === "concept" ? (
          <div className="mt-14">
            <StickySplit
              side="end"
              sticky={
                <div className="group mx-auto w-full max-w-[34rem] lg:ml-auto lg:mr-0">
                  <FeaturedRevealImage
                    src={project.gallery[1] ?? project.heroImage}
                    alt={`${project.name} still`}
                    sizes="(min-width: 1024px) 34rem, 100vw"
                    aspect="16 / 10"
                    direction="right"
                    fit="portrait"
                  />
                </div>
              }
            >
              <h2 className="font-heading text-2xl text-[var(--white)]">Results</h2>
              <div className="mt-5 grid grid-cols-1 gap-3">
                {project.results.map((result) => (
                  <div
                    key={result}
                    className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] px-4 py-4 text-sm text-[var(--white)]"
                  >
                    {result}
                  </div>
                ))}
              </div>
            </StickySplit>
          </div>
        ) : null}

        {project.gallery.length > 0 ? (
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
            {project.gallery.map((src, index) => (
              <figure key={`${src}-${index}`} className="group mx-auto w-full max-w-[34rem]">
                <FeaturedRevealImage
                  src={src}
                  alt={project.galleryCaptions?.[index] ?? `${project.name} ${index + 1}`}
                  sizes="(min-width: 768px) 34rem, 100vw"
                  aspect="16 / 10"
                  direction={index % 2 === 0 ? "left" : "right"}
                  fit="portrait"
                />
                {project.galleryCaptions?.[index] ? (
                  <figcaption className="mt-3 text-xs text-[var(--muted)]">
                    {project.galleryCaptions[index]}
                  </figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        ) : null}

        <nav className="mt-14 flex items-center justify-between gap-4 border-t border-[var(--border)] pt-6 text-sm">
          {previous ? (
            <Link href={`/projects/${previous.slug}`} className="text-[var(--muted)] hover:text-[var(--cyan)]">
              ← {previous.name}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/projects/${next.slug}`} className="ml-auto text-[var(--muted)] hover:text-[var(--cyan)]">
              {next.name} →
            </Link>
          ) : null}
        </nav>

        {related.length > 0 ? (
          <section className="mt-14">
            <h2 className="font-heading text-2xl text-[var(--white)]">Related</h2>
            <div className="mt-10 space-y-14 md:space-y-16">
              {related.map((item, index) => (
                <RevealSplitRow
                  key={item.slug}
                  index={index}
                  total={related.length}
                  href={`/projects/${item.slug}`}
                  imageSrc={item.heroImage}
                  imageAlt={item.imageAlt}
                  imageLayout="compact"
                  eyebrow={item.category}
                  title={item.name}
                  description={item.summary}
                  hoverEyebrow={getProjectHoverCopy(item).eyebrow}
                  hoverBody={getProjectHoverCopy(item).body}
                  chips={item.features}
                  badge={
                    showStatusBadge(item) ? (
                      <StatusBadge status={item.status} tone="onSurface" />
                    ) : null
                  }
                  actions={
                    <Link
                      href={`/projects/${item.slug}`}
                      className="inline-flex min-h-11 items-center text-sm font-semibold text-[var(--cyan)]"
                    >
                      View project →
                    </Link>
                  }
                />
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-16 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] px-6 py-10 text-center">
          <h2 className="font-heading text-2xl text-[var(--white)]">Working on something like this?</h2>
          <div className="mt-6">
            <BookDemoButton />
          </div>
        </section>
      </div>
    </article>
  );
}
