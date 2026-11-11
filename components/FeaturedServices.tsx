import Link from "next/link";
import RevealSplitRow from "@/components/motion/RevealSplitRow";
import SectionFade from "@/components/motion/SectionFade";
import { getFeaturedServices, getServiceDiscussHref } from "@/lib/services";

export default function FeaturedServices() {
  const services = getFeaturedServices();

  return (
    <SectionFade className="mx-auto mt-16 w-full max-w-6xl px-4 sm:px-6 md:px-10">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--cyan)]">
        Services
      </p>
      <h2 className="mt-3 text-2xl text-[var(--white)] sm:text-4xl">What we build</h2>

      <div className="mt-12 space-y-20 md:space-y-28">
        {services.map((service, index) => (
          <RevealSplitRow
            key={service.id}
            index={index}
            total={services.length}
            href={`/services#${service.id}`}
            imageSrc={service.image}
            imageAlt={service.imageAlt}
            eyebrow={service.category}
            title={service.title}
            description={service.summary}
            chips={service.capabilities}
            actions={
              <>
                <Link
                  href={getServiceDiscussHref(service.subject)}
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[var(--white)] px-6 py-2.5 text-sm font-semibold text-[var(--bg)] transition-opacity hover:opacity-90 sm:w-auto"
                >
                  Ask about this
                </Link>
                <Link
                  href={`/services#${service.id}`}
                  className="inline-flex min-h-11 items-center text-sm font-semibold text-[var(--cyan)]"
                >
                  View service →
                </Link>
              </>
            }
          />
        ))}
      </div>

      <div className="mt-14">
        <Link
          href="/services"
          className="inline-flex min-h-11 items-center text-sm font-semibold text-[var(--cyan)]"
        >
          View all services →
        </Link>
      </div>
    </SectionFade>
  );
}
