import type { Metadata } from "next";
import LegalThread from "@/components/LegalThread";
import PageShell from "@/components/PageShell";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of service",
  description:
    "Terms governing use of slimcybertech.com, and how they relate to paid project work.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Terms of service"
      description="Terms governing use of slimcybertech.com, and how they relate to paid project work."
    >
      <LegalThread
        updated="13 November 2026"
        other={{ href: "/privacy", label: "Privacy policy" }}
        turns={[
          {
            prompt: "Who are the parties?",
            title: "Agreement",
            icon: "pin",
            body: (
              <p>
                These Terms are between you and SlimCyberTech, a software company in Arua, West
                Nile, Uganda, and they govern use of slimcybertech.com. Contact:{" "}
                <a
                  href="mailto:info@slimcybertech.com"
                  className="text-[var(--white)] underline-offset-2 hover:underline"
                >
                  info@slimcybertech.com
                </a>
                {", "}
                +256 772 581510. By using the website you accept these Terms. Do not use it if you
                do not accept them.
              </p>
            ),
          },
          {
            prompt: "What does the website provide?",
            title: "The website",
            icon: "globe",
            body: (
              <>
                <p>
                  The site presents SlimCyberTech's work and provides a way to contact us. It is
                  not a store, a user account, or a contract for software development.
                </p>
                <p>
                  Project galleries show sample screens unless a listing states that a product is
                  live and supplies a link.
                </p>
              </>
            ),
          },
          {
            prompt: "How is paid work handled?",
            title: "Project work",
            icon: "file",
            body: (
              <>
                <p>
                  Development work is set out in a separate written agreement covering scope,
                  fees, and schedule. These Terms apply to the public website. They do not take
                  the place of a signed statement of work.
                </p>
                <p>
                  An enquiry through the contact form, WhatsApp, or email is not an instruction to
                  begin work. Work begins only when both parties have agreed in writing.
                </p>
              </>
            ),
          },
          {
            prompt: "Who owns the material?",
            title: "Intellectual property",
            icon: "own",
            body: (
              <>
                <p>
                  SlimCyberTech owns the text, layout, and sample screens on this website, except
                  where a client site or other third-party material is identified. Client
                  organisations own the websites we manage for them.
                </p>
                <p>
                  Materials you send us for a project remain yours. Ownership of work we deliver
                  is set out in the project agreement.
                </p>
              </>
            ),
          },
          {
            prompt: "What use is not allowed?",
            title: "Acceptable use",
            icon: "ban",
            body: (
              <p>
                You may not attempt to disrupt the website, overload the contact form, or harvest
                addresses from it. You may not use the SlimCyberTech name in a way that suggests
                we built, host, or approve something we did not.
              </p>
            ),
          },
          {
            prompt: "What if the site is unavailable?",
            title: "Availability and liability",
            icon: "alert",
            body: (
              <p>
                The website is provided as available. We do not warrant that it will be
                uninterrupted or free of error. SlimCyberTech is not liable for decisions made
                solely on the basis of content on this website. For paid work, liability is as
                set out in the project agreement.
              </p>
            ),
          },
          {
            prompt: "Which law applies?",
            title: "Governing law",
            icon: "scale",
            body: (
              <p>
                These Terms are governed by the laws of Uganda. Disputes about the website should
                first be raised with us in writing. If they cannot be resolved, they may be
                brought before the courts of Uganda.
              </p>
            ),
          },
          {
            prompt: "Can these Terms be revised?",
            title: "Revisions",
            icon: "refresh",
            body: (
              <p>
                We may revise these Terms. The published version, with the date shown, is the
                current one. Continued use of the website after a revision means you accept the
                updated Terms.
              </p>
            ),
          },
        ]}
      />
    </PageShell>
  );
}
