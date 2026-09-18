import { Link, type LinkProps } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export function GradientButton({
  to,
  children,
  variant = "primary",
  className = "",
}: {
  to: NonNullable<LinkProps["to"]>;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-300 sm:text-base";
  const styles =
    variant === "primary"
      ? "text-primary-foreground shadow-[var(--shadow-glow)] hover:scale-[1.04]"
      : "glass text-foreground hover:border-festival-pink/50 hover:scale-[1.03]";

  return (
    <Link to={to} className={`${base} ${styles} ${className}`}>
      {variant === "primary" && (
        <span
          aria-hidden
          className="absolute inset-0 rounded-full animate-shimmer"
          style={{ background: "var(--gradient-festival)", backgroundSize: "200% auto" }}
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </Link>
  );
}

export function CTABanner({
  title = "The next wave is taking shape. Are you in?",
  subtitle = "UNWAVES is a growing movement for people creating movement together.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-4xl border border-border p-8 text-center sm:p-14">
      <div className="aurora-bg animate-aurora opacity-70" />
      <div className="relative">
        <Sparkles className="mx-auto h-8 w-8 text-festival-gold" />
        <h2 className="mt-5 text-3xl font-bold sm:text-4xl md:text-5xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{subtitle}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <GradientButton to="/join">Join UNWAVES</GradientButton>
          <GradientButton to="/season-one" variant="ghost">
            Explore Season One
          </GradientButton>
        </div>
      </div>
    </div>
  );
}
