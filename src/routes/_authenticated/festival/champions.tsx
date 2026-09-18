import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import * as Icons from "lucide-react";
import { CHAMPION_CATEGORIES } from "@/data/festival";
import { passportsQuery } from "@/lib/festival-api";
import { FestivalPage } from "@/components/festival/FestivalShell";

export const Route = createFileRoute("/_authenticated/festival/champions")({
  head: () => ({
    meta: [
      { title: "Hall of Champions — CA UNWIND Season 1" },
      { name: "description", content: "The CA UNWIND Season 1 celebration stage: champion categories and the season XP leaderboard." },
      { property: "og:title", content: "Hall of Champions — CA UNWIND" },
      { property: "og:description", content: "Seven crowns, one season, and the current XP leaders." },
    ],
  }),
  component: Champions,
});

function Champions() {
  const { data: people } = useQuery(passportsQuery());

  return (
    <FestivalPage
      eyebrow="Hall of Champions"
      title="The celebration stage"
      subtitle="Seven crowns for Season 1. Names are announced at the closing ceremony on Day 15."
      icon="Trophy"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CHAMPION_CATEGORIES.map((c) => {
          const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[c.icon] ?? Icons.Trophy;
          return (
            <div key={c.key} className="glass glass-hover gradient-border relative overflow-hidden rounded-4xl p-6 text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl" style={{ background: "var(--gradient-warm)", boxShadow: "var(--shadow-gold)" }}>
                <Icon className="h-6 w-6 text-primary-foreground" />
              </span>
              <h3 className="mt-4 text-sm font-bold">{c.title}</h3>
              <p className="mt-1.5 text-xs text-muted-foreground">{c.note}</p>
              <p className="mt-4 font-display text-lg text-gradient">To be crowned</p>
            </div>
          );
        })}
      </div>

      <h2 className="mt-14 text-xl font-bold sm:text-2xl">Season XP leaderboard</h2>
      <div className="glass mt-5 divide-y divide-border rounded-4xl">
        {(people ?? []).slice(0, 20).map((p, i) => (
          <div key={p.id} className="flex items-center gap-4 px-5 py-4">
            <span className="font-display w-7 shrink-0 text-sm font-bold tabular-nums text-muted-foreground">{i + 1}</span>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-bold text-primary-foreground" style={{ background: "var(--gradient-festival)" }}>
              {p.full_name.slice(0, 1).toUpperCase()}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{p.full_name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {p.ca_level}
                {p.city ? ` · ${p.city}` : ""} · {p.participant_id}
              </p>
            </div>
            <span className="shrink-0 text-sm font-bold tabular-nums text-festival-gold">{p.xp} XP</span>
          </div>
        ))}
        {(people ?? []).length === 0 && <p className="p-8 text-center text-sm text-muted-foreground">The leaderboard fills as participants arrive.</p>}
      </div>
    </FestivalPage>
  );
}
