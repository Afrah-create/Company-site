import DeviceFrame from "@/components/mockups/DeviceFrame";
import {
  AppShell,
  Badge,
  DataTable,
  MiniBarChart,
  MiniLineChart,
  NotificationToast,
  PhoneHeader,
  ProgressBar,
  StatCard,
} from "@/components/mockups/primitives";

export function CucoCareDashboard() {
  return (
    <DeviceFrame variant="phone">
      <PhoneHeader title="CucoCare" subtitle="House 2 · Layer flock" />
      <div className="flex min-h-0 flex-1 flex-col gap-3 px-3 pb-3">
        <div className="grid grid-cols-2 gap-2">
          <StatCard label="Flock size" value="1,240" />
          <StatCard label="Mortality" value="0.4%" tone="ok" />
        </div>
        <div className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-3">
          <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">
            Feed stock
          </p>
          <p className="mt-1 font-heading text-2xl font-bold">11 days</p>
          <div className="mt-2">
            <ProgressBar value={64} />
          </div>
        </div>
        <div className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-3">
          <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">
            Eggs · 7 days
          </p>
          <MiniBarChart
            values={[86, 90, 88, 92, 91, 94, 93]}
            labels={["M", "T", "W", "T", "F", "S", "S"]}
            width={280}
            height={88}
          />
        </div>
        <NotificationToast title="Vaccination due in 2 days" body="House 2 · Newcastle schedule" />
      </div>
    </DeviceFrame>
  );
}

export function CucoCareSchedule() {
  return (
    <DeviceFrame variant="phone">
      <PhoneHeader title="Health schedule" subtitle="House 2" />
      <div className="flex min-h-0 flex-1 flex-col gap-3 px-3 pb-3">
        <div className="flex gap-1.5 overflow-hidden">
          {["12", "13", "14", "15", "16", "17", "18"].map((day, index) => (
            <div
              key={day}
              className={`flex h-14 w-10 flex-col items-center justify-center rounded-xl text-[12px] ${
                index === 2
                  ? "bg-[linear-gradient(135deg,var(--mk-cyan),var(--mk-blue))] text-white"
                  : "border border-[var(--mk-border)] text-[var(--mk-muted)]"
              }`}
            >
              <span>May</span>
              <span className="font-heading text-sm font-bold">{day}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Badge tone="cyan">House 2</Badge>
          <Badge>Layers</Badge>
        </div>
        <div className="space-y-2">
          {[
            ["Newcastle vaccine", "Due 14 May", true],
            ["Deworm", "Due 21 May", false],
            ["Feed audit", "Done 10 May", false],
            ["Weight sample", "Due 18 May", false],
          ].map(([label, meta, checked]) => (
            <div
              key={String(label)}
              className="flex items-center gap-3 rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] px-3 py-3"
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-md border text-[11px] ${
                  checked
                    ? "border-[var(--mk-cyan)] bg-[var(--mk-cyan)] text-[#041016]"
                    : "border-[var(--mk-border)]"
                }`}
              >
                {checked ? "✓" : ""}
              </span>
              <div>
                <p className="text-[13px] font-medium">{label}</p>
                <p className="text-[12px] text-[var(--mk-muted)]">{meta}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DeviceFrame>
  );
}

export function CucoCareAnalytics() {
  return (
    <DeviceFrame variant="browser" url="farm.cucocare.local">
      <AppShell
        product="CucoCare"
        nav={[
          { label: "Houses" },
          { label: "Analytics", active: true },
          { label: "Health" },
        ]}
        title="Farm analytics"
      >
        <div className="grid h-full grid-cols-12 gap-3">
          <div className="col-span-8 grid grid-rows-2 gap-3">
            <div className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-4">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">
                Feed conversion
              </p>
              <MiniLineChart values={[2.1, 2.05, 2.0, 1.98, 1.96, 1.94, 1.95]} width={640} height={120} />
            </div>
            <div className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-4">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">
                Eggs vs target
              </p>
              <MiniBarChart values={[88, 90, 86, 93, 91, 94, 92]} labels={["M", "T", "W", "T", "F", "S", "S"]} width={640} height={120} />
            </div>
          </div>
          <div className="col-span-4 flex flex-col gap-3">
            <StatCard label="Cost per tray" value="UGX 9,400" hint="House 2 this week" />
            <DataTable
              columns={["House", "Eggs", "FCR"]}
              rows={[
                ["1", "890", "1.98"],
                ["2", "940", "1.95"],
                ["3", "810", "2.04"],
              ]}
            />
          </div>
        </div>
      </AppShell>
    </DeviceFrame>
  );
}
