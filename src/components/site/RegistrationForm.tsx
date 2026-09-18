import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, Eye, EyeOff, Sparkles } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";


import {
  useSiteSettings,
  useRegistrationCount,
} from "@/hooks/useSiteSettings";

import {
  REGISTER_MESSAGES,
  registerParticipant,
  registrationGate,
  registrationSchema,
  type RegistrationInput,
  type RegisterResult,
} from "@/lib/site-api";

const fieldClass =
  "mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-foreground outline-none transition-all duration-300 placeholder:text-muted-foreground/60 focus:border-accent/60 focus:bg-white/[0.055] focus:ring-2 focus:ring-accent/10";

const initialForm: RegistrationInput = {
  full_name: "",
  email: "",
  phone: "",
  ca_level: "",
  college: "",
  city: "",
  consent: true,
};

export function RegistrationForm() {
  const { settings, loading } = useSiteSettings();
  const count = useRegistrationCount();

  const [form, setForm] =
    useState<RegistrationInput>(initialForm);

  const [result, setResult] =
    useState<RegisterResult | null>(null);

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [needsEmailConfirm, setNeedsEmailConfirm] = useState(false);

  const gate = registrationGate(settings, count);

  const update = (
    key: keyof RegistrationInput,
    value: string | boolean,
  ) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));

    setError("");
  };

  async function submit() {
    setError("");
    setResult(null);

    const parsed = registrationSchema.safeParse(form);

    if (!parsed.success) {
      setError(
        parsed.error.issues[0]?.message ??
          "Please check the form.",
      );

      return;
    }

    if (password.length < 8) {
      setError("Choose a password with at least 8 characters.");
      return;
    }

    if (password !== confirm) {
      setError("Both passwords need to match.");
      return;
    }

    setSubmitting(true);

    try {
      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email: parsed.data.email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: {
              full_name: parsed.data.full_name,
              ca_level: parsed.data.ca_level,
              city: parsed.data.city,
            },
          },
        });

      if (signUpError) {
        const message = signUpError.message.toLowerCase();

        setError(
          message.includes("already") || message.includes("registered")
            ? "An account with this email already exists. Please sign in instead."
            : signUpError.message,
        );

        setSubmitting(false);
        return;
      }

      setNeedsEmailConfirm(!signUpData.session);

      const response = await registerParticipant(parsed.data);

      if (!response.ok) {
        setError(
          REGISTER_MESSAGES[response.reason] ??
            "Registration is not available right now.",
        );
      } else {
        setResult(response);
      }
    } catch {
      setError(
        "We could not complete your registration. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  /* ============================================================
     SUCCESS
     ============================================================ */

  if (result?.ok) {
    return (
      <div className="relative py-10 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[linear-gradient(135deg,#6D3CFF,#FF2FA6,#FF7A00)] shadow-[0_0_50px_-12px_rgba(255,47,166,0.7)]">
          <Check className="h-7 w-7 text-white" />
        </div>

        <p className="mt-7 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
          You're part of UNWAVES
        </p>

        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight">
          Your wave begins here.
        </h2>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-muted-foreground">
          Your registration is complete. Keep your participant ID safe
          for everything you do with UNWAVES.
        </p>

        <div className="mx-auto mt-7 w-fit rounded-2xl border border-white/10 bg-white/[0.035] px-8 py-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            Participant ID
          </p>

          <p className="mt-2 font-display text-2xl font-bold text-gradient">
            {result.registration_no}
          </p>
        </div>

        <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-muted-foreground">
          {needsEmailConfirm
            ? "Check your inbox and confirm your email address, then sign in with the password you just created."
            : "Your account is ready — you can sign in any time with your email and password."}
        </p>

        <Link
          to="/login"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-6 py-3 text-sm font-semibold text-foreground transition hover:border-white/20 hover:bg-white/[0.09]"
        >
          Go to sign in
          <ArrowUpRight className="h-4 w-4" />
        </Link>

        <div className="mt-7 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          <span>One wave. Many stories.</span>
        </div>

        {settings?.event_name && (
          <p className="mt-4 text-xs text-muted-foreground/70">
            {settings.event_name}
          </p>
        )}
      </div>
    );
  }

  /* ============================================================
     LOADING
     ============================================================ */

  if (loading) {
    return (
      <div className="flex min-h-56 items-center justify-center">
        <p className="text-center text-sm text-muted-foreground">
          Checking the next registration wave…
        </p>
      </div>
    );
  }

  /* ============================================================
     REGISTRATION CLOSED
     ============================================================ */

  if (!gate.open) {
    return (
      <div className="py-10 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-white/10 bg-white/[0.04]">
          <Sparkles className="h-6 w-6 text-accent" />
        </div>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Registration status
        </p>

        <h2 className="mt-4 font-display text-2xl font-bold">
          {REGISTER_MESSAGES[gate.reason ?? "closed"]}
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted-foreground">
          Registration opens when the UNWAVES team publishes a live
          registration window.
        </p>
      </div>
    );
  }

  /* ============================================================
     REGISTRATION FORM
     ============================================================ */

  return (
    <form
      className="relative space-y-6"
      onSubmit={(event) => {
        event.preventDefault();
        void submit();
      }}
    >
      {/* Name + Email */}

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-semibold">
          Full name

          <input
            required
            autoComplete="name"
            value={form.full_name}
            onChange={(event) =>
              update("full_name", event.target.value)
            }
            placeholder="Your name"
            className={fieldClass}
          />
        </label>

        <label className="block text-sm font-semibold">
          Email

          <input
            required
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(event) =>
              update("email", event.target.value)
            }
            placeholder="you@email.com"
            className={fieldClass}
          />
        </label>
      </div>

      {/* Phone + Chapter */}

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-semibold">
          Phone
          <span className="ml-1 text-xs font-normal text-muted-foreground">
            optional
          </span>

          <input
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(event) =>
              update("phone", event.target.value)
            }
            placeholder="Your phone number"
            className={fieldClass}
          />
        </label>

        <label className="block text-sm font-semibold">
          Your current chapter

          <input
            required
            value={form.ca_level}
            onChange={(event) =>
              update("ca_level", event.target.value)
            }
            placeholder="Student, creator, professional…"
            className={fieldClass}
          />
        </label>
      </div>

      {/* College + City */}

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-semibold">
          College or community
          <span className="ml-1 text-xs font-normal text-muted-foreground">
            optional
          </span>

          <input
            value={form.college}
            onChange={(event) =>
              update("college", event.target.value)
            }
            placeholder="Where you're from"
            className={fieldClass}
          />
        </label>

        <label className="block text-sm font-semibold">
          City
          <span className="ml-1 text-xs font-normal text-muted-foreground">
            optional
          </span>

          <input
            value={form.city}
            onChange={(event) =>
              update("city", event.target.value)
            }
            placeholder="Where you're creating from"
            className={fieldClass}
          />
        </label>
      </div>

      {/* Login details */}

      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Create your login
        </p>

        <p className="mt-2 text-xs leading-6 text-muted-foreground">
          Your email above becomes your username. Set a password now — no
          separate sign-up needed.
        </p>

        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <label className="block text-sm font-semibold">
            Password

            <div className="relative">
              <input
                required
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                minLength={8}
                maxLength={72}
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError("");
                }}
                placeholder="At least 8 characters"
                className={`${fieldClass} pr-12`}
              />

              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-xl text-muted-foreground transition hover:bg-white/[0.06] hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </label>

          <label className="block text-sm font-semibold">
            Confirm password

            <input
              required
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              maxLength={72}
              value={confirm}
              onChange={(event) => {
                setConfirm(event.target.value);
                setError("");
              }}
              placeholder="Repeat your password"
              className={fieldClass}
            />
          </label>
        </div>
      </div>

      {/* Consent */}


      <label className="flex items-start gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 text-sm text-muted-foreground">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(event) =>
            update("consent", event.target.checked)
          }
          className="mt-1 accent-[#FF2FA6]"
        />

        <span className="leading-6">
          I agree to the UNWAVES community guidelines and
          registration terms.
        </span>
      </label>

      {/* Error */}

      {error && (
        <p
          role="alert"
          className="rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive"
        >
          {error}
        </p>
      )}

      {/* Submit */}

      <button
        type="submit"
        disabled={submitting}
        className="group relative w-full overflow-hidden rounded-full px-6 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_60px_-20px_rgba(255,47,166,0.65)] disabled:cursor-wait disabled:opacity-60"
      >
        <span
          aria-hidden
          className="absolute inset-0 animate-shimmer bg-[linear-gradient(100deg,#6D3CFF,#FF2FA6,#FF7A00,#FFC700)] bg-[length:220%_auto]"
        />

        <span className="relative inline-flex items-center justify-center gap-2">
          <span>
            {submitting
              ? "Joining…"
              : settings?.registration_button_label ||
                "Join UNWAVES"}
          </span>

          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </button>

      {/* Remaining places */}

      {gate.spotsLeft !== null && (
        <p className="text-center text-xs text-muted-foreground">
          {gate.spotsLeft} places remain in this registration window.
        </p>
      )}

      <p className="text-center text-sm text-muted-foreground">
        Already part of UNWAVES?{" "}
        <Link
          to="/login"
          className="font-semibold text-foreground transition hover:text-accent"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
