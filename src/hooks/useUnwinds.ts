import { useQuery } from "@tanstack/react-query";
import { useAuthUser } from "./useFestival";
import { useSeason } from "./useSeason";
import { activitiesQuery, myUnwindsQuery, notificationsQuery, type UnwindSubmission } from "@/lib/unwind-api";
import { missionFromActivity } from "@/lib/season-api";

/** Proof submissions + admin-configured activity content for the signed-in participant. */
export function useUnwinds() {
  const { data: user } = useAuthUser();
  const userId = user?.id ?? "";
  const { season } = useSeason();
  const subs = useQuery({ ...myUnwindsQuery(userId), enabled: Boolean(userId) });
  const activities = useQuery(activitiesQuery());

  const byKey = new Map<string, UnwindSubmission>();
  for (const s of subs.data ?? []) byKey.set(`${s.day}:${s.mission_key}`, s);

  const seasonActivities = (activities.data ?? []).filter(
    (a) => a.active && (!season || !a.season_id || a.season_id === season.id),
  );

  return {
    userId,
    submissions: subs.data ?? [],
    byKey,
    activities: seasonActivities,
    activityFor: (day: number, missionKey: string) =>
      seasonActivities.find((a) => a.day === day && a.mission_key === missionKey) ?? null,
    /** Admin-configured Daily Unwinds for a day, already in Mission shape. */
    activitiesForDay: (day: number) =>
      seasonActivities
        .filter((a) => a.day === day)
        .map((a) => ({ activity: a, mission: missionFromActivity(a) })),
    loading: subs.isLoading || activities.isLoading,
  };
}

export function useNotifications() {
  const { data: user } = useAuthUser();
  const userId = user?.id ?? "";
  const { data, isLoading } = useQuery({
    ...notificationsQuery(userId),
    enabled: Boolean(userId),
    refetchInterval: 60_000,
  });
  const list = data ?? [];
  return { userId, list, unread: list.filter((n) => !n.read_at).length, loading: isLoading };
}
