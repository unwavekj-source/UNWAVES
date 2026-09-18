import { motion } from "motion/react";
import { Clock, Gauge, Upload } from "lucide-react";

export type Challenge = {
  title: string;
  theme: string;
  difficulty: string;
  time: string;
  format: string;
  image: string;
  accent: "primary" | "warm" | "cool";
};

const accentMap = {
  primary: "var(--gradient-primary)",
  warm: "var(--gradient-warm)",
  cool: "var(--gradient-cool)",
};

export function ChallengeCard({ challenge, index = 0 }: { challenge: Challenge; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="glass glass-hover group relative overflow-hidden rounded-4xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={challenge.image}
          alt={`${challenge.title} challenge poster`}
          loading="lazy"
          width={1024}
          height={768}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, var(--card) 6%, color-mix(in oklab, var(--card) 30%, transparent) 45%, transparent)",
          }}
        />
        <span
          className="absolute top-4 left-4 rounded-full px-3 py-1.5 text-[11px] font-bold tracking-wide uppercase text-primary-foreground"
          style={{ background: accentMap[challenge.accent] }}
        >
          {challenge.theme}
        </span>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold">{challenge.title}</h3>
        <dl className="mt-5 space-y-2.5 text-sm">
          <div className="flex items-center gap-2.5 text-muted-foreground">
            <Gauge className="h-4 w-4 shrink-0 text-festival-pink" />
            <dt className="sr-only">Difficulty</dt>
            <dd>{challenge.difficulty}</dd>
          </div>
          <div className="flex items-center gap-2.5 text-muted-foreground">
            <Clock className="h-4 w-4 shrink-0 text-festival-orange" />
            <dt className="sr-only">Estimated time</dt>
            <dd>{challenge.time}</dd>
          </div>
          <div className="flex items-center gap-2.5 text-muted-foreground">
            <Upload className="h-4 w-4 shrink-0 text-festival-blue" />
            <dt className="sr-only">Submission format</dt>
            <dd>{challenge.format}</dd>
          </div>
        </dl>
      </div>
    </motion.article>
  );
}
