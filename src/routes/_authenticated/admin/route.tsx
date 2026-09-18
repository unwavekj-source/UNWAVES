import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { ShieldAlert } from "lucide-react";
import { useMyRole } from "@/hooks/useRole";
import { FestivalPage } from "@/components/festival/FestivalShell";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminLayout,
});

const TABS = [
  { to: "/admin", label: "Overview" },
  { to: "/admin/season", label: "Season" },

  { to: "/admin/unwinds", label: "Daily Unwinds" },
  { to: "/admin/activities", label: "Activity rules" },
  { to: "/admin/participants", label: "Participants" },
  { to: "/admin/submissions", label: "Submissions" },
  { to: "/admin/announcements", label: "Announcements" },
] as const;

function AdminLayout() {
  const { isStaff, isAdmin, loading } = useMyRole();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (loading) {
    return (
      <FestivalPage eyebrow="Festival Control" title="Opening the back stage…" icon="Shield">
        <div className="glass h-40 animate-pulse rounded-4xl" />
      </FestivalPage>
    );
  }

  if (!isStaff) {
    return (
      <FestivalPage
        eyebrow="Festival Control"
        title="Backstage only"
        subtitle="This area is reserved for the CA UNWIND crew. If you should have access, ask an admin to grant you a role."
        icon="Shield"
      >
        <div className="glass gradient-border flex items-center gap-4 rounded-4xl p-8">
          <ShieldAlert className="h-8 w-8 shrink-0 text-festival-gold" />
          <p className="text-sm text-muted-foreground">
            You are signed in as a participant. Head back to the{" "}
            <Link to="/festival/lobby" className="font-semibold text-foreground underline">
              Festival Lobby
            </Link>
            .
          </p>
        </div>
      </FestivalPage>
    );
  }

  return (
    <FestivalPage
      eyebrow={isAdmin ? "Festival Control · Admin" : "Festival Control · Team"}
      title="Back stage"
      subtitle="Run the season: people, entries, showcase and announcements."
      icon="Shield"
    >
      <div className="glass flex flex-wrap gap-1 rounded-full p-1.5">
        {TABS.map((t) => (
          <Link
            key={t.to}
            to={t.to}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
              pathname === t.to ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
            style={pathname === t.to ? { background: "var(--gradient-festival)" } : undefined}
          >
            {t.label}
          </Link>
        ))}
      </div>
      <div className="mt-8">
        <Outlet />
      </div>
    </FestivalPage>
  );
}
