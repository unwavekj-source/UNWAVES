import type { ReactNode } from "react";

type GradientTextProps = {
  children: ReactNode;
  className?: string;
};

export function GradientText({
  children,
  className = "",
}: GradientTextProps) {
  return (
    <span
      className={[
        "bg-gradient-to-r from-violet-300 via-fuchsia-300 to-orange-300 bg-clip-text text-transparent",
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
