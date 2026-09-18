import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { BookUser, Flame, Star, Trophy } from "lucide-react";
import { FESTIVAL } from "@/data/festival";
import { updateProfile } from "@/lib/festival-api";
import { useParticipant } from "@/hooks/useFestival";
import { FestivalPage } from "@/components/festival/FestivalShell";
import { XPMeter } from "@/components/festival/XPMeter";

export const Route = createFileRoute("/_authenticated/festival/passport")({
  head: () => ({
    meta: [
      { title: "My Festival Passport — CA UNWIND Season 1" },
      { name: "description", content: "Your CA UNWIND digital passport: participant ID, season stats, badges and favourite memory." },
      { property: "og:title", content: "My Festival Passport — CA UNWIND" },
      { property: "og:description", content: "A keepsake of your Season 1 journey." },
    ],
  }),
  component: Passport,
});

function Passport() {
  const qc = useQueryClient();
  const { userId, profile, xp, level, badges, daysTouched, completions } = useParticipant();
  const [memory, setMemory] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  async function save() {
    if (!userId) return;
    await updateProfile(userId, { favourite_memory: (memory ?? "").slice(0, 500) });
    await qc.invalidateQueries({ queryKey: ["profile", userId] });
    setSaved(true);
  }

  const value = memory ?? profile?.favourite_memory ?? "";

  return (
    <FestivalPage eyebrow="My Passport" title="Your festival keepsake" subtitle="Stamped, sealed and yours to keep long after Season 1 ends." icon="BookUser">
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="glass gradient-border relative overflow-hidden rounded-4xl p-7 lg:col-span-2">
          <div aria-hidden className="absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-25 blur-3xl" style={{ background: "var(--gradient-festival)" }} />
          <div className="relative flex flex-wrap items-start gap-5">
            <span className="grid h-20 w-20 shrink-0 place-items-center rounded-3xl font-display text-2xl font-bold text-primary-foreground" style={{ background: "var(--gradient-festival)" }}>
              {profile?.full_name?.slice(0, 1).toUpperCase() ?? "?"}
            </span>
            <div className="min-w-0">
              <p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-muted-foreground">
                <BookUser className="h-3.5 w-3.5 text-festival-gold" /> {FESTIVAL.season} Festival Pass
              </p>
              <h2 className="mt-2 text-2xl font-bold">{profile?.full_name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {profile?.ca_level}
                {profile?.city ? ` · ${profile.city}` : ""}
              </p>
              <p className="font-display mt-3 text-sm tracking-[0.2em] text-gradient">{profile?.participant_id}</p>
            </div>
          </div>

          <div className="relative mt-7 grid gap-3 sm:grid-cols-4">
            {[
              { label: "Total XP", value: xp, icon: Star },
              { label: "Level", value: level.level, icon: Trophy },
              { label: "Streak", value: profile?.streak ?? 0, icon: Flame },
              { label: "Days visited", value: `${daysTouched.size}/${FESTIVAL.totalDays}`, icon: BookUser },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl bg-secondary/50 p-4">
                <s.icon className="h-4 w-4 text-festival-pink" />
                <p className="font-display mt-2 text-xl font-bold tabular-nums">{s.value}</p>
                <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="relative mt-6">
            <XPMeter />
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass rounded-4xl p-6">
            <p className="text-sm font-bold">Favourite memory of the season</p>
            <textarea
              rows={5}
              maxLength={500}
              value={value}
              onChange={(e) => {
                setMemory(e.target.value);
                setSaved(false);
              }}
              placeholder="The one moment from these 15 days you want to remember…"
              className="mt-3 w-full rounded-2xl border border-input bg-secondary/40 px-4 py-3 text-sm outline-none focus:border-festival-pink/60"
            />
            <button
              type="button"
              onClick={save}
              className="mt-3 w-full rounded-full bg-secondary/70 px-4 py-2.5 text-xs font-bold hover:bg-secondary"
            >
              {saved ? "Stamped into your passport" : "Save to passport"}
            </button>
          </div>

          <div className="glass rounded-4xl p-6">
            <p className="text-sm font-bold">Stamps collected</p>
            <p className="mt-2 text-xs text-muted-foreground">
              {badges.length} badges · {completions.length} missions unwound
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {badges.map((b) => (
                <span key={b.id} className="rounded-full px-3 py-1.5 text-[11px] font-semibold text-primary-foreground" style={{ background: "var(--gradient-warm)" }}>
                  {b.badge_key}
                </span>
              ))}
              {badges.length === 0 && <span className="text-xs text-muted-foreground">No stamps yet — complete a mission to earn your first.</span>}
            </div>
          </div>
        </div>
      </div>
    </FestivalPage>
  );
}
