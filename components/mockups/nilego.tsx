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

export function NileGoBooking() {
  return (
    <DeviceFrame variant="phone">
      <PhoneHeader title="NileGo" subtitle="Book a ride" />
      <div className="flex min-h-0 flex-1 flex-col px-3 pb-3">
        <MapPanel
          className="h-[280px]"
          route="M18 78 C 28 62, 36 58, 48 46 S 70 28, 82 18"
          pins={[
            { x: 18, y: 78, tone: "ok" },
            { x: 82, y: 18 },
          ]}
        />
        <div className="mt-3 rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-3">
          <div className="mb-3 grid grid-cols-2 gap-2">
            <div className="rounded-full bg-[linear-gradient(135deg,var(--mk-cyan),var(--mk-blue))] py-2 text-center text-[12px] font-semibold text-white">
              Boda Boda
            </div>
            <div className="rounded-full border border-[var(--mk-border)] py-2 text-center text-[12px] text-[var(--mk-muted)]">
              Car
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">
                Fare estimate
              </p>
              <p className="font-heading text-2xl font-bold">UGX 4,800</p>
            </div>
            <Badge tone="cyan">ETA 6 min</Badge>
          </div>
          <p className="mt-2 text-[12px] text-[var(--mk-muted)]">
            Pickup · Market Road · Destination · Town Hill
          </p>
          <div className="mt-3">
            <PrimaryButton>Confirm ride</PrimaryButton>
          </div>
        </div>
      </div>
    </DeviceFrame>
  );
}

export function NileGoTrip() {
  return (
    <DeviceFrame variant="phone">
      <PhoneHeader title="Trip in progress" subtitle="Route 12" />
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
            <Avatar initials="KA" />
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold">Rider KA</p>
              <p className="text-[12px] text-[var(--mk-muted)]">Boda Boda · 4.9</p>
            </div>
            <Badge tone="ok">En route</Badge>
          </div>
          <div className="mt-3">
            <div className="mb-1 flex justify-between text-[11px] text-[var(--mk-muted)]">
              <span>Pickup</span>
              <span>Destination</span>
            </div>
            <ProgressBar value={62} />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="rounded-full border border-[var(--mk-border)] py-2.5 text-center text-[12px] font-medium">
              Share trip
            </div>
            <div className="rounded-full border border-[var(--mk-border)] py-2.5 text-center text-[12px] font-medium">
              Call
            </div>
          </div>
        </div>
      </div>
    </DeviceFrame>
  );
}

export function NileGoDispatch() {
  return (
    <DeviceFrame variant="browser" url="dispatch.nilego.local">
      <AppShell
        product="NileGo"
        nav={[
          { label: "Live map", active: true },
          { label: "Trips" },
          { label: "Riders" },
          { label: "Reports" },
        ]}
        title="Dispatch"
      >
        <div className="grid h-full grid-cols-12 gap-3">
          <div className="col-span-8 flex flex-col gap-3">
            <div className="grid grid-cols-3 gap-3">
              <StatCard label="Active rides" value="24" hint="West Nile towns" />
              <StatCard label="Online riders" value="37" hint="Boda and car" />
              <StatCard label="Completed today" value="186" hint="Since 05:00" />
            </div>
            <MapPanel
              className="min-h-0 flex-1"
              route="M12 70 C 30 54, 48 40, 78 22"
              pins={[
                { x: 18, y: 66 },
                { x: 44, y: 42 },
                { x: 72, y: 28, tone: "ok" },
              ]}
              dots={[
                { x: 22, y: 30 },
                { x: 58, y: 62 },
                { x: 80, y: 48 },
                { x: 36, y: 78 },
              ]}
            />
          </div>
          <div className="col-span-4">
            <DataTable
              columns={["Trip", "Type", "Status"]}
              rows={[
                ["#1842", "Boda", <Badge key="a" tone="cyan">Live</Badge>],
                ["#1841", "Car", <Badge key="b" tone="ok">Done</Badge>],
                ["#1840", "Boda", <Badge key="c" tone="ok">Done</Badge>],
                ["#1839", "Car", <Badge key="d" tone="warn">Wait</Badge>],
                ["#1838", "Boda", <Badge key="e" tone="ok">Done</Badge>],
              ]}
            />
          </div>
        </div>
      </AppShell>
    </DeviceFrame>
  );
}
