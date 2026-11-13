"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Ban,
  Clock,
  Cookie,
  Copyright,
  Eye,
  FileText,
  Globe,
  Inbox,
  KeyRound,
  MapPin,
  MessageSquare,
  RefreshCw,
  Scale,
  ShieldAlert,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { EASE_OUT } from "@/lib/motion";

export type LegalIconName =
  | "pin"
  | "inbox"
  | "chat"
  | "eye"
  | "clock"
  | "key"
  | "refresh"
  | "globe"
  | "file"
  | "own"
  | "ban"
  | "alert"
  | "scale"
  | "cookie";

export type LegalTurn = {
  id?: string;
  prompt: string;
  title: string;
  icon: LegalIconName;
  body: ReactNode;
};

const ICONS: Record<LegalIconName, LucideIcon> = {
  pin: MapPin,
  inbox: Inbox,
  chat: MessageSquare,
  eye: Eye,
  clock: Clock,
  key: KeyRound,
  refresh: RefreshCw,
  globe: Globe,
  file: FileText,
  own: Copyright,
  ban: Ban,
  alert: ShieldAlert,
  scale: Scale,
  cookie: Cookie,
};

function IconMark({
  name,
  className = "h-4 w-4",
}: {
  name: LegalIconName;
  className?: string;
}) {
  const Icon = ICONS[name];
  return <Icon className={className} aria-hidden="true" />;
}

function IconOrb({ name }: { name: LegalIconName }) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative flex h-16 w-16 items-center justify-center">
      <span
        className="legal-orbit pointer-events-none absolute inset-0 rounded-full border border-dashed border-[var(--cyan)]/35"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute inset-[-6px] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--cyan)_22%,transparent),transparent_68%)]"
        aria-hidden="true"
      />
      <span className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-[var(--cyan)]/45 bg-[var(--card-bg)] text-[var(--cyan)] shadow-[0_0_28px_rgba(0,198,255,0.16)]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={name}
            className="absolute inset-0 flex items-center justify-center"
            initial={reducedMotion ? false : { opacity: 0, scale: 0.6, rotate: -28 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.6, rotate: 28 }}
            transition={{ duration: 0.32, ease: EASE_OUT }}
          >
            <IconMark name={name} className="h-[18px] w-[18px]" />
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}

function Bubble({
  side,
  delay = 0,
  children,
}: {
  side: "left" | "right";
  delay?: number;
  children: ReactNode;
}) {
  const reducedMotion = useReducedMotion();
  const fromRight = side === "right";

  return (
    <motion.div
      className={fromRight ? "flex justify-end" : "flex justify-start"}
      initial={
        reducedMotion
          ? false
          : { opacity: 0, y: 14, x: fromRight ? 22 : -22, scale: 0.97 }
      }
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, delay: reducedMotion ? 0 : delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

export default function LegalThread({
  updated,
  turns,
  other,
}: {
  updated: string;
  turns: LegalTurn[];
  other: { href: string; label: string };
}) {
  const [active, setActive] = useState(0);
  const turnRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const nodes = turnRefs.current.filter((node): node is HTMLElement => node != null);
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = nodes.indexOf(visible.target as HTMLElement);
        if (index >= 0) setActive(index);
      },
      { threshold: [0.35, 0.55, 0.75], rootMargin: "-18% 0px -38% 0px" },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [turns.length]);

  return (
    <div className="relative mx-auto mt-12 max-w-2xl">
      <div className="pointer-events-none absolute -left-[4.75rem] top-0 hidden h-full xl:block">
        <div className="sticky top-36 pt-2">
          <IconOrb name={turns[active]?.icon ?? "pin"} />
        </div>
      </div>

      <article className="space-y-8 overflow-x-clip text-sm leading-7 text-[var(--muted)] sm:text-[0.95rem] sm:leading-8">
        <div className="flex justify-center">
          <p className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
            Updated {updated}
          </p>
        </div>

        {turns.map((turn, index) => (
          <section
            key={turn.title}
            id={turn.id}
            ref={(node) => {
              turnRefs.current[index] = node;
            }}
            className="scroll-mt-32 space-y-3"
          >
            <Bubble side="right">
              <p className="max-w-[min(22rem,calc(100%-2.5rem))] rounded-2xl rounded-br-md border border-[color-mix(in_srgb,var(--cyan)_32%,var(--border))] bg-[color-mix(in_srgb,var(--cyan)_12%,var(--surface))] px-4 py-2.5 text-[13px] leading-6 text-[var(--white)] sm:text-sm">
                {turn.prompt}
              </p>
            </Bubble>

            <Bubble side="left" delay={0.12}>
              <div className="flex w-[min(100%,34rem)] items-start gap-3">
                <span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--cyan)]/40 bg-[var(--card-bg)] text-[var(--cyan)] xl:hidden">
                  <IconMark name={turn.icon} />
                </span>
                <div className="min-w-0 flex-1 rounded-2xl rounded-bl-md border border-[var(--border)] bg-[var(--card-bg)] px-4 py-4 sm:px-5 sm:py-5">
                  <h2 className="font-heading text-lg text-[var(--white)] sm:text-xl">{turn.title}</h2>
                  <div className="mt-3 space-y-3">{turn.body}</div>
                </div>
              </div>
            </Bubble>
          </section>
        ))}

        <Bubble side="right">
          <Link
            href={other.href}
            className="max-w-[min(22rem,calc(100%-2.5rem))] rounded-2xl rounded-br-md border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-[13px] leading-6 text-[var(--white)] transition-colors hover:border-[var(--cyan)] hover:text-[var(--cyan)] sm:text-sm"
          >
            Also on this site: {other.label}
          </Link>
        </Bubble>
      </article>
    </div>
  );
}
