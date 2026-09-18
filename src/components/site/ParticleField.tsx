import { useMemo } from "react";

/** Floating glowing particles — pure CSS, no per-frame JS. */
export function ParticleField({ count = 26, className = "" }: { count?: number; className?: string }) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: (i * 37) % 100,
        top: (i * 53) % 100,
        size: 3 + ((i * 7) % 9),
        delay: (i % 9) * 0.7,
        duration: 7 + ((i * 3) % 8),
        hue: ["--festival-pink", "--festival-gold", "--festival-blue", "--festival-purple"][i % 4],
      })),
    [count],
  );

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full animate-float"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            background: `var(${d.hue})`,
            boxShadow: `0 0 ${d.size * 4}px var(${d.hue})`,
            opacity: 0.55,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
