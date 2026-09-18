import type { ReactNode } from "react";
import { motion, type Variants } from "motion/react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  y = 24,
  once = true,
}: RevealProps) {
  const variants: Variants = {
    hidden: {
      opacity: 0,
      y,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once,
        amount: 0.15,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
