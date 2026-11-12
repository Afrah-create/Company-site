import DeviceFrame from "@/components/mockups/DeviceFrame";
import {
  AppShell,
  Avatar,
  Badge,
  DataTable,
  MapPanel,
  PhoneHeader,
  PrimaryButton,
  ProgressBar,
  StatCard,
} from "@/components/mockups/primitives";

export function AfriResQReport() {
  return (
    <DeviceFrame variant="phone">
      <PhoneHeader title="AfriResQ" subtitle="Report an incident" />
      <div className="flex min-h-0 flex-1 flex-col px-3 pb-3">
        <MapPanel
          className="h-[220px]"
          pins={[{ x: 48, y: 52 }]}
        />
        <div className="mt-3 rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-3">
          <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">Type</p>
          <div className="mt-2 grid grid-cols-3 gap-2 text-center text-[11px]">
            <div className="rounded-full bg-[linear-gradient(135deg,var(--mk-cyan),var(--mk-blue))] py-2 font-semibold text-white">
              Medical
            </div>
            <div className="rounded-full border border-[var(--mk-border)] py-2 text-[var(--mk-muted)]">
              Fire
            </div>
            <div className="rounded-full border border-[var(--mk-border)] py-2 text-[var(--mk-muted)]">
              Security
            </div>
          </div>
          <p className="mt-3 text-[12px] text-[var(--mk-muted)]">
            Location · Market Road, sample pin
          </p>
          <div className="mt-3">
            <PrimaryButton>Send report</PrimaryButton>
          </div>
        </div>
      </div>
    </DeviceFrame>
  );
}

export function AfriResQAssigned() {
  return (
    <DeviceFrame variant="phone">
      <PhoneHeader title="Responder on the way" subtitle="Incident 1842" />
      <div className="flex min-h-0 flex-1 flex-col px-3 pb-3">
        <MapPanel
          className="h-[240px]"
          route="M22 76 C 40 60, 52 48, 78 24"
          pins={[
            { x: 22, y: 76, tone: "ok" },
            { x: 78, y: 24 },
          ]}
          dots={[{ x: 48, y: 50 }]}
        />
        <div className="mt-3 rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-3">
          <div className="flex items-center gap-3">
            <Avatar initials="RS" />
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold">Responder RS</p>
              <p className="text-[12px] text-[var(--mk-muted)]">Medical unit · 4.8</p>
            </div>
            <Badge tone="ok">En route</Badge>
          </div>
          <div className="mt-3">
            <div className="mb-1 flex justify-between text-[11px] text-[var(--mk-muted)]">
              <span>Dispatched</span>
              <span>On scene</span>
            </div>
            <ProgressBar value={54} />
          </div>
          <p className="mt-2 text-[12px] text-[var(--mk-muted)]">ETA 7 min · Sample data</p>
        </div>
      </div>
    </DeviceFrame>
  );
}

export function AfriResQDispatch() {
  return (
    <DeviceFrame variant="browser" url="dispatch.afriresq.local">
      <AppShell
        product="AfriResQ"
        nav={[
          { label: "Live map", active: true },
          { label: "Incidents" },
          { label: "Units" },
        ]}
        title="Dispatch"
      >
        <div className="grid h-full grid-cols-12 gap-3">
          <div className="col-span-8 flex flex-col gap-3">
            <div className="grid grid-cols-3 gap-3">
              <StatCard label="Open" value="9" hint="Needs a unit" />
              <StatCard label="En route" value="5" hint="Assigned" tone="ok" />
              <StatCard label="Closed today" value="31" hint="Since 05:00" />
            </div>
            <MapPanel
              className="min-h-0 flex-1"
              pins={[
                { x: 22, y: 64 },
                { x: 48, y: 38 },
                { x: 74, y: 28, tone: "ok" },
              ]}
              dots={[
                { x: 30, y: 22 },
                { x: 62, y: 70 },
                { x: 80, y: 48 },
              ]}
            />
          </div>
          <div className="col-span-4">
            <DataTable
              columns={["Case", "Type", "Status"]}
              rows={[
                ["#1842", "Medical", <Badge key="a" tone="cyan">Live</Badge>],
                ["#1841", "Fire", <Badge key="b" tone="ok">Closed</Badge>],
                ["#1840", "Security", <Badge key="c" tone="warn">Wait</Badge>],
                ["#1839", "Medical", <Badge key="d" tone="ok">Closed</Badge>],
                ["#1838", "Medical", <Badge key="e" tone="cyan">Live</Badge>],
              ]}
            />
          </div>
        </div>
      </AppShell>
    </DeviceFrame>
  );
}
