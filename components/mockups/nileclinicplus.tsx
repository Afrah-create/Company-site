import DeviceFrame from "@/components/mockups/DeviceFrame";
import {
  AppShell,
  Badge,
  DataTable,
  PhoneHeader,
  PrimaryButton,
  StatCard,
  Timeline,
} from "@/components/mockups/primitives";

export function NileClinicDesk() {
  return (
    <DeviceFrame variant="browser" url="desk.nileclinicplus.local">
      <AppShell
        product="NileClinicPlus"
        nav={[
          { label: "Front desk", active: true },
          { label: "Patients" },
          { label: "Pharmacy" },
          { label: "Billing" },
        ]}
        title="Front desk"
      >
        <div className="grid h-full grid-cols-12 gap-3">
          <div className="col-span-4 grid grid-rows-3 gap-3">
            <StatCard label="Waiting" value="7" hint="OPD queue" />
            <StatCard label="In consult" value="3" hint="Rooms 1 to 3" tone="ok" />
            <StatCard label="Billed today" value="UGX 1.2m" hint="Cash and mobile money" />
          </div>
          <div className="col-span-8 flex flex-col gap-3">
            <div className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-4">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">
                Rooms
              </p>
              <div className="mt-3">
                <Timeline
                  items={[
                    { title: "Room 1 · Patient 0142", meta: "Consultation", active: true },
                    { title: "Room 2 · Patient 0148", meta: "Review" },
                    { title: "Room 3 · Free", meta: "Next in 8 min" },
                  ]}
                />
              </div>
            </div>
            <DataTable
              columns={["Queue", "Patient", "Reason", "Wait"]}
              rows={[
                ["01", "Patient 0142", "Review", <Badge key="1" tone="ok">In room</Badge>],
                ["02", "Patient 0148", "Fever", <Badge key="2" tone="cyan">Now</Badge>],
                ["03", "Patient 0151", "Dressing", <Badge key="3">12 min</Badge>],
                ["04", "Patient 0156", "New file", <Badge key="4" tone="warn">18 min</Badge>],
              ]}
            />
          </div>
        </div>
      </AppShell>
    </DeviceFrame>
  );
}

export function NileClinicConsult() {
  return (
    <DeviceFrame variant="browser" url="desk.nileclinicplus.local/visits/0142">
      <AppShell
        product="NileClinicPlus"
        nav={[{ label: "Patients", active: true }, { label: "Billing" }]}
        title="Consultation"
      >
        <div className="flex h-full flex-col gap-3">
          <div className="flex items-center justify-between rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] px-4 py-3">
            <div>
              <p className="font-heading text-lg font-bold">Patient 0142</p>
              <p className="text-[12px] text-[var(--mk-muted)]">Visit 88 · OPD · Dr. A</p>
            </div>
            <div className="flex gap-2">
              <Badge tone="cyan">Open</Badge>
              <Badge>Cash</Badge>
            </div>
          </div>
          <div className="grid flex-1 grid-cols-12 gap-3">
            <div className="col-span-4 space-y-3">
              {[
                ["Temp", "37.1 °C"],
                ["BP", "122/78"],
                ["Weight", "64 kg"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-4"
                >
                  <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">
                    {label}
                  </p>
                  <p className="mt-1 font-heading text-xl font-bold">{value}</p>
                </div>
              ))}
            </div>
            <div className="col-span-8 flex flex-col gap-3">
              <div className="flex-1 rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-4">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">
                  Notes
                </p>
                <p className="mt-2 text-[13px] leading-6">
                  Review visit. Cough for three days. No fever now. Advise fluids and rest. Return
                  if it worsens.
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-4">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">
                  Prescription
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge tone="cyan">Paracetamol 500mg</Badge>
                  <Badge>ORS</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppShell>
    </DeviceFrame>
  );
}

export function NileClinicPhone() {
  return (
    <DeviceFrame variant="phone">
      <PhoneHeader title="Next visit" subtitle="Patient 0142" />
      <div className="flex min-h-0 flex-1 flex-col gap-3 px-3 pb-3">
        <div className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-3">
          <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">When</p>
          <p className="mt-1 font-heading text-2xl font-bold">Thu · 10:30</p>
          <p className="text-[12px] text-[var(--mk-muted)]">Room 2 · Dr. A</p>
        </div>
        <div className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-3">
          <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">Last visit</p>
          <p className="mt-1 text-[13px]">OPD review · 12 May</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <Badge tone="ok">Billed</Badge>
            <Badge>Prescription given</Badge>
          </div>
        </div>
        <div className="mt-auto">
          <PrimaryButton>Confirm attendance</PrimaryButton>
        </div>
      </div>
    </DeviceFrame>
  );
}
