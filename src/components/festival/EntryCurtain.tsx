import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PartyPopper } from "lucide-react";
import { FESTIVAL } from "@/data/festival";
import { ParticleField } from "@/components/site/ParticleField";

/** Full-screen festival entry sequence — plays once per browser session. */
export function EntryCurtain({ name }: { name?: string | null | undefined }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("ca-unwind-entered")) return;
    sessionStorage.setItem("ca-unwind-entered", "1");
    setShow(true);
    const id = setTimeout(() => setShow(false), 3400);
    return () => clearTimeout(id);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="curtain"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.06 }}
          transition={{ duration: 0.8 }}
          onClick={() => setShow(false)}
          className="fixed inset-0 z-[100] grid cursor-pointer place-items-center overflow-hidden bg-background"
        >
          <div className="aurora-bg opacity-90" />
          <ParticleField count={40} />
          <div className="relative px-6 text-center">
            <motion.span
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 140, damping: 12 }}
              className="mx-auto grid h-20 w-20 place-items-center rounded-3xl"
              style={{ background: "var(--gradient-festival)", boxShadow: "var(--shadow-glow)" }}
            >
              <PartyPopper className="h-9 w-9 text-primary-foreground" />
            </motion.span>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-[11px] font-semibold uppercase tracking-[0.4em] text-muted-foreground"
            >
              The gates are open
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7 }}
              className="mt-4 text-4xl font-bold sm:text-6xl"
            >
              Welcome{name ? `, ${name.split(" ")[0]}` : ""} to
              <br />
              <span className="text-gradient">CA UNWIND</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-5 text-sm text-muted-foreground sm:text-base"
            >
              {FESTIVAL.season} · {FESTIVAL.theme}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.3 }}
              className="mt-10 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70"
            >
              Tap to enter the lobby
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
