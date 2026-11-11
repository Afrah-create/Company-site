import DeviceFrame from "@/components/mockups/DeviceFrame";
import {
  AppShell,
  Badge,
  DataTable,
  DonutChart,
  MiniLineChart,
  ProgressBar,
  StatCard,
  Timeline,
} from "@/components/mockups/primitives";

export function HospitalOverview() {
  return (
    <DeviceFrame variant="browser" url="ward.hospital.local">
      <AppShell
        product="HMS"
        nav={[
          { label: "Reception", active: true },
          { label: "Patients" },
          { label: "Pharmacy" },
          { label: "Billing" },
        ]}
        title="Reception"
      >
        <div className="grid h-full grid-cols-12 gap-3">
          <div className="col-span-4 flex flex-col items-center justify-center rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-4">
            <DonutChart
              segments={[
                { value: 72, color: "#00c6ff" },
                { value: 28, color: "#1a1a1a" },
              ]}
              center={
                <>
                  <p className="font-heading text-xl font-bold">72%</p>
                  <p className="text-[11px] text-[var(--mk-muted)]">Beds</p>
                </>
              }
            />
            <p className="mt-2 text-[12px] text-[var(--mk-muted)]">36 of 50 occupied</p>
          </div>
          <div className="col-span-8 rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-4">
            <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">
              Appointments today
            </p>
            <div className="mt-3">
              <Timeline
                items={[
                  { title: "Patient 0142 · OPD", meta: "08:30 · Dr. A", active: true },
                  { title: "Patient 0148 · Labs", meta: "09:15 · Sample desk" },
                  { title: "Patient 0151 · Review", meta: "10:00 · Clinic 2" },
                  { title: "Patient 0156 · Pharmacy", meta: "10:40 · Dispense" },
                ]}
              />
            </div>
          </div>
          <div className="col-span-8">
            <DataTable
              columns={["Queue", "Patient", "Dept", "Wait"]}
              rows={[
                ["01", "Patient 0142", "OPD", <Badge key="1" tone="ok">Now</Badge>],
                ["02", "Patient 0148", "Labs", <Badge key="2" tone="cyan">12 min</Badge>],
                ["03", "Patient 0151", "Clinic 2", <Badge key="3">28 min</Badge>],
                ["04", "Patient 0156", "Pharmacy", <Badge key="4" tone="warn">36 min</Badge>],
              ]}
            />
          </div>
          <div className="col-span-4 space-y-3 rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-4">
            <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">
              Department load
            </p>
            {[
              ["OPD", 78],
              ["Wards", 72],
              ["Labs", 54],
              ["Pharmacy", 41],
            ].map(([label, value]) => (
              <div key={String(label)}>
                <div className="mb-1 flex justify-between text-[12px]">
                  <span>{label}</span>
                  <span className="text-[var(--mk-muted)]">{value}%</span>
                </div>
                <ProgressBar value={Number(value)} />
              </div>
            ))}
          </div>
        </div>
      </AppShell>
    </DeviceFrame>
  );
}

export function HospitalRecord() {
  return (
    <DeviceFrame variant="browser" url="ward.hospital.local/patients/0142">
      <AppShell
        product="HMS"
        nav={[{ label: "Patients", active: true }, { label: "Billing" }]}
        title="Patient record"
      >
        <div className="flex h-full flex-col gap-3">
          <div className="flex items-center justify-between rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] px-4 py-3">
            <div>
              <p className="font-heading text-lg font-bold">Patient 0142</p>
              <p className="text-[12px] text-[var(--mk-muted)]">32 yrs · Female · OPD</p>
            </div>
            <div className="flex gap-2">
              {["Overview", "Visits", "Labs", "Prescriptions", "Billing"].map((tab, index) => (
                <Badge key={tab} tone={index === 0 ? "cyan" : "neutral"}>
                  {tab}
                </Badge>
              ))}
            </div>
          </div>
          <div className="grid flex-1 grid-cols-3 gap-3">
            {[
              { label: "Heart rate", value: "78", unit: "bpm", series: [72, 74, 76, 75, 78, 77, 78] },
              { label: "Temp", value: "36.8", unit: "°C", series: [36.6, 36.7, 36.8, 36.7, 36.8] },
              { label: "BP", value: "118/76", unit: "mmHg", series: [120, 118, 119, 117, 118] },
            ].map((card) => (
              <div key={card.label} className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-4">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">
                  {card.label}
                </p>
                <p className="mt-1 font-heading text-2xl font-bold">
                  {card.value} <span className="text-sm text-[var(--mk-muted)]">{card.unit}</span>
                </p>
                <div className="mt-2">
                  <MiniLineChart values={card.series} width={220} height={56} />
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-4">
            <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">
              Visit history
            </p>
            <div className="mt-2">
              <Timeline
                items={[
                  { title: "OPD review", meta: "12 May · Dr. A", active: true },
                  { title: "Lab panel", meta: "12 May · Sample desk" },
                  { title: "Previous visit", meta: "03 Mar · Clinic 1" },
                ]}
              />
            </div>
          </div>
        </div>
      </AppShell>
    </DeviceFrame>
  );
}

export function HospitalPharmacy() {
  return (
    <DeviceFrame variant="browser" url="ward.hospital.local/pharmacy">
      <AppShell
        product="HMS"
        nav={[{ label: "Reception" }, { label: "Pharmacy", active: true }]}
        title="Pharmacy stock"
      >
        <div className="grid h-full grid-cols-12 gap-3">
          <div className="col-span-8">
            <DataTable
              columns={["Item", "On hand", "Status", ""]}
              rows={[
                ["Amoxicillin 500mg", "42 packs", <Badge key="a" tone="ok">OK</Badge>, "Reorder"],
                ["ORS sachets", "18 boxes", <Badge key="b" tone="warn">Low</Badge>, "Reorder"],
                ["Paracetamol 500mg", "9 packs", <Badge key="c" tone="bad">Low</Badge>, "Reorder"],
                ["Gloves M", "120 boxes", <Badge key="d" tone="ok">OK</Badge>, "Reorder"],
                ["Ibuprofen 400mg", "27 packs", <Badge key="e" tone="ok">OK</Badge>, "Reorder"],
              ]}
            />
          </div>
          <div className="col-span-4 space-y-3">
            <StatCard label="SKUs below min" value="6" tone="warn" hint="Needs purchase order" />
            <div className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-4">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">
                Expiry soon
              </p>
              <ul className="mt-2 space-y-2 text-[13px]">
                <li>Insulin vial · 18 days</li>
                <li>Eye drops · 22 days</li>
                <li>Antacid syrup · 31 days</li>
              </ul>
            </div>
          </div>
        </div>
      </AppShell>
    </DeviceFrame>
  );
}
