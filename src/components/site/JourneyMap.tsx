import { motion } from "motion/react";
import { JOURNEY } from "@/data/site";

/** Journey map — a glowing winding path with stops, not a timeline table. */
export function JourneyMap() {
  return (
    <div className="relative mt-14">
      <div
        aria-hidden
        className="absolute top-0 bottom-0 left-6 w-px md:left-1/2"
        style={{ background: "var(--gradient-festival)", opacity: 0.5 }}
      />
      <ol className="space-y-8">
        {JOURNEY.map((s, i) => {
          const right = i % 2 === 1;
          return (
            <li key={s.step} className="relative">
              <motion.div
                initial={{ opacity: 0, x: right ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4 md:grid-cols-2 md:gap-10 ${
                  right ? "" : ""
                }`}
              >
                <span
                  className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full font-display text-sm font-bold text-primary-foreground md:absolute md:left-1/2 md:-translate-x-1/2"
                  style={{ background: "var(--gradient-festival)", boxShadow: "var(--shadow-glow)" }}
                >
                  {i + 1}
                </span>

                <div
                  className={`glass glass-hover rounded-3xl p-5 sm:p-6 ${
                    right ? "md:col-start-2 md:ml-10" : "md:col-start-1 md:mr-10 md:text-right"
                  }`}
                >
                  <h3 className="text-lg font-bold sm:text-xl">{s.step}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{s.text}</p>
                </div>
              </motion.div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
