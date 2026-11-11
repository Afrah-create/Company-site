import Link from "next/link";
import FeaturedRevealImage from "@/components/motion/FeaturedRevealImage";

export default function AboutTeaser() {
  return (
    <section className="mx-auto mt-20 grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-4 sm:px-6 md:px-10 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--cyan)]">
          About
        </p>
        <h2 className="mt-3 text-2xl text-[var(--white)] sm:text-4xl">
          A team in West Nile
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--muted)]">
          SlimCyberTech is based in Arua. We build software, mobile apps, and security work.
        </p>
        <Link
          href="/about"
          className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-[var(--cyan)]"
        >
          About us →
        </Link>
      </div>
      <div className="group lg:col-span-7">
        <FeaturedRevealImage
          src="/images/Gemini_Generated_Image_59g3zf59g3zf59g3.png"
          alt="SlimCyberTech engineering workspace"
          sizes="(min-width: 1024px) 55vw, 100vw"
          aspect="16 / 10"
          direction="right"
        />
      </div>
    </section>
  );
}
