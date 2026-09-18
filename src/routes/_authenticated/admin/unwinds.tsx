import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, ExternalLink, Filter, MessageSquare, RefreshCw, Search, ShieldCheck, X } from "lucide-react";
import { toast } from "sonner";
import { passportsQuery } from "@/lib/festival-api";
import { reviewUnwind, unwindQueueQuery, STATUS_META, type UnwindStatus } from "@/lib/unwind-api";
import { useMyRole } from "@/hooks/useRole";
import { MediaThumb } from "@/components/festival/MediaThumb";

export const Route = createFileRoute("/_authenticated/admin/unwinds")({
  component: UnwindVerification,
});

const TABS: { key: UnwindStatus | "all"; label: string }[] = [
  { key: "pending", label: "Pending" },
  { key: "resubmit", label: "Resubmission" },
  { key: "approved", label: "Verified" },
  { key: "rejected", label: "Rejected" },
  { key: "all", label: "All history" },
];

const QUICK_REASONS = [
  "Story tag missing.",
  "Required hashtag not included.",
  "Screenshot unclear.",
  "Wrong activity submitted.",
  "Submission after the deadline.",
];

function UnwindVerification() {
  const qc = useQueryClient();
  const { userId } = useMyRole();
  const { data: queue, isLoading } = useQuery(unwindQueueQuery());
  const { data: people } = useQuery(passportsQuery());

  const [tab, setTab] = useState<UnwindStatus | "all">("pending");
  const [search, setSearch] = useState("");
  const [dayFilter, setDayFilter] = useState("");
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<string | null>(null);

  const nameOf = useMemo(() => {
    const map = new Map<string, { name: string; pass: string }>();
    for (const p of people ?? []) map.set(p.id, { name: p.full_name, pass: p.participant_id });
    return map;
  }, [people]);

  const rows = (queue ?? []).filter((s) => {
    if (tab !== "all" && s.status !== tab) return false;
    if (dayFilter && String(s.day) !== dayFilter) return false;
    if (search.trim()) {
      const who = nameOf.get(s.user_id);
      const hay = `${who?.name ?? ""} ${who?.pass ?? ""} ${s.mission_title}`.toLowerCase();
      if (!hay.includes(search.trim().toLowerCase())) return false;
    }
    return true;
  });

  async function act(id: string, status: UnwindStatus) {
    if (!userId) return;
    setBusy(id);
    try {
      await reviewUnwind(id, status, userId, notes[id]?.trim() || null);
      await qc.invalidateQueries({ queryKey: ["unwind-queue"] });
      toast.success(
        status === "approved" ? "Verified — points and streak awarded." : status === "resubmit" ? "Resubmission requested." : "Marked as not verified.",
      );
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not update this submission.");
    } finally {
      setBusy(null);
    }
  }

  async function bulkApprove() {
    if (!userId) return;
    const ids = rows.filter((r) => r.status !== "approved").map((r) => r.id);
    if (!ids.length) return;
    setBusy("bulk");
    try {
      for (const id of ids) await reviewUnwind(id, "approved", userId, null);
      await qc.invalidateQueries({ queryKey: ["unwind-queue"] });
      toast.success(`${ids.length} Daily Unwinds verified.`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Bulk approval failed.");
    } finally {
      setBusy(null);
    }
  }

  const field = "rounded-full border border-input bg-secondary/40 px-4 py-2 text-xs outline-none focus:border-festival-pink/60";

  return (
    <div>
      <div className="glass flex flex-wrap items-center gap-2 rounded-4xl p-4">
        <div className="flex flex-wrap gap-1">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`rounded-full px-3.5 py-2 text-xs font-semibold ${tab === t.key ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              style={tab === t.key ? { background: "var(--gradient-festival)" } : undefined}
            >
              {t.label}
              {t.key !== "all" && (
                <span className="ml-1.5 opacity-70">{(queue ?? []).filter((s) => s.status === t.key).length}</span>
              )}
            </button>
          ))}
        </div>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <span className="relative">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Participant or activity" className={`${field} pl-8`} />
          </span>
          <span className="relative">
            <Filter className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <input value={dayFilter} onChange={(e) => setDayFilter(e.target.value.replace(/\D/g, ""))} placeholder="Day" className={`${field} w-24 pl-8`} />
          </span>
          {(tab === "pending" || tab === "resubmit") && rows.length > 0 && (
            <button
              type="button"
              onClick={bulkApprove}
              disabled={busy === "bulk"}
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-primary-foreground disabled:opacity-60"
              style={{ background: "var(--gradient-festival)" }}
            >
              <ShieldCheck className="h-3.5 w-3.5" /> Approve all {rows.length}
            </button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="mt-6 grid gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="glass h-32 animate-pulse rounded-3xl" />
          ))}
        </div>
      ) : rows.length === 0 ? (
        <p className="glass mt-6 rounded-3xl p-8 text-sm text-muted-foreground">Nothing here right now.</p>
      ) : (
        <div className="mt-6 grid gap-3">
          {rows.map((s) => {
            const who = nameOf.get(s.user_id);
            const meta = STATUS_META[s.status];
            return (
              <div key={s.id} className="glass rounded-3xl p-4">
                <div className="flex flex-wrap gap-4">
                  <MediaThumb path={s.proof_path} kind="image" className="h-28 w-28 shrink-0 rounded-2xl" />
                  <div className="min-w-56 flex-1">
                    <p className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                      Day {s.day} · {s.platform}
                      <span className={`inline-flex items-center gap-1 ${meta.tone}`}>
                        <span className={`h-2 w-2 rounded-full ${meta.dot}`} /> {meta.label}
                      </span>
                    </p>
                    <h3 className="mt-1 text-sm font-bold">{s.mission_title || s.mission_key}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {who?.name ?? "Participant"} · {who?.pass ?? s.user_id.slice(0, 8)} ·{" "}
                      {new Date(s.created_at).toLocaleString("en-IN")}
                    </p>
                    {s.story_link && (
                      <a
                        href={s.story_link}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-festival-pink"
                      >
                        Open story link <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                    {s.note && <p className="mt-2 text-xs text-muted-foreground">Note: {s.note}</p>}
                    {s.review_note && (
                      <p className="mt-2 inline-flex items-start gap-1.5 text-xs text-muted-foreground">
                        <MessageSquare className="mt-0.5 h-3 w-3 text-festival-gold" /> {s.review_note}
                      </p>
                    )}
                    {s.reviewed_at && (
                      <p className="mt-1 text-[11px] text-muted-foreground/70">
                        Reviewed {new Date(s.reviewed_at).toLocaleString("en-IN")}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {QUICK_REASONS.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setNotes((n) => ({ ...n, [s.id]: r }))}
                      className="rounded-full bg-secondary/60 px-2.5 py-1 text-[11px] text-muted-foreground hover:text-foreground"
                    >
                      {r}
                    </button>
                  ))}
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <input
                    value={notes[s.id] ?? ""}
                    onChange={(e) => setNotes((n) => ({ ...n, [s.id]: e.target.value }))}
                    placeholder="Feedback for the participant"
                    className="min-w-52 flex-1 rounded-full border border-input bg-secondary/40 px-4 py-2 text-xs outline-none focus:border-festival-pink/60"
                  />
                  <button
                    type="button"
                    disabled={busy === s.id}
                    onClick={() => act(s.id, "approved")}
                    className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3.5 py-2 text-xs font-bold text-emerald-300 disabled:opacity-60"
                  >
                    <Check className="h-3.5 w-3.5" /> Approve
                  </button>
                  <button
                    type="button"
                    disabled={busy === s.id}
                    onClick={() => act(s.id, "resubmit")}
                    className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/15 px-3.5 py-2 text-xs font-bold text-orange-300 disabled:opacity-60"
                  >
                    <RefreshCw className="h-3.5 w-3.5" /> Resubmit
                  </button>
                  <button
                    type="button"
                    disabled={busy === s.id}
                    onClick={() => act(s.id, "rejected")}
                    className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/15 px-3.5 py-2 text-xs font-bold text-rose-300 disabled:opacity-60"
                  >
                    <X className="h-3.5 w-3.5" /> Reject
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
