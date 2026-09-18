import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, Clock, Star, Trash2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { passportsQuery, submissionsQuery, voteCountsQuery } from "@/lib/festival-api";
import { deleteSubmission, reviewSubmission, type ReviewStatus } from "@/lib/roles-api";
import { useMyRole } from "@/hooks/useRole";
import { MediaThumb } from "@/components/festival/MediaThumb";

export const Route = createFileRoute("/_authenticated/admin/submissions")({
  head: () => ({
    meta: [
      { title: "Submission Review — CA UNWIND Admin" },
      { name: "description", content: "Review, approve and feature CA UNWIND participant entries." },
      { property: "og:title", content: "Submission Review — CA UNWIND Admin" },
      { property: "og:description", content: "Moderate the festival wall." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminSubmissions,
});

const TABS: { key: "all" | ReviewStatus; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "approved", label: "Approved" },
  { key: "rejected", label: "Rejected" },
];

function AdminSubmissions() {
  const [tab, setTab] = useState<"all" | ReviewStatus>("all");
  const { isAdmin } = useMyRole();
  const qc = useQueryClient();
  const { data: subs } = useQuery(submissionsQuery());
  const { data: people } = useQuery(passportsQuery());
  const { data: voteCounts } = useQuery(voteCountsQuery());

  const refresh = () => qc.invalidateQueries({ queryKey: ["submissions"] });

  const review = useMutation({
    mutationFn: (v: { id: string; patch: { status?: ReviewStatus; featured?: boolean } }) => reviewSubmission(v.id, v.patch),
    onSuccess: () => {
      refresh();
      toast.success("Entry updated");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteSubmission(id),
    onSuccess: () => {
      refresh();
      toast.success("Entry removed");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const names = new Map((people ?? []).map((p) => [p.id, p.full_name]));
  const counts = new Map((voteCounts ?? []).map((v) => [v.submission_id, v.vote_count]));
  const voteCount = (id: string) => counts.get(id) ?? 0;
  const items = (subs ?? []).filter((s) => tab === "all" || (s.status ?? "approved") === tab);

  return (
    <div className="space-y-6">
      <div className="glass flex flex-wrap gap-1 rounded-full p-1.5">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
              tab === t.key ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
            style={tab === t.key ? { background: "var(--gradient-festival)" } : undefined}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {items.map((s) => {
          const status = s.status ?? "approved";
          return (
            <div key={s.id} className="glass overflow-hidden rounded-3xl">
              <MediaThumb path={s.media_url} kind={s.media_kind} className="h-48 w-full" />
              <div className="p-5">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-bold">{s.title}</h3>
                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      {names.get(s.user_id) ?? "Participant"} · {s.category} · {voteCount(s.id)} votes
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full border border-border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                    {status}
                  </span>
                </div>
                {s.story && <p className="mt-3 line-clamp-3 text-xs text-muted-foreground/85">{s.story}</p>}

                <div className="mt-4 flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    disabled={review.isPending}
                    onClick={() => review.mutate({ id: s.id, patch: { status: "approved" } })}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-[11px] font-semibold hover:bg-secondary/60 disabled:opacity-50"
                  >
                    <Check className="h-3.5 w-3.5" /> Approve
                  </button>
                  <button
                    type="button"
                    disabled={review.isPending}
                    onClick={() => review.mutate({ id: s.id, patch: { status: "pending" } })}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-[11px] font-semibold hover:bg-secondary/60 disabled:opacity-50"
                  >
                    <Clock className="h-3.5 w-3.5" /> Hold
                  </button>
                  <button
                    type="button"
                    disabled={review.isPending}
                    onClick={() => review.mutate({ id: s.id, patch: { status: "rejected" } })}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-[11px] font-semibold hover:bg-secondary/60 disabled:opacity-50"
                  >
                    <XCircle className="h-3.5 w-3.5" /> Reject
                  </button>
                  <button
                    type="button"
                    disabled={review.isPending}
                    onClick={() => review.mutate({ id: s.id, patch: { featured: !s.featured } })}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold disabled:opacity-50 ${
                      s.featured ? "text-primary-foreground" : "border border-border hover:bg-secondary/60"
                    }`}
                    style={s.featured ? { background: "var(--gradient-festival)" } : undefined}
                  >
                    <Star className="h-3.5 w-3.5" /> {s.featured ? "Featured" : "Feature"}
                  </button>
                  {isAdmin && (
                    <button
                      type="button"
                      disabled={remove.isPending}
                      onClick={() => remove.mutate(s.id)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-destructive/50 px-3 py-1.5 text-[11px] font-semibold text-destructive hover:bg-destructive/10 disabled:opacity-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {items.length === 0 && (
          <div className="glass rounded-4xl p-12 text-center text-sm text-muted-foreground lg:col-span-2">
            Nothing in this queue.
          </div>
        )}
      </div>
    </div>
  );
}
