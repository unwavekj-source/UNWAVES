import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { BrandMark, BrandWordmark } from "@/components/site/BrandLogo";
import {
  ArrowRight,
  Award,
  Bell,
  CheckCircle2,
  FileText,
  LogOut,
  Sparkles,
  Trophy,
  UserRound,
  Users,
  Vote,
  Waves,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/my-wave/")({
  component: MyWaveDashboard,
});

type UserProfile = {
  name: string;
  email: string;
};

function MyWaveDashboard() {
  const [profile, setProfile] = useState<UserProfile>({
    name: "there",
    email: "",
  });
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    let mounted = true;

    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/login";
        return;
      }

      if (!mounted) return;

      const metadata = user.user_metadata as {
        full_name?: string;
        name?: string;
      };

      setProfile({
        name:
          metadata?.full_name ||
          metadata?.name ||
          user.email?.split("@")[0] ||
          "there",
        email: user.email ?? "",
      });
    };

    loadUser();

    return () => {
      mounted = false;
    };
  }, []);

  const handleSignOut = async () => {
    setLoggingOut(true);

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Sign out failed:", error);
      setLoggingOut(false);
      return;
    }

    window.location.href = "/login";
  };

  const sections = [
    {
      title: "Today",
      description: "See what is happening in your wave today.",
      icon: Sparkles,
      href: "/my-wave/today",
      available: true,
    },
    {
      title: "Daily Waves",
      description: "Small experiences to notice, create and explore.",
      icon: Waves,
      href: "/my-wave/daily-waves",
      available: true,
    },
    {
      title: "Missions",
      description: "Take on bigger challenges with the community.",
      icon: Trophy,
      href: "/my-wave/missions",
      available: false,
    },
    {
      title: "My Team",
      description: "Find and work with your mission team.",
      icon: Users,
      href: "/my-wave/team",
      available: false,
    },
    {
      title: "Submissions",
      description: "Track everything you have created and submitted.",
      icon: FileText,
      href: "/my-wave/submissions",
      available: false,
    },
    {
      title: "Showcase",
      description: "Discover work created by the movement.",
      icon: Award,
      href: "/my-wave/showcase",
      available: false,
    },
    {
      title: "Voting",
      description: "Support the ideas and creations you believe in.",
      icon: Vote,
      href: "/my-wave/voting",
      available: false,
    },
    {
      title: "Achievements",
      description: "See the milestones you have unlocked.",
      icon: CheckCircle2,
      href: "/my-wave/achievements",
      available: false,
    },
    {
      title: "Certificates",
      description: "Access your UNWAVES recognition.",
      icon: Award,
      href: "/my-wave/certificates",
      available: false,
    },
    {
      title: "Notifications",
      description: "Important updates from UNWAVES.",
      icon: Bell,
      href: "/my-wave/notifications",
      available: false,
    },
    {
      title: "Profile",
      description: "Manage your UNWAVES profile.",
      icon: UserRound,
      href: "/my-wave/profile",
      available: false,
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link to="/" className="flex items-center gap-3">
            <BrandMark className="h-9 w-9" />

            <div>
              <BrandWordmark className="text-sm tracking-[0.12em]" />

              <div className="hidden text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:block">
                My Wave
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium">
                {profile.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {profile.email}
              </p>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              disabled={loggingOut}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium transition hover:border-white/20 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LogOut className="h-4 w-4" />

              {loggingOut ? "Signing out..." : "Sign out"}
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-[#6D3CFF]/15 blur-3xl" />

        <div className="pointer-events-none absolute -right-40 top-32 h-96 w-96 rounded-full bg-[#FF2FA6]/10 blur-3xl" />

        <section className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#FF7A00]">
              <Sparkles className="h-4 w-4" />
              Your space inside UNWAVES
            </p>

            <h1 className="font-display text-4xl font-bold tracking-[-0.05em] sm:text-6xl">
              Welcome,
              <br />
              <span className="text-gradient">
                {profile.name}
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              This is your personal space inside the movement.
              Explore what is happening, take part when the next
              wave opens, and keep building your story.
            </p>
          </motion.div>

          {/* Status */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-10 rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl sm:p-8"
          >
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Current status
                </p>

                <h2 className="mt-2 font-display text-2xl font-semibold">
                  You are part of the movement.
                </h2>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  The next wave is taking shape. Your space is
                  ready when the experiences open.
                </p>
              </div>

              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6D3CFF]/20 via-[#FF2FA6]/15 to-[#FF7A00]/20">
                <Waves className="h-7 w-7 text-[#FF7A00]" />
              </div>
            </div>
          </motion.div>

          {/* Sections */}
          <div className="mt-12">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Your UNWAVES
              </p>

              <h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
                Choose your next move.
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {sections.map((section, index) => {
                const Icon = section.icon;

                return (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.05 * index,
                    }}
                  >
                    {section.available ? (
                      <Link
                        to={section.href}
                        className="group block h-full rounded-3xl border border-[#6D3CFF]/30 bg-gradient-to-br from-[#6D3CFF]/10 to-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#FF2FA6]/40 hover:bg-white/[0.06]"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#6D3CFF]/15">
                            <Icon className="h-5 w-5 text-[#FF7A00]" />
                          </div>

                          <ArrowRight className="h-5 w-5 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-white" />
                        </div>

                        <h3 className="mt-6 font-display text-xl font-semibold">
                          {section.title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {section.description}
                        </p>

                        <div className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#FF7A00]">
                          Explore
                        </div>
                      </Link>
                    ) : (
                      <div className="h-full rounded-3xl border border-white/10 bg-white/[0.025] p-6 opacity-80">
                        <div className="flex items-start justify-between">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5">
                            <Icon className="h-5 w-5 text-muted-foreground" />
                          </div>

                          <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                            Coming soon
                          </span>
                        </div>

                        <h3 className="mt-6 font-display text-xl font-semibold">
                          {section.title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {section.description}
                        </p>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>ONE WAVE. MANY STORIES.</span>

          <span>
            © {new Date().getFullYear()} UNWAVES
          </span>
        </div>
      </footer>
    </main>
  );
}
