import type { Metadata } from "next";
import LegalDoc, { LegalSection } from "@/components/LegalDoc";
import PageShell from "@/components/PageShell";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of service",
  description:
    "How you can use the SlimCyberTech website, and how paid work is handled separately.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Terms of service"
      description="Plain rules for using this website. A signed job is a separate conversation."
    >
      <LegalDoc updated="13 November 2026">
        <LegalSection title="Who we are">
          <p>
            SlimCyberTech is a software company in Arua, West Nile, Uganda. This site is
            slimcybertech.com. If you need us, write to{" "}
            <a href="mailto:info@slimcybertech.com" className="text-[var(--white)] underline-offset-2 hover:underline">
              info@slimcybertech.com
            </a>{" "}
            or call +256 772 581510.
          </p>
        </LegalSection>

        <LegalSection title="Using the site">
          <p>
            You can read the pages, look at the work, and send a message. That is the site. It is
            not a store, a login, or a contract on its own. Using it means you are fine with
            this page. If you are not, close it.
          </p>
          <p>
            Project stills on this site are sample screens. They show how a product might look.
            They are not a live system unless the page says so and links to it.
          </p>
        </LegalSection>

        <LegalSection title="Quotes and paid work">
          <p>
            If we take on a job, we agree the scope, the money, and the timeline with you in
            writing. That agreement sits next to these terms. It is not replaced by this page.
          </p>
          <p>
            A message through the contact form, WhatsApp, or email is a request. It is not an
            order until both sides say yes.
          </p>
        </LegalSection>

        <LegalSection title="What belongs to whom">
          <p>
            The writing, layout, and mockups on this site belong to SlimCyberTech, except where
            we say otherwise. Client websites we look after belong to those organisations. Do
            not copy the screens or the copy and pass them off as yours.
          </p>
          <p>
            You keep the rights to material you send us (briefs, logos, records) unless we agree
            something else in a job contract.
          </p>
        </LegalSection>

        <LegalSection title="Please do not">
          <p>
            Do not try to break the site, flood the contact form, or scrape it for a mailing
            list. Do not use our name in a way that makes it look like we built or approved
            something we did not.
          </p>
        </LegalSection>

        <LegalSection title="If something is wrong">
          <p>
            We try to keep the site up and the facts on it honest. We do not promise it will
            never go down, and we are not liable for a decision you make only from reading a
            page here. For paid work, the written agreement is what counts.
          </p>
        </LegalSection>

        <LegalSection title="The law">
          <p>
            These terms follow the law of Uganda. If we have a dispute about the website, we
            talk first. If that fails, Ugandan courts handle it.
          </p>
        </LegalSection>

        <LegalSection title="Changes">
          <p>
            If we change this, the date at the top moves. The live page is the one that applies.
          </p>
        </LegalSection>
      </LegalDoc>
    </PageShell>
  );
}
