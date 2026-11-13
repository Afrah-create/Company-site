export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
] as const;

export type NavHref = (typeof NAV_ITEMS)[number]["href"];

export const SERVICE_LINKS = [
  { label: "Software Development", href: "/services#software-development" },
  { label: "Mobile Development", href: "/services#mobile-development" },
  { label: "AI", href: "/services#ai" },
  { label: "Cybersecurity", href: "/services#cybersecurity" },
  { label: "Data Analysis", href: "/services#data-analysis" },
  { label: "Cloud & DevOps", href: "/services#cloud-devops" },
  { label: "UI/UX Design", href: "/services#ui-ux-design" },
  { label: "Tech Consulting", href: "/services#tech-consulting" },
] as const;

export const LEGAL_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
] as const;

export function isNavActive(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function getActiveNavLabel(pathname: string): string {
  const match = NAV_ITEMS.find((item) => isNavActive(item.href, pathname));
  return match?.label ?? "Home";
}
