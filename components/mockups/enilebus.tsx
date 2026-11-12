import DeviceFrame from "@/components/mockups/DeviceFrame";
import {
  AppShell,
  Badge,
  DataTable,
  PhoneHeader,
  PrimaryButton,
  StatCard,
} from "@/components/mockups/primitives";

const seats = [
  ["1", "2", "aisle", "3", "4"],
  ["5", "6", "aisle", "7", "8"],
  ["9", "10", "aisle", "11", "12"],
  ["13", "14", "aisle", "15", "16"],
  ["17", "18", "aisle", "19", "20"],
];

export function NileBusSeats() {
  return (
    <DeviceFrame variant="phone">
      <PhoneHeader title="e-NileBus" subtitle="Route 12 · 06:00" />
      <div className="flex min-h-0 flex-1 flex-col gap-3 px-3 pb-3">
        <div className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-3">
          <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">Trip</p>
          <p className="mt-1 text-[14px] font-semibold">Town A → Town B</p>
          <p className="text-[12px] text-[var(--mk-muted)]">Coach 2 · 12 May</p>
        </div>
        <div className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-3">
          <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">Seats</p>
          <div className="mt-3 space-y-2">
            {seats.map((row, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-5 gap-1.5">
                {row.map((seat, seatIndex) =>
                  seat === "aisle" ? (
                    <span key={`${rowIndex}-${seatIndex}`} />
                  ) : (
                    <span
                      key={seat}
                      className={`flex h-8 items-center justify-center rounded-lg text-[11px] font-semibold ${
                        seat === "12"
                          ? "bg-[linear-gradient(135deg,var(--mk-cyan),var(--mk-blue))] text-white"
                          : Number(seat) < 8
                            ? "border border-[var(--mk-border)] text-[var(--mk-muted)] opacity-50"
                            : "border border-[var(--mk-border)]"
                      }`}
                    >
                      {seat}
                    </span>
                  ),
                )}
              </div>
            ))}
          </div>
          <p className="mt-3 text-[12px] text-[var(--mk-muted)]">Selected · Seat 12</p>
        </div>
        <div className="mt-auto">
          <PrimaryButton>Continue to pay</PrimaryButton>
        </div>
      </div>
    </DeviceFrame>
  );
}

export function NileBusTicket() {
  return (
    <DeviceFrame variant="phone">
      <PhoneHeader title="Ticket" subtitle="Pay and keep" />
      <div className="flex min-h-0 flex-1 flex-col gap-3 px-3 pb-3">
        <div className="rounded-2xl bg-[linear-gradient(135deg,var(--mk-cyan),var(--mk-blue))] p-4 text-white">
          <p className="text-[11px] uppercase tracking-[0.14em] opacity-80">Seat 12</p>
          <p className="mt-1 font-heading text-[1.65rem] font-bold">UGX 35,000</p>
          <p className="mt-2 text-[12px] opacity-90">Town A → Town B · 06:00</p>
        </div>
        <div className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-3">
          <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">Pay with</p>
          <div className="mt-2 grid grid-cols-2 gap-2 text-center text-[12px]">
            <div className="rounded-full bg-[linear-gradient(135deg,var(--mk-cyan),var(--mk-blue))] py-2 font-semibold text-white">
              Mobile money
            </div>
            <div className="rounded-full border border-[var(--mk-border)] py-2 text-[var(--mk-muted)]">
              Card
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-3 text-[13px]">
          <p>Passenger · Person A</p>
          <p className="text-[var(--mk-muted)]">Ticket stays on this phone</p>
        </div>
        <div className="mt-auto">
          <PrimaryButton>Confirm payment</PrimaryButton>
        </div>
      </div>
    </DeviceFrame>
  );
}

export function NileBusOperator() {
  return (
    <DeviceFrame variant="browser" url="ops.enilebus.local">
      <AppShell
        product="e-NileBus"
        nav={[
          { label: "Trips", active: true },
          { label: "Seats" },
          { label: "Payments" },
        ]}
        title="Operator trips"
      >
        <div className="grid h-full grid-cols-12 gap-3">
          <div className="col-span-4 grid grid-rows-3 gap-3">
            <StatCard label="Today" value="14" hint="Trips on the board" />
            <StatCard label="Seats held" value="186" hint="Reserved, not yet paid" />
            <StatCard label="Paid" value="UGX 4.8m" hint="Since 05:00" tone="ok" />
          </div>
          <div className="col-span-8">
            <DataTable
              columns={["Trip", "Route", "Seats", "Status"]}
              rows={[
                ["06:00", "Town A → Town B", "38 / 40", <Badge key="a" tone="ok">Open</Badge>],
                ["08:30", "Town B → Town A", "21 / 40", <Badge key="b" tone="cyan">Boarding</Badge>],
                ["12:00", "Town A → Town C", "40 / 40", <Badge key="c" tone="warn">Full</Badge>],
                ["15:30", "Town C → Town A", "12 / 40", <Badge key="d">Open</Badge>],
                ["18:00", "Town A → Town B", "9 / 40", <Badge key="e">Open</Badge>],
              ]}
            />
          </div>
        </div>
      </AppShell>
    </DeviceFrame>
  );
}
