import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, Instagram, MessageCircle, Check } from "lucide-react";
import { Section, SectionHeading, Reveal } from "@/components/site/Section";
import { ParticleField } from "@/components/site/ParticleField";

const title = "Contact UNWAVES";
const description =
  "Questions, collaborations or community partnerships? Reach the UNWAVES team and we'll get back to you.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Contact,
});

const fieldClass =
  "mt-2 w-full rounded-2xl border border-input bg-secondary/40 px-4 py-3 text-sm outline-none transition-colors focus:border-festival-pink";

const channels = [
  { icon: Mail, label: "Email", value: "Use the contact form" },
  { icon: Instagram, label: "Instagram", value: "Follow UNWAVES" },
  { icon: MessageCircle, label: "Community", value: "Join the UNWAVES community" },
];

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <main>
      <Section className="overflow-hidden pt-36">
        <div className="aurora-bg opacity-35" />
        <ParticleField count={14} />
        <SectionHeading
          eyebrow="Contact"
          title="Say hello to the festival team"
          subtitle="Partnerships, campus chapters, volunteering or plain curiosity — all welcome."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            {channels.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.08}>
                <div className="glass glass-hover flex items-center gap-4 rounded-3xl p-5">
                  <span
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl"
                    style={{ background: "var(--gradient-festival)" }}
                  >
                    <c.icon className="h-5 w-5 text-primary-foreground" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs tracking-[0.16em] uppercase text-muted-foreground">{c.label}</p>
                    <p className="truncate text-sm font-semibold">{c.value}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <div className="glass gradient-border rounded-4xl p-7 sm:p-9">
              {sent ? (
                <div className="py-10 text-center">
                  <span
                    className="mx-auto grid h-14 w-14 place-items-center rounded-full"
                    style={{ background: "var(--gradient-warm)" }}
                  >
                    <Check className="h-6 w-6 text-accent-foreground" />
                  </span>
                  <h2 className="mt-5 text-xl font-bold">Message noted!</h2>
                  <p className="mt-2 text-sm text-muted-foreground">We'll get back to you soon.</p>
                </div>
              ) : (
                <form
                  className="space-y-5"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block text-sm font-semibold">
                      Name
                      <input required placeholder="Your name" className={fieldClass} />
                    </label>
                    <label className="block text-sm font-semibold">
                      Email
                      <input required type="email" placeholder="you@email.com" className={fieldClass} />
                    </label>
                  </div>
                  <label className="block text-sm font-semibold">
                    Message
                    <textarea required rows={5} placeholder="Tell us what's on your mind" className={fieldClass} />
                  </label>
                  <button
                    type="submit"
                    className="relative w-full overflow-hidden rounded-full px-6 py-3.5 text-sm font-bold text-primary-foreground transition-transform duration-300 hover:scale-[1.02]"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 animate-shimmer"
                      style={{ background: "var(--gradient-festival)", backgroundSize: "200% auto" }}
                    />
                    <span className="relative">Send message</span>
                  </button>
                  <p className="text-center text-xs text-muted-foreground">
                    Phase 1 preview — messages are not stored yet.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </Section>
    </main>
  );
}
