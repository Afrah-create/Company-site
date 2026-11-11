import DeviceFrame from "@/components/mockups/DeviceFrame";
import {
  AppShell,
  Badge,
  DataTable,
  PhoneHeader,
  PrimaryButton,
  StatCard,
} from "@/components/mockups/primitives";

export function BankingPair() {
  return (
    <>
      <DeviceFrame variant="phone">
        <PhoneHeader title="Home" subtitle="Account · 0142" />
        <div className="flex min-h-0 flex-1 flex-col gap-3 px-3 pb-3">
          <div className="rounded-2xl bg-[linear-gradient(135deg,var(--mk-cyan),var(--mk-blue))] p-4 text-white">
            <p className="text-[11px] uppercase tracking-[0.14em] opacity-80">Available</p>
            <p className="mt-1 font-heading text-[1.85rem] font-bold">UGX 2,480,000</p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
            {["Send", "Airtime", "Statement"].map((action) => (
              <div key={action} className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] py-3">
                {action}
              </div>
            ))}
          </div>
          <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">Recent</p>
          <div className="space-y-2 text-[13px]">
            {[
              ["Shop 12", "− 24,000"],
              ["Salary", "+ 1,200,000"],
              ["Transfer in", "+ 80,000"],
            ].map(([label, amount]) => (
              <div
                key={label}
                className="flex justify-between rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] px-3 py-2.5"
              >
                <span>{label}</span>
                <span className="font-medium">{amount}</span>
              </div>
            ))}
          </div>
        </div>
      </DeviceFrame>
      <DeviceFrame variant="phone">
        <PhoneHeader title="Send money" subtitle="To a saved person" />
        <div className="flex min-h-0 flex-1 flex-col gap-3 px-3 pb-3">
          <div className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-3">
            <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">To</p>
            <p className="mt-1 text-[14px] font-semibold">Person B · **** 4412</p>
          </div>
          <div className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-3">
            <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">Amount</p>
            <p className="mt-1 font-heading text-3xl font-bold">UGX 75,000</p>
          </div>
          <div className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-3 text-[13px] text-[var(--mk-muted)]">
            Note · School fees
          </div>
          <div className="mt-auto">
            <PrimaryButton>Review and send</PrimaryButton>
          </div>
        </div>
      </DeviceFrame>
    </>
  );
}

export function BankingSecurity() {
  return (
    <DeviceFrame variant="phone">
      <PhoneHeader title="Security" subtitle="This device" />
      <div className="flex min-h-0 flex-1 flex-col gap-3 px-3 pb-3">
        <div className="flex items-center justify-between rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] px-3 py-3">
          <div>
            <p className="text-[13px] font-medium">Biometric unlock</p>
            <p className="text-[12px] text-[var(--mk-muted)]">Face or fingerprint</p>
          </div>
          <span className="h-6 w-11 rounded-full bg-[linear-gradient(135deg,var(--mk-cyan),var(--mk-blue))] p-0.5">
            <span className="ml-auto block h-5 w-5 rounded-full bg-white" />
          </span>
        </div>
        <div className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-3">
          <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">Devices</p>
          <ul className="mt-2 space-y-2 text-[13px]">
            <li className="flex justify-between">
              <span>Phone 1</span>
              <Badge tone="ok">This</Badge>
            </li>
            <li className="flex justify-between">
              <span>Tablet 1</span>
              <Badge>Signed in</Badge>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-3">
          <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">
            Daily send limit
          </p>
          <p className="mt-1 font-heading text-2xl font-bold">UGX 2,000,000</p>
        </div>
      </div>
    </DeviceFrame>
  );
}

export function BankingAdmin() {
  return (
    <DeviceFrame variant="browser" url="ops.bank.local">
      <AppShell
        product="Ops"
        nav={[
          { label: "Monitor", active: true },
          { label: "Limits" },
          { label: "Devices" },
        ]}
        title="Transaction monitoring"
      >
        <div className="grid h-full grid-cols-12 gap-3">
          <div className="col-span-8">
            <DataTable
              columns={["Ref", "Amount", "Flag"]}
              rows={[
                ["TX-8831", "UGX 75,000", <Badge key="a">Clear</Badge>],
                ["TX-8830", "UGX 1,900,000", <Badge key="b" tone="warn">Review</Badge>],
                ["TX-8829", "UGX 12,000", <Badge key="c" tone="ok">Clear</Badge>],
                ["TX-8828", "UGX 2,400,000", <Badge key="d" tone="bad">Held</Badge>],
                ["TX-8827", "UGX 80,000", <Badge key="e" tone="ok">Clear</Badge>],
              ]}
            />
          </div>
          <div className="col-span-4 flex flex-col gap-3">
            <StatCard label="Held now" value="3" tone="bad" hint="Needs an operator" />
            <div className="flex-1 rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-4">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">
                Flagged
              </p>
              <p className="mt-2 text-[13px] leading-6">
                TX-8828 is above the usual send pattern for this account. Confirm with the branch
                before release.
              </p>
              <div className="mt-3 flex gap-2">
                <Badge tone="ok">Release</Badge>
                <Badge tone="bad">Keep hold</Badge>
              </div>
            </div>
          </div>
        </div>
      </AppShell>
    </DeviceFrame>
  );
}
