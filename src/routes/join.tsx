import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Sparkles, Users, Waves } from "lucide-react";

export const Route = createFileRoute("/join")({
  head: () => ({
    meta: [
      {
        title: "Join UNWAVES — One Wave. Many Stories.",
      },
      {
        name: "description",
        content:
          "Join UNWAVES — a movement of people, ideas and experiences.",
      },
      {
        property: "og:title",
        content: "Join UNWAVES — One Wave. Many Stories.",
      },
      {
        property: "og:description",
        content:
          "Step into the movement. Discover experiences, meet people and create your own wave.",
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

  component: JoinPage,
});

function JoinPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      {/* Background atmosphere */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="aurora-bg opacity-60" />

        <div className="absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />

        <div className="absolute bottom-[-120px] right-[-80px] h-[320px] w-[320px] rounded-full bg-accent/10 blur-[120px]" />
      </div>

      {/* Navigation spacer */}
      <section className="relative flex min-h-screen items-center px-5 py-28 sm:px-8 lg:px-12">
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground backdrop-blur-xl">
                <Waves className="h-3.5 w-3.5 text-accent" />
                Join the movement
              </div>

              <h1 className="max-w-4xl font-display text-5xl font-bold leading-[0.95] tracking-[-0.055em] sm:text-6xl lg:text-8xl">
                Don't just watch
                <br />
                the wave.
                <br />
                <span className="text-gradient">Create it.</span>
              </h1>

              <p className="mt-8 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                UNWAVES is a movement of people, ideas and experiences.
                There is no fixed version of who you need to be here.
                Explore, create, participate, meet people and discover
                something unexpected.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="group inline-flex items-center gap-3 rounded-full bg-primary px-7 py-4 text-sm font-bold text-primary-foreground shadow-[0_20px_60px_-20px_rgba(109,60,255,0.8)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_70px_-20px_rgba(255,47,166,0.65)]"
                >
                  Create your wave
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/login"
                  className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-7 py-4 text-sm font-semibold text-foreground transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
                >
                  Sign in
                </Link>

                <Link
                  to="/"
                  className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-7 py-4 text-sm font-semibold text-foreground transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
                >
                  Explore UNWAVES
                </Link>
              </div>

              <p className="mt-6 text-sm text-muted-foreground">
                Already have an UNWAVES account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-foreground transition hover:text-accent"
                >
                  Sign in here
                </Link>
                .
              </p>
            </motion.div>

            {/* Right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.9,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative"
            >
              <div className="gradient-border rounded-[2rem] p-[1px]">
                <div className="relative overflow-hidden rounded-[2rem] bg-[#111018]/90 p-7 backdrop-blur-2xl sm:p-9">
                  <div className="absolute right-[-80px] top-[-80px] h-52 w-52 rounded-full bg-primary/20 blur-[80px]" />

                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-pink-500/20">
                        <Sparkles className="h-5 w-5 text-accent" />
                      </div>

                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        UNWAVES
                      </span>
                    </div>

                    <h2 className="mt-10 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                      Your wave can
                      <br />
                      start anywhere.
                    </h2>

                    <p className="mt-5 text-sm leading-7 text-muted-foreground">
                      You don't need a perfect plan. You don't need to fit a
                      category. Start where you are and see where the movement
                      takes you.
                    </p>

                    <div className="mt-8 space-y-3">
                      <JoinPoint
                        icon={<Sparkles className="h-4 w-4" />}
                        title="Explore"
                        text="Discover experiences beyond the expected."
                      />

                      <JoinPoint
                        icon={<Users className="h-4 w-4" />}
                        title="Connect"
                        text="Meet people who are creating their own waves."
                      />

                      <JoinPoint
                        icon={<Waves className="h-4 w-4" />}
                        title="Create"
                        text="Turn your ideas into something people remember."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

function JoinPoint({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-accent">
        {icon}
      </div>

      <div>
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          {text}
        </p>
      </div>
    </div>
  );
}
