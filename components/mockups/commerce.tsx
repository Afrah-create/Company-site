import DeviceFrame from "@/components/mockups/DeviceFrame";
import {
  AppShell,
  Badge,
  DataTable,
  MiniBarChart,
  NotificationToast,
  PhoneHeader,
  PrimaryButton,
  StatCard,
} from "@/components/mockups/primitives";

const products = [
  ["Canvas tote", "UGX 45,000"],
  ["Desk lamp", "UGX 120,000"],
  ["Notebook set", "UGX 28,000"],
  ["Water bottle", "UGX 36,000"],
  ["Wool throw", "UGX 95,000"],
  ["Ceramic mug", "UGX 22,000"],
];

export function CommerceStorefront() {
  return (
    <DeviceFrame variant="browser" url="shop.store.local">
      <div className="flex h-full">
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex h-12 items-center justify-between border-b border-[var(--mk-border)] bg-[var(--mk-surface)] px-4">
            <p className="font-heading text-[14px] font-bold">Store</p>
            <div className="flex gap-2">
              <Badge>All</Badge>
              <Badge tone="cyan">Home</Badge>
              <Badge>Office</Badge>
            </div>
          </div>
          <div className="grid min-h-0 flex-1 grid-cols-3 gap-3 p-4">
            {products.map(([name, price]) => (
              <div
                key={name}
                className="flex flex-col rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-3"
              >
                <div className="h-24 rounded-xl bg-[linear-gradient(135deg,rgba(0,198,255,0.16),rgba(0,114,255,0.08))]" />
                <p className="mt-2 text-[13px] font-medium">{name}</p>
                <p className="text-[12px] text-[var(--mk-muted)]">{price}</p>
              </div>
            ))}
          </div>
        </div>
        <aside className="flex w-[280px] shrink-0 flex-col border-l border-[var(--mk-border)] bg-[var(--mk-surface)] p-4">
          <p className="font-heading text-[14px] font-bold">Cart</p>
          <ul className="mt-3 flex-1 space-y-3 text-[13px]">
            <li className="flex justify-between">
              <span>Canvas tote × 1</span>
              <span>UGX 45,000</span>
            </li>
            <li className="flex justify-between">
              <span>Ceramic mug × 2</span>
              <span>UGX 44,000</span>
            </li>
          </ul>
          <div className="border-t border-[var(--mk-border)] pt-3">
            <div className="mb-3 flex justify-between text-[13px]">
              <span className="text-[var(--mk-muted)]">Total</span>
              <span className="font-heading font-bold">UGX 89,000</span>
            </div>
            <PrimaryButton>Checkout</PrimaryButton>
          </div>
        </aside>
      </div>
    </DeviceFrame>
  );
}

export function CommerceCheckout() {
  return (
    <DeviceFrame variant="phone">
      <PhoneHeader title="Checkout" subtitle="Order #2041" />
      <div className="flex min-h-0 flex-1 flex-col gap-3 px-3 pb-3">
        <div className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-3">
          <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">
            Order summary
          </p>
          <div className="mt-2 space-y-1.5 text-[13px]">
            <div className="flex justify-between">
              <span>Canvas tote</span>
              <span>UGX 45,000</span>
            </div>
            <div className="flex justify-between">
              <span>Ceramic mug × 2</span>
              <span>UGX 44,000</span>
            </div>
            <div className="flex justify-between border-t border-[var(--mk-border)] pt-2 font-heading font-bold">
              <span>Total</span>
              <span>UGX 89,000</span>
            </div>
          </div>
        </div>
        <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">Pay with</p>
        <div className="rounded-2xl border border-[var(--mk-cyan)] bg-[color-mix(in_srgb,var(--mk-cyan)_10%,transparent)] px-3 py-3 text-[13px] font-medium">
          Mobile money
        </div>
        <div className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] px-3 py-3 text-[13px]">
          Card
        </div>
        <div className="mt-auto">
          <PrimaryButton>Pay UGX 89,000</PrimaryButton>
        </div>
      </div>
    </DeviceFrame>
  );
}

export function CommerceSeller() {
  return (
    <DeviceFrame variant="browser" url="seller.store.local">
      <AppShell
        product="Seller"
        nav={[
          { label: "Sales", active: true },
          { label: "Orders" },
          { label: "Stock" },
        ]}
        title="Seller dashboard"
      >
        <div className="grid h-full grid-cols-12 gap-3">
          <div className="col-span-8 flex flex-col gap-3">
            <div className="grid grid-cols-3 gap-3">
              <StatCard label="Today" value="UGX 1.2m" />
              <StatCard label="Orders" value="34" />
              <StatCard label="Open carts" value="9" />
            </div>
            <div className="flex-1 rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-4">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">
                Sales · 7 days
              </p>
              <MiniBarChart values={[12, 18, 14, 22, 19, 28, 24]} width={620} height={160} />
            </div>
          </div>
          <div className="col-span-4 flex flex-col gap-3">
            <NotificationToast title="Low stock" body="Ceramic mug · 6 left" />
            <DataTable
              columns={["Order", "Total", ""]}
              rows={[
                ["#2041", "89k", <Badge key="a" tone="cyan">New</Badge>],
                ["#2040", "45k", <Badge key="b" tone="ok">Paid</Badge>],
                ["#2039", "120k", <Badge key="c" tone="ok">Paid</Badge>],
                ["#2038", "28k", <Badge key="d" tone="warn">Hold</Badge>],
              ]}
            />
          </div>
        </div>
      </AppShell>
    </DeviceFrame>
  );
}
