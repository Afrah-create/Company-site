import DeviceFrame from "@/components/mockups/DeviceFrame";
import {
  AppShell,
  Badge,
  DataTable,
  DonutChart,
  Gauge,
  MiniLineChart,
  StatCard,
} from "@/components/mockups/primitives";

export function SecurityOverview() {
  return (
    <DeviceFrame variant="browser" url="app.cyberbook.local">
      <AppShell
        product="CyberBook"
        nav={[
          { label: "Overview", active: true },
          { label: "Findings" },
          { label: "Assets" },
        ]}
        title="Risk overview"
      >
        <div className="grid h-full grid-cols-12 gap-3">
          <div className="col-span-3 flex items-center justify-center rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-4">
            <Gauge value={72} label="Risk score" />
          </div>
          <div className="col-span-4 flex flex-col items-center justify-center rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-4">
            <DonutChart
              segments={[
                { value: 4, color: "#f87171" },
                { value: 9, color: "#fbbf24" },
                { value: 14, color: "#00c6ff" },
                { value: 21, color: "#34d399" },
              ]}
              center={
                <>
                  <p className="font-heading text-xl font-bold">48</p>
                  <p className="text-[11px] text-[var(--mk-muted)]">Findings</p>
                </>
              }
            />
            <div className="mt-3 flex flex-wrap justify-center gap-1.5">
              <Badge tone="bad">Critical</Badge>
              <Badge tone="warn">High</Badge>
              <Badge tone="cyan">Medium</Badge>
              <Badge tone="ok">Low</Badge>
            </div>
          </div>
          <div className="col-span-5 rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-4">
            <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">
              Open findings · 8 weeks
            </p>
            <MiniLineChart values={[62, 58, 55, 51, 49, 46, 44, 48]} width={400} height={150} />
          </div>
          <div className="col-span-12">
            <DataTable
              columns={["Asset", "Owner", "Open", "Highest"]}
              rows={[
                ["API gateway", "Team A", "6", <Badge key="1" tone="bad">Critical</Badge>],
                ["Staff VPN", "Team B", "3", <Badge key="2" tone="warn">High</Badge>],
                ["Billing DB", "Team A", "2", <Badge key="3" tone="cyan">Medium</Badge>],
                ["File store", "Team C", "1", <Badge key="4" tone="ok">Low</Badge>],
              ]}
            />
          </div>
        </div>
      </AppShell>
    </DeviceFrame>
  );
}

export function SecurityFindings() {
  return (
    <DeviceFrame variant="browser" url="app.cyberbook.local/findings">
      <AppShell
        product="CyberBook"
        nav={[{ label: "Overview" }, { label: "Findings", active: true }]}
        title="Findings"
      >
        <div className="grid h-full grid-cols-12 gap-3">
          <div className="col-span-8">
            <DataTable
              columns={["Finding", "Score", "Status"]}
              rows={[
                ["Open admin path", "9.1", <Badge key="a" tone="bad">Open</Badge>],
                ["Outdated TLS on edge", "7.4", <Badge key="b" tone="warn">In progress</Badge>],
                ["Missing rate limit", "6.8", <Badge key="c" tone="cyan">Open</Badge>],
                ["Verbose error pages", "4.2", <Badge key="d" tone="ok">Resolved</Badge>],
                ["Weak session idle", "5.5", <Badge key="e" tone="warn">In progress</Badge>],
              ]}
            />
          </div>
          <div className="col-span-4 flex flex-col gap-3">
            <StatCard label="Selected" value="9.1" hint="CVSS-style · Open admin path" tone="bad" />
            <div className="flex-1 rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-4">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">
                Remediation
              </p>
              <p className="mt-2 text-[13px] leading-6">
                Restrict the admin path to the office network. Add an extra sign-in step. Recheck
                after the next release window.
              </p>
              <div className="mt-3">
                <Badge tone="cyan">Owner · Team A</Badge>
              </div>
            </div>
          </div>
        </div>
      </AppShell>
    </DeviceFrame>
  );
}

export function SecurityGraph() {
  return (
    <DeviceFrame variant="browser" url="app.cyberbook.local/assets">
      <AppShell
        product="CyberBook"
        nav={[{ label: "Findings" }, { label: "Assets", active: true }]}
        title="Asset map"
      >
        <div className="relative h-full overflow-hidden rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)]">
          <svg viewBox="0 0 640 560" className="h-full w-full">
            <defs>
              <linearGradient id="mk-node" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00c6ff" />
                <stop offset="100%" stopColor="#0072ff" />
              </linearGradient>
            </defs>
            {[
              [180, 280, 320, 140],
              [180, 280, 320, 280],
              [180, 280, 320, 420],
              [320, 140, 480, 180],
              [320, 280, 480, 280],
              [320, 420, 480, 380],
            ].map(([x1, y1, x2, y2], index) => (
              <line
                key={index}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="2"
              />
            ))}
            <Node x={180} y={280} label="Edge" />
            <Node x={320} y={140} label="API" />
            <Node x={320} y={280} label="Auth" />
            <Node x={320} y={420} label="Files" />
            <Node x={480} y={180} label="Billing" flagged />
            <Node x={480} y={280} label="VPN" />
            <Node x={480} y={380} label="DB" />
          </svg>
        </div>
      </AppShell>
    </DeviceFrame>
  );
}

function Node({
  x,
  y,
  label,
  flagged = false,
}: {
  x: number;
  y: number;
  label: string;
  flagged?: boolean;
}) {
  return (
    <g>
      {flagged ? <circle cx={x} cy={y} r="34" fill="#f87171" opacity="0.18" /> : null}
      <circle
        cx={x}
        cy={y}
        r="22"
        fill={flagged ? "#2a1111" : "#111111"}
        stroke={flagged ? "#f87171" : "url(#mk-node)"}
        strokeWidth="2"
      />
      <text
        x={x}
        y={y + 4}
        textAnchor="middle"
        fill={flagged ? "#f87171" : "#e5e7eb"}
        fontSize="11"
        fontFamily="Inter, sans-serif"
      >
        {label}
      </text>
    </g>
  );
}
