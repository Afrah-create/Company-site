export type ServiceIcon =
  | "software"
  | "mobile"
  | "security"
  | "data"
  | "cloud"
  | "design"
  | "consulting";

export type Service = {
  id: string;
  title: string;
  subject: string;
  category: string;
  summary: string;
  description: string;
  capabilities: string[];
  image: string;
  imageAlt: string;
  icon: ServiceIcon;
};

export const SERVICES: Service[] = [
  {
    id: "software-development",
    title: "Software Development",
    subject: "Software Development",
    category: "Engineering",
    summary: "Web platforms a team can keep running after we hand them over.",
    description:
      "We build web apps and the APIs behind them, so your people can keep the thing running after launch.",
    capabilities: [
      "Web applications",
      "APIs",
      "Architecture",
      "Maintenance",
    ],
    image: "/images/services/software-development/ui-1.png",
    imageAlt: "Web platform console with apps, APIs, and releases",
    icon: "software",
  },
  {
    id: "mobile-development",
    title: "Mobile Development",
    subject: "Mobile App Development",
    category: "Product",
    summary: "Apps for iOS and Android, including Flutter when one codebase is enough.",
    description:
      "We build for phones people already own. Flutter when a shared codebase makes sense, native work when it does not.",
    capabilities: ["iOS and Android", "Flutter", "Testing"],
    image: "/images/services/mobile-development/ui-1.png",
    imageAlt: "Phone app home and job tracking screens",
    icon: "mobile",
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    subject: "Cybersecurity",
    category: "Security",
    summary: "We look at how a system is built, find the gaps, and close them.",
    description:
      "Reviews of how a product is put together and where it is exposed. We tell you what to fix first, then help you fix it.",
    capabilities: ["Reviews", "Hardening", "Follow-up"],
    image: "/images/services/cybersecurity/ui-1.png",
    imageAlt: "Security review board with findings and what to fix first",
    icon: "security",
  },
  {
    id: "data-analysis",
    title: "Data Analysis",
    subject: "Data Analysis",
    category: "Analytics",
    summary: "Dashboards and reports so staff are not reconciling the same numbers in three files.",
    description:
      "We pull the numbers you already have into reports people can use. Less copying between spreadsheets.",
    capabilities: ["Dashboards", "Reports", "KPI tracking"],
    image: "/images/services/data-analysis/ui-1.png",
    imageAlt: "Operations dashboard with collections, cases, and reports",
    icon: "data",
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    subject: "Cloud & DevOps",
    category: "Infrastructure",
    summary: "Cloud setup and deploys you can repeat, with the environment still visible after it ships.",
    description:
      "We set up hosting and the path from code to a live server. Deploys should be boring. You should be able to see if the thing is up.",
    capabilities: ["Cloud setup", "CI/CD", "Monitoring"],
    image: "/images/services/cloud-devops/ui-1.png",
    imageAlt: "Hosting console with deploys, environments, and uptime",
    icon: "cloud",
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    subject: "UI/UX Design",
    category: "Design",
    summary: "Screens a person on a phone can actually follow.",
    description:
      "Layout, type, and flow so a visitor can tell what to do next. We design for the phones people around here actually hold.",
    capabilities: ["User flows", "Design systems", "Phone-first layouts"],
    image: "/images/services/ui-ux-design/ui-1.png",
    imageAlt: "Design board and a phone-first booking screen",
    icon: "design",
  },
  {
    id: "tech-consulting",
    title: "Tech Consulting",
    subject: "Tech Consulting",
    category: "Strategy",
    summary: "Help choosing what to build, in what order, and what to leave alone.",
    description:
      "Sometimes the work is deciding, not writing code yet. We sit with you on architecture, order of work, and what your team can take on.",
    capabilities: ["Architecture", "Planning", "Team training"],
    image: "/images/services/tech-consulting/ui-1.png",
    imageAlt: "Work plan showing what to build now, next, and later",
    icon: "consulting",
  },
];

export const SERVICE_TECH = [
  "Next.js",
  "React",
  "Flutter",
  "Firebase",
  "PostgreSQL",
  "Node.js",
  "Python",
  "Docker",
  "Tailwind",
  "Framer Motion",
] as const;

export function getFeaturedServices() {
  return SERVICES.filter((service) =>
    ["software-development", "mobile-development", "cybersecurity", "tech-consulting"].includes(
      service.id,
    ),
  );
}

export function getServiceDiscussHref(subject: string) {
  return `/contact?subject=${encodeURIComponent(subject)}`;
}
