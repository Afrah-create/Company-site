"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import {
  CheckCircle2,
  LoaderCircle,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Waypoints,
  CodeXml,
} from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";

const socials = [
  { label: "GitHub", href: "https://github.com", icon: CodeXml },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Waypoints },
  { label: "Twitter", href: "https://twitter.com", icon: MessageCircle },
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setShowSuccess(false);

    window.setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      event.currentTarget.reset();
      window.setTimeout(() => setShowSuccess(false), 3000);
    }, 1300);
  };

  return (
    <section id="contact" className="mx-auto mt-8 w-full max-w-6xl px-6 md:px-10">
      <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]/80 p-6 md:p-8">
        <Image
          src="/images/Gemini_Generated_Image_gzo9l6gzo9l6gzo9.png"
          alt="Circuit board background texture"
          fill
          loading="lazy"
          className="object-cover opacity-22"
        />
        <div className="absolute inset-0 bg-black/60" />

        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute left-4 right-4 top-4 z-20 flex items-center gap-2 rounded-xl border border-[var(--cyan)]/50 bg-[rgba(10,10,10,0.92)] px-4 py-3 text-sm text-[var(--white)]"
            >
              <CheckCircle2 className="h-4 w-4 text-[var(--cyan)]" />
              Message sent successfully. We will get back to you shortly.
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative z-10 mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--cyan)]">
            Contact
          </p>
          <h2 className="mt-3 text-3xl text-[var(--white)] sm:text-4xl">
            Let&apos;s Build Together
          </h2>
        </div>

        <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                className="w-full rounded-xl border border-[var(--border)] bg-[#111] px-4 py-3 text-sm text-[var(--white)] outline-none transition-all duration-300 placeholder:text-[var(--muted)] focus:border-[var(--cyan)] focus:shadow-[0_0_0_4px_rgba(0,198,255,0.12)]"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full rounded-xl border border-[var(--border)] bg-[#111] px-4 py-3 text-sm text-[var(--white)] outline-none transition-all duration-300 placeholder:text-[var(--muted)] focus:border-[var(--cyan)] focus:shadow-[0_0_0_4px_rgba(0,198,255,0.12)]"
              />
            </div>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              required
              className="w-full rounded-xl border border-[var(--border)] bg-[#111] px-4 py-3 text-sm text-[var(--white)] outline-none transition-all duration-300 placeholder:text-[var(--muted)] focus:border-[var(--cyan)] focus:shadow-[0_0_0_4px_rgba(0,198,255,0.12)]"
            />
            <textarea
              name="message"
              placeholder="Message"
              required
              rows={6}
              className="w-full resize-none rounded-xl border border-[var(--border)] bg-[#111] px-4 py-3 text-sm text-[var(--white)] outline-none transition-all duration-300 placeholder:text-[var(--muted)] focus:border-[var(--cyan)] focus:shadow-[0_0_0_4px_rgba(0,198,255,0.12)]"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--gradient)] px-4 py-3 text-sm font-semibold text-[var(--white)] transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-80"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Submit"
              )}
            </button>
          </form>

          <div className="rounded-2xl border border-[var(--border)] bg-[#111] p-6">
            <h3 className="font-heading text-2xl text-[var(--white)]">Contact Information</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
              Reach out for new projects, partnerships, and consulting engagements.
            </p>

            <div className="mt-6 space-y-4 text-sm">
              <div className="flex items-center gap-3 text-[var(--white)]">
                <Mail className="h-4 w-4 text-[var(--cyan)]" />
                hello@slimcybertech.com
              </div>
              <div className="flex items-center gap-3 text-[var(--white)]">
                <Phone className="h-4 w-4 text-[var(--cyan)]" />
                +256 700 123 456
              </div>
              <div className="flex items-center gap-3 text-[var(--white)]">
                <MapPin className="h-4 w-4 text-[var(--cyan)]" />
                Kampala, Uganda
              </div>
            </div>

            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                Follow Us
              </p>
              <div className="mt-3 flex items-center gap-3">
                {socials.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface2)] text-[var(--white)] transition-colors duration-300 hover:border-[var(--cyan)] hover:text-[var(--cyan)]"
                  >
                    <social.icon className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
