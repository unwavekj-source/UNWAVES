import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { registrationCountQuery, siteSettingsQuery } from "@/lib/site-api";

/** Website content + settings edited from the Admin dashboard, live-updating. */
export function useSiteSettings() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery(siteSettingsQuery());

  useEffect(() => {
    const channel = supabase
      .channel("site-settings-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "site_settings" }, () => {
        qc.invalidateQueries({ queryKey: ["site-settings"] });
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [qc]);

  return { settings: data ?? null, loading: isLoading };
}

export function useRegistrationCount() {
  const { data } = useQuery(registrationCountQuery());
  return data ?? 0;
}
