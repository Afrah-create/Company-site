import type { Metadata } from "next";
import AboutDifferentiators from "@/components/AboutDifferentiators";
import AboutHero from "@/components/AboutHero";
import HomeCta from "@/components/HomeCta";
import Team from "@/components/Team";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "SlimCyberTech is a software company in Arua, West Nile. Meet the team.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main className="relative pb-8">
      <AboutHero />
      <AboutDifferentiators />
      <Team />
      <HomeCta />
    </main>
  );
}
