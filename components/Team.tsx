import { Mail, MessageCircle } from "lucide-react";
import RevealSplitRow from "@/components/motion/RevealSplitRow";
import { TEAM } from "@/lib/team";

export default function Team() {
  return (
    <section
      id="team"
      className="mx-auto mt-16 w-full max-w-6xl scroll-mt-28 px-4 sm:px-6 md:px-10"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--cyan)]">Team</p>
      <h2 className="mt-3 text-2xl text-[var(--white)] sm:text-4xl">The team</h2>
      <div className="mt-12 space-y-14 md:space-y-16">
        {TEAM.map((member, index) => (
          <RevealSplitRow
            key={member.name}
            index={index}
            total={TEAM.length}
            imageSrc={encodeURI(member.image)}
            imageAlt={member.alt}
            imageAspect="3 / 4"
            imageLayout="portrait"
            objectPosition="top"
            eyebrow={member.role}
            title={member.name}
            description={member.bio}
            actions={
              <>
                {member.email ? (
                  <a
                    href={`mailto:${member.email}`}
                    aria-label={`Email ${member.name}`}
                    className="inline-flex h-11 min-h-11 items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 text-sm font-semibold text-[var(--white)] transition-colors hover:border-[var(--cyan)] hover:text-[var(--cyan)]"
                  >
                    <Mail className="h-4 w-4" />
                    Email
                  </a>
                ) : null}
                {member.whatsapp ? (
                  <a
                    href={member.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`WhatsApp ${member.name}`}
                    className="inline-flex h-11 min-h-11 items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 text-sm font-semibold text-[var(--white)] transition-colors hover:border-[var(--cyan)] hover:text-[var(--cyan)]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                ) : null}
              </>
            }
          />
        ))}
      </div>
    </section>
  );
}
