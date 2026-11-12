import DeviceFrame from "@/components/mockups/DeviceFrame";
import {
  AppShell,
  Badge,
  DataTable,
  PhoneHeader,
  PrimaryButton,
  ProgressBar,
  StatCard,
} from "@/components/mockups/primitives";

export function CyberSaccoHome() {
  return (
    <>
      <DeviceFrame variant="phone">
        <PhoneHeader title="CyberSacco" subtitle="Member · 0142" />
        <div className="flex min-h-0 flex-1 flex-col gap-3 px-3 pb-3">
          <div className="rounded-2xl bg-[linear-gradient(135deg,var(--mk-cyan),var(--mk-blue))] p-4 text-white">
            <p className="text-[11px] uppercase tracking-[0.14em] opacity-80">Savings</p>
            <p className="mt-1 font-heading text-[1.85rem] font-bold">UGX 2,480,000</p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
            {["Shares", "Save", "Loan"].map((action) => (
              <div key={action} className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] py-3">
                {action}
              </div>
            ))}
          </div>
          <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">Recent</p>
          <div className="space-y-2 text-[13px]">
            {[
              ["Share purchase", "+ 50,000"],
              ["Loan repayment", "− 120,000"],
              ["Deposit", "+ 80,000"],
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
        <PhoneHeader title="Send to member" subtitle="Same Sacco" />
        <div className="flex min-h-0 flex-1 flex-col gap-3 px-3 pb-3">
          <div className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-3">
            <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">To</p>
            <p className="mt-1 text-[14px] font-semibold">Member B · 0188</p>
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

export function CyberSaccoLoan() {
  return (
    <DeviceFrame variant="phone">
      <PhoneHeader title="Loan" subtitle="Application 22" />
      <div className="flex min-h-0 flex-1 flex-col gap-3 px-3 pb-3">
        <div className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-3">
          <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">Amount</p>
          <p className="mt-1 font-heading text-2xl font-bold">UGX 1,200,000</p>
          <div className="mt-2">
            <Badge tone="cyan">In review</Badge>
          </div>
        </div>
        <div className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-3">
          <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">
            Repaid so far
          </p>
          <p className="mt-1 text-[13px]">UGX 240,000 of 1,200,000</p>
          <div className="mt-2">
            <ProgressBar value={20} />
          </div>
        </div>
        <div className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-3 text-[13px]">
          <p>Next instalment · UGX 80,000</p>
          <p className="text-[var(--mk-muted)]">Due 15 Jun</p>
        </div>
      </div>
    </DeviceFrame>
  );
}

export function CyberSaccoOffice() {
  return (
    <DeviceFrame variant="browser" url="office.cybersacco.local">
      <AppShell
        product="CyberSacco"
        nav={[
          { label: "Ledger", active: true },
          { label: "Loans" },
          { label: "Members" },
        ]}
        title="Office ledger"
      >
        <div className="grid h-full grid-cols-12 gap-3">
          <div className="col-span-8">
            <DataTable
              columns={["Member", "Type", "Amount", "Status"]}
              rows={[
                ["0142", "Deposit", "UGX 80,000", <Badge key="a" tone="ok">Posted</Badge>],
                ["0188", "Loan", "UGX 1,200,000", <Badge key="b" tone="cyan">Review</Badge>],
                ["0142", "Repayment", "UGX 80,000", <Badge key="c" tone="ok">Posted</Badge>],
                ["0210", "Shares", "UGX 50,000", <Badge key="d" tone="ok">Posted</Badge>],
                ["0164", "Transfer", "UGX 75,000", <Badge key="e" tone="warn">Hold</Badge>],
              ]}
            />
          </div>
          <div className="col-span-4 flex flex-col gap-3">
            <StatCard label="Open loans" value="14" hint="In review or active" />
            <div className="flex-1 rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-4">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">
                Selected
              </p>
              <p className="mt-2 text-[13px] leading-6">
                Member 0188 loan is in review. Shares and savings sit on the same ledger as this
                application.
              </p>
              <div className="mt-3 flex gap-2">
                <Badge tone="ok">Approve</Badge>
                <Badge>Ask for more</Badge>
              </div>
            </div>
          </div>
        </div>
      </AppShell>
    </DeviceFrame>
  );
}
