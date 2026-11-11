import type { ReactNode } from "react";
import { SampleBadge } from "@/components/mockups/primitives";

export default function MockupStage({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  return (
    <div
      id={id}
      className="relative h-[900px] w-[1600px] overflow-hidden bg-[#0a0a0a]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[18%] h-[560px] w-[780px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,198,255,0.16),transparent_68%)] blur-2xl"
      />
      <SampleBadge />
      <div className="relative z-10 flex h-full items-center justify-center gap-8 p-10">
        {children}
      </div>
    </div>
  );
}
