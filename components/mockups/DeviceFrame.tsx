import type { ReactNode } from "react";

type DeviceFrameProps = {
  variant: "browser" | "phone" | "laptop";
  url?: string;
  children: ReactNode;
  className?: string;
};

function BrowserChrome({ url = "app.slim.local" }: { url?: string }) {
  return (
    <div className="flex h-10 shrink-0 items-center gap-3 border-b border-[var(--mk-border)] bg-[var(--mk-chrome)] px-3">
      <div className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      </div>
      <div className="mx-auto flex h-6 w-[min(52%,22rem)] items-center justify-center rounded-full border border-[var(--mk-border)] bg-[var(--mk-surface)] px-3 text-[11px] text-[var(--mk-muted)]">
        {url}
      </div>
    </div>
  );
}

function PhoneStatusBar() {
  return (
    <div className="relative flex h-7 shrink-0 items-center justify-between px-5 text-[10px] font-medium text-[var(--mk-text)]">
      <span>9:41</span>
      <span className="absolute left-1/2 top-1.5 h-4 w-20 -translate-x-1/2 rounded-full bg-black/80" />
      <span className="flex items-center gap-1">
        <span className="inline-block h-2 w-3 rounded-[1px] border border-current opacity-80" />
        <span className="inline-block h-2.5 w-4 rounded-sm border border-current">
          <span className="ml-px mt-px block h-1.5 w-2.5 bg-current" />
        </span>
      </span>
    </div>
  );
}

export default function DeviceFrame({
  variant,
  url,
  children,
  className = "",
}: DeviceFrameProps) {
  if (variant === "phone") {
    return (
      <div
        className={`relative flex h-[760px] w-[352px] flex-col overflow-hidden rounded-[2.4rem] border-[10px] border-[var(--mk-bezel)] bg-[var(--mk-bg)] shadow-[0_24px_80px_-24px_rgba(0,198,255,0.28)] ${className}`.trim()}
      >
        <PhoneStatusBar />
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-[var(--mk-bg)] text-[var(--mk-text)]">
          {children}
        </div>
        <div className="flex h-5 shrink-0 items-center justify-center">
          <span className="mb-1 h-1 w-24 rounded-full bg-[var(--mk-muted)]/40" />
        </div>
      </div>
    );
  }

  const screen = (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-[var(--mk-bg)] text-[var(--mk-text)]">
      <BrowserChrome url={url} />
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">{children}</div>
    </div>
  );

  if (variant === "laptop") {
    return (
      <div className={`flex flex-col items-center ${className}`.trim()}>
        <div className="flex h-[620px] w-[1080px] flex-col overflow-hidden rounded-t-xl border border-[var(--mk-border)] bg-[var(--mk-bg)] shadow-[0_24px_80px_-24px_rgba(0,198,255,0.28)]">
          {screen}
        </div>
        <div className="h-3 w-[1120px] rounded-b-xl bg-gradient-to-b from-[#2a2a2e] to-[#121214]" />
        <div className="h-1.5 w-40 rounded-b-md bg-[#1a1a1c]" />
      </div>
    );
  }

  return (
    <div
      className={`flex h-[720px] w-[1240px] flex-col overflow-hidden rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-bg)] shadow-[0_24px_80px_-24px_rgba(0,198,255,0.28)] ${className}`.trim()}
    >
      {screen}
    </div>
  );
}
