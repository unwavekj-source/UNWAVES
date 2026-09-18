import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

type StatusPillProps = {
  children: string;
  className?: string;
};

export function StatusPill({
  children,
  className = "",
}: StatusPillProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={[
        "inline-flex items-center gap-2 rounded-full",
        "border border-white/[0.09]",
        "bg-white/[0.035] px-3.5 py-2",
        "backdrop-blur-xl",
        className,
      ].join(" ")}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fuchsia-400/60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-gradient-to-r from-violet-400 via-fuchsia-400 to-orange-300" />
      </span>

      <Sparkles className="h-3 w-3 text-white/45" />

      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">
        {children}
      </span>
    </motion.div>
  );
}
