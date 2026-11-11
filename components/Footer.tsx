import Link from "next/link";
import Image from "next/image";
import { BadgeCheck, MessageCircle } from "lucide-react";
import { NAV_ITEMS, SERVICE_LINKS } from "@/lib/nav";

const managedWebsites = [
  { label: "giftfoundationarua.org", href: "https://giftfoundationarua.org" },
  { label: "aringass.com", href: "https://aringass.com" },
];

const socialLinks = [
  {
    label: "WhatsApp Channel",
    href: "https://whatsapp.com/channel/0029Vb8BAyd0G0XYpCcddb3o",
    icon: MessageCircle,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/slimcybertech?igsh=ZzRscWRlNWlvdjZk",
    icon: BadgeCheck,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer role="contentinfo" className="relative mt-8 bg-[var(--card-bg-strong)] md:mt-12">
      <div className="h-px w-full bg-[var(--gradient)]" />

      <div className="mx-auto w-full max-w-6xl px-4 py-10 pb-24 sm:px-6 sm:py-12 md:px-10 md:pb-12">
        <div className="mb-8 sm:mb-10">
          <Link href="/" className="inline-flex items-center gap-2">
            <Image
              src="/images/Slim.jpeg"
              alt="SlimCyberTech company wordmark"
              width={260}
              height={74}
              className="h-8 w-auto object-contain sm:h-10"
            />
          </Link>
          <p className="mt-3 max-w-md text-sm text-[var(--muted)]">
            Software from West Nile, Uganda.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h4 className="font-heading text-lg text-[var(--white)]">Sitemap</h4>
            <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-[var(--cyan)]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg text-[var(--white)]">Services</h4>
            <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
              {SERVICE_LINKS.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="transition-colors hover:text-[var(--cyan)]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg text-[var(--white)]">Contact Info</h4>
            <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
              <li>
                <a href="mailto:info@slimcybertech.com" className="transition-colors hover:text-[var(--cyan)]">
                  info@slimcybertech.com
                </a>
              </li>
              <li>
                <a href="tel:+256772581510" className="transition-colors hover:text-[var(--cyan)]">
                  +256 772 581510
                </a>
              </li>
              <li>West Nile, Uganda</li>
            </ul>

            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface2)] text-[var(--white)] transition-colors duration-300 hover:border-[var(--cyan)] hover:text-[var(--cyan)]"
                >
                  <social.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg text-[var(--white)]">Managed Websites</h4>
            <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
              {managedWebsites.map((site) => (
                <li key={site.href}>
                  <Link
                    href={site.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-[var(--cyan)]"
                  >
                    {site.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-[var(--border)] pt-5 text-center text-xs text-[var(--muted)] sm:mt-10 sm:flex sm:items-center sm:justify-between sm:text-left">
          <p>© {currentYear} SlimCyberTech. All Rights Reserved.</p>
          <p className="mt-2 sm:mt-0">From West Nile.</p>
        </div>
      </div>
    </footer>
  );
}
