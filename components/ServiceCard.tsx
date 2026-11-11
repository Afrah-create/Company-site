import Link from "next/link";
import RevealSplitRow from "@/components/motion/RevealSplitRow";
import { getServiceDiscussHref, type Service } from "@/lib/services";

export default function ServiceCard({
  service,
  index,
  total,
}: {
  service: Service;
  index: number;
  total: number;
}) {
  const discussHref = getServiceDiscussHref(service.subject);

  return (
    <RevealSplitRow
      id={service.id}
      index={index}
      total={total}
      href={discussHref}
      imageSrc={service.image}
      imageAlt={service.imageAlt}
      eyebrow={service.category}
      title={service.title}
      titleAs="h2"
      description={service.description}
      chips={service.capabilities}
      actions={
        <Link
          href={discussHref}
          className="inline-flex min-h-11 items-center text-sm font-semibold text-[var(--cyan)] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--cyan)]"
        >
          Ask about this
        </Link>
      }
    />
  );
}
