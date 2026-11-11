export const PROJECT_KINDS = ["client", "product"] as const;
export const PROJECT_STATUSES = ["live", "in-development", "pilot", "concept"] as const;
export const PROJECT_CATEGORIES = [
  "Web Apps",
  "Mobile",
  "Cybersecurity",
  "Consulting",
  "Education",
  "Nonprofit",
  "Healthcare",
  "Agriculture",
  "Transport",
] as const;

export type ProjectKind = (typeof PROJECT_KINDS)[number];
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export type Project = {
  slug: string;
  name: string;
  kind: ProjectKind;
  status: ProjectStatus;
  category: ProjectCategory;
  client?: string;
  year?: string;
  liveUrl?: string;
  stack: string[];
  heroImage: string;
  gallery: string[];
  imageAlt: string;
  summary: string;
  challenge: string;
  solution: string;
  results: [string, string, string];
  highlight: string;
  features?: string[];
  featured?: boolean;
  order: number;
};

const PROJECTS: Project[] = [
  {
    slug: "gift-foundation-arua",
    name: "Gift Foundation Arua",
    kind: "client",
    status: "live",
    category: "Nonprofit",
    client: "Gift Foundation Arua",
    liveUrl: "https://giftfoundationarua.org",
    // TODO: Stack: to be confirmed from the live site. Do not invent one.
    stack: [],
    heroImage: "/images/projects/gift-foundation-arua/hero.png",
    gallery: [
      "/images/projects/gift-foundation-arua/gallery-1.png",
      "/images/projects/gift-foundation-arua/gallery-2.png",
    ],
    imageAlt: "Gift Foundation Arua public website",
    summary: "",
    challenge: "",
    solution: "",
    results: ["Live in production", "Mobile-first", "Public-facing"],
    highlight: "Live in production",
    featured: true,
    order: 1,
  },
  {
    slug: "aringa-ss",
    name: "Aringa SS",
    kind: "client",
    status: "live",
    category: "Education",
    client: "Aringa Secondary School",
    liveUrl: "https://aringass.com",
    // TODO: Stack: to be confirmed from the live site. Do not invent one.
    stack: [],
    heroImage: "/images/projects/aringa-ss/hero.png",
    gallery: [
      "/images/projects/aringa-ss/gallery-1.png",
      "/images/projects/aringa-ss/gallery-2.png",
    ],
    imageAlt: "Aringa Secondary School public website",
    summary: "",
    challenge: "",
    solution: "",
    results: ["Live in production", "Mobile-first", "Online admissions enquiries"],
    highlight: "Live in production",
    featured: true,
    order: 2,
  },
  {
    slug: "nilego",
    name: "NileGo",
    kind: "product",
    status: "in-development",
    category: "Transport",
    stack: ["Flutter", "Firebase"],
    heroImage: "/images/projects/nilego/hero.jpeg",
    gallery: [
      "/images/projects/nilego/gallery-1.png",
      "/images/projects/nilego/gallery-2.png",
    ],
    imageAlt: "NileGo ride booking product still",
    summary:
      "Ride booking for boda and car in West Nile towns. A rider asks for a trip, a driver accepts, and both can see how the trip is going. Flutter and Firebase.",
    challenge: "",
    solution: "",
    results: ["Built for West Nile towns", "Rider and driver flows", "Boda and car"],
    highlight: "Ride booking for West Nile towns",
    features: ["Ride request", "Driver accept", "Trip status", "Boda and car"],
    featured: true,
    order: 3,
  },
  {
    slug: "slimschool",
    name: "SlimSchool",
    kind: "product",
    status: "in-development",
    category: "Education",
    stack: ["Next.js", "PostgreSQL"],
    heroImage: "/images/projects/slimschool/hero.jpeg",
    gallery: [
      "/images/projects/slimschool/gallery-1.png",
      "/images/projects/slimschool/gallery-2.png",
    ],
    imageAlt: "SlimSchool management product still",
    summary:
      "School records for admissions, attendance, grades, fees, and reports. One student file instead of five. Next.js and PostgreSQL.",
    challenge: "",
    solution: "",
    results: ["Admissions through reports", "One student record", "Fees and grades"],
    highlight: "School records in one place",
    features: ["Admissions", "Attendance", "Grades", "Fees", "Reports"],
    featured: true,
    order: 4,
  },
  {
    slug: "hospital-management-system",
    name: "Hospital Management System",
    kind: "product",
    status: "in-development",
    category: "Healthcare",
    stack: ["Next.js", "PostgreSQL"],
    heroImage: "/images/projects/hospital-management-system/hero.jpeg",
    gallery: [
      "/images/projects/hospital-management-system/gallery-1.png",
      "/images/projects/hospital-management-system/gallery-2.png",
    ],
    imageAlt: "Hospital management product still",
    summary:
      "Patients, appointments, pharmacy, billing, and reports on the same visit record. Next.js and PostgreSQL.",
    challenge: "",
    solution: "",
    // TODO: Old placeholder "300% faster reporting" is unverified — do not publish as a result.
    results: ["Patients through billing", "Shared visit record", "Pharmacy and reports"],
    highlight: "Patients through billing",
    features: ["Patients", "Appointments", "Pharmacy", "Billing", "Reports"],
    featured: true,
    order: 5,
  },
  {
    slug: "cucocare",
    name: "CucoCare",
    kind: "product",
    status: "in-development",
    category: "Agriculture",
    stack: ["Next.js", "PostgreSQL"],
    heroImage: "/images/projects/cucocare/hero.jpeg",
    gallery: [
      "/images/projects/cucocare/gallery-1.png",
      "/images/projects/cucocare/gallery-2.png",
    ],
    imageAlt: "CucoCare poultry management product still",
    summary:
      "Poultry records: flock health, feed, eggs, and vaccination dates in one log. Next.js and PostgreSQL.",
    challenge: "",
    solution: "",
    results: ["Flock and feed in one log", "Vaccination schedule", "Egg production"],
    highlight: "Flock, feed, and vaccination in one log",
    features: ["Flock health", "Feed", "Egg production", "Vaccination schedule"],
    featured: true,
    order: 6,
  },
  {
    slug: "security-audit-dashboard",
    name: "Security Audit Dashboard",
    kind: "product",
    status: "concept",
    category: "Cybersecurity",
    stack: ["Next.js", "Python"],
    heroImage: "/images/projects/security-audit-dashboard/hero.png",
    gallery: [
      "/images/projects/security-audit-dashboard/gallery-1.png",
      "/images/projects/security-audit-dashboard/gallery-2.png",
    ],
    imageAlt: "Concept still for a security audit dashboard",
    summary:
      "A dashboard idea for security findings. Who owns it, how serious it is, when it is due, and whether it is still open.",
    challenge: "",
    solution: "",
    // TODO: Old placeholder "63% faster incident response" is unverified — do not publish as a result.
    results: ["Concept case study", "Finding to owner", "Open versus closed"],
    highlight: "Concept case study",
    features: ["Finding intake", "Severity", "Owner and due date"],
    order: 7,
  },
  {
    slug: "e-commerce-platform",
    name: "E-Commerce Platform",
    kind: "product",
    status: "concept",
    category: "Web Apps",
    stack: ["React", "Node.js", "PostgreSQL"],
    heroImage: "/images/projects/e-commerce-platform/hero.png",
    gallery: [
      "/images/projects/e-commerce-platform/gallery-1.jpeg",
      "/images/projects/e-commerce-platform/gallery-2.png",
    ],
    imageAlt: "Concept still for an e-commerce storefront",
    summary:
      "A storefront idea: catalogue, checkout, and order admin, with stock sitting next to the orders.",
    challenge: "",
    solution: "",
    // TODO: Old placeholder "+42% checkout conversion" is unverified — do not publish as a result.
    results: ["Concept case study", "Catalogue and admin", "Stock with orders"],
    highlight: "Concept case study",
    features: ["Catalogue", "Checkout", "Order admin"],
    order: 8,
  },
  {
    slug: "banking-mobile-app",
    name: "Banking Mobile App",
    kind: "product",
    status: "concept",
    category: "Mobile",
    stack: ["Flutter", "Firebase"],
    heroImage: "/images/projects/banking-mobile-app/hero.png",
    gallery: [
      "/images/projects/banking-mobile-app/gallery-1.png",
      "/images/projects/banking-mobile-app/gallery-2.png",
    ],
    imageAlt: "Concept still for a mobile banking interface",
    summary:
      "A mobile banking idea. Balance, transfer, and a session lock, so the branch ledger can sit on a phone.",
    challenge: "",
    solution: "",
    // TODO: Old placeholder "10k+ monthly active users" is unverified — do not publish as a result.
    results: ["Concept case study", "Balance and transfer", "Same ledger as the branch"],
    highlight: "Concept case study",
    features: ["Balance", "Transfer", "Session lock"],
    order: 9,
  },
  {
    slug: "devops-pipeline-tool",
    name: "DevOps Pipeline Tool",
    kind: "product",
    status: "concept",
    category: "Consulting",
    stack: ["Docker", "Kubernetes", "CI/CD"],
    heroImage: "/images/projects/devops-pipeline-tool/hero.png",
    gallery: [
      "/images/projects/devops-pipeline-tool/gallery-1.png",
      "/images/projects/devops-pipeline-tool/gallery-2.png",
    ],
    imageAlt: "Concept still for a deployment pipeline console",
    summary:
      "A console idea for deploys. Build, health check, and a way back if the release goes wrong.",
    challenge: "",
    solution: "",
    // TODO: Old placeholder "75% fewer deployment errors" is unverified — do not publish as a result.
    results: ["Concept case study", "Build to deploy", "Rollback path"],
    highlight: "Concept case study",
    features: ["CI build", "Health check", "Rollback"],
    order: 10,
  },
  {
    slug: "corporate-website-redesign",
    name: "Corporate Website Redesign",
    kind: "product",
    status: "concept",
    category: "Consulting",
    stack: ["Next.js", "Framer Motion"],
    heroImage: "/images/projects/corporate-website-redesign/hero.png",
    gallery: [
      "/images/projects/corporate-website-redesign/gallery-1.jpeg",
      "/images/projects/corporate-website-redesign/gallery-2.png",
    ],
    imageAlt: "Concept still for a corporate website redesign",
    summary:
      "A company site idea with fewer pages, a work index, and a contact path that stays within one tap.",
    challenge: "",
    solution: "",
    // TODO: Old placeholder "+58% session engagement" is unverified — do not publish as a result.
    results: ["Concept case study", "Fewer, clearer pages", "Contact within one tap"],
    highlight: "Concept case study",
    features: ["Page hierarchy", "Work index", "Contact path"],
    order: 11,
  },
];

export function isListedProject(project: Project): boolean {
  return project.kind !== "client";
}

export function showStatusBadge(project: Project): boolean {
  return project.status !== "in-development";
}

export function getAllProjects(): Project[] {
  return PROJECTS.filter(isListedProject).sort((a, b) => a.order - b.order);
}

export function getProjectBySlug(slug: string): Project | undefined {
  const project = PROJECTS.find((item) => item.slug === slug);
  if (!project || !isListedProject(project)) return undefined;
  return project;
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((project) => project.featured);
}

const HOME_FEATURED_SLUGS = ["nilego", "cucocare", "slimschool"] as const;

export function getHomeFeaturedProjects(): Project[] {
  return HOME_FEATURED_SLUGS.map((slug) => getProjectBySlug(slug)).filter(
    (project): project is Project => Boolean(project),
  );
}

export function getProductProjects(): Project[] {
  const slugs = ["nilego", "slimschool", "hospital-management-system", "cucocare"];
  return slugs
    .map((slug) => getProjectBySlug(slug))
    .filter((project): project is Project => Boolean(project));
}

export function getAdjacentProjects(slug: string): {
  previous?: Project;
  next?: Project;
} {
  const all = getAllProjects();
  const index = all.findIndex((project) => project.slug === slug);
  if (index < 0) return {};
  return {
    previous: all[index - 1],
    next: all[index + 1],
  };
}

export function getRelatedProjects(slug: string, limit = 3): Project[] {
  const current = getProjectBySlug(slug);
  if (!current) return [];

  const others = getAllProjects().filter((project) => project.slug !== slug);
  const sameCategory = others.filter((project) => project.category === current.category);
  const rest = others.filter((project) => project.category !== current.category);

  return [...sameCategory, ...rest].slice(0, limit);
}

export function getCategories(): ProjectCategory[] {
  const present = new Set(getAllProjects().map((project) => project.category));
  return PROJECT_CATEGORIES.filter((category) => present.has(category));
}

export function getProjectStaticParams(): { slug: string }[] {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export function getStatusLabel(status: ProjectStatus): string {
  switch (status) {
    case "live":
      return "Live";
    case "in-development":
      return "In development";
    case "pilot":
      return "Pilot";
    case "concept":
      return "Concept";
  }
}

export function getProjectHoverCopy(project: Project): {
  eyebrow: string;
  body: string;
} {
  const eyebrow =
    project.status === "concept" ? "Concept" : project.category;
  const firstLine = project.summary.split(". ")[0]?.trim();
  const fromSummary = firstLine
    ? firstLine.endsWith(".")
      ? firstLine
      : `${firstLine}.`
    : "";
  const body =
    fromSummary ||
    (project.features?.length ? project.features.slice(0, 4).join(" · ") : project.category);

  return { eyebrow, body };
}
