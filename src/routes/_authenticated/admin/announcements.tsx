import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Megaphone, Pin, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { announcementsQuery } from "@/lib/festival-api";
import { createAnnouncement, deleteAnnouncement, updateAnnouncement } from "@/lib/roles-api";
import { useMyRole } from "@/hooks/useRole";

export const Route = createFileRoute("/_authenticated/admin/announcements")({
  head: () => ({
    meta: [
      { title: "Announcements — CA UNWIND Admin" },
      { name: "description", content: "Publish festival announcements to every CA UNWIND participant." },
      { property: "og:title", content: "Announcements — CA UNWIND Admin" },
      { property: "og:description", content: "Broadcast news to the festival." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminAnnouncements,
});

const KINDS = ["news", "challenge", "result", "reminder"] as const;

function AdminAnnouncements() {
  const { isAdmin } = useMyRole();
  const qc = useQueryClient();
  const { data: news } = useQuery(announcementsQuery());

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [kind, setKind] = useState<string>("news");
  const [pinned, setPinned] = useState(false);

  const refresh = () => qc.invalidateQueries({ queryKey: ["announcements"] });

  const create = useMutation({
    mutationFn: () => createAnnouncement({ title: title.trim(), body: body.trim(), kind, pinned }),
    onSuccess: () => {
      refresh();
      setTitle("");
      setBody("");
      setPinned(false);
      toast.success("Announcement published");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const pinToggle = useMutation({
    mutationFn: (v: { id: string; pinned: boolean }) => updateAnnouncement(v.id, { pinned: v.pinned }),
    onSuccess: refresh,
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteAnnouncement(id),
    onSuccess: () => {
      refresh();
      toast.success("Announcement removed");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const valid = title.trim().length > 2 && title.trim().length <= 120 && body.trim().length > 2 && body.trim().length <= 1000;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_1.2fr]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (valid) create.mutate();
        }}
        className="glass gradient-border h-fit rounded-4xl p-6"
      >
        <h2 className="font-display flex items-center gap-2 text-lg font-bold">
          <Megaphone className="h-4.5 w-4.5 text-festival-gold" /> New announcement
        </h2>

        <label className="mt-5 block text-xs font-semibold text-muted-foreground" htmlFor="a-title">
          Title
        </label>
        <input
          id="a-title"
          value={title}
          maxLength={120}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="People's Choice Stage is live"
          className="mt-1.5 w-full rounded-2xl border border-border bg-secondary/40 px-4 py-3 text-sm outline-none focus:border-primary"
        />

        <label className="mt-4 block text-xs font-semibold text-muted-foreground" htmlFor="a-body">
          Message
        </label>
        <textarea
          id="a-body"
          value={body}
          maxLength={1000}
          rows={5}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Voting opens tonight at 8 PM IST. One vote per participant."
          className="mt-1.5 w-full resize-none rounded-2xl border border-border bg-secondary/40 px-4 py-3 text-sm outline-none focus:border-primary"
        />

        <div className="mt-4 flex flex-wrap gap-1.5">
          {KINDS.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setKind(k)}
              className={`rounded-full px-3 py-1.5 text-[11px] font-semibold capitalize ${
                kind === k ? "text-primary-foreground" : "border border-border text-muted-foreground hover:text-foreground"
              }`}
              style={kind === k ? { background: "var(--gradient-festival)" } : undefined}
            >
              {k}
            </button>
          ))}
        </div>

        <label className="mt-4 flex items-center gap-2 text-xs font-semibold text-muted-foreground">
          <input type="checkbox" checked={pinned} onChange={(e) => setPinned(e.target.checked)} className="accent-primary" />
          Pin to the top of the lobby
        </label>

        <button
          type="submit"
          disabled={!valid || !isAdmin || create.isPending}
          className="mt-6 w-full rounded-full py-3 text-sm font-bold text-primary-foreground disabled:opacity-50"
          style={{ background: "var(--gradient-festival)" }}
        >
          {create.isPending ? "Publishing…" : "Publish to the festival"}
        </button>
        {!isAdmin && <p className="mt-3 text-xs text-muted-foreground">Only admins can publish announcements.</p>}
      </form>

      <div className="space-y-3">
        {(news ?? []).map((n) => (
          <div key={n.id} className="glass rounded-3xl p-5">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
              <div className="min-w-0">
                <h3 className="truncate text-sm font-bold">{n.title}</h3>
                <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">{n.kind}</p>
              </div>
              {isAdmin && (
                <div className="flex shrink-0 gap-1.5">
                  <button
                    type="button"
                    aria-label={n.pinned ? "Unpin announcement" : "Pin announcement"}
                    onClick={() => pinToggle.mutate({ id: n.id, pinned: !n.pinned })}
                    className={`grid h-8 w-8 place-items-center rounded-full border border-border ${
                      n.pinned ? "text-festival-gold" : "text-muted-foreground"
                    }`}
                  >
                    <Pin className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Delete announcement"
                    onClick={() => remove.mutate(n.id)}
                    className="grid h-8 w-8 place-items-center rounded-full border border-destructive/50 text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{n.body}</p>
          </div>
        ))}
        {(news ?? []).length === 0 && (
          <div className="glass rounded-4xl p-12 text-center text-sm text-muted-foreground">No announcements yet.</div>
        )}
      </div>
    </div>
  );
}
