import { motion } from "motion/react";
import { ArrowUpRight, ChevronDown, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { BRAND, SEASON } from "@/data/site";
import { ParticleField } from "./ParticleField";
import { BrandMark } from "./BrandLogo";

function WaveTrail({
  className = "",
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute ${className}`}
      initial={{ opacity: 0, pathLength: 0 }}
      animate={{ opacity: 1, pathLength: 1 }}
      transition={{
        opacity: { duration: 1.5, delay },
        pathLength: { duration: 2.2, delay, ease: "easeOut" },
      }}
    >
      <svg
        viewBox="0 0 900 260"
        fill="none"
        className="h-full w-full overflow-visible"
      >
        <defs>
          <linearGradient
            id={`wave-gradient-${delay}`}
            x1="0"
            y1="0"
            x2="900"
            y2="260"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#6D3CFF" stopOpacity="0" />
            <stop offset="0.35" stopColor="#6D3CFF" />
            <stop offset="0.62" stopColor="#FF2FA6" />
            <stop offset="0.82" stopColor="#FF7A00" />
            <stop offset="1" stopColor="#FFC700" stopOpacity="0" />
          </linearGradient>
        </defs>

        <motion.path
          d="M-60 190C90 55 210 235 365 115C505 7 585 120 720 70C790 44 850 52 960 10"
          stroke={`url(#wave-gradient-${delay})`}
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />

        <motion.path
          d="M-70 220C80 85 215 260 375 145C515 42 600 150 730 98C815 65 870 75 970 32"
          stroke={`url(#wave-gradient-${delay})`}
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.35"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </motion.div>
  );
}

function HeroButton({
  to,
  children,
  variant = "primary",
}: {
  to: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  return (
    <Link
      to={to}
      className={[
        "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300",
        variant === "primary"
          ? "bg-foreground text-background shadow-[0_0_35px_rgba(255,255,255,0.08)] hover:-translate-y-0.5 hover:shadow-[0_0_45px_rgba(255,255,255,0.15)]"
          : "border border-white/10 bg-white/[0.035] text-foreground backdrop-blur-md hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.07]",
      ].join(" ")}
    >
      {children}

      {variant === "primary" && (
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </Link>
  );
}

export function Hero() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-[#08070D] px-5 pb-16 pt-32 sm:px-8 sm:pt-36">
      {/* Ambient background */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              circle at 50% 42%,
              rgba(109, 60, 255, 0.10),
              transparent 34%
            ),
            radial-gradient(
              circle at 78% 68%,
              rgba(255, 47, 166, 0.07),
              transparent 28%
            ),
            radial-gradient(
              circle at 18% 78%,
              rgba(255, 122, 0, 0.045),
              transparent 24%
            )
          `,
        }}
      />

      {/* Fine grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 25%, black 70%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 25%, black 70%, transparent)",
        }}
      />

      {/* Abstract movement */}
      <WaveTrail className="left-[-28%] top-[14%] h-[310px] w-[1050px] rotate-[-8deg] opacity-70 sm:left-[-12%]" />
      <WaveTrail
        className="right-[-35%] top-[50%] h-[290px] w-[1050px] rotate-[7deg] opacity-50"
        delay={0.25}
      />
      <WaveTrail
        className="left-[-35%] bottom-[4%] h-[250px] w-[900px] rotate-[4deg] opacity-35"
        delay={0.45}
      />

      {/* Small glowing nodes */}
      <motion.div
        aria-hidden
        className="absolute left-[14%] top-[31%] h-1.5 w-1.5 rounded-full bg-[#6D3CFF]"
        animate={{
          opacity: [0.25, 1, 0.25],
          scale: [0.8, 1.35, 0.8],
          boxShadow: [
            "0 0 0 rgba(109,60,255,0)",
            "0 0 22px rgba(109,60,255,0.9)",
            "0 0 0 rgba(109,60,255,0)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <motion.div
        aria-hidden
        className="absolute right-[17%] top-[58%] h-1 w-1 rounded-full bg-[#FF7A00]"
        animate={{
          opacity: [0.2, 0.9, 0.2],
          scale: [0.8, 1.4, 0.8],
        }}
        transition={{ duration: 2.8, repeat: Infinity, delay: 0.8 }}
      />

      <ParticleField count={18} />

      {/* Content */}
      <div className="relative mx-auto flex min-h-[calc(100svh-9rem)] w-full max-w-6xl items-center justify-center">
        <div className="w-full text-center">
          {/* Status */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF2FA6] opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF2FA6]" />
            </span>

            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/65 sm:text-xs">
              UNWAVES IS FORMING
            </span>
          </motion.div>

          {/* Main title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-8"
          >
            <div className="relative mx-auto inline-block">
              <motion.div
                aria-hidden
                className="absolute -inset-12 rounded-full bg-[#6D3CFF]/10 blur-3xl"
                animate={{
                  opacity: [0.3, 0.55, 0.3],
                  scale: [0.95, 1.05, 0.95],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              />

              <BrandMark className="relative mx-auto mb-4 h-20 w-auto sm:h-28" />

              <h1 className="brand-wordmark relative text-[clamp(3.9rem,13.5vw,9.6rem)] leading-[0.84] tracking-[-0.03em]">
                <span className="text-white">{BRAND.name.slice(0, 2)}</span>
                <span className="bg-gradient-to-r from-[#6D3CFF] via-[#FF2FA6] via-45% to-[#FFC700] bg-clip-text text-transparent">
                  {BRAND.name.slice(2)}
                </span>
              </h1>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-7 text-sm font-semibold uppercase tracking-[0.28em] text-white/75 sm:text-base sm:tracking-[0.38em]"
            >
              {BRAND.line}
            </motion.p>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 18 }}
            transition={{
              duration: 0.8,
              delay: 0.38,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mx-auto mt-7 max-w-xl text-base leading-7 text-white/55 sm:text-lg sm:leading-8"
          >
            {BRAND.descriptor}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.55,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <HeroButton to="/experiences">
              <Sparkles className="h-4 w-4" />
              Explore the Wave
            </HeroButton>

            <HeroButton to="/join" variant="secondary">
              Join UNWAVES
            </HeroButton>
          </motion.div>

          {/* Formation message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mx-auto mt-10 max-w-md"
          >
            <div className="mx-auto flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.2em] text-white/35">
              <span className="h-px w-8 bg-white/10" />
              <span>{SEASON.theme}</span>
              <span className="h-px w-8 bg-white/10" />
            </div>
          </motion.div>

          {/* Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95 }}
            className="mt-12 flex items-center justify-center gap-3 text-[10px] font-medium tracking-[0.28em] text-white/30 sm:text-xs"
          >
            <span>REIMAGINE</span>
            <span className="text-[#6D3CFF]">•</span>
            <span>REFRESH</span>
            <span className="text-[#FF2FA6]">•</span>
            <span>RISE</span>
          </motion.div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/25"
      >
        <span className="text-[9px] font-medium uppercase tracking-[0.3em]">
          Discover
        </span>

        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>

      {/* Edge gradients */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{
          background:
            "linear-gradient(to top, #08070D, transparent)",
        }}
      />
    </section>
  );
}
