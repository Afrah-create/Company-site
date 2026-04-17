"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  AppWindowMac,
  CloudCog,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Waypoints,
} from "lucide-react";

const services = [
  {
    title: "Software Development",
    description: "Custom web and desktop apps",
    icon: AppWindowMac,
    image: "/images/Gemini_Generated_Image_ntfdvgntfdvgntfd.png",
  },
  {
    title: "Mobile Development",
    description: "iOS and Android solutions",
    icon: Smartphone,
    image: "/images/Gemini_Generated_Image_f151z2f151z2f151.png",
  },
  {
    title: "Cybersecurity",
    description: "Threat analysis and secure architecture",
    icon: ShieldCheck,
    image: "/images/Gemini_Generated_Image_d67n9jd67n9jd67n.png",
  },
  {
    title: "Cloud & DevOps",
    description: "Scalable infrastructure",
    icon: CloudCog,
    image: "/images/Gemini_Generated_Image_10opsg10opsg10op.png",
  },
  {
    title: "UI/UX Design",
    description: "User-first interface design",
    icon: Sparkles,
    image: "/images/Gemini_Generated_Image_fbrzw4fbrzw4fbrz (1).png",
  },
  {
    title: "Tech Consulting",
    description: "Strategy and digital transformation",
    icon: Waypoints,
    image: "/images/Gemini_Generated_Image_teo7vpteo7vpteo7.png",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative mx-auto mt-10 w-full max-w-6xl px-4 sm:px-6 md:mt-12 md:px-10">
      <div className="absolute inset-0 -z-20 overflow-hidden rounded-2xl">
        <Image
          src="/images/Gemini_Generated_Image_8alwwn8alwwn8alw.png"
          alt="Digital service network background"
          fill
          loading="lazy"
          className="object-cover opacity-20"
        />
      </div>
      <div className="absolute inset-0 -z-10 rounded-2xl bg-black/55" />

      <div className="pointer-events-none absolute left-1/2 top-24 -z-10 -translate-x-1/2 select-none text-center sm:top-28">
        <p className="font-heading text-4xl font-bold tracking-[0.22em] text-[var(--white)]/[0.04] sm:text-7xl sm:tracking-[0.3em] lg:text-8xl">
          SERVICES
        </p>
      </div>

      <div className="mb-8 text-center sm:mb-10">
        <h2 className="text-2xl font-bold text-[var(--white)] sm:text-3xl md:text-4xl">Our Services</h2>
        <div className="mx-auto mt-3 h-1 w-28 rounded-full bg-[var(--gradient)]" />
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)] sm:text-base">
          End-to-end engineering expertise to design, build, secure, and scale modern products.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <motion.article
            key={service.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
            className="group relative overflow-hidden rounded-2xl border border-[#222] bg-[#111] p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--cyan)]/70 hover:shadow-[0_16px_40px_-20px_rgba(0,198,255,0.55)]"
          >
            <Image
              src={service.image}
              alt={`${service.title} service visual`}
              fill
              loading="lazy"
              className="object-cover opacity-20 transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute left-0 top-0 h-[2px] w-full origin-left scale-x-0 bg-[var(--gradient)] transition-transform duration-300 group-hover:scale-x-100" />

            <div className="relative z-10 mb-5 inline-flex rounded-xl border border-[var(--border)] bg-[var(--surface2)] p-3">
              <service.icon
                className="h-6 w-6"
                style={{ stroke: `url(#serviceIconGradient-${index})` }}
              />
              <svg width="0" height="0" className="absolute">
                <defs>
                  <linearGradient
                    id={`serviceIconGradient-${index}`}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="var(--cyan)" />
                    <stop offset="100%" stopColor="var(--blue)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <h3 className="relative z-10 font-heading text-xl text-[var(--white)]">{service.title}</h3>
            <p className="relative z-10 mt-3 text-sm leading-7 text-[var(--muted)]">{service.description}</p>

            <Link
              href="#contact"
              className="relative z-10 mt-6 inline-flex items-center text-sm font-medium text-[var(--cyan)]"
            >
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                Learn More
                <span className="ml-1 inline-block">→</span>
              </span>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
