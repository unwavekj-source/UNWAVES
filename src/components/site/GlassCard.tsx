import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  index?: number;
  interactive?: boolean;
};

export function GlassCard({
  children,
  className = "",
  href,
  index = 0,
  interactive = true,
}: GlassCardProps) {
  const motionProps = interactive ? { whileHover: { y: -5 } } : {};

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.55,
        delay: Math.min(index * 0.06, 0.3),
        ease: "easeOut",
      }}
      {...motionProps}
      className={[
        "group relative overflow-hidden rounded-[1.5rem] border border-white/[0.08]",
        "bg-white/[0.035] backdrop-blur-xl",
        "transition-colors duration-300",
        interactive
          ? "hover:border-white/[0.16] hover:bg-white/[0.055]"
          : "",
        className,
      ].join(" ")}
    >
      {/* gradient atmosphere */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-violet-500/[0.09] blur-3xl transition-opacity duration-500 group-hover:bg-fuchsia-500/[0.12]" />

      <div className="pointer-events-none absolute -bottom-24 -left-20 h-40 w-40 rounded-full bg-orange-400/[0.05] blur-3xl" />

      {/* top shine */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-60" />

      {/* content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* optional arrow */}
      {href && (
        <div className="pointer-events-none absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-black/20 text-white/35 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-white/20 group-hover:bg-white/[0.08] group-hover:text-white">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      )}
    </motion.div>
  );

  if (!href) {
    return content;
  }

  return (
    <a
      href={href}
      className="block rounded-[1.5rem] outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400/60"
    >
      {content}
    </a>
  );
}
