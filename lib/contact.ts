export const CONTACT_SUBJECTS = [
  "Software Development",
  "Mobile App Development",
  "AI",
  "Cybersecurity",
  "Data Analysis",
  "Cloud & DevOps",
  "UI/UX Design",
  "Tech Consulting",
  "Book a Demo",
  "Other",
] as const;

export type ContactSubject = (typeof CONTACT_SUBJECTS)[number];

export const BOOK_DEMO_HREF = "/contact?subject=Book%20a%20Demo";

export function isContactSubject(value: string): value is ContactSubject {
  return (CONTACT_SUBJECTS as readonly string[]).includes(value);
}
