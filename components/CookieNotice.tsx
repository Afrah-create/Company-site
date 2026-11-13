"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Cookie } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { EASE_OUT } from "@/lib/motion";
import {
  PRIVACY_COOKIES_HREF,
  STORAGE_NOTICE_KEY,
  STORAGE_NOTICE_VALUE,
} from "@/lib/storage-notice";

function readNotice() {
  try {
    return window.localStorage.getItem(STORAGE_NOTICE_KEY) === STORAGE_NOTICE_VALUE;
  } catch {
    return false;
  }
}

function writeNotice() {
  try {
    window.localStorage.setItem(STORAGE_NOTICE_KEY, STORAGE_NOTICE_VALUE);
  } catch {
    // Private mode: hide for this visit only.
  }
}

export default function CookieNotice() {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (pathname.startsWith("/dev")) {
      setOpen(false);
      return;
    }
    if (readNotice()) {
      setOpen(false);
      return;
    }

    const delay = window.setTimeout(() => setOpen(true), 1800);
    return () => window.clearTimeout(delay);
  }, [pathname]);

  const accept = () => {
    writeNotice();
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="region"
          aria-label="Device storage notice"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
          className="fixed inset-x-4 bottom-[5.5rem] z-[92] mx-auto w-[min(100%,28rem)] sm:bottom-6"
        >
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-4 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.55)] sm:p-5">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--cyan)]/40 bg-[var(--surface)] text-[var(--cyan)]">
                <Cookie className="h-4 w-4" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-heading text-sm text-[var(--white)]">Cookies and device storage</p>
                <p className="mt-1.5 text-[13px] leading-6 text-[var(--muted)]">
                  This site stores your display theme and a record of this notice on your device. It
                  does not set advertising or analytics cookies.{" "}
                  <Link
                    href={PRIVACY_COOKIES_HREF}
                    className="text-[var(--white)] underline-offset-2 hover:text-[var(--cyan)] hover:underline"
                  >
                    Privacy policy
                  </Link>
                  .
                </p>
                <button
                  type="button"
                  onClick={accept}
                  className="btn-cta mt-3 inline-flex min-h-10 items-center justify-center rounded-full px-5 text-sm font-semibold transition-opacity hover:opacity-90"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
