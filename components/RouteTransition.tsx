"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const MIN_VISIBLE_MS = 340;
const HIDE_MS = 240;

function isModifiedClick(event: MouseEvent) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
}

function destinationFromAnchor(anchor: HTMLAnchorElement) {
  const href = anchor.getAttribute("href");
  if (!href) return null;
  if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#")) return null;
  if (anchor.hasAttribute("download") || anchor.target === "_blank") return null;
  if (anchor.dataset.noNavProgress === "true") return null;

  try {
    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin) return null;
    return url;
  } catch {
    return null;
  }
}

export default function RouteTransition() {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const pendingRef = useRef(false);
  const startedAtRef = useRef(0);
  const isFirstPathRef = useRef(true);
  const hideTimerRef = useRef<number>();
  const tickTimerRef = useRef<number>();
  const failSafeRef = useRef<number>();

  const clearTimers = () => {
    window.clearTimeout(hideTimerRef.current);
    window.clearTimeout(tickTimerRef.current);
    window.clearTimeout(failSafeRef.current);
  };

  const finish = () => {
    if (!pendingRef.current) return;
    pendingRef.current = false;
    setProgress(100);
    const elapsed = Date.now() - startedAtRef.current;
    const wait = Math.max(0, MIN_VISIBLE_MS - elapsed);
    window.clearTimeout(tickTimerRef.current);
    window.clearTimeout(failSafeRef.current);
    hideTimerRef.current = window.setTimeout(() => {
      setActive(false);
      setProgress(0);
    }, wait + HIDE_MS);
  };

  const start = () => {
    if (pendingRef.current) return;
    pendingRef.current = true;
    startedAtRef.current = Date.now();
    clearTimers();
    failSafeRef.current = window.setTimeout(finish, 8000);
    window.requestAnimationFrame(() => {
      setActive(true);
      setProgress(reducedMotion ? 100 : 14);
      if (!reducedMotion) {
        tickTimerRef.current = window.setTimeout(() => setProgress(72), 80);
      }
    });
  };

  useEffect(() => {
    const onPointer = (event: MouseEvent) => {
      if (event.defaultPrevented || isModifiedClick(event)) return;
      const anchor = (event.target as HTMLElement | null)?.closest("a");
      if (!anchor) return;
      const next = destinationFromAnchor(anchor);
      if (!next) return;
      if (next.pathname === window.location.pathname && next.search === window.location.search) {
        return;
      }
      start();
    };

    window.addEventListener("click", onPointer, true);
    window.addEventListener("popstate", start);
    return () => {
      window.removeEventListener("click", onPointer, true);
      window.removeEventListener("popstate", start);
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (isFirstPathRef.current) {
      isFirstPathRef.current = false;
      return;
    }
    finish();
    // Pathname is the signal that the next page is in.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => () => clearTimers(), []);

  return (
    <>
      <div
        aria-hidden={!active}
        className="pointer-events-none fixed inset-x-0 top-0 z-[10050] h-[2px] overflow-hidden"
      >
        <motion.div
          className="h-full origin-left bg-[linear-gradient(90deg,#00c6ff,#0072ff)] shadow-[0_0_12px_rgba(0,198,255,0.7)]"
          initial={false}
          animate={{
            scaleX: active ? progress / 100 : 0,
            opacity: active ? 1 : 0,
          }}
          transition={{
            scaleX: { duration: progress >= 100 ? 0.18 : 0.55, ease: [0.22, 1, 0.36, 1] },
            opacity: { duration: 0.2 },
          }}
          style={{ transformOrigin: "left center" }}
        />
      </div>

      <AnimatePresence>
        {active ? (
          <motion.div
            key="route-veil"
            className="pointer-events-none fixed inset-0 z-[10040] flex items-center justify-center bg-[color-mix(in_srgb,var(--bg)_62%,transparent)] backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0.12 : 0.28, ease: "easeOut" }}
            aria-hidden="true"
          >
            <div className="flex flex-col items-center gap-3">
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[var(--cyan)]/35 bg-[var(--surface)]">
                <span className="absolute inset-1 rounded-full border-2 border-transparent border-t-[var(--cyan)] motion-safe:animate-spin" />
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--cyan)]" />
              </span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <span className="sr-only" aria-live="polite">
        {active ? "Loading page" : ""}
      </span>
    </>
  );
}
