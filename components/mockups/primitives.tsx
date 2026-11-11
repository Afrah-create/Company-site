import type { ReactNode } from "react";

function uid(prefix: string, key: string) {
  return `${prefix}-${key.replace(/[^a-zA-Z0-9]+/g, "-")}`;
}

export function SampleBadge() {
  return (
    <span className="absolute right-5 top-5 z-20 rounded-full border border-[var(--mk-border)] bg-[var(--mk-surface)]/90 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--mk-muted)]">
      Sample data
    </span>
  );
}

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "cyan" | "ok" | "warn" | "bad";
}) {
  const tones = {
    neutral: "border-[var(--mk-border)] text-[var(--mk-muted)]",
    cyan: "border-[color-mix(in_srgb,var(--mk-cyan)_45%,transparent)] text-[var(--mk-cyan)] bg-[color-mix(in_srgb,var(--mk-cyan)_12%,transparent)]",
    ok: "border-[color-mix(in_srgb,var(--mk-ok)_45%,transparent)] text-[var(--mk-ok)] bg-[color-mix(in_srgb,var(--mk-ok)_12%,transparent)]",
    warn: "border-[color-mix(in_srgb,var(--mk-warn)_45%,transparent)] text-[var(--mk-warn)] bg-[color-mix(in_srgb,var(--mk-warn)_12%,transparent)]",
    bad: "border-[color-mix(in_srgb,var(--mk-bad)_45%,transparent)] text-[var(--mk-bad)] bg-[color-mix(in_srgb,var(--mk-bad)_12%,transparent)]",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function Avatar({ initials, size = "md" }: { initials: string; size?: "sm" | "md" }) {
  const dim = size === "sm" ? "h-7 w-7 text-[10px]" : "h-9 w-9 text-[12px]";
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--mk-cyan),var(--mk-blue))] font-heading font-bold text-white ${dim}`}
    >
      {initials}
    </span>
  );
}

export function StatCard({
  label,
  value,
  hint,
  tone = "default",
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: "default" | "ok" | "warn" | "bad";
}) {
  const valueColor =
    tone === "ok"
      ? "text-[var(--mk-ok)]"
      : tone === "warn"
        ? "text-[var(--mk-warn)]"
        : tone === "bad"
          ? "text-[var(--mk-bad)]"
          : "text-[var(--mk-text)]";
  return (
    <div className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-4">
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--mk-muted)]">
        {label}
      </p>
      <p className={`mt-2 font-heading text-[1.65rem] font-bold leading-none ${valueColor}`}>
        {value}
      </p>
      {hint ? <p className="mt-2 text-[12px] text-[var(--mk-muted)]">{hint}</p> : null}
    </div>
  );
}

export function MiniLineChart({
  values,
  width = 280,
  height = 88,
}: {
  values: number[];
  width?: number;
  height?: number;
}) {
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const span = max - min || 1;
  const pts = values.map((value, index) => {
    const x = (index / Math.max(values.length - 1, 1)) * width;
    const y = height - ((value - min) / span) * (height - 8) - 4;
    return `${x},${y}`;
  });
  const line = pts.join(" ");
  const area = `0,${height} ${line} ${width},${height}`;
  const fillId = uid("mk-line-fill", `${values.join("x")}-${width}x${height}`);
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <defs>
        <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00c6ff" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#00c6ff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#${fillId})`} />
      <polyline points={line} fill="none" stroke="#00c6ff" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export function MiniBarChart({
  values,
  labels,
  width = 280,
  height = 96,
}: {
  values: number[];
  labels?: string[];
  width?: number;
  height?: number;
}) {
  const max = Math.max(...values, 1);
  const gap = 8;
  const barW = (width - gap * (values.length - 1)) / values.length;
  const barId = uid("mk-bar", `${values.join("x")}-${width}x${height}`);
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {values.map((value, index) => {
        const h = Math.max(4, (value / max) * (height - 18));
        const x = index * (barW + gap);
        return (
          <g key={`${value}-${index}`}>
            <rect
              x={x}
              y={height - 14 - h}
              width={barW}
              height={h}
              rx="4"
              fill={index === values.length - 1 ? "#00c6ff" : `url(#${barId})`}
            />
            {labels?.[index] ? (
              <text
                x={x + barW / 2}
                y={height - 2}
                textAnchor="middle"
                fontSize="9"
                fill="currentColor"
                opacity="0.55"
              >
                {labels[index]}
              </text>
            ) : null}
          </g>
        );
      })}
      <defs>
        <linearGradient id={barId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00c6ff" />
          <stop offset="100%" stopColor="#0072ff" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function DonutChart({
  segments,
  size = 132,
  thickness = 16,
  center,
}: {
  segments: { value: number; color: string }[];
  size?: number;
  thickness?: number;
  center?: ReactNode;
}) {
  const total = segments.reduce((sum, item) => sum + item.value, 0) || 1;
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div className="relative inline-flex" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--mk-surface2)"
          strokeWidth={thickness}
        />
        {segments.map((segment, index) => {
          const len = (segment.value / total) * c;
          const circle = (
            <circle
              key={`${segment.color}-${index}`}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={segment.color}
              strokeWidth={thickness}
              strokeDasharray={`${len} ${c - len}`}
              strokeDashoffset={-offset}
              strokeLinecap="butt"
            />
          );
          offset += len;
          return circle;
        })}
      </svg>
      {center ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {center}
        </div>
      ) : null}
    </div>
  );
}

export function Gauge({ value, label }: { value: number; label: string }) {
  const clamped = Math.min(100, Math.max(0, value));
  const r = 54;
  const c = Math.PI * r;
  const filled = (clamped / 100) * c;
  const gaugeId = uid("mk-gauge", String(value));
  return (
    <div className="relative w-[148px]">
      <svg width="148" height="90" viewBox="0 0 148 90">
        <path
          d="M16 86 A 58 58 0 0 1 132 86"
          fill="none"
          stroke="var(--mk-surface2)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d="M16 86 A 58 58 0 0 1 132 86"
          fill="none"
          stroke={`url(#${gaugeId})`}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={`${filled} ${c}`}
        />
        <defs>
          <linearGradient id={gaugeId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00c6ff" />
            <stop offset="100%" stopColor="#0072ff" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-x-0 bottom-0 text-center">
        <p className="font-heading text-2xl font-bold leading-none text-[var(--mk-text)]">{clamped}</p>
        <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">{label}</p>
      </div>
    </div>
  );
}

export function DataTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: ReactNode[][];
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--mk-border)]">
      <table className="w-full text-left text-[13px]">
        <thead className="bg-[var(--mk-surface2)] text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">
          <tr>
            {columns.map((column) => (
              <th key={column} className="px-3 py-2.5 font-medium">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-t border-[var(--mk-border)] text-[var(--mk-text)]">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-3 py-2.5 align-middle">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--mk-surface2)]">
      <div
        className="h-full rounded-full bg-[linear-gradient(90deg,var(--mk-cyan),var(--mk-blue))]"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

export function Timeline({
  items,
}: {
  items: { title: string; meta: string; active?: boolean }[];
}) {
  return (
    <ol className="space-y-3">
      {items.map((item) => (
        <li key={item.title} className="flex gap-3">
          <span
            className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${
              item.active ? "bg-[var(--mk-cyan)]" : "bg-[var(--mk-muted)]/40"
            }`}
          />
          <div>
            <p className="text-[13px] font-medium text-[var(--mk-text)]">{item.title}</p>
            <p className="text-[12px] text-[var(--mk-muted)]">{item.meta}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function NotificationToast({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-[color-mix(in_srgb,var(--mk-warn)_40%,var(--mk-border))] bg-[var(--mk-surface)] px-3 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.18)]">
      <p className="text-[12px] font-semibold text-[var(--mk-warn)]">{title}</p>
      <p className="mt-0.5 text-[12px] text-[var(--mk-muted)]">{body}</p>
    </div>
  );
}

export function MapPanel({
  pins = [],
  route,
  dots = [],
  className = "",
}: {
  pins?: { x: number; y: number; tone?: "cyan" | "ok" }[];
  dots?: { x: number; y: number }[];
  route?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface2)] ${className}`.trim()}
    >
      <svg viewBox="0 0 100 100" className="h-full w-full" preserveAspectRatio="none">
        {Array.from({ length: 10 }, (_, i) => (
          <g key={i}>
            <line
              x1="0"
              y1={i * 10}
              x2="100"
              y2={i * 10}
              stroke="currentColor"
              strokeOpacity="0.08"
            />
            <line
              x1={i * 10}
              y1="0"
              x2={i * 10}
              y2="100"
              stroke="currentColor"
              strokeOpacity="0.08"
            />
          </g>
        ))}
        {route ? (
          <path d={route} fill="none" stroke="#00c6ff" strokeWidth="1.6" strokeLinecap="round" />
        ) : null}
        {dots.map((dot, index) => (
          <circle key={`d-${index}`} cx={dot.x} cy={dot.y} r="1.2" fill="#00c6ff" opacity="0.85" />
        ))}
        {pins.map((pin, index) => (
          <g key={`p-${index}`}>
            <circle
              cx={pin.x}
              cy={pin.y}
              r="2.4"
              fill={pin.tone === "ok" ? "#34d399" : "#00c6ff"}
            />
            <circle
              cx={pin.x}
              cy={pin.y}
              r="5"
              fill={pin.tone === "ok" ? "#34d399" : "#00c6ff"}
              opacity="0.2"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

export function Sidebar({
  title,
  items,
}: {
  title: string;
  items: { label: string; active?: boolean }[];
}) {
  return (
    <aside className="flex w-[188px] shrink-0 flex-col border-r border-[var(--mk-border)] bg-[var(--mk-surface)] p-3">
      <p className="px-2 font-heading text-[13px] font-bold tracking-wide text-[var(--mk-text)]">
        {title}
      </p>
      <nav className="mt-4 space-y-0.5">
        {items.map((item) => (
          <div
            key={item.label}
            className={`rounded-xl px-2.5 py-2 text-[13px] ${
              item.active
                ? "bg-[color-mix(in_srgb,var(--mk-cyan)_14%,transparent)] text-[var(--mk-cyan)]"
                : "text-[var(--mk-muted)]"
            }`}
          >
            {item.label}
          </div>
        ))}
      </nav>
    </aside>
  );
}

export function TopBar({ title, right }: { title: string; right?: ReactNode }) {
  return (
    <div className="flex h-12 shrink-0 items-center justify-between border-b border-[var(--mk-border)] bg-[var(--mk-surface)] px-4">
      <p className="text-[14px] font-semibold text-[var(--mk-text)]">{title}</p>
      {right}
    </div>
  );
}

export function AppShell({
  product,
  nav,
  title,
  children,
  right,
}: {
  product: string;
  nav: { label: string; active?: boolean }[];
  title: string;
  children: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="flex h-full min-h-0">
      <Sidebar title={product} items={nav} />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar title={title} right={right} />
        <div className="min-h-0 flex-1 overflow-hidden bg-[var(--mk-bg)] p-4">{children}</div>
      </div>
    </div>
  );
}

export function PhoneHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="px-4 pb-2 pt-1">
      <p className="font-heading text-[15px] font-bold text-[var(--mk-text)]">{title}</p>
      {subtitle ? <p className="text-[12px] text-[var(--mk-muted)]">{subtitle}</p> : null}
    </div>
  );
}

export function PrimaryButton({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--mk-cyan),var(--mk-blue))] text-[13px] font-semibold text-white">
      {children}
    </div>
  );
}
