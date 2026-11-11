"use client";

import type { ReactNode } from "react";

type StickySplitProps = {
  sticky: ReactNode;
  children: ReactNode;
  side?: "start" | "end";
  className?: string;
};

/**
 * Usage: <StickySplit sticky={<img />}>scrolling copy</StickySplit>
 * One column is sticky under the navbar on desktop. Stacks on mobile with no sticky.
 */
export default function StickySplit({
  sticky,
  children,
  side = "start",
  className = "",
}: StickySplitProps) {
  const stickyColumn = (
    <div className="lg:sticky lg:top-28 lg:self-start">{sticky}</div>
  );

  return (
    <div className={`grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-12 ${className}`.trim()}>
      {side === "end" ? (
        <>
          <div>{children}</div>
          {stickyColumn}
        </>
      ) : (
        <>
          {stickyColumn}
          <div>{children}</div>
        </>
      )}
    </div>
  );
}
