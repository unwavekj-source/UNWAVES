import { useState } from "react";
import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import * as Icons from "lucide-react";
import { DESTINATIONS, FESTIVAL } from "@/data/festival";
import { useParticipant } from "@/hooks/useFestival";
import { useMyRole } from "@/hooks/useRole";

import { ParticleField } from "@/components/site/ParticleField";
import { BrandMark, BrandWordmark } from "@/components/site/BrandLogo";
import { XPMeter } from "./XPMeter";
import { NotificationBell } from "./NotificationBell";
import { supabase } from "@/integrations/supabase/client";

function Ico({ name, className }: { name: string; className?: string }) {
  const Cmp = (Icons as unknown as Record<string, Icons.LucideIcon>)[name] ?? Icons.Circle;
  return <Cmp className={className} />;
}

export function FestivalTopBar() {
  const [open, setOpen] = useState(false);
  const { profile, level, day } = useParticipant();
  const { isStaff } = useMyRole();
  const pathname = useRouterState({ select: (s) => s.location.pathname });


  async function signOut() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3">
        <div className="glass mx-auto mt-3 flex max-w-7xl items-center gap-3 rounded-full px-3 py-2 sm:px-4">
          <Link to="/festival/lobby" className="flex shrink-0 items-center gap-2">
            <BrandMark className="h-9 w-9" />
            <BrandWordmark className="hidden text-sm sm:block" />
          </Link>

          <span className="glass hidden rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide text-muted-foreground md:inline-flex">
            {FESTIVAL.season} · Day {day}/{FESTIVAL.totalDays}
          </span>

          <nav className="ml-auto hidden items-center gap-0.5 xl:flex">
            {DESTINATIONS.slice(0, 6).map((d) => (
              <Link
                key={d.to}
                to={d.to}
                className={`rounded-full px-3 py-2 text-xs font-medium transition-colors ${
                  pathname === d.to ? "bg-secondary/70 text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {d.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 xl:ml-0">
            <span className="glass hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold sm:inline-flex">
              <Icons.Star className="h-3.5 w-3.5 text-festival-gold" /> Lv {level.level}
            </span>
            <NotificationBell />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Festival destinations"
              className="grid h-10 w-10 place-items-center rounded-full border border-border"
            >
              {open ? <Icons.X className="h-5 w-5" /> : <Icons.LayoutGrid className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="fixed inset-x-0 top-20 z-50 px-3"
          >
            <div className="glass gradient-border mx-auto max-w-7xl rounded-4xl p-4">
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {DESTINATIONS.map((d) => (
                  <Link
                    key={d.to}
                    to={d.to}
                    onClick={() => setOpen(false)}
                    className="glass-hover flex items-center gap-3 rounded-2xl border border-border/60 px-4 py-3"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl" style={{ background: "var(--gradient-cool)" }}>
                      <Ico name={d.icon} className="h-4.5 w-4.5 text-primary-foreground" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold">{d.label}</span>
                      <span className="block truncate text-xs text-muted-foreground">{d.blurb}</span>
                    </span>
                  </Link>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-border pt-4">
                <div className="min-w-48 flex-1">
                  <XPMeter />
                </div>
                <span className="text-xs text-muted-foreground">{profile?.participant_id}</span>
                {isStaff && (
                  <Link
                    to="/admin"
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-primary-foreground"
                    style={{ background: "var(--gradient-festival)" }}
                  >
                    <Icons.Shield className="h-3.5 w-3.5" /> Back stage
                  </Link>
                )}
                <button
                  type="button"
                  onClick={signOut}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold hover:bg-secondary/60"
                >
                  <Icons.LogOut className="h-3.5 w-3.5" /> Leave festival
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function FestivalPage({
  children,
  eyebrow,
  title,
  subtitle,
  icon = "Sparkles",
}: {
  children: ReactNode;
  eyebrow: string;
  title: string;
  subtitle?: string;
  icon?: string;
}) {
  return (
    <main className="relative min-h-screen overflow-hidden px-4 pt-28 pb-24 sm:px-6">
      <div className="aurora-bg opacity-45" />
      <ParticleField count={18} />
      <div className="relative mx-auto w-full max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground">
            <Ico name={icon} className="h-3.5 w-3.5 text-festival-gold" /> {eyebrow}
          </span>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">{title}</h1>
          {subtitle && <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">{subtitle}</p>}
        </motion.div>
        <div className="mt-10">{children}</div>
      </div>
    </main>
  );
}

export { Ico };
