"use client";

export default function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute left-[-10%] top-[12%] h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(0,198,255,0.08),transparent_65%)] blur-3xl" />
      <div className="absolute right-[-8%] top-[48%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(0,114,255,0.07),transparent_68%)] blur-3xl" />
      <div className="absolute bottom-[-12%] left-[30%] h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle,rgba(0,198,255,0.05),transparent_70%)] blur-3xl" />
    </div>
  );
}
