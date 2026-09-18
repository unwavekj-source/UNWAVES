import { createFileRoute } from "@tanstack/react-router";
import { RegistrationForm } from "@/components/site/RegistrationForm";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      {
        title: "Join UNWAVES — Registration",
      },
      {
        name: "description",
        content:
          "Create your UNWAVES profile and become part of the movement.",
      },
      {
        property: "og:title",
        content: "Join UNWAVES — Registration",
      },
      {
        property: "og:description",
        content:
          "Create your UNWAVES profile and become part of the movement.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
  }),

  component: RegisterPage,
});

function RegisterPage() {
  return (
    <main className="min-h-screen bg-background px-5 py-24 text-foreground sm:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-12 max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-accent">
            JOIN UNWAVES
          </p>

          <h1 className="font-display text-5xl font-bold tracking-[-0.05em] sm:text-6xl">
            Create your
            <br />
            <span className="text-gradient">wave.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground">
            Tell us a little about yourself. Your journey into UNWAVES starts
            here.
          </p>
        </div>

        <div className="gradient-border rounded-[2rem] p-[1px]">
          <div className="rounded-[2rem] bg-card p-6 sm:p-10">
            <RegistrationForm />
          </div>
        </div>
      </div>
    </main>
  );
}
