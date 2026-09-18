import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CalendarClock, Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { activeSeasonQuery, dayForSeason, seasonPhase, updateSeason, type Season } from "@/lib/season-api";

export const Route = createFileRoute("/_authenticated/admin/season")({
  component: SeasonSettings,
});

/** ISO string -> value for <input type="datetime-local"> in local time. */
function toLocalInput(iso: string | null | undefined) {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function SeasonSettings() {
  const qc = useQueryClient();
  const { data: season, isLoading } = useQuery(activeSeasonQuery());
  const [draft, setDraft] = useState<Partial<Season>>({});
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (season) setDraft(season);
  }, [season]);

  async function save() {
    if (!season) return;
    setBusy(true);
    try {
      await updateSeason(season.id, {
        name: draft.name ?? season.name,
        theme: draft.theme ?? season.theme,
        tagline: draft.tagline ?? season.tagline,
        description: draft.description ?? season.description,
        total_days: Number(draft.total_days ?? season.total_days),
        starts_at: new Date(draft.starts_at ?? season.starts_at).toISOString(),
        ends_at: new Date(draft.ends_at ?? season.ends_at).toISOString(),
        instagram_handle: draft.instagram_handle ?? season.instagram_handle,
        default_hashtag: draft.default_hashtag ?? season.default_hashtag,
        story_instructions: draft.story_instructions ?? season.story_instructions,
      });
      await qc.invalidateQueries({ queryKey: ["active-season"] });
      await qc.invalidateQueries({ queryKey: ["seasons"] });
      toast.success("Season settings saved.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not save the season.");
    } finally {
      setBusy(false);
    }
  }

  if (isLoading) return <div className="glass h-64 animate-pulse rounded-4xl" />;
  if (!season) return <p className="glass rounded-3xl p-8 text-sm text-muted-foreground">No active season found.</p>;

  const field = "w-full rounded-2xl border border-input bg-secondary/40 px-4 py-2.5 text-sm outline-none focus:border-festival-pink/60";
  const label = "text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground";
  const set = (patch: Partial<Season>) => setDraft((d) => ({ ...d, ...patch }));

  return (
    <div className="grid gap-4">
      <div className="glass flex flex-wrap items-center gap-3 rounded-4xl p-5">
        <CalendarClock className="h-5 w-5 text-festival-gold" />
        <div>
          <h2 className="text-sm font-bold">{season.name}</h2>
          <p className="text-xs text-muted-foreground">
            {seasonPhase(season)} · currently day {dayForSeason(season)} of {season.total_days}
          </p>
        </div>
        <button
          type="button"
          onClick={save}
          disabled={busy}
          className="ml-auto inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold text-primary-foreground disabled:opacity-60"
          style={{ background: "var(--gradient-festival)" }}
        >
          {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />} Save season
        </button>
      </div>

      <div className="glass grid gap-4 rounded-4xl p-6 sm:grid-cols-2">
        <label className="grid gap-1.5">
          <span className={label}>Season name</span>
          <input className={field} value={draft.name ?? ""} onChange={(e) => set({ name: e.target.value })} />
        </label>
        <label className="grid gap-1.5">
          <span className={label}>Theme</span>
          <input className={field} value={draft.theme ?? ""} onChange={(e) => set({ theme: e.target.value })} />
        </label>
        <label className="grid gap-1.5 sm:col-span-2">
          <span className={label}>Tagline</span>
          <input className={field} value={draft.tagline ?? ""} onChange={(e) => set({ tagline: e.target.value })} />
        </label>
        <label className="grid gap-1.5 sm:col-span-2">
          <span className={label}>Description</span>
          <textarea rows={3} className={field} value={draft.description ?? ""} onChange={(e) => set({ description: e.target.value })} />
        </label>
        <label className="grid gap-1.5">
          <span className={label}>Starts at</span>
          <input
            type="datetime-local"
            className={field}
            value={toLocalInput(draft.starts_at ?? season.starts_at)}
            onChange={(e) => set({ starts_at: e.target.value })}
          />
        </label>
        <label className="grid gap-1.5">
          <span className={label}>Ends at</span>
          <input
            type="datetime-local"
            className={field}
            value={toLocalInput(draft.ends_at ?? season.ends_at)}
            onChange={(e) => set({ ends_at: e.target.value })}
          />
        </label>
        <label className="grid gap-1.5">
          <span className={label}>Total days</span>
          <input
            type="number"
            min={1}
            max={60}
            className={field}
            value={draft.total_days ?? season.total_days}
            onChange={(e) => set({ total_days: Number(e.target.value) })}
          />
        </label>
        <label className="grid gap-1.5">
          <span className={label}>Instagram handle</span>
          <input className={field} value={draft.instagram_handle ?? ""} onChange={(e) => set({ instagram_handle: e.target.value })} />
        </label>
        <label className="grid gap-1.5">
          <span className={label}>Default hashtag</span>
          <input className={field} value={draft.default_hashtag ?? ""} onChange={(e) => set({ default_hashtag: e.target.value })} />
        </label>
        <label className="grid gap-1.5 sm:col-span-2">
          <span className={label}>Story instructions shown to participants</span>
          <textarea
            rows={3}
            className={field}
            value={draft.story_instructions ?? ""}
            onChange={(e) => set({ story_instructions: e.target.value })}
          />
        </label>
      </div>
      <p className="text-xs text-muted-foreground">
        Day numbering, submission windows and the lobby countdown all follow these dates.
      </p>
    </div>
  );
}
