import { getStatusLabel, type ProjectStatus } from "@/lib/projects";

export default function StatusBadge({
  status,
  tone = "onMedia",
}: {
  status: ProjectStatus;
  tone?: "onMedia" | "onSurface";
}) {
  const onMedia = tone === "onMedia";

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${
        onMedia
          ? "border-white/45 bg-black/45 text-white"
          : "border-[var(--cyan)]/40 bg-[var(--cyan)]/10 text-[var(--cyan)]"
      }`}
    >
      {getStatusLabel(status)}
    </span>
  );
}
