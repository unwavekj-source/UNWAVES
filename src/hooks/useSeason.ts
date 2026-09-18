import { useQuery } from "@tanstack/react-query";
import { activeSeasonQuery, dayForSeason, seasonPhase } from "@/lib/season-api";

/** The active season plus the derived festival day and phase. Admin-controlled. */
export function useSeason() {
  const { data, isLoading } = useQuery(activeSeasonQuery());
  const season = data ?? null;
  return {
    season,
    day: dayForSeason(season),
    phase: seasonPhase(season),
    totalDays: season?.total_days ?? 15,
    loading: isLoading,
  };
}
