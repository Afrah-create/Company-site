import type { Metadata } from "next";
import LegalDoc, { LegalSection } from "@/components/LegalDoc";
import PageShell from "@/components/PageShell";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy policy",
  description:
    "What SlimCyberTech collects on this website, why, and how to ask us to delete a note.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Privacy policy"
      description="What we collect on this site, who sees it, and how to ask us to delete a note."
    >
      <LegalDoc updated="13 November 2026">
        <LegalSection title="Who we are">
          <p>
            SlimCyberTech is based in Arua, West Nile, Uganda. For privacy questions, write to{" "}
            <a href="mailto:info@slimcybertech.com" className="text-[var(--white)] underline-offset-2 hover:underline">
              info@slimcybertech.com
            </a>
            .
          </p>
        </LegalSection>

        <LegalSection title="What we collect">
          <p>
            If you use the contact form we receive your name, email, phone if you add it, the
            subject, a budget range if you pick one, and the message. That mail goes to our
            inbox so we can reply.
          </p>
          <p>
            If you call, WhatsApp, or email us instead, we see whatever you chose to send on
            that channel.
          </p>
          <p>
            The site remembers your theme choice (light or dark) on your own device. We do not
            send that to a server.
          </p>
        </LegalSection>

        <LegalSection title="Why">
          <p>
            We use contact details to answer you and, if you asked for work, to talk about a
            quote. We do not sell lists. We do not buy ads against your name.
          </p>
        </LegalSection>

        <LegalSection title="Who sees it">
          <p>
            The people on the SlimCyberTech team who handle enquiries. The company that hosts
            the site sees ordinary server logs: the page requested, the time, and an IP
            address. Email travels through the mail service we use to send and receive.
          </p>
          <p>
            If you tap WhatsApp, Instagram, or a managed-website link, you leave this site and
            those services have their own rules.
          </p>
        </LegalSection>

        <LegalSection title="How long we keep a message">
          <p>
            We keep enquiry mail as long as we need it to reply and to remember what we
            discussed. If a job starts, that record may sit with the project. If you want a
            message deleted, say so at the address above and we will remove it from our inbox
            unless we have to keep it for a legal reason.
          </p>
        </LegalSection>

        <LegalSection title="This is not a login product">
          <p>
            This website does not give you an account. Products we build for a school, clinic,
            or other client have their own records and their own agreements. Those sit with
            that organisation, not with this public site.
          </p>
        </LegalSection>

        <LegalSection title="Changes">
          <p>
            If this policy changes, we update the date at the top. The live page is the one
            that applies.
          </p>
        </LegalSection>
      </LegalDoc>
    </PageShell>
  );
}
