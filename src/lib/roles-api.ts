import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type AppRole = "admin" | "team" | "participant";

export const ROLE_LABELS: Record<AppRole, string> = {
  admin: "Admin",
  team: "Team",
  participant: "Participant",
};

export type RoleRow = { id: string; user_id: string; role: AppRole; created_at: string };

/** Roles of the signed-in user. Readable by everyone for their own row. */
export const myRolesQuery = (userId: string) =>
  queryOptions({
    queryKey: ["my-roles", userId],
    staleTime: 1000 * 60,
    queryFn: async () => {
      const { data, error } = await supabase.from("user_roles").select("*").eq("user_id", userId);
      if (error) throw error;
      return (data ?? []) as RoleRow[];
    },
  });

/** Every role row — only staff can read this (RLS enforced). */
export const allRolesQuery = () =>
  queryOptions({
    queryKey: ["all-roles"],
    queryFn: async () => {
      const { data, error } = await supabase.from("user_roles").select("*");
      if (error) throw error;
      return (data ?? []) as RoleRow[];
    },
  });

/* ---------------------------------- writes --------------------------------- */

export async function grantRole(userId: string, role: AppRole) {
  const { error } = await supabase.from("user_roles").insert({ user_id: userId, role });
  if (error && error.code !== "23505") throw error;
}

export async function revokeRole(userId: string, role: AppRole) {
  const { error } = await supabase.from("user_roles").delete().eq("user_id", userId).eq("role", role);
  if (error) throw error;
}

export type ReviewStatus = "approved" | "pending" | "rejected";

export async function reviewSubmission(
  submissionId: string,
  patch: { status?: ReviewStatus; featured?: boolean; review_note?: string },
) {
  const { error } = await supabase.from("submissions").update(patch).eq("id", submissionId);
  if (error) throw error;
}

export async function deleteSubmission(submissionId: string) {
  const { error } = await supabase.from("submissions").delete().eq("id", submissionId);
  if (error) throw error;
}

export async function createAnnouncement(input: { title: string; body: string; kind: string; pinned: boolean }) {
  const { error } = await supabase.from("announcements").insert(input);
  if (error) throw error;
}

export async function updateAnnouncement(id: string, patch: { pinned?: boolean; title?: string; body?: string }) {
  const { error } = await supabase.from("announcements").update(patch).eq("id", id);
  if (error) throw error;
}

export async function deleteAnnouncement(id: string) {
  const { error } = await supabase.from("announcements").delete().eq("id", id);
  if (error) throw error;
}
