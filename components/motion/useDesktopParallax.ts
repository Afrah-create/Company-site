"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/** Parallax only on desktop, and never when the user prefers reduced motion. */
export function useDesktopParallax() {
  const reducedMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return Boolean(isDesktop && !reducedMotion);
}
