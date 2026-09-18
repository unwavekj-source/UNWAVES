import { motion } from "motion/react";
import { Play, Heart, Star } from "lucide-react";

export function GalleryCard({
  title,
  author,
  kind,
  featured,
  span = "short",
  index = 0,
}: {
  title: string;
  author: string;
  kind: string;
  featured?: boolean;
  span?: "tall" | "short";
  index?: number;
}) {
  const gradients = [
    "var(--gradient-primary)",
    "var(--gradient-warm)",
    "var(--gradient-cool)",
    "linear-gradient(140deg, var(--festival-pink), var(--festival-blue))",
  ];

  return (
    <motion.figure
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      className={`glass group relative mb-5 break-inside-avoid overflow-hidden rounded-3xl transition-all duration-500 hover:shadow-[var(--shadow-glow)] ${
        span === "tall" ? "h-80" : "h-56"
      }`}
    >
      <span
        aria-hidden
        className="absolute inset-0 opacity-60 transition-all duration-700 group-hover:scale-110 group-hover:opacity-85"
        style={{ background: gradients[index % gradients.length] }}
      />
      <span
        aria-hidden
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, var(--navy), transparent 65%)" }}
      />

      {featured && (
        <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-navy/70 px-3 py-1.5 text-[11px] font-bold text-festival-gold backdrop-blur-md">
          <Star className="h-3.5 w-3.5" /> Featured
        </span>
      )}

      {kind === "Video" && (
        <span className="absolute inset-0 z-10 grid place-items-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-navy/50 backdrop-blur-md transition-transform duration-500 group-hover:scale-110">
            <Play className="h-5 w-5 fill-current" />
          </span>
        </span>
      )}

      <figcaption className="absolute inset-x-0 bottom-0 z-10 p-5">
        <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-festival-gold">{kind}</p>
        <h3 className="mt-1 truncate text-base font-bold">{title}</h3>
        <div className="mt-1 flex items-center justify-between text-xs text-foreground/70">
          <span className="truncate">{author}</span>
          <span className="inline-flex shrink-0 items-center gap-1">
            <Heart className="h-3.5 w-3.5" /> vote
          </span>
        </div>
      </figcaption>
    </motion.figure>
  );
}
