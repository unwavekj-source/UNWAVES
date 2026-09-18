import { useEffect, useState } from "react";
import { SEASON } from "@/data/site";

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms / 3600000) % 24),
    minutes: Math.floor((ms / 60000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  };
}

export function Countdown({ compact = false, targetAt }: { compact?: boolean; targetAt?: string | null }) {
  const targetDate = targetAt || SEASON.startsAt;
  const target = targetDate ? new Date(targetDate).getTime() : null;
  // Start from a stable value so SSR and the first client render match, then
  // hydrate the live countdown in an effect.
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (target === null) return;
    setT(diff(target));
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (target === null) {
    return (
      <div className="glass gradient-border mx-auto max-w-md rounded-2xl px-5 py-4 text-center text-sm text-muted-foreground">
        Season timing will be announced when the first wave is ready.
      </div>
    );
  }


  const units = [
    { label: "Days", value: t.days },
    { label: "Hours", value: t.hours },
    { label: "Minutes", value: t.minutes },
    { label: "Seconds", value: t.seconds },
  ];

  return (
    <div className={`flex flex-wrap items-stretch justify-center ${compact ? "gap-2" : "gap-3 sm:gap-4"}`}>
      {units.map((u) => (
        <div
          key={u.label}
          className={`glass gradient-border rounded-2xl text-center ${
            compact ? "min-w-16 px-3 py-2" : "min-w-20 px-5 py-4 sm:min-w-24"
          }`}
        >
          <div
            className={`font-display font-bold tabular-nums text-gradient ${
              compact ? "text-xl" : "text-3xl sm:text-4xl"
            }`}
          >
            {String(u.value).padStart(2, "0")}
          </div>
          <div className={`mt-1 uppercase tracking-[0.18em] text-muted-foreground ${compact ? "text-[9px]" : "text-[10px]"}`}>
            {u.label}
          </div>
        </div>
      ))}
    </div>
  );
}
