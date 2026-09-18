import { motion } from "motion/react";
import { Trophy, Palette, Heart, Flame, Award } from "lucide-react";

const icons = { Trophy, Palette, Heart, Flame };

export function AchievementCard({
  name,
  title,
  badge,
  note,
  index = 0,
}: {
  name: string;
  title: string;
  badge: string;
  note: string;
  index?: number;
}) {
  const Icon = icons[badge as keyof typeof icons] ?? Award;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.09 }}
      className="glass group relative overflow-hidden rounded-4xl p-8 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-[var(--shadow-gold)]"
      style={{ borderColor: "color-mix(in oklab, var(--festival-gold) 30%, transparent)" }}
    >
      {/* spotlight beam */}
      <span
        aria-hidden
        className="absolute -top-24 left-1/2 h-56 w-40 -translate-x-1/2 animate-pulse-glow blur-2xl"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 0%, transparent 40%, color-mix(in oklab, var(--festival-gold) 55%, transparent), transparent 60%)",
        }}
      />
      <span
        className="relative inline-grid h-20 w-20 place-items-center rounded-full"
        style={{ background: "var(--gradient-warm)" }}
      >
        <Icon className="h-8 w-8 text-accent-foreground" />
      </span>
      <p className="relative mt-5 text-[11px] font-bold tracking-[0.22em] uppercase text-festival-gold">{title}</p>
      <h3 className="relative mt-2 text-xl font-bold">{name}</h3>
      <p className="relative mt-2 text-sm text-muted-foreground">{note}</p>
    </motion.article>
  );
}
