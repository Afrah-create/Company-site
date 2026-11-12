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
  "Safety",
  "Finance",
  "AI",
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
  galleryCaptions?: string[];
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
    // TODO: Replace gallery images with real screenshots of giftfoundationarua.org.
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
    // TODO: Replace gallery images with real screenshots of aringass.com.
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
    heroImage: "/images/projects/nilego/ui-1.png",
    gallery: [
      "/images/projects/nilego/ui-1.png",
      "/images/projects/nilego/ui-2.png",
      "/images/projects/nilego/ui-3.png",
    ],
    galleryCaptions: ["Rider booking", "Active trip", "Dispatch"],
    imageAlt: "NileGo ride booking product still",
    summary:
      "Ride booking for boda and car in West Nile towns. A rider asks for a trip, a driver accepts, and both can see how the trip is going.",
    challenge: "",
    solution: "",
    results: ["Built for West Nile towns", "Rider and driver flows", "Boda and car"],
    highlight: "Ride booking for West Nile towns",
    features: ["Ride request", "Driver accept", "Trip status", "Boda and car"],
    featured: true,
    order: 3,
  },
  {
    slug: "schoolmanage",
    name: "SchoolManage",
    kind: "product",
    status: "in-development",
    category: "Education",
    liveUrl: "https://schoolmanage.slimcybertech.com",
    stack: ["Next.js", "PostgreSQL"],
    heroImage: "/images/projects/schoolmanage/ui-1.png",
    gallery: [
      "/images/projects/schoolmanage/ui-1.png",
      "/images/projects/schoolmanage/ui-2.png",
      "/images/projects/schoolmanage/ui-3.png",
    ],
    galleryCaptions: ["School overview", "Gradebook", "Class teacher"],
    imageAlt: "SchoolManage school records product still",
    summary:
      "School records for students, assessments, fees, and report cards. Built for O-Level CBC and A-Level UNEB on one platform.",
    challenge: "",
    solution: "",
    results: ["O-Level CBC and A-Level UNEB", "One student record", "Fees in Ugandan shillings"],
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
    heroImage: "/images/projects/hospital-management-system/ui-1.png",
    gallery: [
      "/images/projects/hospital-management-system/ui-1.png",
      "/images/projects/hospital-management-system/ui-2.png",
      "/images/projects/hospital-management-system/ui-3.png",
    ],
    galleryCaptions: ["Reception", "Patient record", "Pharmacy stock"],
    imageAlt: "Hospital management product still",
    summary:
      "Patients, appointments, pharmacy, billing, and reports on the same visit record.",
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
    heroImage: "/images/projects/cucocare/ui-1.png",
    gallery: [
      "/images/projects/cucocare/ui-1.png",
      "/images/projects/cucocare/ui-2.png",
      "/images/projects/cucocare/ui-3.png",
    ],
    galleryCaptions: ["Farm dashboard", "Health schedule", "Farm analytics"],
    imageAlt: "CucoCare poultry management product still",
    summary:
      "Poultry records: flock health, feed, eggs, and vaccination dates in one log.",
    challenge: "",
    solution: "",
    results: ["Flock and feed in one log", "Vaccination schedule", "Egg production"],
    highlight: "Flock, feed, and vaccination in one log",
    features: ["Flock health", "Feed", "Egg production", "Vaccination schedule"],
    featured: true,
    order: 6,
  },
  {
    slug: "nileclinicplus",
    name: "NileClinicPlus",
    kind: "product",
    status: "in-development",
    category: "Healthcare",
    stack: [],
    heroImage: "/images/projects/nileclinicplus/ui-1.png",
    gallery: [
      "/images/projects/nileclinicplus/ui-1.png",
      "/images/projects/nileclinicplus/ui-2.png",
      "/images/projects/nileclinicplus/ui-3.png",
    ],
    galleryCaptions: ["Front desk", "Consultation", "Next visit"],
    imageAlt: "NileClinicPlus clinic management product still",
    summary:
      "A clinic management system for patients, visits, prescriptions, and billing. Front desk and consultation share the same visit record.",
    challenge: "",
    solution: "",
    results: ["Patients through billing", "Shared visit record", "Prescriptions with the visit"],
    highlight: "Clinic records in one place",
    features: ["Patients", "Visits", "Prescriptions", "Billing"],
    featured: true,
    order: 7,
  },
  {
    slug: "afriresq",
    name: "AfriResQ",
    kind: "product",
    status: "in-development",
    category: "Safety",
    stack: [],
    heroImage: "/images/projects/afriresq/ui-1.png",
    gallery: [
      "/images/projects/afriresq/ui-1.png",
      "/images/projects/afriresq/ui-2.png",
      "/images/projects/afriresq/ui-3.png",
    ],
    galleryCaptions: ["Report incident", "Responder assigned", "Dispatch"],
    imageAlt: "AfriResQ emergency response product still",
    summary:
      "Safety and emergency response software. A caller reports an incident, a responder is assigned, and both can follow what happens next.",
    challenge: "",
    solution: "",
    results: ["Incident intake", "Responder assigned", "Status on both sides"],
    highlight: "Incident to responder",
    features: ["Incident report", "Dispatch", "Responder status"],
    featured: true,
    order: 8,
  },
  {
    slug: "cyberbook",
    name: "CyberBook",
    kind: "product",
    status: "in-development",
    category: "Cybersecurity",
    stack: [],
    heroImage: "/images/projects/cyberbook/ui-1.png",
    gallery: [
      "/images/projects/cyberbook/ui-1.png",
      "/images/projects/cyberbook/ui-2.png",
      "/images/projects/cyberbook/ui-3.png",
    ],
    galleryCaptions: ["Risk overview", "Findings", "Asset map"],
    imageAlt: "CyberBook security findings product still",
    summary:
      "A workspace for security findings. Who owns it, how serious it is, when it is due, and whether it is still open.",
    challenge: "",
    solution: "",
    results: ["Finding to owner", "Severity on the record", "Open versus closed"],
    highlight: "Findings with an owner",
    features: ["Finding intake", "Severity", "Owner and due date"],
    featured: true,
    order: 9,
  },
  {
    slug: "voxa-ai",
    name: "Voxa AI",
    kind: "product",
    status: "in-development",
    category: "AI",
    stack: [],
    heroImage: "/images/projects/voxa-ai/ui-1.png",
    gallery: [
      "/images/projects/voxa-ai/ui-1.png",
      "/images/projects/voxa-ai/ui-2.png",
      "/images/projects/voxa-ai/ui-3.png",
    ],
    galleryCaptions: ["Conversation", "Live chat", "Language pairs"],
    imageAlt: "Voxa AI multilingual conversation product still",
    summary:
      "An AI tool for conversation across languages. Pick a language pair, speak or type, and read the other side in your language.",
    challenge: "",
    solution: "",
    results: ["Language pair on the thread", "Type or speak", "Same conversation, two languages"],
    highlight: "Conversation across languages",
    features: ["Language pairs", "Typed chat", "Spoken input"],
    featured: true,
    order: 10,
  },
  {
    slug: "e-nilebus",
    name: "e-NileBus",
    kind: "product",
    status: "in-development",
    category: "Transport",
    stack: [],
    heroImage: "/images/projects/e-nilebus/ui-1.png",
    gallery: [
      "/images/projects/e-nilebus/ui-1.png",
      "/images/projects/e-nilebus/ui-2.png",
      "/images/projects/e-nilebus/ui-3.png",
    ],
    galleryCaptions: ["Seat map", "Ticket and pay", "Operator trips"],
    imageAlt: "e-NileBus ticketing product still",
    summary:
      "Mobile ticketing and seat reservation for buses, including payment. Pick a trip, choose a seat, and keep the ticket on the phone.",
    challenge: "",
    solution: "",
    results: ["Trip search", "Seat reservation", "Payment on the ticket"],
    highlight: "Seat, ticket, and payment",
    features: ["Trip search", "Seat map", "Payment", "Mobile ticket"],
    featured: true,
    order: 11,
  },
  {
    slug: "cybersacco",
    name: "CyberSacco",
    kind: "product",
    status: "in-development",
    category: "Finance",
    stack: [],
    heroImage: "/images/projects/cybersacco/ui-1.png",
    gallery: [
      "/images/projects/cybersacco/ui-1.png",
      "/images/projects/cybersacco/ui-2.png",
      "/images/projects/cybersacco/ui-3.png",
    ],
    galleryCaptions: ["Member home", "Loan status", "Office ledger"],
    imageAlt: "CyberSacco member and office product still",
    summary:
      "A Sacco app for shares, savings, and loans. Members can see a balance, send money, and follow a loan from the same ledger as the office.",
    challenge: "",
    solution: "",
    results: ["Shares, savings, and loans", "Member and office ledger", "Loan status on the phone"],
    highlight: "The Sacco ledger on a phone",
    features: ["Shares", "Savings", "Loans", "Member transfers"],
    featured: true,
    order: 12,
  },
  {
    slug: "e-commerce-platform",
    name: "E-Commerce Platform",
    kind: "product",
    status: "concept",
    category: "Web Apps",
    stack: ["React", "Node.js", "PostgreSQL"],
    heroImage: "/images/projects/e-commerce-platform/ui-1.png",
    gallery: [
      "/images/projects/e-commerce-platform/ui-1.png",
      "/images/projects/e-commerce-platform/ui-2.png",
      "/images/projects/e-commerce-platform/ui-3.png",
    ],
    galleryCaptions: ["Storefront", "Checkout", "Seller dashboard"],
    imageAlt: "Concept still for an e-commerce storefront",
    summary:
      "A storefront idea: catalogue, checkout, and order admin, with stock sitting next to the orders.",
    challenge: "",
    solution: "",
    // TODO: Old placeholder "+42% checkout conversion" is unverified — do not publish as a result.
    results: ["Concept case study", "Catalogue and admin", "Stock with orders"],
    highlight: "Concept case study",
    features: ["Catalogue", "Checkout", "Order admin"],
    order: 13,
  },
  {
    slug: "devops-pipeline-tool",
    name: "DevOps Pipeline Tool",
    kind: "product",
    status: "concept",
    category: "Consulting",
    stack: ["Docker", "Kubernetes", "CI/CD"],
    heroImage: "/images/projects/devops-pipeline-tool/ui-1.png",
    gallery: [
      "/images/projects/devops-pipeline-tool/ui-1.png",
      "/images/projects/devops-pipeline-tool/ui-2.png",
      "/images/projects/devops-pipeline-tool/ui-3.png",
    ],
    galleryCaptions: ["Pipeline", "Deployments", "Logs"],
    imageAlt: "Concept still for a deployment pipeline console",
    summary:
      "A console idea for deploys. Build, health check, and a way back if the release goes wrong.",
    challenge: "",
    solution: "",
    // TODO: Old placeholder "75% fewer deployment errors" is unverified — do not publish as a result.
    results: ["Concept case study", "Build to deploy", "Rollback path"],
    highlight: "Concept case study",
    features: ["CI build", "Health check", "Rollback"],
    order: 14,
  },
  {
    slug: "corporate-website-redesign",
    name: "Corporate Website Redesign",
    kind: "product",
    status: "concept",
    category: "Consulting",
    stack: ["Next.js", "Framer Motion"],
    heroImage: "/images/projects/corporate-website-redesign/ui-1.png",
    gallery: [
      "/images/projects/corporate-website-redesign/ui-1.png",
      "/images/projects/corporate-website-redesign/ui-2.png",
      "/images/projects/corporate-website-redesign/ui-3.png",
    ],
    galleryCaptions: ["Before and after", "Design system", "Responsive set"],
    imageAlt: "Concept still for a corporate website redesign",
    summary:
      "A company site idea with fewer pages, a work index, and a contact path that stays within one tap.",
    challenge: "",
    solution: "",
    // TODO: Old placeholder "+58% session engagement" is unverified — do not publish as a result.
    results: ["Concept case study", "Fewer, clearer pages", "Contact within one tap"],
    highlight: "Concept case study",
    features: ["Page hierarchy", "Work index", "Contact path"],
    order: 15,
  },
  {
    slug: "green-gold-perks",
    name: "Green Gold Perks",
    kind: "client",
    status: "live",
    category: "Agriculture",
    client: "Green Gold Coffee",
    liveUrl: "https://www.greengoldperks.com",
    // TODO: Stack: to be confirmed from the live site. Do not invent one.
    stack: [],
    // TODO: Replace gallery images with real screenshots of greengoldperks.com if these stills go stale.
    heroImage: "/images/projects/green-gold-perks/hero.png",
    gallery: [
      "/images/projects/green-gold-perks/gallery-1.png",
      "/images/projects/green-gold-perks/gallery-2.png",
    ],
    imageAlt: "Green Gold Perks public website",
    summary: "",
    challenge: "",
    solution: "",
    results: ["Live in production", "Public-facing", "Managed website"],
    highlight: "Live in production",
    featured: true,
    order: 16,
  },
  {
    slug: "elroy-skilled-services",
    name: "Elroy Skilled Services",
    kind: "client",
    status: "live",
    category: "Web Apps",
    client: "Elroy Skilled Services Limited",
    liveUrl: "https://elroyskilledservices.com",
    // TODO: Stack: to be confirmed from the live site. Do not invent one.
    stack: [],
    // TODO: Replace gallery images with real screenshots of elroyskilledservices.com if these stills go stale.
    heroImage: "/images/projects/elroy-skilled-services/hero.png",
    gallery: [
      "/images/projects/elroy-skilled-services/gallery-1.png",
      "/images/projects/elroy-skilled-services/gallery-2.png",
    ],
    imageAlt: "Elroy Skilled Services public website",
    summary: "",
    challenge: "",
    solution: "",
    results: ["Live in production", "Public-facing", "Managed website"],
    highlight: "Live in production",
    featured: true,
    order: 17,
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

const HOME_FEATURED_SLUGS = ["nilego", "cucocare", "schoolmanage"] as const;

export function getHomeFeaturedProjects(): Project[] {
  return HOME_FEATURED_SLUGS.map((slug) => getProjectBySlug(slug)).filter(
    (project): project is Project => Boolean(project),
  );
}

export function getProductProjects(): Project[] {
  const slugs = [
    "nilego",
    "schoolmanage",
    "hospital-management-system",
    "cucocare",
    "nileclinicplus",
    "afriresq",
    "cyberbook",
    "voxa-ai",
    "e-nilebus",
    "cybersacco",
  ];
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
