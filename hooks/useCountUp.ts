"use client";

import { useEffect, useState } from "react";

type UseCountUpOptions = {
  end: number;
  durationMs?: number;
  start?: number;
  shouldStart?: boolean;
};

export function useCountUp({
  end,
  durationMs = 1200,
  start = 0,
  shouldStart = false,
}: UseCountUpOptions) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!shouldStart) return;

    let frameId = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextValue = Math.round(start + (end - start) * eased);

      setCount(nextValue);

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [durationMs, end, shouldStart, start]);

  return count;
}
