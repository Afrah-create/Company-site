"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { BOOK_DEMO_HREF } from "@/lib/contact";
import { NAV_ITEMS, isNavActive } from "@/lib/nav";

const panelVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.22,
      when: "beforeChildren",
      staggerChildren: 0.055,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.18, when: "afterChildren", staggerChildren: 0.04, staggerDirection: -1 },
  },
};

const linkVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: 8, transition: { duration: 0.16 } },
};

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function Navbar() {
  const pathname = usePathname();
  const isScrolled = useScrollPosition(24);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (wasOpenRef.current && !isOpen) {
      menuButtonRef.current?.focus();
    }
    wasOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const sheet = sheetRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.setAttribute("data-nav-open", "true");

    const getFocusable = () => {
      const fromSheet = sheet
        ? Array.from(sheet.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
        : [];
      const button = menuButtonRef.current;
      return [button, ...fromSheet].filter(
        (element): element is HTMLElement =>
          element != null && element.tabIndex !== -1 && !element.hasAttribute("disabled"),
      );
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const items = getFocusable();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.removeAttribute("data-nav-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <header
        className={`pointer-events-none fixed inset-x-0 top-0 px-3 pt-[calc(0.7rem+env(safe-area-inset-top))] sm:px-4 lg:px-6 ${
          isOpen ? "z-[10030]" : "z-[60]"
        }`}
      >
        <nav
          aria-label="Main navigation"
          className={`pointer-events-auto relative mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-2 rounded-full border px-2 shadow-[var(--nav-pill-shadow)] backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300 sm:h-16 sm:gap-3 sm:px-3 lg:px-5 ${
            isScrolled || isOpen
              ? "border-[var(--nav-pill-border)] bg-[var(--nav-pill-bg-scrolled)]"
              : "border-[var(--nav-pill-border)] bg-[var(--nav-pill-bg)]"
          }`}
        >
          <Link href="/" className="group flex min-w-0 shrink items-center gap-1.5 sm:gap-2.5">
            <Image
              src="/images/Logo.jpeg"
              alt="SlimCyberTech logo"
              width={40}
              height={40}
              priority
              className="h-8 w-8 shrink-0 rounded-lg object-cover sm:h-10 sm:w-10"
            />
            <span className="min-w-0 truncate leading-tight whitespace-nowrap">
              <span className="text-[13px] font-semibold tracking-[0.01em] text-[var(--white)] sm:text-[0.95rem]">
                Slim
              </span>
              <span className="text-[13px] font-semibold tracking-[0.01em] text-[var(--cyan)] sm:text-[0.95rem]">
                Cyber
              </span>
              <span className="text-[13px] font-semibold tracking-[0.01em] text-[var(--blue)] sm:text-[0.95rem]">
                Tech
              </span>
            </span>
          </Link>

          <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => {
              const active = isNavActive(item.href, pathname);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`group relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    active
                      ? "text-[var(--white)]"
                      : "text-[var(--muted)] hover:text-[var(--white)]"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-3 -bottom-0.5 h-[2px] origin-left rounded-full bg-[var(--cyan)] transition-transform duration-300 ease-out ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              aria-label="Toggle theme"
              onClick={toggleTheme}
              className="inline-flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-[var(--white)] transition-colors hover:bg-[var(--surface2)]"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Link
              href={BOOK_DEMO_HREF}
              className="hidden min-h-10 items-center justify-center rounded-full bg-[var(--white)] px-4 py-2 text-sm font-semibold text-[var(--bg)] transition-opacity hover:opacity-90 lg:inline-flex"
            >
              Book a demo
            </Link>
            <button
              ref={menuButtonRef}
              type="button"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              className="inline-flex h-11 min-h-[44px] w-11 min-w-[44px] items-center justify-center rounded-full text-[var(--white)] active:scale-[0.97] lg:hidden"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <span className="relative block h-3.5 w-[18px]" aria-hidden="true">
                <span
                  className={`absolute left-0 h-[1.5px] w-full rounded-full bg-current transition-transform duration-300 ease-out ${
                    isOpen ? "top-[6px] rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-[6px] h-[1.5px] w-full rounded-full bg-current transition-opacity duration-200 ${
                    isOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 h-[1.5px] w-full rounded-full bg-current transition-transform duration-300 ease-out ${
                    isOpen ? "top-[6px] -rotate-45" : "top-[12px]"
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            id="mobile-navigation"
            ref={sheetRef}
            className="fixed inset-0 z-[10020] flex flex-col bg-[var(--header-mobile-bg)] backdrop-blur-xl lg:hidden"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <div className="flex h-full flex-col items-center justify-center overflow-y-auto px-6 pt-[calc(6.25rem+env(safe-area-inset-top))] pb-[calc(1.75rem+env(safe-area-inset-bottom))]">
              <nav className="flex flex-col items-center gap-1">
                {NAV_ITEMS.map((item) => {
                  const isActive = isNavActive(item.href, pathname);
                  return (
                    <motion.div key={item.href} variants={linkVariants} className="w-full">
                      <Link
                        href={item.href}
                        aria-current={isActive ? "page" : undefined}
                        onClick={() => {
                          if (isActive) setIsOpen(false);
                        }}
                        className={`relative flex min-h-12 items-center justify-center px-4 py-2.5 text-center font-heading text-[1.65rem] tracking-[-0.03em] transition-colors sm:min-h-14 sm:text-3xl ${
                          isActive
                            ? "text-[var(--white)]"
                            : "text-[var(--muted)] hover:text-[var(--white)]"
                        }`}
                      >
                        {item.label}
                        {isActive ? (
                          <span className="absolute bottom-1 left-1/2 h-[2px] w-8 -translate-x-1/2 rounded-full bg-[var(--cyan)]" />
                        ) : null}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <motion.div
                variants={linkVariants}
                className="mt-10 flex flex-col items-center gap-4 text-center"
              >
                <Link
                  href={BOOK_DEMO_HREF}
                  className="inline-flex min-h-12 min-w-[12.5rem] items-center justify-center rounded-full bg-[var(--white)] px-8 text-sm font-semibold text-[var(--bg)]"
                >
                  Book a demo
                </Link>
                <p className="flex flex-col items-center gap-1 text-sm text-[var(--muted)] sm:flex-row sm:gap-3">
                  <a href="mailto:info@slimcybertech.com" className="hover:text-[var(--cyan)]">
                    info@slimcybertech.com
                  </a>
                  <span className="hidden sm:inline" aria-hidden="true">
                    ·
                  </span>
                  <a href="tel:+256772581510" className="hover:text-[var(--cyan)]">
                    +256 772 581510
                  </a>
                </p>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
