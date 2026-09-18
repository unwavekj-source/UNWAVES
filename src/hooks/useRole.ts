import { useQuery } from "@tanstack/react-query";
import { useAuthUser } from "./useFestival";
import { myRolesQuery, type AppRole } from "@/lib/roles-api";

/** Roles of the signed-in user, plus convenience flags for gating UI. */
export function useMyRole() {
  const { data: user } = useAuthUser();
  const userId = user?.id ?? "";
  const { data, isLoading } = useQuery({ ...myRolesQuery(userId), enabled: Boolean(userId) });

  const roles = (data ?? []).map((r) => r.role as AppRole);

  return {
    userId,
    roles,
    isAdmin: roles.includes("admin"),
    isTeam: roles.includes("team"),
    isStaff: roles.includes("admin") || roles.includes("team"),
    loading: isLoading || !userId,
  };
}
