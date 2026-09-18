import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

export const Route = createFileRoute("/my-wave/today")({
  component: TodayPage,
});

function TodayPage() {
  return (
    <main className="w-full overflow-x-hidden">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        {/* Back */}
        <Link
          to="/my-wave"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" />
          <span>Back to My Wave</span>
        </Link>

        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-card">
          {/* Background glow */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-pink-500/10 blur-3xl" />

          <div className="relative p-6 sm:p-8 lg:p-12">
            <div className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent sm:px-4">
              <CalendarDays className="h-4 w-4 shrink-0" />
              <span className="truncate">Today</span>
            </div>

            <h1 className="max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-[-0.045em] sm:text-5xl lg:text-7xl">
              What's happening
              <br className="hidden sm:block" />
              <span className="text-gradient"> today?</span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base lg:text-lg">
              Your daily starting point inside UNWAVES. Explore what is
              happening, discover something new and keep your wave moving.
            </p>
          </div>
        </section>

        {/* Current wave */}
        <section className="mt-6 rounded-3xl border border-white/10 bg-card p-6 sm:mt-8 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Your current wave
              </p>

              <h2 className="mt-3 break-words font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                The next wave is taking shape.
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                UNWAVES experiences are being prepared. Your participant space
                is ready for what comes next.
              </p>
            </div>

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 via-pink-500/20 to-orange-500/20">
              <Sparkles className="h-5 w-5 text-accent" />
            </div>
          </div>
        </section>

        {/* Today's areas */}
        <section className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3">
          <TodayCard
            icon={<Clock3 className="h-5 w-5" />}
            title="Daily Waves"
            description="A small experience designed to fit into your day."
          />

          <TodayCard
            icon={<Target className="h-5 w-5" />}
            title="Missions"
            description="Team-based challenges where ideas become something real."
          />

          <TodayCard
            icon={<Users className="h-5 w-5" />}
            title="Community"
            description="Discover people, stories and experiences from the movement."
          />
        </section>

        {/* Status */}
        <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:mt-8 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            </div>

            <div className="min-w-0">
              <h2 className="break-words font-display text-lg font-semibold sm:text-xl">
                You are ready for the next wave.
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                We will bring new experiences, missions and community moments
                here as they become available.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function TodayCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <article className="min-w-0 rounded-3xl border border-white/10 bg-card p-6 transition-colors hover:border-white/15 hover:bg-white/[0.03]">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/[0.05] text-accent">
        {icon}
      </div>

      <h3 className="mt-5 break-words font-display text-xl font-semibold tracking-[-0.025em]">
        {title}
      </h3>

      <p className="mt-3 break-words text-sm leading-6 text-muted-foreground">
        {description}
      </p>

      <div className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        Coming soon
      </div>
    </article>
  );
}
