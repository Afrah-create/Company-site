"use client";

import { MessageCircle } from "lucide-react";

export default function FloatingChatButton() {
  const whatsappHref =
    "https://wa.me/256772581510?text=Hello%20SlimCyberTech%20Team%2C%20I%20would%20like%20to%20talk%20about%20a%20software%20project.";

  return (
    <div className="fixed bottom-6 left-5 z-[95]">
      <span className="pointer-events-none absolute inset-0 rounded-full bg-[var(--cyan)]/30 animate-ping" />
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with CEO Lema Aaron on WhatsApp"
        className="relative inline-flex items-center gap-2 rounded-full border border-[var(--cyan)]/70 bg-[var(--surface)] px-4 py-2.5 text-sm font-semibold text-[var(--white)] shadow-[0_10px_26px_-16px_rgba(0,198,255,0.75)] transition-colors hover:text-[var(--cyan)]"
      >
        <MessageCircle className="h-4 w-4" />
        Let&apos;s Talk
      </a>
    </div>
  );
}
