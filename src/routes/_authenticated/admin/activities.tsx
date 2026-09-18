import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AtSign, CalendarClock, Hash, Save, Settings2 } from "lucide-react";
import { toast } from "sonner";
import { activitiesQuery, updateActivity, type UnwindActivity } from "@/lib/unwind-api";
import { useMyRole } from "@/hooks/useRole";

export const Route = createFileRoute("/_authenticated/admin/activities")({
  component: ActivityConfig,
});

/** ISO -> value for <input type="datetime-local"> in local time. */
function toLocalInput(iso: string | null | undefined) {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}


function ActivityConfig() {
  const qc = useQueryClient();
  const { isAdmin } = useMyRole();
  const { data: activities, isLoading } = useQuery(activitiesQuery());
  const [day, setDay] = useState(1);
  const [drafts, setDrafts] = useState<Record<string, Partial<UnwindActivity>>>({});
  const [busy, setBusy] = useState<string | null>(null);

  const rows = (activities ?? []).filter((a) => a.day === day);

  function patch(id: string, p: Partial<UnwindActivity>) {
    setDrafts((d) => ({ ...d, [id]: { ...d[id], ...p } }));
  }

  async function save(a: UnwindActivity) {
    const p = drafts[a.id];
    if (!p) return;
    setBusy(a.id);
    try {
      await updateActivity(a.id, p);
      await qc.invalidateQueries({ queryKey: ["unwind-activities"] });
      setDrafts((d) => {
        const next = { ...d };
        delete next[a.id];
        return next;
      });
      toast.success("Activity rules updated.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not save.");
    } finally {
      setBusy(null);
    }
  }

  const field = "w-full rounded-2xl border border-input bg-secondary/40 px-4 py-2.5 text-xs outline-none focus:border-festival-pink/60";

  return (
    <div>
      <div className="glass flex flex-wrap items-center gap-2 rounded-4xl p-4">
        <p className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground">
          <Settings2 className="h-4 w-4 text-festival-gold" /> Social sharing rules per Daily Unwind
        </p>
        <div className="ml-auto flex flex-wrap gap-1">
          {Array.from({ length: 15 }, (_, i) => i + 1).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDay(d)}
              className={`h-8 w-8 rounded-full text-xs font-bold ${d === day ? "text-primary-foreground" : "bg-secondary/60 text-muted-foreground"}`}
              style={d === day ? { background: "var(--gradient-festival)" } : undefined}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {!isAdmin && (
        <p className="glass mt-4 rounded-3xl p-4 text-xs text-muted-foreground">
          Team members can review submissions; only admins can change these rules.
        </p>
      )}

      {isLoading ? (
        <div className="mt-6 grid gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="glass h-40 animate-pulse rounded-3xl" />
          ))}
        </div>
      ) : (
        <div className="mt-6 grid gap-3">
          {rows.map((a) => {
            const v = { ...a, ...drafts[a.id] } as UnwindActivity;
            const dirty = Boolean(drafts[a.id]);
            return (
              <div key={a.id} className="glass rounded-3xl p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  Day {a.day} · {a.mission_key}
                </p>

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-[11px] font-semibold text-muted-foreground">Activity title</span>
                    <input disabled={!isAdmin} value={v.title ?? ""} onChange={(e) => patch(a.id, { title: e.target.value })} className={field} />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[11px] font-semibold text-muted-foreground">Category / kind</span>
                    <input disabled={!isAdmin} value={v.kind ?? ""} onChange={(e) => patch(a.id, { kind: e.target.value })} className={field} />
                  </label>
                  <label className="block md:col-span-2">
                    <span className="mb-1.5 block text-[11px] font-semibold text-muted-foreground">Short intro shown on the tile</span>
                    <textarea disabled={!isAdmin} rows={2} value={v.intro ?? ""} onChange={(e) => patch(a.id, { intro: e.target.value })} className={field} />
                  </label>
                  <label className="block md:col-span-2">
                    <span className="mb-1.5 block text-[11px] font-semibold text-muted-foreground">Why this activity exists</span>
                    <textarea disabled={!isAdmin} rows={2} value={v.why_it_exists ?? ""} onChange={(e) => patch(a.id, { why_it_exists: e.target.value })} className={field} />
                  </label>
                  <label className="block md:col-span-2">
                    <span className="mb-1.5 block text-[11px] font-semibold text-muted-foreground">Step-by-step instructions</span>
                    <textarea disabled={!isAdmin} rows={3} value={v.instructions ?? ""} onChange={(e) => patch(a.id, { instructions: e.target.value })} className={field} />
                  </label>
                  <label className="block md:col-span-2">
                    <span className="mb-1.5 block text-[11px] font-semibold text-muted-foreground">Rules (one per line)</span>
                    <textarea
                      disabled={!isAdmin}
                      rows={3}
                      value={(v.rules ?? []).join("\n")}
                      onChange={(e) => patch(a.id, { rules: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) })}
                      className={field}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[11px] font-semibold text-muted-foreground">Estimated minutes</span>
                    <input
                      disabled={!isAdmin}
                      value={v.estimated_minutes ?? ""}
                      onChange={(e) => patch(a.id, { estimated_minutes: Number(e.target.value.replace(/\D/g, "")) || 0 })}
                      className={field}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[11px] font-semibold text-muted-foreground">Difficulty</span>
                    <input disabled={!isAdmin} value={v.difficulty ?? ""} onChange={(e) => patch(a.id, { difficulty: e.target.value })} className={field} />
                  </label>
                  <label className="block md:col-span-2">
                    <span className="mb-1.5 block text-[11px] font-semibold text-muted-foreground">Outcome participants get</span>
                    <input disabled={!isAdmin} value={v.outcome ?? ""} onChange={(e) => patch(a.id, { outcome: e.target.value })} className={field} />
                  </label>
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
                      <Hash className="h-3 w-3 text-festival-gold" /> Required hashtag
                    </span>
                    <input disabled={!isAdmin} value={v.hashtag} onChange={(e) => patch(a.id, { hashtag: e.target.value })} className={field} />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
                      <AtSign className="h-3 w-3 text-festival-gold" /> Account to tag
                    </span>
                    <input disabled={!isAdmin} value={v.tag_account} onChange={(e) => patch(a.id, { tag_account: e.target.value })} className={field} />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[11px] font-semibold text-muted-foreground">Platform</span>
                    <input disabled={!isAdmin} value={v.platform} onChange={(e) => patch(a.id, { platform: e.target.value })} className={field} />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[11px] font-semibold text-muted-foreground">XP awarded</span>
                    <input
                      disabled={!isAdmin}
                      value={v.xp_override ?? v.xp ?? ""}
                      onChange={(e) => patch(a.id, { xp_override: e.target.value ? Number(e.target.value.replace(/\D/g, "")) : null })}
                      className={field}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
                      <CalendarClock className="h-3 w-3 text-festival-gold" /> Opens at
                    </span>
                    <input
                      type="datetime-local"
                      disabled={!isAdmin}
                      value={toLocalInput(v.opens_at)}
                      onChange={(e) => patch(a.id, { opens_at: e.target.value ? new Date(e.target.value).toISOString() : null })}
                      className={field}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
                      <CalendarClock className="h-3 w-3 text-festival-gold" /> Closes at
                    </span>
                    <input
                      type="datetime-local"
                      disabled={!isAdmin}
                      value={toLocalInput(v.closes_at)}
                      onChange={(e) => patch(a.id, { closes_at: e.target.value ? new Date(e.target.value).toISOString() : null })}
                      className={field}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[11px] font-semibold text-muted-foreground">Caption template</span>
                    <textarea disabled={!isAdmin} rows={2} value={v.caption_template ?? ""} onChange={(e) => patch(a.id, { caption_template: e.target.value })} className={field} />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[11px] font-semibold text-muted-foreground">Story template URL</span>
                    <input disabled={!isAdmin} value={v.story_template_url ?? ""} onChange={(e) => patch(a.id, { story_template_url: e.target.value || null })} className={field} />
                  </label>
                </div>

                <label className="mt-3 block">
                  <span className="mb-1.5 block text-[11px] font-semibold text-muted-foreground">Additional submission requirements</span>
                  <textarea
                    disabled={!isAdmin}
                    rows={2}
                    value={v.extra_requirements ?? ""}
                    onChange={(e) => patch(a.id, { extra_requirements: e.target.value })}
                    className={field}
                  />
                </label>


                <div className="mt-4 flex flex-wrap gap-3 text-[11px]">
                  {(
                    [
                      ["story_required", "Story mandatory"],
                      ["feed_post_accepted", "Feed post accepted"],
                      ["reel_accepted", "Reel accepted"],
                      ["link_required", "Story link required"],
                      ["bulk_approvable", "Bulk approvable"],
                      ["active", "Active"],
                    ] as const
                  ).map(([k, label]) => (
                    <label key={k} className="inline-flex items-center gap-2 rounded-full bg-secondary/60 px-3 py-1.5">
                      <input
                        type="checkbox"
                        disabled={!isAdmin}
                        checked={Boolean(v[k])}
                        onChange={(e) => patch(a.id, { [k]: e.target.checked })}
                      />
                      {label}
                    </label>
                  ))}
                </div>

                {isAdmin && (
                  <button
                    type="button"
                    onClick={() => save(a)}
                    disabled={!dirty || busy === a.id}
                    className="mt-4 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-primary-foreground disabled:opacity-50"
                    style={{ background: "var(--gradient-festival)" }}
                  >
                    <Save className="h-3.5 w-3.5" /> {busy === a.id ? "Saving…" : "Save rules"}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
