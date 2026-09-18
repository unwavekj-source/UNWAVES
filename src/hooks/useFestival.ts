import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  badgesQuery,
  currentDay,
  levelFromXp,
  missionsQuery,
  profileQuery,
} from "@/lib/festival-api";

export function useAuthUser() {
  return useQuery({
    queryKey: ["auth-user"],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();
      return data.user ?? null;
    },
    staleTime: 1000 * 60,
  });
}

/** Everything the festival chrome needs about the signed-in participant. */
export function useParticipant() {
  const { data: user } = useAuthUser();
  const userId = user?.id ?? "";
  const profile = useQuery({ ...profileQuery(userId), enabled: Boolean(userId) });
  const missions = useQuery({ ...missionsQuery(userId), enabled: Boolean(userId) });
  const badges = useQuery({ ...badgesQuery(userId), enabled: Boolean(userId) });

  const xp = profile.data?.xp ?? 0;
  const completions = missions.data ?? [];
  const daysTouched = new Set(completions.map((c) => c.day));

  return {
    userId,
    user,
    profile: profile.data ?? null,
    completions,
    completedKeys: new Set(completions.map((c) => `${c.day}:${c.mission_key}`)),
    daysTouched,
    badges: badges.data ?? [],
    xp,
    level: levelFromXp(xp),
    day: currentDay(),
    loading: profile.isLoading,
  };
}
