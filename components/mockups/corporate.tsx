import DeviceFrame from "@/components/mockups/DeviceFrame";
import { Badge, PrimaryButton } from "@/components/mockups/primitives";

function ClutterSite() {
  return (
    <div className="h-full overflow-hidden bg-[#d9dde3] p-3 text-[#222]">
      <div className="mb-2 flex items-center justify-between bg-[#4b5563] px-2 py-1 text-[10px] text-white">
        <span>COMPANY LTD WELCOME!!!!</span>
        <span>Home | About | Blog | News | Contact | Login | Sitemap</span>
      </div>
      <div className="mb-2 h-16 bg-[#9aa3ad] text-center text-[11px] leading-[4rem] text-white">
        BANNER IMAGE PLACEHOLDER
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-2 space-y-1 bg-white p-2 text-[10px] leading-4">
          <p className="font-bold underline">Welcome to our website</p>
          <p>
            We are a leading company offering many services to clients around the region and the
            world with excellence quality and more text that wraps poorly across this old layout.
          </p>
          <p className="text-blue-700 underline">Click here Click here Click here</p>
        </div>
        <div className="space-y-1 bg-[#eceff2] p-2 text-[10px]">
          <p className="font-bold">News</p>
          <p>Meeting on Friday</p>
          <p>New intern</p>
          <p>Holiday notice</p>
        </div>
      </div>
    </div>
  );
}

function ModernSite({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex h-full flex-col bg-[#0a0a0a] text-white">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <span className="font-heading text-[12px] font-bold">
          Slim<span className="text-[#00c6ff]">Cyber</span>Tech
        </span>
        {!compact ? (
          <div className="flex gap-3 text-[11px] text-white/60">
            <span>Work</span>
            <span>About</span>
            <span className="text-[#00c6ff]">Contact</span>
          </div>
        ) : (
          <span className="text-[11px] text-white/50">Menu</span>
        )}
      </div>
      <div className="flex flex-1 flex-col justify-center px-5">
        <p className="text-[10px] uppercase tracking-[0.18em] text-[#00c6ff]">From West Nile</p>
        <p className={`mt-2 font-heading font-bold leading-tight ${compact ? "text-lg" : "text-3xl"}`}>
          Software you can keep running.
        </p>
        {!compact ? (
          <p className="mt-2 max-w-sm text-[12px] text-white/55">
            Web, mobile, and security work from Arua, for organisations that need a team after launch.
          </p>
        ) : null}
        <div className="mt-4 w-32">
          <PrimaryButton>Get in touch</PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export function CorporateBeforeAfter() {
  return (
    <DeviceFrame variant="browser" url="redesign.studio.local">
      <div className="grid h-full grid-cols-2">
        <div className="flex flex-col border-r border-[var(--mk-border)]">
          <div className="border-b border-[var(--mk-border)] px-3 py-2 text-[11px] uppercase tracking-[0.14em] text-[var(--mk-muted)]">
            Before
          </div>
          <div className="min-h-0 flex-1">
            <ClutterSite />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="border-b border-[var(--mk-border)] px-3 py-2 text-[11px] uppercase tracking-[0.14em] text-[var(--mk-cyan)]">
            After
          </div>
          <div className="min-h-0 flex-1">
            <ModernSite />
          </div>
        </div>
      </div>
    </DeviceFrame>
  );
}

export function CorporateDesignSystem() {
  return (
    <DeviceFrame variant="browser" url="redesign.studio.local/system">
      <div className="grid h-full grid-cols-12 gap-4 bg-[var(--mk-bg)] p-5">
        <div className="col-span-4 space-y-3">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--mk-muted)]">Type</p>
          <p className="font-heading text-4xl font-bold">Aa</p>
          <p className="font-heading text-xl">Orbitron headings</p>
          <p className="text-[13px] text-[var(--mk-muted)]">Inter for body copy at 15 / 24.</p>
        </div>
        <div className="col-span-4 space-y-3">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--mk-muted)]">Colour</p>
          <div className="grid grid-cols-4 gap-2">
            {["#0a0a0a", "#111111", "#00c6ff", "#0072ff"].map((color) => (
              <div key={color}>
                <div className="h-12 rounded-xl border border-[var(--mk-border)]" style={{ background: color }} />
                <p className="mt-1 text-[10px] text-[var(--mk-muted)]">{color}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-4 space-y-3">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--mk-muted)]">Components</p>
          <PrimaryButton>Primary</PrimaryButton>
          <div className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-3 text-[13px]">
            Card surface
          </div>
          <div className="rounded-xl border border-[var(--mk-border)] bg-[var(--mk-surface2)] px-3 py-2 text-[13px] text-[var(--mk-muted)]">
            Input
          </div>
          <Badge tone="cyan">Chip</Badge>
        </div>
      </div>
    </DeviceFrame>
  );
}

export function CorporateResponsive() {
  return (
    <>
      <DeviceFrame variant="laptop" url="site.local" className="origin-center scale-[0.72]">
        <ModernSite />
      </DeviceFrame>
      <DeviceFrame variant="browser" url="site.local" className="h-[520px] w-[360px]">
        <ModernSite compact />
      </DeviceFrame>
      <DeviceFrame variant="phone">
        <ModernSite compact />
      </DeviceFrame>
    </>
  );
}
