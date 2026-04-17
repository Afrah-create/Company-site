"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CodeXml, MessageCircle, Waypoints } from "lucide-react";

const team = [
  {
    name: "Grace Nankya",
    role: "Chief Technology Officer",
    image: "/images/Gemini_Generated_Image_v9nafhv9nafhv9na.png",
    alt: "Team lead presenting delivery metrics",
  },
  {
    name: "David Okello",
    role: "Lead Software Engineer",
    image: "/images/Gemini_Generated_Image_jlls3xjlls3xjlls.png",
    alt: "Software engineer building product features",
  },
  {
    name: "Irene Atuheire",
    role: "Data & Product Analyst",
    image: "/images/Gemini_Generated_Image_i7tu12i7tu12i7tu.png",
    alt: "Analyst working across coding and reporting screens",
  },
  {
    name: "Samuel Kato",
    role: "Solutions Architect",
    image: "/images/Gemini_Generated_Image_7jhpez7jhpez7jhp.png",
    alt: "Remote architecture collaboration session",
  },
];

const socialIcons = [CodeXml, Waypoints, MessageCircle];

export default function Team() {
  return (
    <section id="team" className="mx-auto mt-10 w-full max-w-6xl px-4 sm:px-6 md:px-10">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--cyan)]">Team</p>
        <h2 className="mt-3 text-3xl text-[var(--white)] sm:text-4xl">The People Behind The Build</h2>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
        {team.map((member, index) => (
          <motion.article
            key={member.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[#111]"
          >
            <div className="relative h-60 sm:h-64">
              <Image src={member.image} alt={member.alt} fill loading="lazy" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />
            </div>

            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
              <p className="font-heading text-xl text-[var(--white)]">{member.name}</p>
              <p className="mt-1 text-sm text-[var(--muted)]">{member.role}</p>
              <div className="mt-3 flex items-center gap-2">
                {socialIcons.map((Icon, iconIndex) => (
                  <Link
                    key={`${member.name}-social-${iconIndex}`}
                    href="#"
                    aria-label={`${member.name} social profile ${iconIndex + 1}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)]/90 text-[var(--white)] transition-colors hover:border-[var(--cyan)] hover:text-[var(--cyan)]"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </Link>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
