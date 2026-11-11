import type { Metadata } from "next";
import { Suspense } from "react";
import Contact from "@/components/Contact";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Write to SlimCyberTech in West Nile. Email, phone, WhatsApp, or the form. We usually reply within a day.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main className="pt-[calc(7.5rem+env(safe-area-inset-top))] sm:pt-36">
      <Suspense fallback={<div className="min-h-[50vh]" />}>
        <Contact />
      </Suspense>
    </main>
  );
}
