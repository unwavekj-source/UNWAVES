import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Globe2,
  Handshake,
  Heart,
  MessageCircle,
  Radio,
  Sparkles,
  UserPlus,
  Users,
} from "lucide-react";
import { Reveal } from "@/components/site/Section";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      {
        title: "Community — UNWAVES",
      },
      {
        name: "description",
        content:
          "Meet people, share ideas, create together and become part of the UNWAVES movement.",
      },
      {
        property: "og:title",
        content: "Community — UNWAVES",
      },
      {
        property: "og:description",
        content:
          "A movement becomes real when people bring their ideas, stories and energy into it.",
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
  component: CommunityPage,
});

function WaveTrail({
  className = "",
  reverse = false,
}: {
  className?: string;
  reverse?: boolean;
}) {
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute h-px w-[480px] bg-gradient-to-r from-transparent via-[#FF2FA6] to-[#FFC700] opacity-50 ${className}`}
      animate={{
        x: reverse ? [0, -90, 0] : [0, 90, 0],
        opacity: [0.12, 0.5, 0.12],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

const pillars = [
  {
    number: "01",
    title: "MEET",
    description:
      "Find people who are exploring, creating and moving through their own version of what comes next.",
    icon: Users,
  },
  {
    number: "02",
    title: "SHARE",
    description:
      "A thought, a story, an idea, a failure or a tiny win. What you share can become someone else's spark.",
    icon: MessageCircle,
  },
  {
    number: "03",
    title: "CREATE",
    description:
      "Turn conversations into collaborations and ideas into things people can actually experience.",
    icon: Sparkles,
  },
  {
    number: "04",
    title: "SUPPORT",
    description:
      "Celebrate other people's work. Vote, comment, encourage and help someone else move forward.",
    icon: Heart,
  },
];

const communityMoments = [
  {
    label: "DISCOVER",
    title: "Find your people.",
    text: "Not everyone around you has to think like you. The right people simply need to make you curious.",
    icon: Globe2,
  },
  {
    label: "CONNECT",
    title: "Start a conversation.",
    text: "A comment can become a conversation. A conversation can become a collaboration.",
    icon: MessageCircle,
  },
  {
    label: "COLLABORATE",
    title: "Make something together.",
    text: "Different perspectives become interesting when they have something to build.",
    icon: Handshake,
  },
];

const participationModes = [
  {
    title: "Participant",
    text: "Join an experience and see where it takes you.",
  },
  {
    title: "Creator",
    text: "Bring an idea, format or perspective to the community.",
  },
  {
    title: "Collaborator",
    text: "Find people and build something together.",
  },
  {
    title: "Community Builder",
    text: "Help make the space better for everyone else.",
  },
];

function CommunityPage() {
  return (
    <main className="relative overflow-hidden bg-background text-foreground">
      {/* HERO */}
      <section className="relative flex min-h-[90vh] items-center overflow-hidden px-5 py-28 sm:px-8">
        <WaveTrail className="left-[-120px] top-[30%] rotate-[14deg]" />

        <WaveTrail
          className="right-[-120px] bottom-[25%] rotate-[-16deg]"
          reverse
        />

        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[8%] top-[20%] h-80 w-80 rounded-full bg-[#FF2FA6]/10 blur-[130px]" />
          <div className="absolute right-[5%] top-[35%] h-96 w-96 rounded-full bg-[#6D3CFF]/10 blur-[150px]" />
          <div className="absolute bottom-[-10%] left-[45%] h-72 w-72 rounded-full bg-[#FF7A00]/6 blur-[130px]" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              UNWAVES / COMMUNITY
            </p>

            <h1 className="mt-7 max-w-6xl font-display text-6xl font-bold leading-[0.88] tracking-[-0.06em] sm:text-7xl md:text-8xl lg:text-[9rem]">
              A WAVE IS
              <br />
              <span className="text-gradient">NEVER ONE.</span>
            </h1>

            <p className="mt-9 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
              UNWAVES grows because people bring something to it.
              <br />
              Their ideas.
              <br />
              Their stories.
              <br />
              Their energy.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-14 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <ArrowDown className="h-4 w-4 animate-bounce" />
              Meet the movement
            </div>
          </Reveal>
        </div>
      </section>

      {/* INTRO */}
      <section className="relative border-y border-white/10 px-5 py-28 sm:px-8 md:py-36">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <Reveal>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#FFC700]">
                PEOPLE FIRST
              </p>

              <h2 className="mt-5 max-w-xl font-display text-4xl font-bold tracking-[-0.045em] sm:text-5xl">
                UNWAVES isn&apos;t a place to watch from the sidelines.
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="max-w-2xl">
              <p className="text-xl leading-9 text-foreground/90">
                It becomes what the people inside it make it.
              </p>

              <p className="mt-6 leading-8 text-muted-foreground">
                Someone starts a conversation.
                <br />
                Someone shares an idea.
                <br />
                Someone creates something unexpected.
                <br />
                Someone else sees it and thinks,
                <span className="text-foreground">
                  {" "}
                  &ldquo;I want to try that.&rdquo;
                </span>
                <br />
                <br />
                That&apos;s how a community moves.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PILLARS */}
      <section className="relative px-5 py-28 sm:px-8 md:py-40">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                THE COMMUNITY
              </p>

              <h2 className="mt-5 font-display text-4xl font-bold tracking-[-0.045em] sm:text-5xl md:text-6xl">
                Four ways to
                <br />
                <span className="text-gradient">move together.</span>
              </h2>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;

              return (
                <Reveal key={pillar.number} delay={index * 0.08}>
                  <article className="group relative h-full overflow-hidden rounded-[2rem] border border-white/10 bg-card p-8 transition-all duration-500 hover:-translate-y-1 hover:border-white/20 sm:p-10">
                    <div className="pointer-events-none absolute right-[-70px] top-[-70px] h-44 w-44 rounded-full bg-[#6D3CFF]/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="relative">
                      <div className="flex items-start justify-between">
                        <span className="font-display text-5xl font-bold tracking-[-0.05em] text-foreground/10">
                          {pillar.number}
                        </span>

                        <div className="grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-white/[0.04]">
                          <Icon className="h-5 w-5 text-[#FFC700]" />
                        </div>
                      </div>

                      <h3 className="mt-16 font-display text-3xl font-bold">
                        {pillar.title}
                      </h3>

                      <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
                        {pillar.description}
                      </p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* COMMUNITY FLOW */}
      <section className="relative overflow-hidden border-y border-white/10 px-5 py-28 sm:px-8 md:py-36">
        <WaveTrail className="left-[-100px] top-[45%]" />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#6D3CFF]/[0.06] via-transparent to-[#FF2FA6]/[0.06]" />

        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#FF2FA6]">
                HOW CONNECTION HAPPENS
              </p>

              <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-bold tracking-[-0.045em] sm:text-5xl md:text-6xl">
                One small interaction
                <br />
                can change the direction.
              </h2>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {communityMoments.map((moment, index) => {
              const Icon = moment.icon;

              return (
                <Reveal key={moment.label} delay={index * 0.1}>
                  <article className="relative h-full rounded-[2rem] border border-white/10 bg-card p-7">
                    <Icon className="h-7 w-7 text-[#FFC700]" />

                    <p className="mt-12 text-[10px] font-bold uppercase tracking-[0.25em] text-[#FF2FA6]">
                      {moment.label}
                    </p>

                    <h3 className="mt-3 font-display text-2xl font-bold">
                      {moment.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-muted-foreground">
                      {moment.text}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* NOT A COUNTER */}
      <section className="relative px-5 py-28 sm:px-8 md:py-40">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <Reveal>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                NOT A COUNTER
              </p>

              <h2 className="mt-5 font-display text-5xl font-bold tracking-[-0.05em] sm:text-6xl">
                We don&apos;t want
                <br />
                to become
                <br />
                <span className="text-foreground/25">just another number.</span>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="rounded-[2rem] border border-white/10 bg-card p-8 sm:p-10">
              <p className="text-lg leading-8 text-foreground/90">
                A community isn&apos;t defined by how many people joined.
              </p>

              <p className="mt-6 leading-8 text-muted-foreground">
                It&apos;s defined by what happens between them.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Someone feels seen.",
                  "Someone discovers a new idea.",
                  "Someone finds a collaborator.",
                  "Someone tries something for the first time.",
                ].map((line) => (
                  <div key={line} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FFC700]" />

                    <span className="text-sm text-muted-foreground">
                      {line}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PARTICIPATION */}
      <section className="relative border-t border-white/10 px-5 py-28 sm:px-8 md:py-36">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#FFC700]">
                  YOU CAN START ANYWHERE
                </p>

                <h2 className="mt-5 font-display text-4xl font-bold tracking-[-0.045em] sm:text-5xl">
                  No fixed role.
                </h2>
              </div>

              <p className="max-w-md text-sm leading-7 text-muted-foreground">
                Today you might participate. Tomorrow you might create.
                Eventually, you might help someone else find their way in.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-3 md:grid-cols-2">
            {participationModes.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.07}>
                <article className="group flex items-center gap-5 rounded-3xl border border-white/10 bg-card p-6 transition duration-300 hover:-translate-y-0.5 hover:border-white/20">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.03]">
                    <UserPlus className="h-5 w-5 text-[#FF2FA6]" />
                  </div>

                  <div>
                    <h3 className="font-display font-semibold">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {item.text}
                    </p>
                  </div>

                  <ArrowRight className="ml-auto hidden h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 sm:block" />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITY WALL */}
      <section className="relative overflow-hidden px-5 py-28 sm:px-8 md:py-40">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(109,60,255,0.12),transparent_35%)]" />

        <div className="relative mx-auto max-w-5xl text-center">
          <Reveal>
            <Radio className="mx-auto h-8 w-8 text-[#FFC700]" />

            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              THE COMMUNITY WALL
            </p>

            <h2 className="mt-5 font-display text-4xl font-bold tracking-[-0.045em] sm:text-5xl md:text-6xl">
              The best part
              <br />
              <span className="text-gradient">hasn&apos;t been written yet.</span>
            </h2>

            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">
              Stories, conversations, collaborations and unexpected moments
              will slowly become part of the memory of UNWAVES.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
              {["YOUR IDEA", "YOUR STORY", "YOUR PEOPLE", "YOUR MOMENT"].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-card px-4 py-6 text-[10px] font-semibold tracking-[0.18em] text-muted-foreground"
                  >
                    {item}
                  </div>
                ),
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative border-t border-white/10 px-5 py-32 sm:px-8 md:py-44">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[70%] bg-gradient-to-t from-[#6D3CFF]/10 via-transparent to-transparent" />

        <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-white/10 bg-card p-8 text-center sm:p-14">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              YOUR TURN
            </p>

            <h2 className="mt-5 font-display text-5xl font-bold tracking-[-0.05em] sm:text-6xl md:text-7xl">
              DON&apos;T JUST
              <br />
              <span className="text-gradient">FIND THE WAVE.</span>
              <br />
              MAKE IT.
            </h2>

            <p className="mx-auto mt-7 max-w-xl leading-8 text-muted-foreground">
              There is no perfect way to enter UNWAVES.
              <br />
              Start with whatever feels like you.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link
                to="/join"
                className="group inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-4 text-sm font-semibold text-background transition duration-300 hover:-translate-y-0.5"
              >
                Join UNWAVES
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to="/experiences"
                className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-7 py-4 text-sm font-semibold transition duration-300 hover:border-white/20 hover:bg-white/[0.06]"
              >
                Explore Experiences
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SIGNATURE */}
      <section className="border-t border-white/10 px-5 py-12 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="font-display text-sm font-semibold tracking-[0.18em]">
            UNWAVES
          </p>

          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            ONE WAVE. MANY STORIES.
          </p>
        </div>
      </section>
    </main>
  );
}
