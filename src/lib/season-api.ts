import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Mission } from "@/data/festival";
import type { UnwindActivity } from "@/lib/unwind-api";

export type Season = {
  id: string;
  name: string;
  slug: string;
  theme: string;
  tagline: string;
  description: string;
  total_days: number;
  starts_at: string;
  ends_at: string;
  timezone: string;
  instagram_handle: string;
  default_hashtag: string;
  story_instructions: string;
  active: boolean;
  created_at: string;
  updated_at: string;
};

/* ---------------------------------- reads ---------------------------------- */

export const seasonsQuery = () =>
  queryOptions({
    queryKey: ["seasons"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("seasons")
        .select("*")
        .order("starts_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as unknown as Season[];
    },
  });

export const activeSeasonQuery = () =>
  queryOptions({
    queryKey: ["active-season"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("seasons")
        .select("*")
        .eq("active", true)
        .order("starts_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return (data ?? null) as unknown as Season | null;
    },
  });

/* --------------------------------- writes ---------------------------------- */

export async function updateSeason(id: string, patch: Partial<Omit<Season, "id" | "created_at" | "updated_at">>) {
  const { error } = await supabase.from("seasons").update(patch).eq("id", id);
  if (error) throw error;
}

export async function createSeason(input: Partial<Season> & { name: string; slug: string }) {
  const { error } = await supabase.from("seasons").insert(input as never);
  if (error) throw error;
}

/* --------------------------------- helpers --------------------------------- */

/** Which festival day is it right now, for a given season. */
export function dayForSeason(season: Season | null | undefined, now = Date.now()) {
  if (!season) return 1;
  const start = new Date(season.starts_at).getTime();
  const elapsed = Math.floor((now - start) / 86400000) + 1;
  return Math.min(season.total_days, Math.max(1, elapsed));
}

export function seasonPhase(season: Season | null | undefined, now = Date.now()) {
  if (!season) return "unknown" as const;
  if (now < new Date(season.starts_at).getTime()) return "upcoming" as const;
  if (now > new Date(season.ends_at).getTime()) return "ended" as const;
  return "live" as const;
}

export type WindowState = "upcoming" | "open" | "closed";

/** Submission window for one Daily Unwind, derived from admin-set date-times. */
export function activityWindow(activity: UnwindActivity | null, now = Date.now()) {
  const opensAt = activity?.opens_at ? new Date(activity.opens_at).getTime() : null;
  const closesAt = activity?.closes_at ? new Date(activity.closes_at).getTime() : null;
  let state: WindowState = "open";
  if (opensAt && now < opensAt) state = "upcoming";
  else if (closesAt && now > closesAt) state = "closed";
  return { state, opensAt, closesAt, canSubmit: state === "open" };
}

export function formatWhen(value: string | null | undefined) {
  if (!value) return null;
  return new Date(value).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

/** Turn an admin-configured activity row into the Mission shape the UI renders. */
export function missionFromActivity(activity: UnwindActivity, fallback?: Mission): Mission {
  return {
    key: activity.mission_key,
    kind: (activity.kind || fallback?.kind || "Fun Break") as Mission["kind"],
    icon: activity.icon || fallback?.icon || "Sparkles",
    title: activity.title || fallback?.title || "Daily Unwind",
    brief: activity.intro || fallback?.brief || "",
    minutes: activity.estimated_minutes ?? fallback?.minutes ?? 10,
    difficulty: (activity.difficulty || fallback?.difficulty || "Easy") as Mission["difficulty"],
    outcome: activity.outcome || fallback?.outcome || "",
    xp: activity.xp_override ?? activity.xp ?? fallback?.xp ?? 50,
    accent: (activity.accent || fallback?.accent || "primary") as Mission["accent"],
  };
}
