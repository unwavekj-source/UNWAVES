import { queryOptions } from "@tanstack/react-query";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesUpdate } from "@/integrations/supabase/types";

export type SiteSettings = Tables<"site_settings">;
export type SiteSettingsPatch = TablesUpdate<"site_settings">;
export type Registration = Tables<"registrations">;
export type RegistrationStatus = "pending" | "confirmed" | "cancelled";

export type StatItem = {
  label: string;
  value: string;
};

/* ---------------------------------- reads ---------------------------------- */

export const siteSettingsQuery = () =>
  queryOptions({
    queryKey: ["site-settings"],
    staleTime: 1000 * 30,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .eq("id", "main")
        .maybeSingle();

      if (error) throw error;

      return (data ?? null) as SiteSettings | null;
    },
  });

export const registrationCountQuery = () =>
  queryOptions({
    queryKey: ["registration-count"],
    staleTime: 1000 * 30,
    queryFn: async () => {
      const { data, error } =
        await supabase.rpc("registration_count");

      if (error) throw error;

      return (data ?? 0) as number;
    },
  });

/** Full roster — staff only (RLS enforced). */
export const registrationsQuery = () =>
  queryOptions({
    queryKey: ["registrations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("registrations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      return (data ?? []) as Registration[];
    },
  });

/* --------------------------------- writes ---------------------------------- */

export async function updateSiteSettings(
  patch: SiteSettingsPatch,
) {
  const { error } = await supabase
    .from("site_settings")
    .update(patch)
    .eq("id", "main");

  if (error) throw error;
}

export async function updateRegistration(
  id: string,
  patch: {
    status?: RegistrationStatus;
    verified?: boolean;
    admin_note?: string;
  },
) {
  const { error } = await supabase
    .from("registrations")
    .update(patch)
    .eq("id", id);

  if (error) throw error;
}

export async function deleteRegistration(id: string) {
  const { error } = await supabase
    .from("registrations")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

/* ------------------------------ registration ------------------------------- */

export const registrationSchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(100, "Name is too long"),

  email: z
    .string()
    .trim()
    .email("Enter a valid email address")
    .max(255),

  phone: z
    .string()
    .trim()
    .max(20, "Phone number is too long")
    .regex(
      /^[0-9+()\-\s]{7,20}$/,
      "Enter a valid phone number",
    )
    .or(z.literal("")),

  /*
   * Keep `ca_level` because this is the existing database column.
   * The public-facing form calls this "Your current chapter".
   */
  ca_level: z
    .string()
    .trim()
    .min(1, "Please tell us your current chapter")
    .max(60),

  college: z
    .string()
    .trim()
    .max(120)
    .or(z.literal("")),

  city: z
    .string()
    .trim()
    .max(60)
    .or(z.literal("")),

  consent: z.literal(true, {
    message:
      "Please accept the UNWAVES community guidelines and registration terms.",
  }),
});

export type RegistrationInput =
  z.infer<typeof registrationSchema>;

export type RegisterResult =
  | {
      ok: true;
      registration_no: string;
      full_name: string;
      email: string;
      status: string;
      created_at: string;
    }
  | {
      ok: false;
      reason: string;
      registration_no?: string;
      full_name?: string;
    };

export const REGISTER_MESSAGES: Record<string, string> = {
  closed:
    "Registrations are closed right now. Follow UNWAVES for the next window.",

  not_open_yet:
    "Registrations have not opened yet. Check back soon.",

  full:
    "This registration window is currently full.",

  duplicate:
    "This email is already registered with UNWAVES.",

  invalid_name:
    "Please enter your full name.",

  invalid_email:
    "Please enter a valid email address.",

  invalid_phone:
    "Please enter a valid phone number.",

  consent_required:
    "Please accept the UNWAVES community guidelines and registration terms.",
};

export async function registerParticipant(
  input: RegistrationInput,
): Promise<RegisterResult> {
  const parsed = registrationSchema.parse(input);

  const { data, error } = await supabase.rpc(
    "register_participant",
    {
      _full_name: parsed.full_name,
      _email: parsed.email,
      _consent: true,
      ...(parsed.phone
        ? { _phone: parsed.phone }
        : {}),
      ...(parsed.ca_level
        ? { _ca_level: parsed.ca_level }
        : {}),
      ...(parsed.college
        ? { _college: parsed.college }
        : {}),
      ...(parsed.city
        ? { _city: parsed.city }
        : {}),
    },
  );

  if (error) throw error;

  return data as unknown as RegisterResult;
}

/* --------------------------------- helpers --------------------------------- */

export function statsOf(
  settings: SiteSettings | null | undefined,
): StatItem[] {
  const raw = settings?.stats;

  if (!Array.isArray(raw)) return [];

  return raw
    .map((item) =>
      item && typeof item === "object"
        ? (item as Record<string, unknown>)
        : null,
    )
    .filter(
      (item): item is Record<string, unknown> =>
        Boolean(item),
    )
    .map((item) => ({
      label: String(item["label"] ?? ""),
      value: String(item["value"] ?? ""),
    }))
    .filter((item) => item.label || item.value);
}

export type RegistrationGate = {
  open: boolean;
  reason?: string;
  spotsLeft: number | null;
};

/**
 * Mirrors the server-side registration guards so the UI
 * can explain its current state before submission.
 */
export function registrationGate(
  settings: SiteSettings | null | undefined,
  count: number | null | undefined,
  now = Date.now(),
): RegistrationGate {
  const limit = settings?.registration_limit ?? 0;

  const spotsLeft =
    limit > 0
      ? Math.max(0, limit - (count ?? 0))
      : null;

  if (!settings) {
    return {
      open: false,
      reason: "closed",
      spotsLeft,
    };
  }

  if (settings.registration_status !== "open") {
    return {
      open: false,
      reason: "closed",
      spotsLeft,
    };
  }

  if (
    settings.registration_opens_at &&
    now <
      new Date(
        settings.registration_opens_at,
      ).getTime()
  ) {
    return {
      open: false,
      reason: "not_open_yet",
      spotsLeft,
    };
  }

  if (
    settings.registration_closes_at &&
    now >
      new Date(
        settings.registration_closes_at,
      ).getTime()
  ) {
    return {
      open: false,
      reason: "closed",
      spotsLeft,
    };
  }

  if (spotsLeft === 0) {
    return {
      open: false,
      reason: "full",
      spotsLeft,
    };
  }

  return {
    open: true,
    spotsLeft,
  };
}

export function registrationsToCsv(
  rows: Registration[],
) {
  const header = [
    "registration_no",
    "full_name",
    "email",
    "phone",
    "ca_level",
    "college",
    "city",
    "status",
    "verified",
    "created_at",
  ];

  const escape = (value: unknown) =>
    `"${String(value ?? "").replace(/"/g, '""')}"`;

  const lines = rows.map((row) =>
    [
      row.registration_no,
      row.full_name,
      row.email,
      row.phone,
      row.ca_level,
      row.college,
      row.city,
      row.status,
      row.verified,
      row.created_at,
    ]
      .map(escape)
      .join(","),
  );

  return [
    header.join(","),
    ...lines,
  ].join("\n");
}
