import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Search, ShieldCheck, UserCog, X } from "lucide-react";
import { toast } from "sonner";
import { passportsQuery } from "@/lib/festival-api";
import { allRolesQuery, grantRole, revokeRole, ROLE_LABELS, type AppRole } from "@/lib/roles-api";
import { useMyRole } from "@/hooks/useRole";

export const Route = createFileRoute("/_authenticated/admin/participants")({
  head: () => ({
    meta: [
      { title: "Participants — CA UNWIND Admin" },
      { name: "description", content: "Manage CA UNWIND participants and crew roles." },
      { property: "og:title", content: "Participants — CA UNWIND Admin" },
      { property: "og:description", content: "Roles and passports for the season." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminParticipants,
});

const ASSIGNABLE: AppRole[] = ["admin", "team", "participant"];

function AdminParticipants() {
  const [q, setQ] = useState("");
  const { isAdmin } = useMyRole();
  const qc = useQueryClient();
  const { data: people } = useQuery(passportsQuery());
  const { data: roles } = useQuery(allRolesQuery());

  const mutate = useMutation({
    mutationFn: async (v: { userId: string; role: AppRole; on: boolean }) =>
      v.on ? grantRole(v.userId, v.role) : revokeRole(v.userId, v.role),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["all-roles"] });
      toast.success("Roles updated");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const rolesFor = (id: string) => (roles ?? []).filter((r) => r.user_id === id).map((r) => r.role);
  const needle = q.trim().toLowerCase();
  const list = (people ?? []).filter(
    (p) =>
      !needle ||
      p.full_name.toLowerCase().includes(needle) ||
      p.participant_id.toLowerCase().includes(needle) ||
      (p.city ?? "").toLowerCase().includes(needle),
  );

  return (
    <div className="space-y-6">
      <div className="glass flex items-center gap-3 rounded-full px-5 py-3">
        <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name, participant ID or city"
          maxLength={80}
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        {q && (
          <button type="button" onClick={() => setQ("")} aria-label="Clear search">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {!isAdmin && (
        <p className="text-xs text-muted-foreground">
          Team members can view the roster. Only admins can change roles.
        </p>
      )}

      <div className="space-y-3">
        {list.map((p) => {
          const mine = rolesFor(p.id);
          return (
            <div
              key={p.id}
              className="glass grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-3xl p-5 sm:flex sm:flex-wrap sm:justify-between"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl" style={{ background: "var(--gradient-cool)" }}>
                  {mine.includes("admin") ? (
                    <ShieldCheck className="h-5 w-5 text-primary-foreground" />
                  ) : (
                    <UserCog className="h-5 w-5 text-primary-foreground" />
                  )}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-bold">{p.full_name}</span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {p.participant_id} · {p.ca_level}
                    {p.city ? ` · ${p.city}` : ""} · {p.xp} XP
                  </span>
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {ASSIGNABLE.map((r) => {
                  const on = mine.includes(r);
                  return (
                    <button
                      key={r}
                      type="button"
                      disabled={!isAdmin || mutate.isPending}
                      onClick={() => mutate.mutate({ userId: p.id, role: r, on: !on })}
                      className={`rounded-full px-3 py-1.5 text-[11px] font-semibold transition-colors disabled:opacity-50 ${
                        on ? "text-primary-foreground" : "border border-border text-muted-foreground hover:text-foreground"
                      }`}
                      style={on ? { background: "var(--gradient-festival)" } : undefined}
                    >
                      {ROLE_LABELS[r]}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
        {list.length === 0 && (
          <div className="glass rounded-4xl p-12 text-center text-sm text-muted-foreground">No participants found.</div>
        )}
      </div>
    </div>
  );
}
