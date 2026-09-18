import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  Check,
  CircleDot,
  Lightbulb,
  Rocket,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/missions")({
  head: () => ({
    meta: [
      { title: "Missions — UNWAVES" },
      {
        name: "description",
        content:
          "Team-based creative missions for people who want to think differently, build together and make something real.",
      },
      {
        property: "og:title",
        content: "Missions — UNWAVES",
      },
      {
        property: "og:description",
        content:
          "Think differently. Build together. Make something real.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
  }),
  component: MissionsPage,
});

const missions = [
  {
    number: "01",
    title: "THE REFRAME",
    subtitle: "SEE DIFFERENTLY",
    description:
      "Take an ordinary real-world problem and look at it from a completely different angle. Find the opportunity hidden inside the problem.",
    output: ["IDEA", "VISUAL", "PRESENTATION"],
    icon: Lightbulb,
    accent: "violet",
  },
  {
    number: "02",
    title: "THE BUILD",
    subtitle: "MAKE IT REAL",
    description:
      "Turn an idea into something people can actually experience — a prototype, campaign, game, website, tool or completely unexpected creation.",
    output: ["PROTOTYPE", "EXPERIENCE"],
    icon: Rocket,
    accent: "pink",
  },
  {
    number: "03",
    title: "THE IMPOSSIBLE BRIEF",
    subtitle: "CREATE UNDER PRESSURE",
    description:
      "A constraint-heavy challenge designed to test how far your team can go when time, resources and assumptions are deliberately limited.",
    output: ["EXECUTION", "STORY"],
    icon: Zap,
    accent: "gold",
  },
] as const;

const roles = [
  {
    title: "Thinker",
    description: "Questions the obvious and finds the direction.",
  },
  {
    title: "Maker",
    description: "Turns ideas into something people can see or use.",
  },
  {
    title: "Storyteller",
    description: "Makes the idea understandable, memorable and exciting.",
  },
  {
    title: "Connector",
    description: "Keeps people aligned and brings the team together.",
  },
  {
    title: "Finisher",
    description: "Makes sure the final idea actually gets across the line.",
  },
] as const;

const lifecycle = [
  "TEASE",
  "REVEAL",
  "BUILD",
  "SUBMIT",
  "REVIEW",
  "SHOWCASE",
  "AUDIENCE VOTE",
  "JURY",
  "RESULT",
  "RECOGNITION",
] as const;

const judgingCriteria = [
  { label: "Creativity", value: "20%" },
  { label: "Originality", value: "15%" },
  { label: "Problem Understanding", value: "15%" },
  { label: "Execution", value: "20%" },
  { label: "Teamwork", value: "10%" },
  { label: "Presentation", value: "10%" },
  { label: "Impact", value: "10%" },
] as const;

function MissionLine() {
  return (
    <div className="relative my-10 h-px overflow-hidden bg-white/10">
      <motion.div
        initial={{ x: "-100%" }}
        whileInView={{ x: "100%" }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 2.4, ease: "easeInOut" }}
        className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-[#6D3CFF] to-transparent"
      />
    </div>
  );
}

function MissionsPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      {/* HERO */}
      <section className="relative isolate px-5 pb-24 pt-32 sm:px-8 sm:pb-32 sm:pt-40">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[8%] top-[12%] h-72 w-72 rounded-full bg-[#6D3CFF]/10 blur-[120px]" />
          <div className="absolute right-[4%] top-[20%] h-80 w-80 rounded-full bg-[#FF2FA6]/8 blur-[130px]" />
        </div>

        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-accent">
              <span className="h-2 w-2 rounded-full bg-[#FF2FA6]" />
              UNWAVES / MISSIONS
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="max-w-5xl font-display text-5xl font-bold leading-[0.92] tracking-[-0.055em] sm:text-7xl lg:text-8xl">
              DON&apos;T JUST
              <br />
              <span className="text-gradient">PARTICIPATE.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
              Missions are where people come together to think differently,
              build something real and leave something behind.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/register"
                className="group inline-flex items-center gap-3 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-transform duration-300 hover:-translate-y-0.5"
              >
                Enter the missions
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/experiences"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-white/20 hover:text-foreground"
              >
                Explore experiences
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHAT IS A MISSION */}
      <section className="border-y border-white/10 bg-white/[0.015] px-5 py-24 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <Reveal>
              <div>
                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-[#FF7A00]">
                  WHAT IS A MISSION?
                </p>

                <h2 className="max-w-xl font-display text-4xl font-bold tracking-[-0.045em] sm:text-6xl">
                  A reason
                  <br />
                  <span className="text-gradient">to move together.</span>
                </h2>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="max-w-2xl">
                <p className="text-lg leading-8 text-muted-foreground">
                  A UNWAVES Mission is not another competition where you
                  simply submit an answer. It is a shared challenge that
                  takes a team from an idea to an experience.
                </p>

                <div className="mt-8 flex flex-wrap gap-2">
                  {["REMOTE", "TEAM-BASED", "CREATIVE", "SEQUENTIAL"].map(
                    (item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/[0.025] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
                      >
                        {item}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* MISSIONS */}
      <section className="px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="max-w-3xl">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-[#6D3CFF]">
                THE MISSIONS
              </p>

              <h2 className="font-display text-4xl font-bold tracking-[-0.045em] sm:text-6xl">
                Three challenges.
                <br />
                <span className="text-gradient">One progression.</span>
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground">
                Each mission asks something different from you. Together,
                they form a progression from seeing differently to making
                something real.
              </p>
            </div>
          </Reveal>

          <MissionLine />

          <div className="grid gap-5 lg:grid-cols-3">
            {missions.map((mission, index) => {
              const Icon = mission.icon;

              return (
                <Reveal key={mission.number} delay={index * 0.08}>
                  <article className="group relative h-full overflow-hidden rounded-[2rem] border border-white/10 bg-card p-7 transition-all duration-500 hover:-translate-y-1 hover:border-white/20 sm:p-8">
                    <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-white/[0.025] blur-3xl transition-transform duration-700 group-hover:scale-150" />

                    <div className="relative flex h-full flex-col">
                      <div className="mb-12 flex items-center justify-between">
                        <span className="font-display text-sm font-semibold tracking-[0.18em] text-muted-foreground">
                          {mission.number}
                        </span>

                        <div
                          className={[
                            "flex h-11 w-11 items-center justify-center rounded-2xl border",
                            mission.accent === "violet"
                              ? "border-[#6D3CFF]/30 bg-[#6D3CFF]/10 text-[#8D68FF]"
                              : "",
                            mission.accent === "pink"
                              ? "border-[#FF2FA6]/30 bg-[#FF2FA6]/10 text-[#FF5FBA]"
                              : "",
                            mission.accent === "gold"
                              ? "border-[#FFC700]/30 bg-[#FFC700]/10 text-[#FFC700]"
                              : "",
                          ].join(" ")}
                        >
                          <Icon size={20} />
                        </div>
                      </div>

                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                        {mission.subtitle}
                      </p>

                      <h3 className="mt-3 font-display text-3xl font-bold tracking-[-0.04em]">
                        {mission.title}
                      </h3>

                      <p className="mt-5 flex-1 text-sm leading-7 text-muted-foreground">
                        {mission.description}
                      </p>

                      <div className="mt-8 border-t border-white/10 pt-6">
                        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                          EXPECTED OUTPUT
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {mission.output.map((item) => (
                            <span
                              key={item}
                              className="rounded-full bg-white/[0.04] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground/80"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            Mission briefs, opening windows and submission requirements will
            appear here when each mission is activated.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-y border-white/10 bg-white/[0.015] px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr]">
            <Reveal>
              <div>
                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-[#FF2FA6]">
                  THE FLOW
                </p>

                <h2 className="font-display text-4xl font-bold tracking-[-0.045em] sm:text-6xl">
                  Brief.
                  <br />
                  Build.
                  <br />
                  <span className="text-gradient">Share.</span>
                </h2>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div>
                <p className="max-w-2xl text-base leading-7 text-muted-foreground">
                  Every mission moves through a clear sequence. The details
                  may change, but the journey stays simple: create together,
                  put your work into the world and let people experience it.
                </p>

                <div className="mt-10 grid gap-3 sm:grid-cols-2">
                  {lifecycle.map((stage, index) => (
                    <div
                      key={stage}
                      className="flex items-center gap-4 rounded-2xl border border-white/10 bg-card px-5 py-4"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.05] text-[10px] font-bold text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="text-xs font-semibold uppercase tracking-[0.16em]">
                        {stage}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-[#FFC700]">
                  BUILD YOUR WAVE
                </p>

                <h2 className="font-display text-4xl font-bold tracking-[-0.045em] sm:text-6xl">
                  No perfect team.
                  <br />
                  <span className="text-gradient">Just different people.</span>
                </h2>
              </div>

              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Users size={18} />
                Recommended: 4–6 people
              </div>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-4 md:grid-cols-5">
            {roles.map((role, index) => (
              <Reveal key={role.title} delay={index * 0.06}>
                <div className="h-full rounded-3xl border border-white/10 bg-card p-6">
                  <div className="mb-8 flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.05]">
                    <CircleDot size={16} className="text-accent" />
                  </div>

                  <h3 className="font-display text-xl font-bold">
                    {role.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {role.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-8 rounded-3xl border border-white/10 bg-gradient-to-r from-[#6D3CFF]/10 via-[#FF2FA6]/5 to-[#FF7A00]/10 p-7 sm:p-9">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold">Roles are flexible.</p>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                    One person can play multiple roles. What matters is that
                    your team has different strengths and a reason to build
                    together.
                  </p>
                </div>

                <Sparkles className="hidden shrink-0 text-[#FFC700] sm:block" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* RESULTS */}
      <section className="border-y border-white/10 bg-white/[0.015] px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <div>
                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-[#FF7A00]">
                  HOW RESULTS WORK
                </p>

                <h2 className="font-display text-4xl font-bold tracking-[-0.045em] sm:text-6xl">
                  The community
                  <br />
                  <span className="text-gradient">gets a voice.</span>
                </h2>

                <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground">
                  Showcase work reaches the community before final results.
                  Audience response matters, while jury review provides a
                  second perspective.
                </p>

                <div className="mt-8 flex gap-3">
                  <div className="rounded-2xl border border-white/10 bg-card px-5 py-4">
                    <p className="font-display text-2xl font-bold">70%</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      Jury
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-card px-5 py-4">
                    <p className="font-display text-2xl font-bold">30%</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      Audience
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-[2rem] border border-white/10 bg-card p-7 sm:p-9">
                <div className="mb-7 flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    JUDGING CRITERIA
                  </p>

                  <Check size={18} className="text-[#FFC700]" />
                </div>

                <div className="space-y-1">
                  {judgingCriteria.map((criterion) => (
                    <div
                      key={criterion.label}
                      className="flex items-center justify-between border-b border-white/10 py-4 last:border-0"
                    >
                      <span className="text-sm text-foreground/85">
                        {criterion.label}
                      </span>
                      <span className="font-display text-sm font-bold">
                        {criterion.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* RECOGNITION */}
      <section className="px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-[#6D3CFF]">
                RECOGNITION
              </p>

              <h2 className="font-display text-4xl font-bold tracking-[-0.045em] sm:text-6xl">
                The work stays.
                <br />
                <span className="text-gradient">So do the stories.</span>
              </h2>

              <p className="mt-6 text-base leading-7 text-muted-foreground">
                Missions are about more than one winning submission.
                Outstanding work, creative thinking and meaningful
                contributions can all become part of the UNWAVES story.
              </p>
            </div>
          </Reveal>

          <div className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Community Showcase",
              "Audience Recognition",
              "Mission Awards",
              "Hall of Fame",
            ].map((item, index) => (
              <Reveal key={item} delay={index * 0.06}>
                <div className="rounded-3xl border border-white/10 bg-card p-6 text-center">
                  <div className="mx-auto mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.05]">
                    <Sparkles size={17} className="text-[#FF7A00]" />
                  </div>

                  <h3 className="font-display text-lg font-bold">{item}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden px-5 pb-24 pt-10 sm:px-8 sm:pb-32">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[70%] bg-gradient-to-t from-[#6D3CFF]/10 via-transparent to-transparent" />

        <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-white/10 bg-card p-8 text-center sm:p-14">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              YOUR MOVE
            </p>

            <h2 className="mt-5 font-display text-4xl font-bold tracking-[-0.05em] sm:text-6xl">
              Ready to make
              <br />
              <span className="text-gradient">your wave?</span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-muted-foreground">
              UNWAVES Missions open when the next wave begins. Until then,
              explore the movement and find where you want to enter.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link
                to="/join"
                className="group inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-transform duration-300 hover:-translate-y-0.5"
              >
                Join UNWAVES
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/experiences"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-7 py-3.5 text-sm font-medium text-muted-foreground transition-colors hover:border-white/20 hover:text-foreground"
              >
                Back to Experiences
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SIGNATURE */}
      <section className="border-t border-white/10 px-5 py-12 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-sm font-semibold tracking-[0.16em]">
            THINK · BUILD · SHARE
          </p>

          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            ONE WAVE. MANY STORIES.
          </p>
        </div>
      </section>
    </main>
  );
}
