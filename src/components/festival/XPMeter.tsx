import { useParticipant } from "@/hooks/useFestival";
import { Flame, Star } from "lucide-react";

export function XPMeter({ showStreak = true }: { showStreak?: boolean }) {
  const { level, xp, profile } = useParticipant();
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="inline-flex items-center gap-1.5 font-bold">
          <Star className="h-3.5 w-3.5 text-festival-gold" /> Level {level.level}
        </span>
        <span className="text-muted-foreground tabular-nums">
          {xp} / {level.nextAt} XP
          {showStreak && (
            <span className="ml-3 inline-flex items-center gap-1 text-festival-orange">
              <Flame className="h-3.5 w-3.5" /> {profile?.streak ?? 0}
            </span>
          )}
        </span>
      </div>
      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-secondary/70">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${Math.max(4, level.pct)}%`, background: "var(--gradient-festival)", backgroundSize: "200% auto" }}
        />
      </div>
    </div>
  );
}

export function ProgressRing({ value, label }: { value: number; label: string }) {
  const r = 34;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative grid h-24 w-24 place-items-center">
      <svg viewBox="0 0 80 80" className="h-24 w-24 -rotate-90">
        <circle cx="40" cy="40" r={r} fill="none" stroke="var(--secondary)" strokeWidth="7" />
        <circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke="var(--festival-pink)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (c * Math.min(100, value)) / 100}
        />
      </svg>
      <div className="absolute text-center">
        <div className="font-display text-lg font-bold tabular-nums">{Math.round(value)}%</div>
        <div className="text-[9px] uppercase tracking-widest text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}
