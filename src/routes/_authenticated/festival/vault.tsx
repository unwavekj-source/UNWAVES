import { createFileRoute } from "@tanstack/react-router";
import * as Icons from "lucide-react";
import { BADGES } from "@/data/festival";
import { useParticipant } from "@/hooks/useFestival";
import { FestivalPage } from "@/components/festival/FestivalShell";
import { XPMeter } from "@/components/festival/XPMeter";

export const Route = createFileRoute("/_authenticated/festival/vault")({
  head: () => ({
    meta: [
      { title: "Treasure Vault — CA UNWIND Season 1" },
      { name: "description", content: "Your CA UNWIND XP, levels and collectible badges, all stored in the Treasure Vault." },
      { property: "og:title", content: "Treasure Vault — CA UNWIND" },
      { property: "og:description", content: "XP, levels and every badge you have unlocked this season." },
    ],
  }),
  component: Vault,
});

function Vault() {
  const { badges, level, xp } = useParticipant();
  const earned = new Set(badges.map((b) => b.badge_key));

  return (
    <FestivalPage
      eyebrow="Treasure Vault"
      title="Everything you've collected"
      subtitle="XP, levels and badges — proof of a season well unwound."
      icon="Gift"
    >
      <div className="glass gradient-border rounded-4xl p-6">
        <div className="flex flex-wrap items-center gap-6">
          <div>
            <p className="font-display text-4xl font-bold text-gradient">{xp}</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Total XP</p>
          </div>
          <div>
            <p className="font-display text-4xl font-bold">{level.level}</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Level</p>
          </div>
          <div>
            <p className="font-display text-4xl font-bold">
              {earned.size}
              <span className="text-lg text-muted-foreground">/{BADGES.length}</span>
            </p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Badges</p>
          </div>
          <div className="min-w-56 flex-1">
            <XPMeter />
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {BADGES.map((b) => {
          const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[b.icon] ?? Icons.Award;
          const has = earned.has(b.key);
          return (
            <div key={b.key} className={`glass rounded-3xl p-5 text-center ${has ? "glass-hover" : "opacity-55"}`}>
              <span
                className="mx-auto grid h-14 w-14 place-items-center rounded-2xl"
                style={{ background: has ? "var(--gradient-festival)" : "var(--secondary)", boxShadow: has ? "var(--shadow-glow)" : undefined }}
              >
                <Icon className={`h-6 w-6 ${has ? "text-primary-foreground" : "text-muted-foreground"}`} />
              </span>
              <h3 className="mt-4 text-sm font-bold">{b.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{b.note}</p>
              <p className="mt-3 text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">
                {has ? "Unlocked" : b.rule}
              </p>
            </div>
          );
        })}
      </div>
    </FestivalPage>
  );
}
