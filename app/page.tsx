import type { Metadata } from "next";
import AboutTeaser from "@/components/AboutTeaser";
import FeaturedServices from "@/components/FeaturedServices";
import FeaturedWork from "@/components/FeaturedWork";
import Hero from "@/components/Hero";
import HomeCta from "@/components/HomeCta";
import ProcessTimeline from "@/components/ProcessTimeline";
import Testimonials from "@/components/Testimonials";

export const metadata: Metadata = {
  title: {
    absolute: "SlimCyberTech | Software Development & Technology - West Nile, Uganda",
  },
  description:
    "SlimCyberTech builds software, mobile apps, and security work from West Nile, Uganda, for organisations in Africa and beyond.",
  alternates: { canonical: "https://slimcybertech.com" },
  openGraph: {
    url: "https://slimcybertech.com",
    title: "SlimCyberTech | Software Development & Technology - West Nile, Uganda",
    description:
      "Software, mobile apps, and cybersecurity from West Nile, Uganda.",
  },
  twitter: {
    title: "SlimCyberTech | Software Development & Technology - West Nile, Uganda",
    description:
      "Software, mobile apps, and cybersecurity from West Nile, Uganda.",
  },
};

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <FeaturedServices />
      <FeaturedWork />
      <ProcessTimeline />
      <AboutTeaser />
      <Testimonials />
      <HomeCta />
    </main>
  );
}
