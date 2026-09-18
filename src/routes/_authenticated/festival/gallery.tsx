import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { Heart, Star } from "lucide-react";
import { GALLERY_FILTERS } from "@/data/festival";
import { passportsQuery, submissionsQuery, voteCountsQuery } from "@/lib/festival-api";
import { FestivalPage } from "@/components/festival/FestivalShell";
import { MediaThumb } from "@/components/festival/MediaThumb";

export const Route = createFileRoute("/_authenticated/festival/gallery")({
  head: () => ({
    meta: [
      { title: "Creator Gallery — CA UNWIND Season 1" },
      { name: "description", content: "The CA UNWIND festival wall: reels, art, writing and music created by participants this season." },
      { property: "og:title", content: "Creator Gallery — CA UNWIND" },
      { property: "og:description", content: "Every entry from Season 1, on one glowing wall." },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  const [filter, setFilter] = useState<string>("All");
  const { data: subs } = useQuery(submissionsQuery());
  const { data: voteCounts } = useQuery(voteCountsQuery());
  const { data: people } = useQuery(passportsQuery());

  const names = new Map((people ?? []).map((p) => [p.id, p.full_name]));
  const counts = new Map((voteCounts ?? []).map((v) => [v.submission_id, v.vote_count]));
  const voteCount = (id: string) => counts.get(id) ?? 0;
  const items = (subs ?? [])
    .filter((s) => (s.status ?? "approved") === "approved")
    .filter((s) => filter === "All" || s.category === filter);


  return (
    <FestivalPage
      eyebrow="Creator Gallery"
      title="The festival wall"
      subtitle="Everything the community made this season, in one place. Featured entries wear a gold star."
      icon="Palette"
    >
      <div className="flex flex-wrap gap-2">
        {GALLERY_FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
              filter === f ? "text-primary-foreground" : "glass text-muted-foreground hover:text-foreground"
            }`}
            style={filter === f ? { background: "var(--gradient-festival)" } : undefined}
          >
            {f}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <div className="glass mt-8 rounded-4xl p-12 text-center">
          <p className="font-display text-lg">The wall is still warming up.</p>
          <p className="mt-2 text-sm text-muted-foreground">Be the first to hang something here — head to the Challenge Arena.</p>
        </div>
      ) : (
        <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {items.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: (i % 6) * 0.05 }}
              className="glass glass-hover mb-4 break-inside-avoid overflow-hidden rounded-3xl"
            >
              <MediaThumb path={s.media_url} kind={s.media_kind} className="h-56 w-full" />
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold leading-snug">{s.title}</h3>
                  {s.featured && <Star className="h-4 w-4 shrink-0 text-festival-gold" />}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {names.get(s.user_id) ?? "Participant"} · {s.category}
                </p>
                {s.story && <p className="mt-2 line-clamp-3 text-xs text-muted-foreground/85">{s.story}</p>}
                <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-festival-pink">
                  <Heart className="h-3.5 w-3.5" /> {voteCount(s.id)} votes
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </FestivalPage>
  );
}
