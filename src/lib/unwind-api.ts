import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type UnwindStatus = "pending" | "approved" | "rejected" | "resubmit";

export type UnwindActivity = {
  id: string;
  season_id: string | null;
  day: number;
  mission_key: string;
  title: string | null;
  hashtag: string;
  tag_account: string;
  platform: string;
  story_required: boolean;
  feed_post_accepted: boolean;
  reel_accepted: boolean;
  link_required: boolean;
  extra_requirements: string | null;
  xp_override: number | null;
  bulk_approvable: boolean;
  active: boolean;
  /* admin-editable content */
  kind: string;
  icon: string;
  intro: string;
  why_it_exists: string;
  instructions: string;
  rules: string[];
  estimated_minutes: number;
  difficulty: string;
  outcome: string;
  xp: number;
  accent: string;
  submission_type: string;
  caption_template: string;
  story_template_url: string | null;
  opens_at: string | null;
  closes_at: string | null;
  sort_order: number;
};


export type UnwindSubmission = {
  id: string;
  user_id: string;
  day: number;
  mission_key: string;
  mission_title: string;
  xp: number;
  platform: string;
  proof_path: string | null;
  story_link: string | null;
  note: string | null;
  status: UnwindStatus;
  review_note: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  created_at: string;
  updated_at: string;
};

export type NotificationRow = {
  id: string;
  user_id: string;
  title: string;
  body: string;
  kind: string;
  read_at: string | null;
  created_at: string;
};

export const STATUS_META: Record<UnwindStatus | "none", { label: string; dot: string; tone: string }> = {
  approved: { label: "Verified", dot: "bg-emerald-400", tone: "text-emerald-300" },
  pending: { label: "Pending verification", dot: "bg-festival-gold", tone: "text-festival-gold" },
  resubmit: { label: "Needs resubmission", dot: "bg-orange-400", tone: "text-orange-300" },
  rejected: { label: "Not verified", dot: "bg-rose-500", tone: "text-rose-300" },
  none: { label: "Not submitted", dot: "bg-muted-foreground/60", tone: "text-muted-foreground" },
};

/* ---------------------------------- reads ---------------------------------- */

export const activitiesQuery = () =>
  queryOptions({
    queryKey: ["unwind-activities"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("unwind_activities")
        .select("*")
        .order("day", { ascending: true })
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as UnwindActivity[];
    },
  });

export const myUnwindsQuery = (userId: string) =>
  queryOptions({
    queryKey: ["unwind-submissions", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("unwind_submissions")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as UnwindSubmission[];
    },
  });

/** Staff-only: every proof submission (RLS enforced). */
export const unwindQueueQuery = () =>
  queryOptions({
    queryKey: ["unwind-queue"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("unwind_submissions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(500);
      if (error) throw error;
      return (data ?? []) as UnwindSubmission[];
    },
  });

export const notificationsQuery = (userId: string) =>
  queryOptions({
    queryKey: ["notifications", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(50);
      if (error) throw error;
      return (data ?? []) as NotificationRow[];
    },
  });

/* ---------------------------------- writes --------------------------------- */

export async function uploadProof(userId: string, file: File) {
  const ext = file.name.split(".").pop() ?? "png";
  const path = `${userId}/unwind/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("festival-media").upload(path, file, { upsert: false });
  if (error) throw error;
  return path;
}

/** Submit (or resubmit) proof. Always lands as `pending` — never self-approved. */
export async function submitUnwindProof(input: {
  userId: string;
  day: number;
  missionKey: string;
  missionTitle: string;
  xp: number;
  platform: string;
  proofPath: string | null;
  storyLink: string | null;
  note: string | null;
  existingId?: string;
}) {
  const row = {
    user_id: input.userId,
    day: input.day,
    mission_key: input.missionKey,
    mission_title: input.missionTitle,
    xp: input.xp,
    platform: input.platform,
    proof_path: input.proofPath,
    story_link: input.storyLink,
    note: input.note,
    status: "pending" as const,
    review_note: null,
  };

  if (input.existingId) {
    const { error } = await supabase.from("unwind_submissions").update(row).eq("id", input.existingId);
    if (error) throw error;
    return;
  }
  const { error } = await supabase.from("unwind_submissions").insert(row);
  if (error) throw error;
}

export async function reviewUnwind(
  id: string,
  status: UnwindStatus,
  reviewerId: string,
  reviewNote?: string | null,
) {
  const { error } = await supabase
    .from("unwind_submissions")
    .update({
      status,
      reviewed_by: reviewerId,
      reviewed_at: new Date().toISOString(),
      ...(reviewNote !== undefined ? { review_note: reviewNote } : {}),
    })
    .eq("id", id);
  if (error) throw error;
}

export async function updateActivity(id: string, patch: Partial<Omit<UnwindActivity, "id">>) {
  const { error } = await supabase.from("unwind_activities").update(patch).eq("id", id);
  if (error) throw error;
}

export async function markNotificationRead(id: string) {
  const { error } = await supabase.from("notifications").update({ read_at: new Date().toISOString() }).eq("id", id);
  if (error) throw error;
}

export async function markAllNotificationsRead(userId: string) {
  const { error } = await supabase
    .from("notifications")
    .update({ read_at: new Date().toISOString() })
    .eq("user_id", userId)
    .is("read_at", null);
  if (error) throw error;
}
