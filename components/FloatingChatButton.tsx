"use client";

import { MessageCircle } from "lucide-react";

export default function FloatingChatButton() {
  const whatsappHref =
    "https://wa.me/256772581510?text=Hello%20SlimCyberTech%20Team%2C%20I%20would%20like%20to%20talk%20about%20a%20software%20project.";

  return (
    <div className="fixed bottom-4 left-4 z-[95] sm:bottom-6 sm:left-5">
      <span className="pointer-events-none absolute inset-0 rounded-full bg-[var(--cyan)]/30 animate-ping motion-reduce:animate-none" />
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with CEO Lema Aaron on WhatsApp"
        className="relative inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--cyan)]/70 bg-[var(--surface)] px-3.5 py-2.5 text-sm font-semibold text-[var(--white)] shadow-[0_10px_26px_-16px_rgba(0,198,255,0.75)] transition-colors hover:text-[var(--cyan)] sm:px-4"
      >
        <MessageCircle className="h-4 w-4 shrink-0" />
        <span className="hidden min-[380px]:inline">Let&apos;s Talk</span>
      </a>
    </div>
  );
}
