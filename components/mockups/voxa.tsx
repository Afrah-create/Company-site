import DeviceFrame from "@/components/mockups/DeviceFrame";
import {
  AppShell,
  Badge,
  PhoneHeader,
  PrimaryButton,
} from "@/components/mockups/primitives";

export function VoxaConversation() {
  return (
    <DeviceFrame variant="browser" url="app.voxa.local/thread">
      <AppShell
        product="Voxa AI"
        nav={[
          { label: "Threads", active: true },
          { label: "Languages" },
          { label: "Settings" },
        ]}
        title="Conversation"
        right={<Badge tone="cyan">English · Language B</Badge>}
      >
        <div className="grid h-full grid-cols-12 gap-3">
          <div className="col-span-6 flex flex-col rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-4">
            <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">English</p>
            <div className="mt-3 space-y-2 text-[13px] leading-6">
              <div className="rounded-2xl bg-[var(--mk-bg)] px-3 py-2">The clinic opens at eight.</div>
              <div className="rounded-2xl bg-[var(--mk-bg)] px-3 py-2">Can we keep the same seat?</div>
            </div>
          </div>
          <div className="col-span-6 flex flex-col rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-4">
            <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">
              Language B
            </p>
            <div className="mt-3 space-y-2 text-[13px] leading-6">
              <div className="rounded-2xl bg-[var(--mk-bg)] px-3 py-2">Sample translation</div>
              <div className="rounded-2xl bg-[var(--mk-bg)] px-3 py-2">Sample translation</div>
            </div>
          </div>
          <div className="col-span-12 flex items-center justify-between rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] px-4 py-3">
            <p className="text-[13px] text-[var(--mk-muted)]">Type or speak · sample thread</p>
            <div className="w-40">
              <PrimaryButton>Send</PrimaryButton>
            </div>
          </div>
        </div>
      </AppShell>
    </DeviceFrame>
  );
}

export function VoxaPhone() {
  return (
    <DeviceFrame variant="phone">
      <PhoneHeader title="Live chat" subtitle="English · Language B" />
      <div className="flex min-h-0 flex-1 flex-col gap-3 px-3 pb-3">
        <div className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-3">
          <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">You</p>
          <p className="mt-1 text-[13px] leading-6">The bus leaves at 06:00.</p>
        </div>
        <div className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-3">
          <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">
            Language B
          </p>
          <p className="mt-1 text-[13px] leading-6">Sample translation</p>
        </div>
        <div className="mt-auto rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-3">
          <p className="text-[12px] text-[var(--mk-muted)]">Hold to speak · or type below</p>
          <div className="mt-3">
            <PrimaryButton>Hold to speak</PrimaryButton>
          </div>
        </div>
      </div>
    </DeviceFrame>
  );
}

export function VoxaLanguages() {
  return (
    <DeviceFrame variant="browser" url="app.voxa.local/languages">
      <AppShell
        product="Voxa AI"
        nav={[
          { label: "Threads" },
          { label: "Languages", active: true },
        ]}
        title="Language pairs"
      >
        <div className="grid h-full grid-cols-3 gap-3">
          {[
            ["English", "Language B", "Active"],
            ["English", "Language C", "Sample"],
            ["Language B", "Language C", "Sample"],
          ].map(([from, to, state]) => (
            <div
              key={`${from}-${to}`}
              className="flex flex-col justify-between rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-4"
            >
              <div>
                <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">
                  Pair
                </p>
                <p className="mt-2 font-heading text-xl font-bold">{from}</p>
                <p className="text-[13px] text-[var(--mk-muted)]">to {to}</p>
              </div>
              <div className="mt-4">
                <Badge tone={state === "Active" ? "ok" : "cyan"}>{state}</Badge>
              </div>
            </div>
          ))}
        </div>
      </AppShell>
    </DeviceFrame>
  );
}
