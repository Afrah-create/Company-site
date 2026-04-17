"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (coarsePointer) return;
    setEnabled(true);

    const onMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
      const target = event.target as HTMLElement | null;
      const interactive = Boolean(target?.closest("a, button, input, textarea, select"));
      setIsInteractive(interactive);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (!enabled) return null;

  return (
    <div
      className={`pointer-events-none fixed z-[9997] -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-150 ${
        isInteractive
          ? "h-10 w-10 border-[var(--cyan)]/80 bg-[var(--cyan)]/10"
          : "h-6 w-6 border-[var(--cyan)]/45 bg-transparent"
      }`}
      style={{ left: position.x, top: position.y }}
      aria-hidden="true"
    />
  );
}
