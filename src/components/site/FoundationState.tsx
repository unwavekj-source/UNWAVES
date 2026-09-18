import type { ReactNode } from "react";

export function FoundationState({
  eyebrow = "UNWAVES is forming",
  title,
  description,
  icon,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  icon?: ReactNode;
}) {
  return (
    <div className="glass gradient-border mx-auto max-w-2xl rounded-4xl p-8 text-center sm:p-12">
      {icon && (
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl text-primary-foreground" style={{ background: "var(--gradient-festival)" }}>
          {icon}
        </span>
      )}
      <p className="mt-6 text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">{eyebrow}</p>
      <h2 className="mt-4 text-2xl font-bold sm:text-3xl">{title}</h2>
      <p className="mt-4 text-muted-foreground">{description}</p>
    </div>
  );
}