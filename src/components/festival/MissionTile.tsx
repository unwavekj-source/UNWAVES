import { motion } from "motion/react";
import * as Icons from "lucide-react";
import type { Mission } from "@/data/festival";
import { AtSign, Check, Clock, Gauge, Hash, Hourglass, Lock, RefreshCw, Sparkles, Upload } from "lucide-react";
import { STATUS_META, type UnwindActivity, type UnwindStatus } from "@/lib/unwind-api";
import { activityWindow, formatWhen } from "@/lib/season-api";

const accentMap: Record<Mission["accent"], string> = {
  warm: "var(--gradient-warm)",
  primary: "var(--gradient-primary)",
  cool: "var(--gradient-cool)",
  pink: "linear-gradient(120deg, var(--festival-pink), var(--festival-purple))",
  gold: "linear-gradient(120deg, var(--festival-gold), var(--festival-orange))",
};

export function MissionTile({
  mission,
  status,
  activity,
  reviewNote,
  onOpen,
  index = 0,
}: {
  mission: Mission;
  status: UnwindStatus | "none";
  activity: UnwindActivity | null;
  reviewNote?: string | null;
  onOpen: () => void;
  index?: number;
}) {
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[mission.icon] ?? Sparkles;
  const meta = STATUS_META[status];
  const verified = status === "approved";
  const pending = status === "pending";
  const win = activityWindow(activity);
  const locked = !verified && !pending && !win.canSubmit;

  const cta = verified
    ? "Verified by the team"
    : pending
      ? "Awaiting verification"
      : win.state === "upcoming"
        ? `Opens ${formatWhen(activity?.opens_at ?? null) ?? "soon"}`
        : win.state === "closed"
          ? "Submission closed"
          : status === "none"
            ? "Share & submit proof"
            : "Resubmit proof";


  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className={`glass glass-hover relative overflow-hidden rounded-3xl p-5 ${verified ? "border-festival-gold/40" : ""}`}
    >
      <div aria-hidden className="absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-25 blur-2xl" style={{ background: accentMap[mission.accent] }} />

      <div className="relative flex items-start gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl" style={{ background: accentMap[mission.accent] }}>
          <Icon className="h-5 w-5 text-primary-foreground" />
        </span>
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{mission.kind}</p>
          <h3 className="mt-1 text-base font-bold leading-snug">{mission.title}</h3>
        </div>
      </div>

      <p className="relative mt-3 flex items-center gap-2 text-[11px] font-bold">
        <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
        <span className={meta.tone}>{meta.label}</span>
      </p>

      <p className="relative mt-3 text-sm text-muted-foreground">{mission.brief}</p>

      <div className="relative mt-4 flex flex-wrap gap-2 text-[11px]">
        <span className="inline-flex items-center gap-1 rounded-full bg-secondary/70 px-2.5 py-1">
          <Clock className="h-3 w-3" /> {mission.minutes} min
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-secondary/70 px-2.5 py-1">
          <Gauge className="h-3 w-3" /> {mission.difficulty}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-secondary/70 px-2.5 py-1 font-bold text-festival-gold">
          +{activity?.xp_override ?? mission.xp} XP
        </span>
      </div>

      <div className="relative mt-3 flex flex-wrap gap-2 text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <Hash className="h-3 w-3 text-festival-gold" /> {activity?.hashtag ?? "#CAUnwind"}
        </span>
        <span className="inline-flex items-center gap-1">
          <AtSign className="h-3 w-3 text-festival-gold" /> {activity?.tag_account ?? "@caunwind"}
        </span>
      </div>

      {win.closesAt && win.state !== "closed" && (
        <p className="relative mt-3 text-[11px] text-muted-foreground">
          Closes {formatWhen(activity?.closes_at ?? null)}
        </p>
      )}

      {reviewNote && !verified && (
        <p className="relative mt-3 rounded-2xl bg-rose-500/10 p-3 text-xs text-rose-200">Team feedback: {reviewNote}</p>
      )}

      <button
        type="button"
        onClick={onOpen}
        disabled={verified || pending || locked}
        className={`relative mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full px-5 py-3 text-sm font-bold transition-transform ${
          verified || pending || locked ? "bg-secondary/70 text-muted-foreground" : "text-primary-foreground hover:scale-[1.02]"
        }`}
      >
        {!verified && !pending && !locked && (
          <span aria-hidden className="absolute inset-0 animate-shimmer" style={{ background: "var(--gradient-festival)", backgroundSize: "200% auto" }} />
        )}
        <span className="relative inline-flex items-center gap-2">
          {verified ? (
            <Check className="h-4 w-4 text-festival-gold" />
          ) : pending ? (
            <Hourglass className="h-4 w-4 text-festival-gold" />
          ) : locked ? (
            <Lock className="h-4 w-4" />
          ) : status === "none" ? (
            <Upload className="h-4 w-4" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
          {cta}
        </span>
      </button>

    </motion.div>
  );
}
