"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";

const SESSION_KEY = "sct-loader-seen";

/** Splash logo once per browser session. Layout-mounted, so client navigations skip it. */
export default function SessionLoader() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "done") {
        setIsLoading(false);
        return;
      }
    } catch {
      // Private mode: still show once for this layout mount.
    }

    setIsLoading(true);
    const timeout = window.setTimeout(() => {
      try {
        sessionStorage.setItem(SESSION_KEY, "done");
      } catch {
        // Ignore storage failures; this mount still hides the loader.
      }
      setIsLoading(false);
    }, 1500);

    return () => window.clearTimeout(timeout);
  }, []);

  return <AnimatePresence>{isLoading && <Loader />}</AnimatePresence>;
}
