import {
  ArrowUpRight,
  Compass,
  Sparkles,
  Users,
  Waves,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

import { CTABanner } from "@/components/site/CTA";
import { FoundationState } from "@/components/site/FoundationState";
import { Section, SectionHeading } from "@/components/site/Section";

type FoundationPage =
  | "/experiences"
  | "/season-one"
  | "/daily-waves"
  | "/missions"
  | "/showcase"
  | "/community"
  | "/creators"
  | "/stories"
  | "/live"
  | "/join";

type PageContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

const pageContent: Record<FoundationPage, PageContent> = {
  "/experiences": {
    eyebrow: "UNWAVES EXPERIENCES",
    title: "Find your way into the wave.",
    subtitle:
      "Experiences for people who want to pause, explore, create and move together.",
  },

  "/season-one": {
    eyebrow: "SEASON ONE",
    title: "The first chapter of the movement.",
    subtitle:
      "Season One is the first shared chapter of UNWAVES — a space to explore, create, connect and experience something different.",
  },

  "/daily-waves": {
    eyebrow: "DAILY WAVES",
    title: "Small moments can move things.",
    subtitle:
      "Short prompts for noticing, making, reflecting and finding a different way through the day.",
  },

  "/missions": {
    eyebrow: "MISSIONS",
    title: "Make something with other people.",
    subtitle:
      "Collaborative briefs and creative challenges that give ideas somewhere to go.",
  },

  "/showcase": {
    eyebrow: "SHOWCASE",
    title: "A place for what people make.",
    subtitle:
      "Approved work, ideas and moments will have a place to be discovered and shared.",
  },

  "/community": {
    eyebrow: "COMMUNITY",
    title: "People creating movement together.",
    subtitle:
      "UNWAVES is shaped by the people who enter it, contribute to it and carry it forward.",
  },

  "/creators": {
    eyebrow: "UNWAVES CREATORS",
    title: "Make, experiment, express.",
    subtitle:
      "A space for people who turn curiosity into something others can feel, use or remember.",
  },

  "/stories": {
    eyebrow: "UNWAVES STORIES",
    title: "The people behind the wave.",
    subtitle:
      "Stories and reflections from people moving through their own version of the wave.",
  },

  "/live": {
    eyebrow: "UNWAVES LIVE",
    title: "Come together in the moment.",
    subtitle:
      "Conversations, gatherings and experiences will appear here as they become ready to share.",
  },

  "/join": {
    eyebrow: "JOIN UNWAVES",
    title: "Stay close to what comes next.",
    subtitle:
      "Enter the movement, discover what is being created and find your place in the next wave.",
  },
};

export function PublicFoundationPage({
  page,
}: {
  page: FoundationPage;
}) {
  const content = pageContent[page];

  const stateTitle =
    page === "/join"
      ? "The next wave is taking shape."
      : page === "/season-one"
        ? "The first chapter is being prepared."
        : "This space is opening in stages.";

  const stateDescription =
    page === "/season-one"
      ? "Season One will become active when its experience, timing and participation details are officially ready."
      : "UNWAVES is being built as a living movement. This space will become more useful as experiences, people and stories enter it.";

  return (
    <main className="min-h-screen bg-background">
      <section className="relative overflow-hidden px-5 pb-20 pt-36 sm:px-8 md:pb-28">
        <div className="aurora-bg opacity-45" />

        <div className="relative mx-auto max-w-6xl">
          <FoundationIntro {...content} />
        </div>
      </section>

      <Section>
        <FoundationState
          eyebrow="THE NEXT WAVE"
          title={stateTitle}
          description={stateDescription}
          icon={<Sparkles className="h-6 w-6" />}
        />
      </Section>

      {page === "/experiences" && (
        <Section>
          <SectionHeading
            eyebrow="THE ECOSYSTEM"
            title="One movement. Many ways in."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Explore",
                text: "Find a new angle on the ordinary.",
                to: "/daily-waves" as FoundationPage,
                icon: Compass,
              },
              {
                title: "Create",
                text: "Turn an idea into something real.",
                to: "/missions" as FoundationPage,
                icon: Sparkles,
              },
              {
                title: "Connect",
                text: "Meet people moving with you.",
                to: "/community" as FoundationPage,
                icon: Users,
              },
              {
                title: "Share",
                text: "Give your work a place to land.",
                to: "/showcase" as FoundationPage,
                icon: Waves,
              },
            ].map(({ title, text, to, icon: Icon }) => (
              <Link
                key={title}
                to={to}
                className="glass group rounded-3xl p-6 transition-colors hover:border-white/20"
              >
                <Icon className="h-5 w-5 text-accent" />

                <h2 className="mt-8 text-lg font-bold">{title}</h2>

                <p className="mt-2 text-sm text-muted-foreground">{text}</p>

                <ArrowUpRight className="mt-6 h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </Section>
      )}

      <Section>
        <CTABanner title="Find your place in the next wave." />
      </Section>
    </main>
  );
}

export function FoundationIntro({
  eyebrow,
  title,
  subtitle,
}: PageContent) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
        {eyebrow}
      </p>

      <h1 className="mt-6 font-display text-5xl font-bold tracking-[-0.055em] sm:text-6xl md:text-7xl">
        {title}
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
        {subtitle}
      </p>
    </div>
  );
}
