import BookDemoButton from "@/components/BookDemoButton";
import SectionFade from "@/components/motion/SectionFade";

export default function HomeCta() {
  return (
    <SectionFade className="mx-auto mt-20 mb-8 w-full max-w-6xl px-4 sm:px-6 md:px-10">
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] px-5 py-10 text-center sm:px-6 sm:py-12">
        <h2 className="font-heading text-balance text-2xl text-[var(--white)] sm:text-3xl">
          Want to talk about a project?
        </h2>
        <div className="mt-6">
          <BookDemoButton />
        </div>
      </div>
    </SectionFade>
  );
}
