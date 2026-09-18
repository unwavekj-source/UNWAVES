import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  Compass,
  RefreshCw,
  Sparkles,
  TrendingUp,
  Users,
  Waves,
} from "lucide-react";

export const Route = createFileRoute("/waves")({
  head: () => ({
    meta: [
      {
        title: "Waves — UNWAVES",
      },
      {
        name: "description",
        content:
          "Discover why UNWAVES exists — a movement of people, ideas and experiences.",
      },
      {
        property: "og:title",
        content: "Waves — UNWAVES",
      },
      {
        property: "og:description",
        content:
          "A movement of people, ideas and experiences. One wave. Many stories.",
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

  component: WavesPage,
});

const philosophy = [
  {
    number: "01",
    icon: Sparkles,
    title: "REIMAGINE",
    description:
      "Look at ordinary things differently. Question the expected. Give ideas room to become something more.",
  },
  {
    number: "02",
    icon: RefreshCw,
    title: "REFRESH",
    description:
      "Step outside the usual rhythm. Pause the pressure. Make space for curiosity, people and experiences that feel different.",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "RISE",
    description:
      "Take what you discover with you. Turn moments into momentum and let new possibilities shape what comes next.",
  },
];

function WavesPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative isolate px-5 pb-24 pt-28 sm:px-8 sm:pt-36">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute left-[8%] top-20 h-72 w-72 rounded-full bg-[#6D3CFF]/15 blur-[110px]" />
          <div className="absolute right-[8%] top-40 h-80 w-80 rounded-full bg-[#FF2FA6]/10 blur-[120px]" />
          <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#FF7A00]/10 blur-[130px]" />
        </div>

        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              <span className="h-px w-10 bg-gradient-to-r from-[#6D3CFF] to-[#FF2FA6]" />
              THE WHY
            </div>

            <h1 className="font-display text-5xl font-bold tracking-[-0.055em] sm:text-7xl lg:text-8xl">
              There is always
              <br />
              <span className="text-gradient">another wave.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              UNWAVES exists for the space between where you are and where you
              could go next — through people, ideas, experiences and moments
              that make the journey feel different.
            </p>
          </motion.div>

          {/* =======================================================
              BRAND STATEMENT
          ======================================================= */}

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-20 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] p-7 sm:p-10">
              <div
                aria-hidden
                className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#6D3CFF]/10 blur-[80px]"
              />

              <p className="relative text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                ONE WAVE. MANY STORIES.
              </p>

              <h2 className="relative mt-5 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
                People don't have to move in the same direction to create
                movement together.
              </h2>

              <p className="relative mt-6 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                Some people arrive with an idea. Some arrive looking for
                people. Some want to create. Some simply want to experience
                something they haven't experienced before.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] p-7 sm:p-10">
              <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6D3CFF] via-[#FF2FA6] to-[#FF7A00] shadow-[0_0_40px_-10px_rgba(255,47,166,0.65)]">
                <Waves className="h-5 w-5 text-white" />
              </div>

              <p className="font-display text-2xl font-bold">
                A movement of people,
                <br />
                ideas and experiences.
              </p>

              <p className="mt-5 text-sm leading-7 text-muted-foreground">
                Not a course. Not a club. Not another platform asking you to
                become someone else.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          PHILOSOPHY
      ========================================================= */}

      <section className="border-y border-white/[0.06] px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
              THE PHILOSOPHY
            </p>

            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-5xl">
              Three ideas.
              <br />
              One movement.
            </h2>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {philosophy.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                  }}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] p-7 transition-transform duration-500 hover:-translate-y-1 sm:p-8"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xs font-bold tracking-[0.25em] text-muted-foreground">
                      {item.number}
                    </span>

                    <Icon className="h-5 w-5 text-accent transition-transform duration-500 group-hover:rotate-12" />
                  </div>

                  <h3 className="mt-16 font-display text-2xl font-bold tracking-tight">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    {item.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          WHO IT IS FOR
      ========================================================= */}

      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
              <Users className="h-6 w-6 text-accent" />
            </div>

            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.28em] text-accent">
              WHO IS THIS FOR?
            </p>

            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-5xl">
              Anyone ready to
              <br />
              <span className="text-gradient">move differently.</span>
            </h2>
          </div>

          <div className="space-y-5">
            {[
              "The person who wants to try something new.",
              "The creator who needs somewhere to experiment.",
              "The thinker who has an idea but nowhere to take it.",
              "The person looking for people who get it.",
              "The curious person who simply wants to see what happens.",
            ].map((text, index) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.06,
                }}
                className="flex items-start gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-5 py-4"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-[#6D3CFF] to-[#FF7A00]" />

                <p className="text-sm leading-6 text-muted-foreground sm:text-base">
                  {text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================= */}

      <section className="px-5 pb-28 sm:px-8">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.025] px-7 py-14 text-center sm:px-12 sm:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF2FA6]/10 blur-[110px]"
          />

          <Compass className="relative mx-auto h-7 w-7 text-accent" />

          <h2 className="relative mx-auto mt-6 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-5xl">
            Ready to find your wave?
          </h2>

          <p className="relative mx-auto mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            Explore what UNWAVES is building, then decide where you want to
            enter the movement.
          </p>

          <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/experiences"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-bold text-background transition-transform duration-300 hover:-translate-y-0.5"
            >
              Explore experiences
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              to="/join"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-semibold transition-colors hover:bg-white/[0.06]"
            >
              Join UNWAVES
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
