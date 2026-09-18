import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Sparkles, Waves } from "lucide-react";

export const Route = createFileRoute("/my-wave/daily-waves")({
  component: DailyWavesPage,
});

function DailyWavesPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-background text-foreground">
      <section className="relative isolate">
        {/* Background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#6D3CFF]/10 blur-[120px]" />
          <div className="absolute right-[-120px] top-[260px] h-[320px] w-[320px] rounded-full bg-[#FF2FA6]/8 blur-[110px]" />
        </div>

        <div className="mx-auto w-full max-w-7xl px-5 pb-20 pt-12 sm:px-8 sm:pt-16 lg:px-10 lg:pt-20">
          {/* Back */}
          <Link
            to="/my-wave"
            className="mb-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-muted-foreground transition hover:bg-white/[0.08] hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to My Wave
          </Link>

          {/* Header */}
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#6D3CFF]/25 bg-[#6D3CFF]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#B9A4FF]">
              <Waves className="h-4 w-4" />
              UNWAVES · MY WAVE
            </div>

            <h1 className="font-display text-4xl font-bold tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              Small things.
              <br />
              <span className="text-gradient">Every day.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Daily Waves are small experiences designed to keep your wave
              moving. Notice something. Try something. Create something.
              Nothing competitive. No pressure.
            </p>
          </div>

          {/* Status */}
          <div className="mt-10 max-w-3xl rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6D3CFF] via-[#FF2FA6] to-[#FF7A00] shadow-lg shadow-[#6D3CFF]/10">
                <Sparkles className="h-5 w-5 text-white" />
              </div>

              <div>
                <p className="text-lg font-semibold">
                  Daily Waves are being prepared.
                </p>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  The next wave of daily experiences will appear here when
                  UNWAVES opens them.
                </p>
              </div>
            </div>
          </div>

          {/* Three principles */}
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <InfoCard
              icon={<CalendarDays className="h-5 w-5" />}
              title="One small experience"
              description="A simple activity you can complete during your normal day."
            />

            <InfoCard
              icon={<Waves className="h-5 w-5" />}
              title="No pressure"
              description="Daily Waves are about participation, curiosity and keeping your momentum."
            />

            <InfoCard
              icon={<Sparkles className="h-5 w-5" />}
              title="Create & share"
              description="Some waves may invite you to write, draw, film, make or share something."
            />
          </div>

          {/* Coming soon */}
          <div className="mt-12 rounded-3xl border border-white/10 bg-[#111019] p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#FF7A00]">
              NEXT WAVE
            </p>

            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Your daily experiences will appear here.
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              When Daily Waves open, you will be able to discover the
              experience for the day, complete it, and build your own wave
              history.
            </p>

            <div className="mt-6 inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Coming soon
            </div>
          </div>

          {/* Route verification */}
          <div className="mt-6 rounded-2xl border border-[#6D3CFF]/20 bg-[#6D3CFF]/5 p-4">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#B9A4FF]">
              My Wave · Daily Waves
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Daily Waves participant area
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function InfoCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 transition-colors hover:bg-white/[0.055]">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-[#B9A4FF]">
        {icon}
      </div>

      <h3 className="mt-5 font-display text-lg font-semibold">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
