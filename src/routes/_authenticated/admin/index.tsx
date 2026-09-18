import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import * as Icons from "lucide-react";
import { announcementsQuery, passportsQuery, submissionsQuery, voteCountsQuery } from "@/lib/festival-api";
import { allRolesQuery } from "@/lib/roles-api";
import { FESTIVAL } from "@/data/festival";
import { currentDay } from "@/lib/festival-api";

export const Route = createFileRoute("/_authenticated/admin/")({
  head: () => ({
    meta: [
      { title: "Festival Control — CA UNWIND Admin" },
      { name: "description", content: "Season analytics for the CA UNWIND crew: participants, entries, votes and announcements." },
      { property: "og:title", content: "Festival Control — CA UNWIND" },
      { property: "og:description", content: "The CA UNWIND back stage." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminOverview,
});

function AdminOverview() {
  const { data: people } = useQuery(passportsQuery());
  const { data: subs } = useQuery(submissionsQuery());
  const { data: voteCounts } = useQuery(voteCountsQuery());
  const { data: news } = useQuery(announcementsQuery());
  const { data: roles } = useQuery(allRolesQuery());

  const pending = (subs ?? []).filter((s) => s.status === "pending").length;
  const featured = (subs ?? []).filter((s) => s.featured).length;
  const staff = (roles ?? []).filter((r) => r.role !== "participant").length;

  const stats = [
    { icon: "Users", label: "Participants", value: (people ?? []).length, note: `${staff} crew members` },
    { icon: "Film", label: "Entries", value: (subs ?? []).length, note: `${pending} awaiting review` },
    { icon: "Heart", label: "Votes cast", value: (voteCounts ?? []).reduce((sum, v) => sum + v.vote_count, 0), note: `${featured} featured entries` },
    { icon: "Megaphone", label: "Announcements", value: (news ?? []).length, note: `Day ${currentDay()} of ${FESTIVAL.totalDays}` },
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s, i) => {
          const Ico = (Icons as unknown as Record<string, Icons.LucideIcon>)[s.icon] ?? Icons.Circle;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="glass gradient-border rounded-3xl p-6"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: "var(--gradient-cool)" }}>
                <Ico className="h-4.5 w-4.5 text-primary-foreground" />
              </span>
              <p className="font-display mt-4 text-3xl font-bold tabular-nums">{s.value}</p>
              <p className="text-sm font-semibold">{s.label}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.note}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="glass rounded-4xl p-6">
          <h2 className="font-display text-lg font-bold">Most active passports</h2>
          <ul className="mt-4 space-y-3">
            {(people ?? []).slice(0, 6).map((p, i) => (
              <li key={p.id} className="flex items-center gap-3">
                <span className="w-5 text-xs font-bold text-muted-foreground">{i + 1}</span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold">{p.full_name}</span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {p.participant_id} · {p.ca_level}
                  </span>
                </span>
                <span className="shrink-0 text-xs font-bold text-festival-gold">{p.xp} XP</span>
              </li>
            ))}
            {(people ?? []).length === 0 && <p className="text-sm text-muted-foreground">No passports issued yet.</p>}
          </ul>
        </div>

        <div className="glass rounded-4xl p-6">
          <h2 className="font-display text-lg font-bold">Latest entries</h2>
          <ul className="mt-4 space-y-3">
            {(subs ?? []).slice(0, 6).map((s) => (
              <li key={s.id} className="flex items-center gap-3">
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold">{s.title}</span>
                  <span className="block truncate text-xs text-muted-foreground">{s.category}</span>
                </span>
                <span className="shrink-0 rounded-full border border-border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                  {s.status ?? "approved"}
                </span>
              </li>
            ))}
            {(subs ?? []).length === 0 && <p className="text-sm text-muted-foreground">No entries yet.</p>}
          </ul>
        </div>
      </div>
    </div>
  );
}
