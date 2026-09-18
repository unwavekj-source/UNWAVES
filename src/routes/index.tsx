import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Compass,
  Heart,
  Sparkles,
  Target,
  Users,
  Waves,
} from "lucide-react";

import { Reveal } from "@/components/site/Section";
import { BrandMark } from "@/components/site/BrandLogo";

const title = "UNWAVES — One Wave. Many Stories.";
const description =
  "UNWAVES is a movement of people, ideas and experiences for those who want to explore beyond the expected.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

/* =========================================================
   WAVE TRAIL
========================================================= */

function WaveLine({
  className = "",
  delay = 0,
  flip = false,
}: {
  className?: string;
  delay?: number;
  flip?: boolean;
}) {
  const gradientId = `unwaves-home-wave-${Math.round(delay * 1000)}`;

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute ${className}`}
      initial={{ opacity: 0, scaleX: 0.72 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 1.4,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <svg
        viewBox="0 0 900 220"
        fill="none"
        className={`h-full w-full overflow-visible ${
          flip ? "scale-y-[-1]" : ""
        }`}
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="0"
            y1="0"
            x2="900"
            y2="220"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              offset="0"
              stopColor="var(--unwaves-violet)"
              stopOpacity="0"
            />
            <stop
              offset="0.3"
              stopColor="var(--unwaves-violet)"
            />
            <stop
              offset="0.58"
              stopColor="var(--unwaves-magenta)"
            />
            <stop
              offset="0.8"
              stopColor="var(--unwaves-orange)"
            />
            <stop
              offset="1"
              stopColor="var(--unwaves-yellow)"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>

        <path
          d="M-50 165C90 30 205 225 350 112C490 2 575 125 700 76C785 42 845 55 950 12"
          stroke={`url(#${gradientId})`}
          strokeWidth="2"
          strokeLinecap="round"
        />

        <path
          d="M-40 190C95 65 210 250 365 138C500 40 590 150 715 100C800 66 860 75 950 36"
          stroke={`url(#${gradientId})`}
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.22"
        />
      </svg>
    </motion.div>
  );
}

/* =========================================================
   SMALL LABEL
========================================================= */

function NumberLabel({ number }: { number: string }) {
  return (
    <span className="text-[10px] font-semibold tracking-[0.28em] text-muted-foreground/50">
      {number}
    </span>
  );
}

/* =========================================================
   HOME
========================================================= */

function Home() {
  return (
    <main className="page-atmosphere overflow-hidden text-foreground">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden px-5 pb-20 pt-28 sm:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(109,60,255,0.13),transparent_32%),radial-gradient(circle_at_78%_68%,rgba(255,47,166,0.07),transparent_28%),radial-gradient(circle_at_15%_80%,rgba(255,122,0,0.05),transparent_25%)]"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "linear-gradient(to bottom, transparent, black 25%, black 70%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 25%, black 70%, transparent)",
          }}
        />

        <WaveLine
          className="left-[-30%] top-[18%] h-[300px] w-[1000px] rotate-[-8deg] opacity-70 sm:left-[-12%]"
          delay={0}
        />

        <WaveLine
          className="right-[-34%] top-[53%] h-[280px] w-[1000px] rotate-[7deg] opacity-45"
          delay={0.2}
          flip
        />

        <div className="relative mx-auto w-full max-w-6xl">
          <div className="mx-auto max-w-5xl text-center">
            <Reveal>
              <div className="glass mx-auto inline-flex items-center gap-3 rounded-full px-4 py-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-50" />
                  <span className="relative h-2 w-2 rounded-full bg-accent" />
                </span>

                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground sm:text-xs">
                  A MOVEMENT OF PEOPLE, IDEAS & EXPERIENCES
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="relative mt-9">
                <div
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[90px] sm:h-80 sm:w-80"
                />

                <BrandMark className="relative mx-auto mb-5 h-24 w-auto sm:h-32" />

                <h1 className="brand-wordmark relative text-[clamp(4.2rem,14vw,10.5rem)] leading-[0.82] tracking-[-0.03em]">
                  <span className="text-foreground">UN</span>
                  <span className="wave-text">WAVES</span>
                </h1>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-8 text-sm font-semibold uppercase tracking-[0.28em] text-foreground/75 sm:text-base sm:tracking-[0.42em]">
                ONE WAVE. MANY STORIES.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                A movement of people, ideas and experiences for those who want
                to explore beyond the expected.
              </p>
            </Reveal>

            <Reveal delay={0.34}>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Link
                  to="/experiences"
                  className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_50px_rgba(255,255,255,.12)]"
                >
                  Explore UNWAVES
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/join"
                  className="glass group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40"
                >
                  Enter the movement
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.45}>
              <div className="mt-12 flex items-center justify-center gap-3 text-[10px] font-medium tracking-[0.28em] text-muted-foreground/45 sm:text-xs">
                <span>REIMAGINE</span>
                <span className="text-primary">•</span>
                <span>REFRESH</span>
                <span className="text-accent">•</span>
                <span>RISE</span>
              </div>
            </Reveal>
          </div>
        </div>

        <motion.a
          href="#what"
          aria-label="Scroll to what UNWAVES is"
          className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground/30"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-[9px] uppercase tracking-[0.3em]">
            Discover
          </span>

          <ArrowDown className="h-4 w-4" />
        </motion.a>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-background to-transparent"
        />
      </section>

      {/* =====================================================
          WHAT IS UNWAVES
      ===================================================== */}

      <section
        id="what"
        className="relative px-5 py-24 sm:px-8 md:py-32"
      >
        <WaveLine
          className="right-[-35%] top-[8%] h-[250px] w-[900px] opacity-25"
          delay={0.1}
        />

        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <NumberLabel number="01 / WHAT IS UNWAVES" />

            <h2 className="mt-6 max-w-5xl font-display text-4xl font-bold leading-[1.02] tracking-[-0.05em] sm:text-6xl md:text-7xl">
              A space between
              <span className="text-muted-foreground/25">
                {" "}
                where you are
              </span>
              <br />
              and what comes next.
            </h2>

            <p className="mt-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              UNWAVES is a movement built around people, ideas and experiences.
              A place to pause the usual pressure, explore something different,
              meet people and create moments that stay with you.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: Sparkles,
                title: "REIMAGINE",
                text: "Look at familiar things differently. Curiosity comes first.",
              },
              {
                icon: Waves,
                title: "REFRESH",
                text: "Step outside the rhythm you've been repeating.",
              },
              {
                icon: ArrowUpRight,
                title: "RISE",
                text: "Carry something from the experience into what comes next.",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.title} delay={index * 0.1}>
                  <div className="glass-hover group relative h-full overflow-hidden rounded-[2rem] p-7">
                    <div
                      aria-hidden="true"
                      className="absolute right-[-20px] top-[-20px] h-32 w-32 rounded-full bg-primary/[0.04] blur-2xl transition-all duration-500 group-hover:bg-primary/[0.09]"
                    />

                    <Icon className="relative h-6 w-6 text-foreground/70" />

                    <h3 className="relative mt-8 font-display text-xl font-bold tracking-tight">
                      {item.title}
                    </h3>

                    <p className="relative mt-3 text-sm leading-6 text-muted-foreground">
                      {item.text}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          THE FOUR DOORS
      ===================================================== */}

      <section className="relative border-y border-border/60 px-5 py-24 sm:px-8 md:py-32">
        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <NumberLabel number="02 / THE MOVEMENT" />

            <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_.75fr] lg:items-end">
              <div>
                <h2 className="font-display text-5xl font-bold leading-[0.92] tracking-[-0.055em] sm:text-7xl">
                  Four ways
                  <br />
                  <span className="text-gradient">
                    to enter the wave.
                  </span>
                </h2>
              </div>

              <p className="max-w-lg text-base leading-7 text-muted-foreground">
                UNWAVES is not one experience. It is a growing universe with
                different doors into the movement.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-px overflow-hidden rounded-[2rem] border border-border/60 bg-border/50 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                number: "01",
                icon: Waves,
                heading: "WAVES",
                text: "The why behind the movement.",
                href: "/waves",
              },
              {
                number: "02",
                icon: Sparkles,
                heading: "EXPERIENCES",
                text: "Things you can enter.",
                href: "/experiences",
              },
              {
                number: "03",
                icon: Target,
                heading: "MISSIONS",
                text: "Things you can create.",
                href: "/missions",
              },
              {
                number: "04",
                icon: Users,
                heading: "COMMUNITY",
                text: "People moving together.",
                href: "/community",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.heading} delay={index * 0.06}>
                  <Link
                    to={item.href}
                    className="group block h-full bg-background p-7 transition-colors duration-300 hover:bg-secondary sm:p-8"
                  >
                    <div className="flex items-center justify-between">
                      <NumberLabel number={item.number} />

                      <Icon className="h-4 w-4 text-muted-foreground/35 transition-colors group-hover:text-accent" />
                    </div>

                    <h3 className="mt-14 font-display text-xl font-bold tracking-tight">
                      {item.heading}
                    </h3>

                    <p className="mt-2 text-sm text-muted-foreground">
                      {item.text}
                    </p>

                    <div className="mt-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground/50 transition-colors group-hover:text-foreground">
                      Enter
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          EXPERIENCES
      ===================================================== */}

      <section className="relative px-5 py-24 sm:px-8 md:py-36">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />

        <WaveLine
          className="left-[-30%] top-[25%] h-[330px] w-[1050px] opacity-35"
          delay={0.2}
        />

        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <NumberLabel number="03 / EXPERIENCES" />

            <div className="mt-8 max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
                Explore • create • connect
              </p>

              <h2 className="mt-5 font-display text-5xl font-bold leading-[0.9] tracking-[-0.06em] sm:text-7xl md:text-8xl">
                ENTER
                <span className="text-gradient"> SOMETHING</span>
                <br />
                DIFFERENT.
              </h2>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">
                Experiences are the moments where UNWAVES becomes real —
                through creativity, participation, conversation and discovery.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-4 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "DAILY WAVES",
                text: "Small optional experiences for ordinary days.",
                href: "/daily-waves",
                icon: Waves,
              },
              {
                number: "02",
                title: "MISSIONS",
                text: "Bigger collaborative challenges built around making.",
                href: "/missions",
                icon: Target,
              },
              {
                number: "03",
                title: "LIVE & STORIES",
                text: "Conversations, moments and stories from the community.",
                href: "/live",
                icon: Heart,
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.number} delay={index * 0.08}>
                  <Link
                    to={item.href}
                    className="glass-hover group block h-full rounded-[1.75rem] p-7"
                  >
                    <div className="flex items-center justify-between">
                      <NumberLabel number={item.number} />

                      <Icon className="h-5 w-5 text-muted-foreground/35 transition-colors group-hover:text-accent" />
                    </div>

                    <h3 className="mt-12 font-display text-xl font-bold">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {item.text}
                    </p>

                    <div className="mt-7 flex items-center gap-2 text-sm font-semibold">
                      Explore
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          DAILY WAVES
      ===================================================== */}

      <section className="relative px-5 py-24 sm:px-8 md:py-32">
        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <NumberLabel number="04 / DAILY WAVES" />

            <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_.7fr] lg:items-end">
              <h2 className="font-display text-4xl font-bold leading-[0.95] tracking-[-0.05em] sm:text-6xl">
                One small wave.
                <br />
                <span className="text-muted-foreground/25">
                  Every day.
                </span>
              </h2>

              <p className="max-w-lg text-base leading-7 text-muted-foreground">
                Small prompts designed to help you pause, notice, create and
                connect. No leaderboard. No pressure.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="glass relative mt-14 overflow-hidden rounded-[2rem] p-7 sm:p-10">
              <WaveLine
                className="right-[-30%] top-[5%] h-[240px] w-[800px] opacity-30"
                delay={0.4}
              />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <NumberLabel number="DAILY WAVE" />

                  <span className="rounded-full border border-border px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-muted-foreground/60">
                    Coming soon
                  </span>
                </div>

                <h3 className="mt-14 font-display text-3xl font-bold tracking-tight sm:text-5xl">
                  MAKE YOUR WAVE
                </h3>

                <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
                  A small invitation to create something that represents where
                  you are — and where you want to go next.
                </p>

                <div className="mt-8 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground/60">
                  <span className="rounded-full border border-border px-3 py-1.5">
                    OPTIONAL
                  </span>

                  <span className="rounded-full border border-border px-3 py-1.5">
                    NO RIGHT ANSWER
                  </span>

                  <span className="rounded-full border border-border px-3 py-1.5">
                    MAKE IT YOURS
                  </span>
                </div>

                <Link
                  to="/daily-waves"
                  className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-accent"
                >
                  Explore Daily Waves
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          MISSIONS
      ===================================================== */}

      <section className="relative border-y border-border/60 px-5 py-24 sm:px-8 md:py-32">
        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <NumberLabel number="05 / MISSIONS" />

            <h2 className="mt-6 max-w-4xl font-display text-4xl font-bold leading-[0.95] tracking-[-0.05em] sm:text-6xl">
              Some waves
              <span className="text-muted-foreground/25">
                {" "}
                are bigger.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground">
              Missions are where people stop consuming and start creating
              together.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-4">
            {[
              {
                number: "01",
                title: "THE REFRAME",
                tagline: "SEE THE ORDINARY DIFFERENTLY.",
                text: "Reframe an ordinary problem into an unexpected possibility.",
              },
              {
                number: "02",
                title: "THE BUILD",
                tagline: "DON'T JUST IMAGINE IT. MAKE IT.",
                text: "Turn an idea into something people can actually experience.",
              },
              {
                number: "03",
                title: "THE IMPOSSIBLE BRIEF",
                tagline: "CONSTRAINTS CREATE UNEXPECTED IDEAS.",
                text: "Create under a brief designed to push the team beyond the obvious.",
              },
            ].map((mission, index) => (
              <Reveal key={mission.number} delay={index * 0.08}>
                <Link
                  to="/missions"
                  className="glass-hover group relative block overflow-hidden rounded-[1.75rem] p-7 sm:p-9"
                >
                  <div
                    aria-hidden="true"
                    className="absolute right-[-100px] top-[-100px] h-64 w-64 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  />

                  <div className="relative grid gap-8 md:grid-cols-[100px_1fr_auto] md:items-center">
                    <NumberLabel number={mission.number} />

                    <div>
                      <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                        {mission.title}
                      </h3>

                      <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
                        {mission.tagline}
                      </p>

                      <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
                        {mission.text}
                      </p>
                    </div>

                    <ArrowUpRight className="hidden h-5 w-5 text-muted-foreground/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground/70 md:block" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          COMMUNITY
      ===================================================== */}

      <section className="relative px-5 py-24 sm:px-8 md:py-32">
        <WaveLine
          className="left-[-30%] top-[15%] h-[280px] w-[950px] opacity-25"
          delay={0.3}
        />

        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <NumberLabel number="06 / COMMUNITY" />

            <div className="mt-6 max-w-4xl">
              <h2 className="font-display text-4xl font-bold leading-[0.95] tracking-[-0.05em] sm:text-6xl">
                A wave is
                <span className="text-muted-foreground/25">
                  {" "}
                  never one person.
                </span>
              </h2>

              <p className="mt-7 max-w-2xl text-base leading-7 text-muted-foreground">
                UNWAVES grows through people who bring their ideas, creativity,
                stories and energy into the movement.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Users,
                title: "PEOPLE",
                text: "Meet people moving in their own direction.",
              },
              {
                icon: Sparkles,
                title: "IDEAS",
                text: "Give ideas room to become something real.",
              },
              {
                icon: Heart,
                title: "STORIES",
                text: "Share the moments that become part of the journey.",
              },
              {
                icon: Compass,
                title: "EXPLORERS",
                text: "Discover something you didn't expect.",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.title} delay={index * 0.07}>
                  <Link
                    to="/community"
                    className="glass-hover block rounded-[1.5rem] p-6"
                  >
                    <Icon className="h-5 w-5 text-foreground/60" />

                    <h3 className="mt-10 font-display text-sm font-bold tracking-tight">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm text-muted-foreground">
                      {item.text}
                    </p>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.25}>
            <div className="mt-12">
              <Link
                to="/community"
                className="group inline-flex items-center gap-2 text-sm font-semibold"
              >
                Discover the community
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          PHILOSOPHY
      ===================================================== */}

      <section className="relative flex min-h-[70svh] items-center justify-center overflow-hidden px-5 py-24 sm:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(109,60,255,0.09),transparent_35%),radial-gradient(circle_at_70%_35%,rgba(255,47,166,0.05),transparent_25%)]"
        />

        <WaveLine
          className="left-[-25%] top-[35%] h-[300px] w-[1000px] opacity-35"
          delay={0.5}
        />

        <div className="relative mx-auto max-w-5xl text-center">
          <Reveal>
            <NumberLabel number="07 / THE PHILOSOPHY" />

            <div className="mt-12 space-y-2">
              <p className="font-display text-5xl font-bold tracking-[-0.06em] text-foreground/90 sm:text-7xl">
                REIMAGINE.
              </p>

              <p className="font-display text-5xl font-bold tracking-[-0.06em] text-muted-foreground/55 sm:text-7xl">
                REFRESH.
              </p>

              <p className="text-gradient font-display text-5xl font-bold tracking-[-0.06em] sm:text-7xl">
                RISE.
              </p>
            </div>

            <p className="mx-auto mt-10 max-w-lg text-sm leading-6 text-muted-foreground">
              Movement doesn't always begin with a giant decision. Sometimes
              it begins with one small wave.
            </p>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          JOIN
      ===================================================== */}

      <section className="relative px-5 pb-28 pt-10 sm:px-8 md:pb-40">
        <div className="glass relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] px-7 py-16 text-center sm:px-12 sm:py-24">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]"
          />

          <WaveLine
            className="left-[-25%] top-[30%] h-[260px] w-[1000px] opacity-30"
            delay={0.6}
          />

          <div className="relative">
            <NumberLabel number="08 / JOIN" />

            <h2 className="mx-auto mt-7 max-w-3xl font-display text-4xl font-bold leading-[0.95] tracking-[-0.05em] sm:text-6xl">
              Don't just watch
              <span className="text-gradient"> the wave.</span>
              <br />
              Create it.
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-muted-foreground">
              Find your place in UNWAVES. Explore the movement, discover an
              experience and become part of what comes next.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link
                to="/join"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-all duration-300 hover:-translate-y-0.5"
              >
                Join UNWAVES
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>

              <Link
                to="/experiences"
                className="glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:border-accent/40"
              >
                Explore experiences
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FOOTER STATEMENT
      ===================================================== */}

      <div className="border-t border-border/60 px-5 py-10 text-center sm:px-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground/30">
          ONE WAVE. MANY STORIES.
        </p>
      </div>
    </main>
  );
}
