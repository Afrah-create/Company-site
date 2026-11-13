import type { Metadata } from "next";
import BuiltWith from "@/components/BuiltWith";
import HomeCta from "@/components/HomeCta";
import PageShell from "@/components/PageShell";
import ProcessTimeline from "@/components/ProcessTimeline";
import ServiceCard from "@/components/ServiceCard";
import { pageMetadata } from "@/lib/seo";
import { SERVICES } from "@/lib/services";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Web, mobile, AI, security, data, cloud, design, and consulting from SlimCyberTech.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageShell
        eyebrow="Services"
        title="What we do"
        description="Web, mobile, AI, security, data, cloud, design, and consulting."
      >
        <div className="mt-12 space-y-20 md:space-y-28">
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              total={SERVICES.length}
            />
          ))}
        </div>
      </PageShell>
      <ProcessTimeline eyebrow="Process" title="How we work" />
      <BuiltWith />
      <HomeCta />
    </>
  );
}
