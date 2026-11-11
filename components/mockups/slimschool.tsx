import DeviceFrame from "@/components/mockups/DeviceFrame";
import {
  AppShell,
  Badge,
  DataTable,
  DonutChart,
  MiniLineChart,
  PhoneHeader,
  ProgressBar,
  StatCard,
} from "@/components/mockups/primitives";

export function SlimSchoolDashboard() {
  return (
    <DeviceFrame variant="browser" url="admin.slimschool.local">
      <AppShell
        product="SlimSchool"
        nav={[
          { label: "Overview", active: true },
          { label: "Students" },
          { label: "Attendance" },
          { label: "Fees" },
          { label: "Reports" },
        ]}
        title="School overview"
      >
        <div className="grid h-full grid-cols-12 gap-3">
          <div className="col-span-8 grid grid-rows-[auto_1fr] gap-3">
            <div className="grid grid-cols-4 gap-3">
              <StatCard label="Enrolment" value="412" hint="This term" />
              <StatCard label="Attendance" value="94%" hint="Today" tone="ok" />
              <StatCard label="Fees collected" value="UGX 18.4m" hint="This month" />
              <StatCard label="Pending reports" value="7" hint="Class teachers" tone="warn" />
            </div>
            <div className="flex min-h-0 flex-col rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-4">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">
                Attendance · 14 days
              </p>
              <div className="mt-3 min-h-0 flex-1">
                <MiniLineChart values={[88, 90, 91, 89, 93, 94, 92, 95, 94, 96, 93, 94, 95, 94]} width={640} height={220} />
              </div>
            </div>
          </div>
          <div className="col-span-4 flex flex-col gap-3">
            <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-4">
              <DonutChart
                segments={[
                  { value: 68, color: "#34d399" },
                  { value: 18, color: "#fbbf24" },
                  { value: 14, color: "#f87171" },
                ]}
                center={
                  <>
                    <p className="font-heading text-xl font-bold">68%</p>
                    <p className="text-[11px] text-[var(--mk-muted)]">Paid</p>
                  </>
                }
              />
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                <Badge tone="ok">Paid</Badge>
                <Badge tone="warn">Partial</Badge>
                <Badge tone="bad">Outstanding</Badge>
              </div>
            </div>
            <div className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-4">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">
                Recent activity
              </p>
              <ul className="mt-2 space-y-2 text-[13px]">
                <li>S.3 attendance marked</li>
                <li>Fee receipt · Student A</li>
                <li>Report card batch queued</li>
              </ul>
            </div>
          </div>
        </div>
      </AppShell>
    </DeviceFrame>
  );
}

export function SlimSchoolGradebook() {
  return (
    <DeviceFrame variant="browser" url="admin.slimschool.local/grades">
      <AppShell
        product="SlimSchool"
        nav={[
          { label: "Overview" },
          { label: "Gradebook", active: true },
          { label: "Reports" },
        ]}
        title="Gradebook"
        right={<Badge tone="cyan">S.2 East</Badge>}
      >
        <div className="flex h-full flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Badge tone="cyan">S.2 East</Badge>
              <Badge>Term 2</Badge>
            </div>
            <div className="rounded-full bg-[linear-gradient(135deg,var(--mk-cyan),var(--mk-blue))] px-4 py-2 text-[12px] font-semibold text-white">
              Generate report cards
            </div>
          </div>
          <DataTable
            columns={["Student", "Math", "English", "Science", "SST", "Average"]}
            rows={[
              ["Student A", grade("A"), grade("B+"), grade("A"), grade("B"), "A-"],
              ["Student B", grade("B"), grade("A"), grade("B+"), grade("A"), "B+"],
              ["Student C", grade("C+"), grade("B"), grade("B"), grade("C+"), "B-"],
              ["Student D", grade("A"), grade("A"), grade("A-"), grade("B+"), "A"],
              ["Student E", grade("B+"), grade("C+"), grade("B"), grade("B"), "B"],
              ["Student F", grade("A-"), grade("B+"), grade("A"), grade("A-"), "A-"],
            ]}
          />
        </div>
      </AppShell>
    </DeviceFrame>
  );
}

function grade(value: string) {
  const tone = value.startsWith("A") ? "ok" : value.startsWith("B") ? "cyan" : "warn";
  return <Badge tone={tone}>{value}</Badge>;
}

export function SlimSchoolParent() {
  return (
    <DeviceFrame variant="phone">
      <PhoneHeader title="Parent view" subtitle="Student A · S.2 East" />
      <div className="flex min-h-0 flex-1 flex-col gap-3 px-3 pb-3">
        <div className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-3">
          <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">
            Attendance streak
          </p>
          <p className="mt-1 font-heading text-3xl font-bold">12 days</p>
          <div className="mt-2">
            <ProgressBar value={86} />
          </div>
        </div>
        <div className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-3">
          <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">
            Latest results
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <Badge tone="ok">Math A</Badge>
            <Badge tone="cyan">English B+</Badge>
            <Badge tone="ok">Science A</Badge>
          </div>
        </div>
        <div className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-3">
          <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">Fee balance</p>
          <p className="mt-1 font-heading text-2xl font-bold">UGX 85,000</p>
          <p className="text-[12px] text-[var(--mk-muted)]">Due 15 Jun</p>
        </div>
        <div className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-3">
          <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">Notices</p>
          <p className="mt-1 text-[13px]">Visitation day · Saturday 9:00</p>
          <p className="text-[13px] text-[var(--mk-muted)]">Bring report card slip</p>
        </div>
      </div>
    </DeviceFrame>
  );
}
