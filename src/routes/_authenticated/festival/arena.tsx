import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "motion/react";
import { CalendarClock, Clock, Trophy, Upload } from "lucide-react";
import challengeImg from "@/assets/challenge-2.jpg";
import { MAIN_CHALLENGE } from "@/data/festival";
import { addXp, createSubmission, grantBadge, submissionsQuery, uploadMedia } from "@/lib/festival-api";
import { useParticipant } from "@/hooks/useFestival";
import { FestivalPage } from "@/components/festival/FestivalShell";
import { MediaThumb } from "@/components/festival/MediaThumb";

export const Route = createFileRoute("/_authenticated/festival/arena")({
  head: () => ({
    meta: [
      { title: "Challenge Arena — Reel It Unwind — CA UNWIND" },
      { name: "description", content: "Enter Reel It Unwind, the Season 1 main challenge: 60 seconds of the life you rediscovered." },
      { property: "og:title", content: "Challenge Arena — CA UNWIND" },
      { property: "og:description", content: "The Season 1 main challenge stage. Submit your entry." },
    ],
  }),
  component: Arena,
});

function kindOf(file: File) {
  if (file.type.startsWith("video")) return "video";
  if (file.type.startsWith("audio")) return "audio";
  if (file.type.startsWith("image")) return "image";
  return "file";
}

function Arena() {
  const qc = useQueryClient();
  const { userId, xp } = useParticipant();
  const { data: submissions } = useQuery(submissionsQuery());
  const mine = submissions?.find((s) => s.user_id === userId && s.challenge_key === MAIN_CHALLENGE.key);

  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!userId || busy) return;
    setBusy(true);
    setErr(null);
    try {
      let path: string | null = null;
      let mediaKind = "text";
      if (file) {
        if (file.size > 50 * 1024 * 1024) throw new Error("Please keep files under 50 MB.");
        path = await uploadMedia(userId, file);
        mediaKind = kindOf(file);
      }
      await createSubmission({
        userId,
        title: title.trim().slice(0, 120),
        story: story.trim().slice(0, 1200),
        category: MAIN_CHALLENGE.category,
        mediaKind,
        mediaPath: path,
        challengeKey: MAIN_CHALLENGE.key,
      });
      await addXp(userId, xp, MAIN_CHALLENGE.reward);
      await grantBadge(userId, "submitted");
      setTitle("");
      setStory("");
      setFile(null);
      await qc.invalidateQueries({ queryKey: ["submissions"] });
      await qc.invalidateQueries({ queryKey: ["profile", userId] });
      await qc.invalidateQueries({ queryKey: ["badges", userId] });
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  const deadline = new Date(MAIN_CHALLENGE.deadline).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
  const inputCls = "w-full rounded-2xl border border-input bg-secondary/40 px-4 py-3 text-sm outline-none focus:border-festival-pink/60";

  return (
    <FestivalPage eyebrow="Challenge Arena" title={MAIN_CHALLENGE.title} subtitle={MAIN_CHALLENGE.tagline} icon="Target">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass gradient-border relative overflow-hidden rounded-4xl"
      >
        <img src={challengeImg} alt="Reel It Unwind challenge poster" className="h-64 w-full object-cover opacity-70 sm:h-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
          <div className="flex flex-wrap gap-2 text-[11px]">
            <span className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-semibold">
              <Trophy className="h-3.5 w-3.5 text-festival-gold" /> +{MAIN_CHALLENGE.reward} XP
            </span>
            <span className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-semibold">
              <CalendarClock className="h-3.5 w-3.5 text-festival-pink" /> Closes {deadline}
            </span>
            <span className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-semibold">
              <Clock className="h-3.5 w-3.5" /> 30–60 seconds
            </span>
          </div>
          <p className="mt-4 max-w-3xl text-sm text-muted-foreground">{MAIN_CHALLENGE.story}</p>
        </div>
      </motion.div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <div className="glass rounded-4xl p-6 lg:col-span-2">
          {mine ? (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-festival-gold">Your entry is in</p>
              <h2 className="mt-2 text-xl font-bold">{mine.title}</h2>
              {mine.story && <p className="mt-2 text-sm text-muted-foreground">{mine.story}</p>}
              <MediaThumb path={mine.media_url} kind={mine.media_kind} className="mt-5 h-64 w-full rounded-3xl" />
              <p className="mt-4 text-xs text-muted-foreground">
                Head to the Creator Gallery to see it on the festival wall alongside everyone else.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-3">
              <h2 className="text-lg font-bold">Submit your entry</h2>
              <p className="text-sm text-muted-foreground">{MAIN_CHALLENGE.objective}</p>
              <input required maxLength={120} placeholder="Give it a title" value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls} />
              <textarea
                rows={4}
                maxLength={1200}
                placeholder="The story behind it (optional but lovely)"
                value={story}
                onChange={(e) => setStory(e.target.value)}
                className={inputCls}
              />
              <label className="glass flex cursor-pointer items-center gap-3 rounded-2xl border-dashed px-4 py-4 text-sm">
                <Upload className="h-4 w-4 text-festival-pink" />
                <span className="min-w-0 flex-1 truncate text-muted-foreground">
                  {file ? file.name : "Attach your reel, photo, audio or file (max 50 MB)"}
                </span>
                <input
                  type="file"
                  accept="video/*,image/*,audio/*,.pdf"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                />
              </label>
              {err && <p className="rounded-2xl bg-destructive/15 px-4 py-3 text-xs text-destructive-foreground">{err}</p>}
              <button
                type="submit"
                disabled={busy}
                className="relative w-full overflow-hidden rounded-full px-6 py-3.5 text-sm font-bold text-primary-foreground disabled:opacity-70"
              >
                <span aria-hidden className="absolute inset-0 animate-shimmer" style={{ background: "var(--gradient-festival)", backgroundSize: "200% auto" }} />
                <span className="relative">{busy ? "Sending to the arena…" : "Enter the arena"}</span>
              </button>
            </form>
          )}
        </div>

        <div className="glass rounded-4xl p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Arena rules</p>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            {MAIN_CHALLENGE.rules.map((r) => (
              <li key={r} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--gradient-festival)" }} />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </FestivalPage>
  );
}
