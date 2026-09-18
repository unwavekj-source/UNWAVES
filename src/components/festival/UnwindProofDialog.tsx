import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AtSign, Copy, Download, Hash, Instagram, Link2, Loader2, Lock, Sparkles, Upload, X } from "lucide-react";
import { toast } from "sonner";
import type { Mission } from "@/data/festival";
import { submitUnwindProof, uploadProof, type UnwindActivity, type UnwindSubmission } from "@/lib/unwind-api";
import { activityWindow, formatWhen } from "@/lib/season-api";

const MAX_PROOF_BYTES = 15 * 1024 * 1024;
const ALLOWED = ["image/", "video/", "application/pdf"];

export function UnwindProofDialog({
  open,
  onClose,
  mission,
  day,
  activity,
  existing,
  userId,
  onSubmitted,
}: {
  open: boolean;
  onClose: () => void;
  mission: Mission;
  day: number;
  activity: UnwindActivity | null;
  existing: UnwindSubmission | null;
  userId: string;
  onSubmitted: () => Promise<void> | void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [link, setLink] = useState(existing?.story_link ?? "");
  const [note, setNote] = useState(existing?.note ?? "");
  const [busy, setBusy] = useState(false);

  const hashtag = activity?.hashtag ?? "#CAUnwind";
  const account = activity?.tag_account ?? "@caunwind";
  const platform = activity?.platform ?? "Instagram";
  const linkRequired = activity?.link_required ?? false;
  const caption = activity?.caption_template?.trim() || `Day ${day} of CA UNWIND — ${mission.title}. ${hashtag} ${account}`;
  const win = activityWindow(activity);

  async function copy(text: string, what: string) {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${what} copied.`);
    } catch {
      toast.error("Your browser blocked copying — select and copy manually.");
    }
  }

  function pickFile(f: File | null) {
    if (!f) return setFile(null);
    if (!ALLOWED.some((t) => f.type.startsWith(t))) {
      toast.error("Use an image, video or PDF as proof.");
      return;
    }
    if (f.size > MAX_PROOF_BYTES) {
      toast.error("That file is over 15 MB. Please upload a smaller one.");
      return;
    }
    setFile(f);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    if (!win.canSubmit) {
      toast.error("This Daily Unwind is not open for submissions right now.");
      return;
    }
    if (!file && !existing?.proof_path && !link.trim()) {
      toast.error("Add a story screenshot or a story link.");
      return;
    }
    if (linkRequired && !link.trim()) {
      toast.error("This activity requires a story link.");
      return;
    }
    if (link.trim() && !/^https?:\/\/\S+$/i.test(link.trim())) {
      toast.error("Story link should start with http:// or https://");
      return;
    }
    setBusy(true);
    try {
      const proofPath = file ? await uploadProof(userId, file) : existing?.proof_path ?? null;
      await submitUnwindProof({
        userId,
        day,
        missionKey: mission.key,
        missionTitle: mission.title,
        xp: activity?.xp_override ?? activity?.xp ?? mission.xp,
        platform,
        proofPath,
        storyLink: link.trim() || null,
        note: note.trim() || null,
        ...(existing ? { existingId: existing.id } : {}),
      });
      await onSubmitted();
      toast.success("Your Daily Unwind has been submitted and is now being reviewed by the CA UNWIND Team.");
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not submit your proof.");
    } finally {
      setBusy(false);
    }
  }

  const field = "w-full rounded-2xl border border-input bg-secondary/40 px-11 py-3 text-sm outline-none focus:border-festival-pink/60";
  const chip = "inline-flex min-h-9 items-center gap-1.5 rounded-full bg-secondary/70 px-3 py-1.5 text-[11px] font-semibold hover:text-foreground";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] grid place-items-center overflow-y-auto bg-background/80 p-4 backdrop-blur-md"
        >
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            className="glass gradient-border relative my-8 w-full max-w-lg rounded-4xl p-6"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-border"
            >
              <X className="h-4 w-4" />
            </button>

            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Day {day} · {mission.kind} · {mission.minutes} min
            </p>
            <h2 className="mt-1 pr-10 text-xl font-bold leading-snug">{mission.title}</h2>
            {mission.brief && <p className="mt-2 text-sm text-muted-foreground">{mission.brief}</p>}

            {activity?.why_it_exists && (
              <p className="mt-4 rounded-2xl bg-secondary/40 p-3 text-xs text-muted-foreground">
                <Sparkles className="mr-1.5 inline h-3.5 w-3.5 text-festival-gold" />
                Why this exists: {activity.why_it_exists}
              </p>
            )}

            {activity?.instructions && (
              <div className="mt-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">How to do it</p>
                <p className="mt-1.5 text-xs text-muted-foreground">{activity.instructions}</p>
              </div>
            )}

            {activity?.rules && activity.rules.length > 0 && (
              <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                {activity.rules.map((r) => (
                  <li key={r} className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-festival-gold" />
                    {r}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-5 rounded-3xl bg-secondary/50 p-4 text-sm">
              <p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                <Instagram className="h-3.5 w-3.5 text-festival-pink" /> Share your unwind first
              </p>
              <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Hash className="h-3.5 w-3.5 text-festival-gold" /> Hashtag{" "}
                  <span className="font-bold text-foreground">{hashtag}</span>
                </li>
                <li className="flex items-center gap-2">
                  <AtSign className="h-3.5 w-3.5 text-festival-gold" /> Tag{" "}
                  <span className="font-bold text-foreground">{account}</span>
                </li>
                <li>
                  {activity?.story_required === false
                    ? `A ${platform} post is enough for this activity.`
                    : `A ${platform} Story is required.`}
                  {activity?.reel_accepted ? " Reels are accepted too." : ""}
                </li>
                {activity?.extra_requirements && <li>{activity.extra_requirements}</li>}
              </ul>
              <div className="mt-3 flex flex-wrap gap-2">
                <button type="button" onClick={() => copy(hashtag, "Hashtag")} className={chip}>
                  <Copy className="h-3 w-3" /> Copy hashtag
                </button>
                <button type="button" onClick={() => copy(caption, "Caption")} className={chip}>
                  <Copy className="h-3 w-3" /> Copy caption
                </button>
                {activity?.story_template_url && (
                  <a href={activity.story_template_url} target="_blank" rel="noreferrer" className={chip}>
                    <Download className="h-3 w-3" /> Story template
                  </a>
                )}
              </div>
              <p className="mt-3 text-[11px] text-muted-foreground/80">
                We can't check Instagram automatically — the CA UNWIND Team verifies your proof manually.
              </p>
            </div>

            {!win.canSubmit ? (
              <p className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-secondary/60 px-4 py-4 text-xs text-muted-foreground">
                <Lock className="h-3.5 w-3.5" />
                {win.state === "upcoming"
                  ? `This unwind opens ${formatWhen(activity?.opens_at ?? null) ?? "soon"}.`
                  : `Submissions closed ${formatWhen(activity?.closes_at ?? null) ?? ""}. Ask the team if you need it reopened.`}
              </p>
            ) : (
              <>
                <div className="mt-5 space-y-3">
                  <label className="glass-hover flex min-h-14 cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-border px-4 py-4 text-sm">
                    <Upload className="h-4 w-4 text-festival-pink" />
                    <span className="min-w-0 flex-1 truncate text-muted-foreground">
                      {file ? file.name : existing?.proof_path ? "Replace story screenshot" : "Upload story screenshot"}
                    </span>
                    <input
                      type="file"
                      accept="image/*,video/*,application/pdf"
                      className="hidden"
                      onChange={(e) => pickFile(e.target.files?.[0] ?? null)}
                    />
                  </label>

                  <div className="relative">
                    <Link2 className="absolute left-4 top-3.5 h-4 w-4 text-muted-foreground" />
                    <input
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      placeholder={linkRequired ? "Story link (required)" : "Story link (optional)"}
                      className={field}
                    />
                  </div>

                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={3}
                    maxLength={500}
                    placeholder="Anything the team should know? (optional)"
                    className="w-full rounded-2xl border border-input bg-secondary/40 px-4 py-3 text-sm outline-none focus:border-festival-pink/60"
                  />
                </div>

                {existing?.review_note && existing.status !== "approved" && (
                  <p className="mt-4 rounded-2xl bg-rose-500/10 p-3 text-xs text-rose-200">
                    Team feedback: {existing.review_note}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={busy}
                  className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-primary-foreground disabled:opacity-60"
                  style={{ background: "var(--gradient-festival)" }}
                >
                  {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  {busy ? "Sending to the team…" : existing ? "Resubmit for verification" : "Submit for verification"}
                </button>
                <p className="mt-3 text-center text-[11px] text-muted-foreground">
                  The CA UNWIND Team verifies every Daily Unwind. You'll be notified the moment it's approved.
                </p>
              </>
            )}
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
