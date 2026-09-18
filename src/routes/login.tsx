import { BrandMark, BrandWordmark } from "@/components/site/BrandLogo";
import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Sparkles,
} from "lucide-react";

import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Welcome Back — UNWAVES" },
      {
        name: "description",
        content:
          "Sign in to your UNWAVES account and continue your journey.",
      },
      {
        property: "og:title",
        content: "Welcome Back — UNWAVES",
      },
      {
        property: "og:description",
        content:
          "Your wave is still moving. Sign in and continue your UNWAVES journey.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [busy, setBusy] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function checkSession() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!active) return;

      if (user) {
        navigate({
          to: "/my-wave",
          replace: true,
        });
        return;
      }

      setCheckingSession(false);
    }

    checkSession();

    return () => {
      active = false;
    };
  }, [navigate]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (busy) return;

    setBusy(true);
    setError(null);

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      setError("Please enter your email and password.");
      setBusy(false);
      return;
    }

    try {
      const { data, error: authError } =
        await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

      if (authError) {
        throw authError;
      }

      if (!data.user) {
        throw new Error("We couldn't sign you in. Please try again.");
      }

      navigate({
        to: "/my-wave",
        replace: true,
      });
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong while signing you in.";

      setError(
        message.includes("Invalid login credentials")
          ? "Email or password is incorrect."
          : message,
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
            Finding your wave…
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-5 py-24 sm:px-8">
      {/* Ambient background */}
      <div className="aurora-bg opacity-45" />

      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]"
      />

      {/* Decorative wave trails */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-10%] top-[18%] h-px w-[120%] rotate-[-8deg] bg-gradient-to-r from-transparent via-primary/25 to-transparent"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute left-[-10%] top-[78%] h-px w-[120%] rotate-[7deg] bg-gradient-to-r from-transparent via-accent/20 to-transparent"
      />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Brand */}
        <div className="mb-8 text-center">
          <Link
            to="/"
            className="group inline-flex items-center gap-2"
            aria-label="UNWAVES home"
          >
            <BrandMark className="h-10 w-10" />

            <BrandWordmark className="text-xl" />
          </Link>
        </div>

        {/* Card */}
        <div className="gradient-border rounded-[2rem] p-[1px]">
          <div className="rounded-[2rem] bg-card/95 p-7 shadow-2xl backdrop-blur-xl sm:p-9">
            <div className="mb-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-accent">
                WELCOME BACK
              </p>

              <h1 className="font-display text-4xl font-bold tracking-[-0.05em] text-foreground sm:text-5xl">
                Your wave
                <br />
                <span className="text-gradient">is still moving.</span>
              </h1>

              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Sign in and continue exploring, creating and connecting with
                UNWAVES.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label
                  htmlFor="login-email"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"
                >
                  Email
                </label>

                <div className="relative">
                  <Mail
                    aria-hidden
                    className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  />

                  <input
                    id="login-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={255}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-2xl border border-input bg-secondary/30 px-11 py-3.5 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-primary/10"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <label
                    htmlFor="login-password"
                    className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"
                  >
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-xs font-medium text-accent transition hover:text-foreground"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <Lock
                    aria-hidden
                    className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  />

                  <input
                    id="login-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    maxLength={72}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    className="w-full rounded-2xl border border-input bg-secondary/30 px-11 py-3.5 pr-12 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-primary/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
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

              {/* Error */}
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

              {/* Submit */}
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
                  {busy ? "Entering the wave…" : "Sign in"}
                </span>

                {!busy && (
                  <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1" />
                )}
              </button>
            </form>

            {/* Signup */}
            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">OR</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <p className="text-center text-sm text-muted-foreground">
              New to UNWAVES?{" "}
              <Link
                to="/register"
                className="font-semibold text-foreground transition hover:text-accent"
              >
                Create your wave
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-7 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground/70">
            ONE WAVE. MANY STORIES.
          </p>

          <Link
            to="/"
            className="mt-3 inline-block text-xs text-muted-foreground transition hover:text-foreground"
          >
            ← Back to UNWAVES
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
