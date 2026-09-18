import { BrandMark, BrandWordmark } from "@/components/site/BrandLogo";
import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Lock, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";

import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Create New Password — UNWAVES" },
      {
        name: "description",
        content:
          "Create a new password for your UNWAVES account.",
      },
      {
        property: "og:title",
        content: "Create New Password — UNWAVES",
      },
      {
        property: "og:description",
        content: "Create a new password and continue your UNWAVES journey.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [checkingSession, setCheckingSession] = useState(true);
  const [busy, setBusy] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let active = true;

    async function checkRecoverySession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!active) return;

      if (!session) {
        setError(
          "This password reset link is invalid or has expired. Please request a new one.",
        );
      }

      setCheckingSession(false);
    }

    checkRecoverySession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!active) return;

      if (event === "PASSWORD_RECOVERY" && session) {
        setError(null);
        setCheckingSession(false);
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (busy) return;

    setError(null);

    if (password.length < 6) {
      setError("Your new password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("The passwords do not match.");
      return;
    }

    setBusy(true);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error(
          "Your reset session has expired. Please request a new reset link.",
        );
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) {
        throw updateError;
      }

      setSuccess(true);

      setTimeout(() => {
        navigate({
          to: "/my-wave",
          replace: true,
        });
      }, 1400);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "We couldn't update your password. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }

  if (checkingSession) {
    return (
      <main className="relative grid min-h-screen place-items-center overflow-hidden bg-background px-5">
        <div className="aurora-bg opacity-40" />

        <div className="relative z-10 text-center">
          <div className="mx-auto mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-orange-400">
            <Sparkles className="h-5 w-5 text-white" />
          </div>

          <p className="text-sm text-muted-foreground">
            Checking your reset link…
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-5 py-24 sm:px-8">
      <div className="aurora-bg opacity-45" />

      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute left-[-10%] top-[20%] h-px w-[120%] rotate-[-8deg] bg-gradient-to-r from-transparent via-primary/25 to-transparent"
      />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2"
            aria-label="UNWAVES home"
          >
            <BrandMark className="h-10 w-10" />

            <BrandWordmark className="text-xl" />
          </Link>
        </div>

        <div className="gradient-border rounded-[2rem] p-[1px]">
          <div className="rounded-[2rem] bg-card/95 p-7 shadow-2xl backdrop-blur-xl sm:p-9">
            {success ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-6 text-center"
              >
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-orange-400">
                  <Sparkles className="h-7 w-7 text-white" />
                </div>

                <p className="mt-7 text-xs font-semibold uppercase tracking-[0.28em] text-accent">
                  PASSWORD UPDATED
                </p>

                <h1 className="mt-3 font-display text-3xl font-bold tracking-[-0.04em] text-foreground">
                  You're back in the wave.
                </h1>

                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  Your password has been updated successfully. Taking you to
                  your UNWAVES space…
                </p>
              </motion.div>
            ) : (
              <>
                <div className="mb-8">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-accent">
                    NEW PASSWORD
                  </p>

                  <h1 className="font-display text-4xl font-bold tracking-[-0.05em] text-foreground sm:text-5xl">
                    Create a
                    <br />
                    <span className="text-gradient">new password.</span>
                  </h1>

                  <p className="mt-4 text-sm leading-6 text-muted-foreground">
                    Choose a new password for your UNWAVES account.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* New password */}
                  <div>
                    <label
                      htmlFor="new-password"
                      className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"
                    >
                      New password
                    </label>

                    <div className="relative">
                      <Lock
                        aria-hidden
                        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                      />

                      <input
                        id="new-password"
                        name="new-password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        autoFocus
                        required
                        minLength={6}
                        maxLength={72}
                        value={password}
                        onChange={(event) =>
                          setPassword(event.target.value)
                        }
                        placeholder="At least 6 characters"
                        className="w-full rounded-2xl border border-input bg-secondary/30 px-11 py-3.5 pr-12 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-primary/10"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword((value) => !value)
                        }
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-xl text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm password */}
                  <div>
                    <label
                      htmlFor="confirm-password"
                      className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"
                    >
                      Confirm password
                    </label>

                    <div className="relative">
                      <Lock
                        aria-hidden
                        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                      />

                      <input
                        id="confirm-password"
                        name="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        autoComplete="new-password"
                        required
                        minLength={6}
                        maxLength={72}
                        value={confirmPassword}
                        onChange={(event) =>
                          setConfirmPassword(event.target.value)
                        }
                        placeholder="Enter it again"
                        className="w-full rounded-2xl border border-input bg-secondary/30 px-11 py-3.5 pr-12 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-primary/10"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword((value) => !value)
                        }
                        aria-label={
                          showConfirmPassword
                            ? "Hide password"
                            : "Show password"
                        }
                        className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-xl text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-2xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive-foreground"
                      role="alert"
                    >
                      {error}
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={busy}
                    className="group relative mt-2 flex w-full items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-400"
                    />

                    <span className="relative">
                      {busy ? "Updating password…" : "Update password"}
                    </span>

                    {!busy && (
                      <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1" />
                    )}
                  </button>
                </form>
              </>
            )}

            {!success && (
              <div className="mt-8 border-t border-border pt-6 text-center">
                <Link
                  to="/login"
                  className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
                >
                  Back to sign in
                </Link>
              </div>
            )}
          </div>
        </div>

        <p className="mt-7 text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground/70">
          ONE WAVE. MANY STORIES.
        </p>
      </motion.div>
    </main>
  );
}
