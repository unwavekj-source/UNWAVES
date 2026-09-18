import { motion } from "motion/react";
import { Zap, Sunrise, Feather, Dices, Lightbulb } from "lucide-react";

const accents: Record<string, string> = {
  primary: "var(--gradient-primary)",
  warm: "var(--gradient-warm)",
  cool: "var(--gradient-cool)",
  pink: "linear-gradient(120deg, var(--festival-pink), var(--festival-orange))",
  gold: "linear-gradient(120deg, var(--festival-gold), var(--festival-yellow))",
};

const icons = { Zap, Sunrise, Feather, Dices, Lightbulb };

export function MissionCard({
  title,
  icon,
  text,
  xp,
  accent = "primary",
  index = 0,
}: {
  title: string;
  icon: string;
  text: string;
  xp: number;
  accent?: string;
  index?: number;
}) {
  const Icon = icons[icon as keyof typeof icons] ?? Zap;
  const gradient = accents[accent] ?? accents["primary"];

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.07 }}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}
      className="glass group relative overflow-hidden rounded-3xl p-6 text-left transition-shadow duration-300 hover:shadow-[var(--shadow-glow)]"
    >
      <span
        aria-hidden
        className="absolute -top-14 -right-10 h-32 w-32 rounded-full opacity-30 blur-2xl transition-opacity duration-500 group-hover:opacity-70"
        style={{ background: gradient }}
      />
      <span className="relative grid h-12 w-12 place-items-center rounded-2xl" style={{ background: gradient }}>
        <Icon className="h-5.5 w-5.5 text-primary-foreground" />
      </span>
      <h3 className="relative mt-5 text-lg font-bold">{title}</h3>
      <p className="relative mt-1.5 text-sm text-muted-foreground">{text}</p>
      <span className="relative mt-5 inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-festival-gold">
        <Zap className="h-3.5 w-3.5" /> +{xp} XP
      </span>
    </motion.button>
  );
}
