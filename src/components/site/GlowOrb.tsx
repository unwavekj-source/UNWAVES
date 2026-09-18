import { motion } from "motion/react";
import type { MotionStyle } from "motion/react";

type GlowOrbProps = {
  size?: number;
  className?: string;
  delay?: number;
  opacity?: number;
};

export function GlowOrb({
  size = 240,
  className = "",
  delay = 0,
  opacity = 0.18,
}: GlowOrbProps) {
  const style = {
    width: size,
    height: size,
    opacity,
    "--orb-size": `${size}px`,
  } as unknown as MotionStyle;

  return (
    <motion.div
      aria-hidden="true"
      className={[
        "pointer-events-none absolute rounded-full",
        "bg-gradient-to-br from-violet-500 via-fuchsia-500 to-orange-400",
        "blur-[80px]",
        className,
      ].join(" ")}
      style={style}
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{
        scale: [0.9, 1.05, 0.95, 0.9],
        opacity: [opacity * 0.65, opacity, opacity * 0.8, opacity * 0.65],
      }}
      transition={{
        duration: 9,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
