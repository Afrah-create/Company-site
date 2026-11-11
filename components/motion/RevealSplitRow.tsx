"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import FadeUp from "@/components/motion/FadeUp";
import FeaturedRevealImage from "@/components/motion/FeaturedRevealImage";

type RevealSplitRowProps = {
  index: number;
  total: number;
  id?: string;
  href?: string;
  imageSrc: string;
  imageAlt: string;
  imageAspect?: string;
  objectPosition?: "center" | "top";
  eyebrow?: string;
  title: string;
  titleAs?: "h2" | "h3";
  description?: string;
  chips?: string[];
  badge?: ReactNode;
  actions?: ReactNode;
  imageLayout?: "wide" | "portrait" | "compact";
  hoverEyebrow?: string;
  hoverBody?: string;
};

/**
 * Usage: <RevealSplitRow index={0} total={3} title="NileGo" imageSrc="..." imageAlt="..." />
 * Editorial image/copy row matching the home featured projects layout.
 */
export default function RevealSplitRow({
  index,
  total,
  id,
  href,
  imageSrc,
  imageAlt,
  imageAspect = "16 / 10",
  objectPosition = "center",
  eyebrow,
  title,
  titleAs = "h3",
  description,
  chips,
  badge,
  actions,
  imageLayout = "wide",
  hoverEyebrow,
  hoverBody,
}: RevealSplitRowProps) {
  const imageLeft = index % 2 === 0;
  const portrait = imageLayout === "portrait";
  const compact = imageLayout === "compact";
  const contained = portrait || compact;
  const indexLabel = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
  const Heading = titleAs;
  const imageCols = portrait ? "lg:col-span-4" : compact ? "lg:col-span-6" : "lg:col-span-7";
  const copyCols = portrait ? "lg:col-span-8" : compact ? "lg:col-span-6" : "lg:col-span-5";

  const image = (
    <FeaturedRevealImage
      src={imageSrc}
      alt={imageAlt}
      sizes={
        portrait
          ? "(min-width: 1024px) 20rem, 16rem"
          : compact
            ? "(min-width: 1024px) 32rem, 100vw"
            : "(min-width: 1024px) 55vw, 100vw"
      }
      aspect={imageAspect}
      direction={imageLeft ? "left" : "right"}
      objectPosition={objectPosition}
      fit={contained ? "portrait" : "cinematic"}
      hoverEyebrow={hoverEyebrow}
      hoverBody={hoverBody}
    />
  );

  const titleNode = href ? (
    <Link href={href} className="transition-colors hover:text-[var(--cyan)]">
      {title}
    </Link>
  ) : (
    title
  );

  return (
    <article
      id={id}
      className="grid scroll-mt-28 grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12"
    >
      <div
        className={`group ${imageLeft ? `lg:order-1 ${imageCols}` : `lg:order-2 ${imageCols}`}`}
      >
        <div
          className={
            contained
              ? `mx-auto w-full ${
                  portrait
                    ? "max-w-[15.5rem] sm:max-w-[17rem]"
                    : "max-w-[34rem]"
                } ${imageLeft ? "lg:mx-0 lg:mr-auto" : "lg:ml-auto lg:mr-0"}`
              : undefined
          }
        >
          {href ? <Link href={href} className="block">{image}</Link> : image}
        </div>
      </div>

      <FadeUp
        index={index}
        className={imageLeft ? `lg:order-2 ${copyCols}` : `lg:order-1 ${copyCols}`}
      >
        <p className="font-heading text-xs tracking-[0.22em] text-[var(--cyan)]">{indexLabel}</p>
        {badge ? <div className="mt-4">{badge}</div> : null}
        <Heading className={`font-heading text-2xl leading-tight text-[var(--white)] break-words sm:text-3xl lg:text-4xl ${badge ? "mt-5" : "mt-4"}`}>
          {titleNode}
        </Heading>
        {eyebrow ? <p className="mt-2 text-sm text-[var(--muted)]">{eyebrow}</p> : null}
        {description ? (
          <p className="mt-4 text-sm leading-7 text-[var(--muted)] sm:text-[0.95rem] sm:leading-8">
            {description}
          </p>
        ) : null}
        {chips?.length ? (
          <ul className="mt-5 flex flex-wrap gap-2">
            {chips.slice(0, 4).map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs text-[var(--muted)]"
              >
                {chip}
              </li>
            ))}
          </ul>
        ) : null}
        {actions ? <div className="mt-7 flex flex-wrap items-center gap-4">{actions}</div> : null}
      </FadeUp>
    </article>
  );
}
