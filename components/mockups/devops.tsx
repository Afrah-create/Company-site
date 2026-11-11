import DeviceFrame from "@/components/mockups/DeviceFrame";
import {
  AppShell,
  Badge,
  DataTable,
  MiniLineChart,
  StatCard,
} from "@/components/mockups/primitives";

export function DevOpsPipeline() {
  const stages = [
    { name: "Build", time: "1m 12s", state: "ok" as const },
    { name: "Test", time: "2m 04s", state: "ok" as const },
    { name: "Security scan", time: "48s", state: "run" as const },
    { name: "Deploy", time: "—", state: "wait" as const },
  ];
  return (
    <DeviceFrame variant="browser" url="ci.pipeline.local">
      <AppShell
        product="Pipeline"
        nav={[
          { label: "Runs", active: true },
          { label: "Deploys" },
          { label: "Logs" },
        ]}
        title="main · #184"
      >
        <div className="flex h-full flex-col justify-center gap-6">
          <div className="grid grid-cols-4 gap-3">
            {stages.map((stage, index) => (
              <div key={stage.name} className="relative rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-4">
                {index < stages.length - 1 ? (
                  <span className="absolute right-[-10px] top-1/2 z-10 h-px w-5 bg-[var(--mk-border)]" />
                ) : null}
                <p className="font-heading text-[15px] font-bold">{stage.name}</p>
                <p className="mt-1 text-[12px] text-[var(--mk-muted)]">{stage.time}</p>
                <div className="mt-3">
                  {stage.state === "ok" ? <Badge tone="ok">Passed</Badge> : null}
                  {stage.state === "run" ? <Badge tone="cyan">Running</Badge> : null}
                  {stage.state === "wait" ? <Badge>Queued</Badge> : null}
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] px-4 py-3 text-[13px] text-[var(--mk-muted)]">
            Security scan · checking dependencies on commit 8f2c1a
          </div>
        </div>
      </AppShell>
    </DeviceFrame>
  );
}

export function DevOpsDeploys() {
  return (
    <DeviceFrame variant="browser" url="ci.pipeline.local/deploys">
      <AppShell
        product="Pipeline"
        nav={[{ label: "Runs" }, { label: "Deploys", active: true }]}
        title="Deployments"
      >
        <div className="grid h-full grid-cols-12 gap-3">
          <div className="col-span-8">
            <DataTable
              columns={["Release", "Env", "When", ""]}
              rows={[
                ["1.8.4", env("prod"), "12 min", <span key="r1" className="text-[var(--mk-cyan)]">Rollback</span>],
                ["1.8.4", env("staging"), "28 min", ""],
                ["1.8.3", env("prod"), "Yesterday", ""],
                ["1.8.3", env("dev"), "Yesterday", ""],
              ]}
            />
          </div>
          <div className="col-span-4 flex flex-col gap-3">
            <StatCard label="Success rate" value="98%" tone="ok" hint="Last 30 deploys" />
            <div className="flex-1 rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-4">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">
                Success · 14 days
              </p>
              <MiniLineChart values={[96, 97, 95, 98, 99, 97, 98]} width={240} height={120} />
            </div>
          </div>
        </div>
      </AppShell>
    </DeviceFrame>
  );
}

function env(name: string) {
  const tone = name === "prod" ? "ok" : name === "staging" ? "cyan" : "neutral";
  return <Badge tone={tone}>{name}</Badge>;
}

export function DevOpsLogs() {
  const lines = [
    "10:41:02  info   health check ok",
    "10:41:08  info   replica 2 ready",
    "10:41:14  warn   retrying probe 1/3",
    "10:41:16  info   probe recovered",
    "10:41:22  info   traffic shift 20%",
    "10:41:31  info   traffic shift 50%",
    "10:41:40  info   traffic shift 100%",
    "10:41:44  info   deploy complete",
  ];
  return (
    <DeviceFrame variant="browser" url="ci.pipeline.local/logs">
      <AppShell
        product="Pipeline"
        nav={[{ label: "Deploys" }, { label: "Logs", active: true }]}
        title="Observability"
      >
        <div className="grid h-full grid-cols-12 gap-3">
          <div className="col-span-8 overflow-hidden rounded-2xl border border-[var(--mk-border)] bg-[#07080a] p-4 font-mono text-[12px] leading-6 text-[#9ae6ff]">
            {lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <div className="col-span-4 flex flex-col gap-3">
            <StatCard label="Uptime" value="99.95%" tone="ok" hint="30 days" />
            <div className="flex-1 rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-4">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">
                Error rate
              </p>
              <MiniLineChart values={[0.4, 0.3, 0.5, 0.2, 0.8, 0.3, 0.2]} width={240} height={120} />
            </div>
          </div>
        </div>
      </AppShell>
    </DeviceFrame>
  );
}
