import type { Metadata } from "next";
import LegalThread from "@/components/LegalThread";
import PageShell from "@/components/PageShell";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy policy",
  description:
    "How SlimCyberTech collects, uses, and shares information on slimcybertech.com.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Privacy policy"
      description="How SlimCyberTech collects, uses, and shares information on slimcybertech.com."
    >
      <LegalThread
        updated="13 November 2026"
        other={{ href: "/terms", label: "Terms of service" }}
        turns={[
          {
            prompt: "What does this policy cover?",
            title: "Scope",
            icon: "pin",
            body: (
              <p>
                This policy applies to the public website at slimcybertech.com, operated by
                SlimCyberTech in Arua, West Nile, Uganda. It does not cover software we build for a
                client. Those products hold their own records under that organisation. Questions:
                {" "}
                <a
                  href="mailto:info@slimcybertech.com"
                  className="text-[var(--white)] underline-offset-2 hover:underline"
                >
                  info@slimcybertech.com
                </a>
                .
              </p>
            ),
          },
          {
            prompt: "What information do you collect?",
            title: "Information we collect",
            icon: "inbox",
            body: (
              <>
                <p>
                  Through the contact form we receive the name, email address, telephone number
                  (if provided), subject, optional budget range, and message you submit. If you
                  write, call, or use WhatsApp instead, we receive what you send on that channel.
                </p>
                <p>
                  The company that hosts the site records ordinary server logs: the requested
                  address, the time, and an IP address. Display theme and the storage notice are
                  described under Cookies and device storage.
                </p>
              </>
            ),
          },
          {
            prompt: "How is that information used?",
            title: "Use of information",
            icon: "chat",
            body: (
              <p>
                We use contact details to reply to you and, where you have asked about work, to
                discuss a proposal. We do not sell personal information. We do not use it to
                advertise against you.
              </p>
            ),
          },
          {
            prompt: "Who else can see it?",
            title: "Sharing",
            icon: "eye",
            body: (
              <>
                <p>
                  Enquiries are handled by SlimCyberTech staff who deal with incoming work. Hosting
                  logs are processed by the hosting provider. Email is carried by the mail service
                  we use to send and receive messages.
                </p>
                <p>
                  WhatsApp, Instagram, and websites we manage for clients are separate services.
                  Once you leave slimcybertech.com, their own policies apply.
                </p>
                <p>
                  Enquiries are handled internally. We do not publish them or sell them.
                </p>
              </>
            ),
          },
          {
            prompt: "Do you use cookies?",
            title: "Cookies and device storage",
            icon: "cookie",
            id: "cookies",
            body: (
              <>
                <p>
                  This website does not set advertising or analytics cookies. It stores a small
                  amount of data on your device so the site can remember choices you have made.
                </p>
                <p>
                  That data is: your display theme (light or dark); a record that you have
                  acknowledged the storage notice, so it is not shown on every visit; and a
                  session flag so the opening animation is not repeated in the same visit. None of
                  this is sent to SlimCyberTech as a tracking profile.
                </p>
                <p>
                  You can remove it by clearing this site's data in your browser. The site will
                  then use default settings until you choose again.
                </p>
              </>
            ),
          },
          {
            prompt: "How long do you keep it?",
            title: "Retention and requests",
            icon: "clock",
            body: (
              <p>
                Enquiry records are kept for as long as they are needed to reply and to keep a
                record of the discussion. If a project follows, the record may be filed with that
                project. You may ask us to delete an enquiry by writing to{" "}
                <a
                  href="mailto:info@slimcybertech.com"
                  className="text-[var(--white)] underline-offset-2 hover:underline"
                >
                  info@slimcybertech.com
                </a>
                . We will delete it unless we are required by law to retain it.
              </p>
            ),
          },
          {
            prompt: "Does this site give me an account?",
            title: "Accounts and client systems",
            icon: "key",
            body: (
              <p>
                slimcybertech.com does not issue user accounts. Applications delivered to a school,
                clinic, or other organisation store data under that organisation's control, not
                under this policy.
              </p>
            ),
          },
          {
            prompt: "Can this policy be revised?",
            title: "Revisions",
            icon: "refresh",
            body: (
              <p>
                We may revise this policy. The published version, with the date shown, is the
                current one. Continued use of the website after a revision means you accept the
                updated policy.
              </p>
            ),
          },
        ]}
      />
    </PageShell>
  );
}
