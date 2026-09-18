import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BADGES, FESTIVAL } from "@/data/festival";

/** XP → level curve. Level N needs 400 * N XP cumulative-ish, kept simple + readable. */
export const LEVEL_STEP = 400;

export function levelFromXp(xp: number) {
  const level = Math.floor(xp / LEVEL_STEP) + 1;
  const into = xp % LEVEL_STEP;
  return {
    level,
    into,
    needed: LEVEL_STEP,
    pct: Math.round((into / LEVEL_STEP) * 100),
    nextAt: level * LEVEL_STEP,
  };
}

export function currentDay() {
  if (!FESTIVAL.startsAt) return 1;
  const start = new Date(FESTIVAL.startsAt).getTime();
  const elapsed = Math.floor((Date.now() - start) / 86400000) + 1;
  return Math.min(FESTIVAL.totalDays, Math.max(1, elapsed));
}

export type Profile = {
  id: string;
  full_name: string;
  email: string | null;
  ca_level: string;
  city: string | null;
  avatar_url: string | null;
  participant_id: string;
  xp: number;
  streak: number;
  favourite_memory: string | null;
  season: string;
  created_at: string;
};

export const profileQuery = (userId: string) =>
  queryOptions({
    queryKey: ["profile", userId],
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle();
      if (error) throw error;
      return data as Profile | null;
    },
  });

export const passportsQuery = () =>
  queryOptions({
    queryKey: ["passports"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("public_profiles")
        .select("id, full_name, ca_level, avatar_url, participant_id, xp, streak, city")
        .order("xp", { ascending: false })
        .limit(50);
      if (error) throw error;
      return data ?? [];
    },
  });

export const missionsQuery = (userId: string) =>
  queryOptions({
    queryKey: ["missions", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("mission_completions")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

export const badgesQuery = (userId: string) =>
  queryOptions({
    queryKey: ["badges", userId],
    queryFn: async () => {
      const { data, error } = await supabase.from("user_badges").select("*").eq("user_id", userId);
      if (error) throw error;
      return data ?? [];
    },
  });

export type SubmissionRow = {
  id: string;
  user_id: string;
  challenge_key: string;
  title: string;
  story: string | null;
  media_url: string | null;
  media_kind: string;
  category: string;
  featured: boolean;
  status: string;
  review_note: string | null;
  created_at: string;
};


export const submissionsQuery = () =>
  queryOptions({
    queryKey: ["submissions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("submissions")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as SubmissionRow[];
    },
  });

export const votesQuery = (userId: string | null) =>
  queryOptions({
    queryKey: ["votes", userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("votes")
        .select("id, user_id, submission_id")
        .eq("user_id", userId!);
      if (error) throw error;
      return data ?? [];
    },
  });

export const voteCountsQuery = () =>
  queryOptions({
    queryKey: ["vote_counts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("submission_vote_counts")
        .select("submission_id, vote_count");
      if (error) throw error;
      return data ?? [];
    },
  });

export const announcementsQuery = () =>
  queryOptions({
    queryKey: ["announcements"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .order("pinned", { ascending: false })
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

export const signedUrlQuery = (path: string | null) =>
  queryOptions({
    queryKey: ["signed-url", path],
    enabled: Boolean(path),
    staleTime: 1000 * 60 * 30,
    queryFn: async () => {
      if (!path) return null;
      const { data, error } = await supabase.storage.from("festival-media").createSignedUrl(path, 60 * 60);
      if (error) throw error;
      return data.signedUrl;
    },
  });

/* ---------------------------------- writes --------------------------------- */

export async function addXp(userId: string, current: number, amount: number) {
  const { error } = await supabase.from("profiles").update({ xp: current + amount }).eq("id", userId);
  if (error) throw error;
}

/**
 * Daily Unwinds are no longer self-completed. Participants submit social proof
 * (see `src/lib/unwind-api.ts`) and a verified approval writes the completion
 * row, XP and streak from the database.
 */


export async function grantBadge(userId: string, badgeKey: string) {
  if (!BADGES.some((b) => b.key === badgeKey)) return;
  await supabase.from("user_badges").insert({ user_id: userId, badge_key: badgeKey });
}

export async function uploadMedia(userId: string, file: File) {
  const ext = file.name.split(".").pop() ?? "bin";
  const path = `${userId}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("festival-media").upload(path, file, { upsert: false });
  if (error) throw error;
  return path;
}

export async function createSubmission(input: {
  userId: string;
  title: string;
  story: string;
  category: string;
  mediaKind: string;
  mediaPath: string | null;
  challengeKey: string;
}) {
  const { error } = await supabase.from("submissions").insert({
    user_id: input.userId,
    title: input.title,
    story: input.story,
    category: input.category,
    media_kind: input.mediaKind,
    media_url: input.mediaPath,
    challenge_key: input.challengeKey,
  });
  if (error) throw error;
}

export async function toggleVote(userId: string, submissionId: string, voted: boolean) {
  if (voted) {
    const { error } = await supabase.from("votes").delete().eq("user_id", userId).eq("submission_id", submissionId);
    if (error) throw error;
    return;
  }
  const { error } = await supabase.from("votes").insert({ user_id: userId, submission_id: submissionId });
  if (error && error.code !== "23505") throw error;
}

export async function updateProfile(userId: string, patch: Partial<Pick<Profile, "full_name" | "ca_level" | "city" | "favourite_memory" | "avatar_url">>) {
  const { error } = await supabase.from("profiles").update(patch).eq("id", userId);
  if (error) throw error;
}
