import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { grantBadge, passportsQuery, submissionsQuery, toggleVote, voteCountsQuery, votesQuery } from "@/lib/festival-api";
import { useParticipant } from "@/hooks/useFestival";
import { FestivalPage } from "@/components/festival/FestivalShell";
import { MediaThumb } from "@/components/festival/MediaThumb";

export const Route = createFileRoute("/_authenticated/festival/stage")({
  head: () => ({
    meta: [
      { title: "People's Choice Stage — CA UNWIND Season 1" },
      { name: "description", content: "Vote for your favourite CA UNWIND Season 1 entries on the live People's Choice stage." },
      { property: "og:title", content: "People's Choice Stage — CA UNWIND" },
      { property: "og:description", content: "The community picks its favourites. One heart per entry." },
    ],
  }),
  component: Stage,
});

function Stage() {
  const qc = useQueryClient();
  const { userId } = useParticipant();
  const { data: subs } = useQuery(submissionsQuery());
  const { data: votes } = useQuery(votesQuery(userId));
  const { data: voteCounts } = useQuery(voteCountsQuery());
  const { data: people } = useQuery(passportsQuery());
  const names = new Map((people ?? []).map((p) => [p.id, p.full_name]));
  const counts = new Map((voteCounts ?? []).map((v) => [v.submission_id, v.vote_count]));

  const count = (id: string) => counts.get(id) ?? 0;
  const mine = (id: string) => (votes ?? []).some((v) => v.submission_id === id && v.user_id === userId);

  const ranked = [...(subs ?? [])]
    .filter((s) => (s.status ?? "approved") === "approved")
    .sort((a, b) => count(b.id) - count(a.id));


  async function vote(id: string) {
    if (!userId) return;
    await toggleVote(userId, id, mine(id));
    await grantBadge(userId, "voter");
    await qc.invalidateQueries({ queryKey: ["votes"] });
    await qc.invalidateQueries({ queryKey: ["vote_counts"] });
    await qc.invalidateQueries({ queryKey: ["badges", userId] });
  }

  return (
    <FestivalPage
      eyebrow="People's Choice"
      title="The voting stage is live"
      subtitle="Give a heart to every entry that moved you. You can change your mind any time."
      icon="Vote"
    >
      {ranked.length === 0 ? (
        <div className="glass rounded-4xl p-12 text-center">
          <p className="font-display text-lg">No entries on stage yet.</p>
          <p className="mt-2 text-sm text-muted-foreground">Once submissions arrive, voting opens right here.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ranked.map((s, i) => (
            <div key={s.id} className="glass glass-hover overflow-hidden rounded-3xl">
              <div className="relative">
                <MediaThumb path={s.media_url} kind={s.media_kind} className="h-52 w-full" />
                <span className="glass absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-bold">#{i + 1}</span>
              </div>
              <div className="p-5">
                <h3 className="text-sm font-bold">{s.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {names.get(s.user_id) ?? "Participant"} · {s.category}
                </p>
                <button
                  type="button"
                  onClick={() => vote(s.id)}
                  className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold transition-transform hover:scale-[1.02] ${
                    mine(s.id) ? "text-primary-foreground" : "bg-secondary/70 text-foreground"
                  }`}
                  style={mine(s.id) ? { background: "var(--gradient-primary)" } : undefined}
                >
                  <Heart className={`h-3.5 w-3.5 ${mine(s.id) ? "fill-current" : ""}`} /> {count(s.id)} {mine(s.id) ? "voted" : "vote"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </FestivalPage>
  );
}
