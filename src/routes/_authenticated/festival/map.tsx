import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Check, Lock, Sparkles } from "lucide-react";
import { FESTIVAL, dayTitle, missionsForDay } from "@/data/festival";
import { useParticipant } from "@/hooks/useFestival";
import { FestivalPage } from "@/components/festival/FestivalShell";

export const Route = createFileRoute("/_authenticated/festival/map")({
  head: () => ({
    meta: [
      { title: "Adventure Map — CA UNWIND Season 1" },
      { name: "description", content: "Walk the 15-day CA UNWIND adventure path: completed days glow, today pulses, tomorrow waits." },
      { property: "og:title", content: "Adventure Map — CA UNWIND" },
      { property: "og:description", content: "Fifteen days, one winding festival path." },
    ],
  }),
  component: AdventureMap,
});

function AdventureMap() {
  const { day, daysTouched, completedKeys } = useParticipant();
  const days = Array.from({ length: FESTIVAL.totalDays }, (_, i) => i + 1);

  return (
    <FestivalPage
      eyebrow="Adventure Map"
      title="Fifteen days. One winding path."
      subtitle="Each stop is a day of the festival. Completed stops glow gold, today pulses, the rest wait patiently."
      icon="Map"
    >
      <div className="relative">
        <div aria-hidden className="absolute left-1/2 top-0 hidden h-full w-1 -translate-x-1/2 rounded-full opacity-30 md:block" style={{ background: "var(--gradient-festival)" }} />
        <div className="space-y-5">
          {days.map((d, i) => {
            const missions = missionsForDay(d);
            const done = missions.filter((m) => completedKeys.has(`${d}:${m.key}`)).length;
            const visited = daysTouched.has(d);
            const isToday = d === day;
            const locked = d > day;

            return (
              <motion.div
                key={d}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
                className={`relative flex md:w-1/2 ${i % 2 === 0 ? "md:pr-10" : "md:ml-auto md:pl-10"}`}
              >
                <div
                  className={`glass w-full rounded-3xl p-5 ${isToday ? "gradient-border animate-pulse-glow" : ""} ${
                    locked ? "opacity-55" : "glass-hover"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl font-display text-sm font-bold"
                      style={{
                        background: visited
                          ? "var(--gradient-warm)"
                          : isToday
                            ? "var(--gradient-festival)"
                            : "var(--secondary)",
                      }}
                    >
                      {visited ? <Check className="h-5 w-5 text-primary-foreground" /> : locked ? <Lock className="h-4 w-4 text-muted-foreground" /> : d}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                        Day {d} {isToday && "· today"}
                      </p>
                      <h3 className="mt-0.5 truncate text-sm font-bold">{dayTitle(d)}</h3>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary/70">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${(done / missions.length) * 100}%`, background: "var(--gradient-festival)" }}
                      />
                    </div>
                    <span className="text-xs tabular-nums text-muted-foreground">
                      {done}/{missions.length}
                    </span>
                  </div>
                  {isToday && (
                    <Link
                      to="/festival/lobby"
                      className="mt-4 inline-flex items-center gap-2 rounded-full bg-secondary/70 px-4 py-2 text-xs font-semibold hover:bg-secondary"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-festival-gold" /> Enter today's adventure
                    </Link>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </FestivalPage>
  );
}
