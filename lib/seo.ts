import type { Metadata } from "next";

export const SITE_URL = "https://slimcybertech.com";

export function canonicalUrl(path: string) {
  if (path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function pageMetadata({
  title,
  description,
  path,
  image = "/opengraph-image",
  imageAlt = "SlimCyberTech, West Nile, Uganda",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
}): Metadata {
  const url = canonicalUrl(path);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: `${title} | SlimCyberTech`,
      description,
      images: [{ url: image, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | SlimCyberTech`,
      description,
      images: [image],
    },
  };
}
