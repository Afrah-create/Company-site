import DeviceFrame from "@/components/mockups/DeviceFrame";
import {
  AppShell,
  Badge,
  DataTable,
  MiniBarChart,
  MiniLineChart,
  PhoneHeader,
  PrimaryButton,
  ProgressBar,
  StatCard,
  Timeline,
} from "@/components/mockups/primitives";

export function ServiceSoftware() {
  return (
    <DeviceFrame variant="browser" url="platform.ops.local">
      <AppShell
        product="Platform"
        nav={[
          { label: "Overview", active: true },
          { label: "Apps" },
          { label: "APIs" },
          { label: "Releases" },
        ]}
        title="Web platform"
      >
        <div className="grid h-full grid-cols-12 gap-3">
          <div className="col-span-8 flex flex-col gap-3">
            <div className="grid grid-cols-3 gap-3">
              <StatCard label="Live apps" value="4" hint="Same records, shared login" />
              <StatCard label="API routes" value="38" hint="Documented for the team" />
              <StatCard label="Last release" value="2d" hint="Rolled forward cleanly" />
            </div>
            <DataTable
              columns={["Module", "Owner", "State"]}
              rows={[
                ["Records", "Team A", <Badge key="a" tone="ok">Live</Badge>],
                ["Staff login", "Team A", <Badge key="b" tone="ok">Live</Badge>],
                ["Reports", "Team B", <Badge key="c" tone="cyan">Build</Badge>],
                ["Public site", "Team B", <Badge key="d" tone="warn">Queue</Badge>],
              ]}
            />
          </div>
          <div className="col-span-4 flex flex-col gap-3">
            <div className="flex-1 rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-4">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">
                After handover
              </p>
              <ul className="mt-3 space-y-2 text-[13px]">
                <li>Runbook for deploys</li>
                <li>Who to call when it fails</li>
                <li>Staging matches production</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-4">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">
                Requests · 7 days
              </p>
              <MiniLineChart values={[42, 48, 46, 55, 52, 61, 58]} width={240} height={88} />
            </div>
          </div>
        </div>
      </AppShell>
    </DeviceFrame>
  );
}

export function ServiceMobile() {
  return (
    <>
      <DeviceFrame variant="phone">
        <PhoneHeader title="Town Hub" subtitle="Home" />
        <div className="flex min-h-0 flex-1 flex-col gap-3 px-3 pb-3">
          <div className="rounded-2xl bg-[linear-gradient(135deg,var(--mk-cyan),var(--mk-blue))] p-4 text-white">
            <p className="text-[11px] uppercase tracking-[0.14em] opacity-80">Today</p>
            <p className="mt-1 font-heading text-2xl font-bold">3 jobs nearby</p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
            {["Book", "Pay", "Help"].map((action) => (
              <div
                key={action}
                className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] py-3"
              >
                {action}
              </div>
            ))}
          </div>
          {["Water tank refill", "Market stall fee", "Clinic visit"].map((item, index) => (
            <div
              key={item}
              className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] px-3 py-3"
            >
              <p className="text-[13px] font-medium">{item}</p>
              <p className="text-[12px] text-[var(--mk-muted)]">
                {index === 0 ? "ETA 25 min" : index === 1 ? "Due Friday" : "Tomorrow 09:00"}
              </p>
            </div>
          ))}
        </div>
      </DeviceFrame>
      <DeviceFrame variant="phone">
        <PhoneHeader title="Job" subtitle="Water tank refill" />
        <div className="flex min-h-0 flex-1 flex-col gap-3 px-3 pb-3">
          <div className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-3">
            <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">Status</p>
            <div className="mt-2 flex items-center justify-between">
              <p className="font-heading text-lg font-bold">On the way</p>
              <Badge tone="cyan">25 min</Badge>
            </div>
            <div className="mt-3">
              <ProgressBar value={58} />
            </div>
          </div>
          <div className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-3 text-[13px]">
            <p className="font-medium">Plot 14 · Hill Road</p>
            <p className="mt-1 text-[var(--mk-muted)]">Driver · Person C</p>
          </div>
          <div className="mt-auto">
            <PrimaryButton>Call driver</PrimaryButton>
          </div>
        </div>
      </DeviceFrame>
    </>
  );
}

export function ServiceSecurity() {
  return (
    <DeviceFrame variant="browser" url="review.security.local">
      <AppShell
        product="Review"
        nav={[
          { label: "Findings", active: true },
          { label: "Hardening" },
          { label: "Follow-up" },
        ]}
        title="System review"
      >
        <div className="grid h-full grid-cols-12 gap-3">
          <div className="col-span-8 flex flex-col gap-3">
            <div className="grid grid-cols-4 gap-3">
              <StatCard label="Critical" value="2" tone="bad" />
              <StatCard label="High" value="5" tone="warn" />
              <StatCard label="Closed" value="11" tone="ok" />
              <StatCard label="Due this week" value="4" />
            </div>
            <DataTable
              columns={["Finding", "Owner", "Fix"]}
              rows={[
                ["Admin path on the public net", "Team A", <Badge key="a" tone="bad">Open</Badge>],
                ["Idle sessions never lock", "Team A", <Badge key="b" tone="warn">In progress</Badge>],
                ["Backups untested", "Team B", <Badge key="c" tone="cyan">Queued</Badge>],
                ["Staff laptops unpatched", "Team B", <Badge key="d" tone="ok">Closed</Badge>],
              ]}
            />
          </div>
          <div className="col-span-4 flex flex-col gap-3">
            <div className="flex-1 rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-4">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">
                What to fix first
              </p>
              <div className="mt-3">
                <Timeline
                  items={[
                    { title: "Close the admin path", meta: "This week", active: true },
                    { title: "Session lock", meta: "Next release" },
                    { title: "Backup drill", meta: "Month end" },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </AppShell>
    </DeviceFrame>
  );
}

export function ServiceData() {
  return (
    <DeviceFrame variant="browser" url="reports.data.local">
      <AppShell
        product="Reports"
        nav={[
          { label: "Dashboards", active: true },
          { label: "Exports" },
          { label: "KPIs" },
        ]}
        title="Operations board"
      >
        <div className="grid h-full grid-cols-12 gap-3">
          <div className="col-span-8 flex flex-col gap-3">
            <div className="grid grid-cols-3 gap-3">
              <StatCard label="Collections" value="UGX 18.4m" hint="This month" />
              <StatCard label="Open cases" value="64" hint="Across 3 desks" />
              <StatCard label="On-time" value="91%" tone="ok" hint="Vs last month 84%" />
            </div>
            <div className="flex min-h-0 flex-1 flex-col rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-4">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">
                Weekly collections
              </p>
              <div className="mt-3">
                <MiniBarChart
                  values={[12, 14, 13, 16, 15, 18, 17]}
                  labels={["W1", "W2", "W3", "W4", "W5", "W6", "W7"]}
                  width={640}
                  height={180}
                />
              </div>
            </div>
          </div>
          <div className="col-span-4 flex flex-col gap-3">
            <div className="flex-1 rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-4">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">
                Saved reports
              </p>
              <ul className="mt-3 space-y-2 text-[13px]">
                <li>Desk load · Monday pack</li>
                <li>Fees vs target</li>
                <li>Cases older than 14 days</li>
              </ul>
            </div>
            <StatCard label="Sheets replaced" value="3" hint="One board, same numbers" />
          </div>
        </div>
      </AppShell>
    </DeviceFrame>
  );
}

export function ServiceCloud() {
  return (
    <DeviceFrame variant="browser" url="ops.cloud.local">
      <AppShell
        product="Ops"
        nav={[
          { label: "Deploys", active: true },
          { label: "Health" },
          { label: "Environments" },
        ]}
        title="Hosting and deploys"
      >
        <div className="grid h-full grid-cols-12 gap-3">
          <div className="col-span-8 flex flex-col gap-3">
            <div className="grid grid-cols-3 gap-3">
              {["Build", "Checks", "Live"].map((stage, index) => (
                <div
                  key={stage}
                  className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-4"
                >
                  <p className="font-heading text-[15px] font-bold">{stage}</p>
                  <p className="mt-1 text-[12px] text-[var(--mk-muted)]">
                    {index === 0 ? "1m 08s" : index === 1 ? "42s" : "Just now"}
                  </p>
                  <div className="mt-3">
                    {index < 2 ? <Badge tone="ok">Passed</Badge> : <Badge tone="cyan">Live</Badge>}
                  </div>
                </div>
              ))}
            </div>
            <DataTable
              columns={["Env", "Version", "State"]}
              rows={[
                ["Production", "1.8.4", <Badge key="p" tone="ok">Healthy</Badge>],
                ["Staging", "1.8.5", <Badge key="s" tone="cyan">Warm</Badge>],
                ["Dev", "1.8.5", <Badge key="d">Idle</Badge>],
              ]}
            />
          </div>
          <div className="col-span-4 flex flex-col gap-3">
            <StatCard label="Uptime" value="99.95%" tone="ok" hint="30 days" />
            <div className="flex-1 rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-4">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">
                Error rate
              </p>
              <MiniLineChart values={[0.4, 0.3, 0.5, 0.2, 0.3, 0.2, 0.2]} width={240} height={110} />
            </div>
          </div>
        </div>
      </AppShell>
    </DeviceFrame>
  );
}

export function ServiceDesign() {
  return (
    <>
      <DeviceFrame variant="browser" url="studio.design.local" className="h-[640px] w-[920px]">
        <div className="grid h-full grid-cols-12 gap-4 bg-[var(--mk-bg)] p-5">
          <div className="col-span-5 space-y-3">
            <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--mk-muted)]">Flow</p>
            <Timeline
              items={[
                { title: "Land", meta: "What this is", active: true },
                { title: "Choose", meta: "One clear action" },
                { title: "Confirm", meta: "Pay or book" },
                { title: "Done", meta: "What happens next" },
              ]}
            />
          </div>
          <div className="col-span-7 space-y-3">
            <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--mk-muted)]">
              Type and colour
            </p>
            <p className="font-heading text-3xl font-bold">Keep it readable</p>
            <p className="text-[13px] leading-6 text-[var(--mk-muted)]">
              Large type on a phone. One primary button. Room around the tap targets.
            </p>
            <div className="flex gap-2">
              {["#0a0a0a", "#111111", "#00c6ff", "#0072ff"].map((color) => (
                <div
                  key={color}
                  className="h-10 w-10 rounded-xl border border-[var(--mk-border)]"
                  style={{ background: color }}
                />
              ))}
            </div>
            <div className="w-40">
              <PrimaryButton>Continue</PrimaryButton>
            </div>
          </div>
        </div>
      </DeviceFrame>
      <DeviceFrame variant="phone">
        <PhoneHeader title="Book a visit" subtitle="Clinic desk" />
        <div className="flex min-h-0 flex-1 flex-col gap-3 px-3 pb-3">
          <div className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-3">
            <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">When</p>
            <p className="mt-1 font-heading text-xl font-bold">Thu · 10:30</p>
          </div>
          <div className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-3 text-[13px]">
            Desk 2 · 12 min wait
          </div>
          <div className="mt-auto">
            <PrimaryButton>Confirm</PrimaryButton>
          </div>
        </div>
      </DeviceFrame>
    </>
  );
}

export function ServiceAI() {
  return (
    <DeviceFrame variant="browser" url="assist.desk.local">
      <AppShell
        product="Assist"
        nav={[
          { label: "Chat", active: true },
          { label: "Files" },
          { label: "Languages" },
        ]}
        title="Ask the records"
        right={<Badge tone="cyan">Sample</Badge>}
      >
        <div className="grid h-full grid-cols-12 gap-3">
          <div className="col-span-7 flex flex-col gap-3">
            <div className="flex-1 space-y-2 rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-4 text-[13px] leading-6">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">
                You
              </p>
              <p>What does Student A still owe this term?</p>
              <p className="pt-3 text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">
                Assist
              </p>
              <p>
                Fee balance is UGX 85,000. Last receipt was 12 May. This is a sample answer from
                the school file, not a live student.
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] px-4 py-3">
              <PrimaryButton>Ask</PrimaryButton>
            </div>
          </div>
          <div className="col-span-5 flex flex-col gap-3">
            <div className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-4">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">
                Draft from a file
              </p>
              <p className="mt-2 text-[13px] leading-6">
                Notice to parent · fee reminder. Edit before you send. The model does not send
                mail on its own.
              </p>
              <div className="mt-3">
                <Badge tone="ok">Needs a person</Badge>
              </div>
            </div>
            <div className="flex-1 rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-4">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">
                Language
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge tone="cyan">English</Badge>
                <Badge>Language B</Badge>
              </div>
              <p className="mt-3 text-[13px] leading-6">
                Same thread, two languages. Sample translation only.
              </p>
            </div>
          </div>
        </div>
      </AppShell>
    </DeviceFrame>
  );
}

export function ServiceConsulting() {
  return (
    <DeviceFrame variant="browser" url="plan.consult.local">
      <AppShell
        product="Plan"
        nav={[
          { label: "Order of work", active: true },
          { label: "Architecture" },
          { label: "Training" },
        ]}
        title="What to build first"
      >
        <div className="grid h-full grid-cols-12 gap-3">
          <div className="col-span-7 flex flex-col gap-3">
            <div className="grid grid-cols-3 gap-3">
              {[
                ["Now", "Records and login", "ok"],
                ["Next", "Phone app", "cyan"],
                ["Later", "Public portal", "neutral"],
              ].map(([when, what, tone]) => (
                <div
                  key={when}
                  className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-4"
                >
                  <Badge tone={tone as "ok" | "cyan" | "neutral"}>{when}</Badge>
                  <p className="mt-3 font-heading text-[15px] font-bold">{what}</p>
                </div>
              ))}
            </div>
            <div className="flex-1 rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-4">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">
                Leave alone for now
              </p>
              <ul className="mt-3 space-y-2 text-[13px]">
                <li>A second mobile app</li>
                <li>A custom accounts package</li>
                <li>Rewriting the old desktop tool</li>
              </ul>
            </div>
          </div>
          <div className="col-span-5 flex flex-col gap-3">
            <div className="flex-1 rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-4">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">
                How it fits
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2 text-center text-[12px]">
                {["Web app", "Phone app", "Records", "Staff login"].map((box) => (
                  <div
                    key={box}
                    className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-bg)] px-2 py-6 font-medium"
                  >
                    {box}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-4">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">
                Team sessions
              </p>
              <p className="mt-2 text-[13px]">Two afternoons on how to ship a change and how to roll it back.</p>
            </div>
          </div>
        </div>
      </AppShell>
    </DeviceFrame>
  );
}
