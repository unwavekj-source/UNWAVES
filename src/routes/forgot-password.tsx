import { BrandMark, BrandWordmark } from "@/components/site/BrandLogo";
import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Mail, Sparkles } from "lucide-react";
import { motion } from "motion/react";

import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset Your Password — UNWAVES" },
      {
        name: "description",
        content:
          "Reset your UNWAVES account password and continue your journey.",
      },
      {
        property: "og:title",
        content: "Reset Your Password — UNWAVES",
      },
      {
        property: "og:description",
        content: "Reset your UNWAVES password securely.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (busy) return;

    setBusy(true);
    setError(null);

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setError("Please enter your email address.");
      setBusy(false);
      return;
    }

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        cleanEmail,
        {
          redirectTo: `${window.location.origin}/reset-password`,
        },
      );

      if (resetError) {
        throw resetError;
      }

      setSent(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "We couldn't send the reset email. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-5 py-24 sm:px-8">
      <div className="aurora-bg opacity-45" />

      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]"
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
            {!sent ? (
              <>
                <div className="mb-8">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-accent">
                    FIND YOUR WAY BACK
                  </p>

                  <h1 className="font-display text-4xl font-bold tracking-[-0.05em] text-foreground sm:text-5xl">
                    Forgot your
                    <br />
                    <span className="text-gradient">password?</span>
                  </h1>

                  <p className="mt-4 text-sm leading-6 text-muted-foreground">
                    Enter the email connected to your UNWAVES account and
                    we'll send you a secure password reset link.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="reset-email"
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
                        id="reset-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        autoFocus
                        required
                        maxLength={255}
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="you@example.com"
                        className="w-full rounded-2xl border border-input bg-secondary/30 px-11 py-3.5 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-primary/10"
                      />
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
                    className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-400"
                    />

                    <span className="relative">
                      {busy ? "Sending reset link…" : "Send reset link"}
                    </span>

                    {!busy && (
                      <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1" />
                    )}
                  </button>
                </form>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-orange-400">
                  <Mail className="h-7 w-7 text-white" />
                </div>

                <p className="mt-7 text-xs font-semibold uppercase tracking-[0.28em] text-accent">
                  CHECK YOUR INBOX
                </p>

                <h1 className="mt-3 font-display text-3xl font-bold tracking-[-0.04em] text-foreground">
                  Your reset link is on its way.
                </h1>

                <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
                  If an account exists for{" "}
                  <span className="font-medium text-foreground">{email}</span>,
                  you'll receive instructions to create a new password.
                </p>

                <p className="mt-5 text-xs leading-5 text-muted-foreground">
                  Check your spam or promotions folder if you don't see it
                  shortly.
                </p>
              </motion.div>
            )}

            <div className="mt-8 border-t border-border pt-6 text-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to sign in
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-7 text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground/70">
          ONE WAVE. MANY STORIES.
        </p>
      </motion.div>
    </main>
  );
}
