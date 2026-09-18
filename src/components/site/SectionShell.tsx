import type { ReactNode } from "react";
import { motion } from "motion/react";

type SectionShellProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  eyebrow?: string;
  muted?: boolean;
};

export function SectionShell({
  children,
  id,
  className = "",
  eyebrow,
  muted = false,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={[
        "relative overflow-hidden border-t border-white/[0.06]",
        muted ? "bg-white/[0.015]" : "",
        className,
      ].join(" ")}
    >
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-72 w-[32rem] -translate-x-1/2 rounded-full bg-violet-500/[0.045] blur-[120px]" />
        <div className="absolute right-[-10rem] top-1/3 h-64 w-64 rounded-full bg-fuchsia-500/[0.035] blur-[100px]" />
        <div className="absolute bottom-[-8rem] left-[-8rem] h-64 w-64 rounded-full bg-orange-400/[0.025] blur-[100px]" />
      </div>

      {/* subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 sm:py-28 lg:px-10 lg:py-36">
        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 flex items-center gap-3"
          >
            <span className="h-px w-8 bg-gradient-to-r from-violet-400 to-fuchsia-400" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/35">
              {eyebrow}
            </span>
          </motion.div>
        )}

        {children}
      </div>
    </section>
  );
}
