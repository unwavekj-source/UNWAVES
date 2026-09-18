import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 text-foreground">
      <div className="max-w-md text-center">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          UNWAVES
        </p>

        <h1 className="font-display text-7xl font-bold tracking-[-0.06em]">
          404
        </h1>

        <h2 className="mt-5 font-display text-2xl font-bold">
          This wave doesn't exist.
        </h2>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          The page you're looking for may have moved, disappeared, or simply
          hasn't been created yet.
        </p>

        <div className="mt-7">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:scale-[1.03]"
          >
            Return to UNWAVES
          </Link>
        </div>
      </div>
    </main>
  );
}

function ErrorComponent({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.error(error);

  const router = useRouter();

  useEffect(() => {
    reportLovableError(error, {
      boundary: "tanstack_root_error_component",
    });
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 text-foreground">
      <div className="max-w-md text-center">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          UNWAVES
        </p>

        <h1 className="font-display text-3xl font-bold tracking-tight">
          Something interrupted the wave.
        </h1>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Something went wrong while loading this experience. Try again or
          return to the beginning.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:scale-[1.03]"
          >
            Try again
          </button>

          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors duration-300 hover:border-accent/50 hover:bg-secondary"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "UNWAVES — One Wave. Many Stories.",
      },
      {
        name: "description",
        content:
          "UNWAVES is a movement of people, ideas and experiences for people who want to explore beyond the expected.",
      },
      {
        name: "author",
        content: "UNWAVES",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:title",
        content: "UNWAVES — One Wave. Many Stories.",
      },
      {
        property: "og:description",
        content: "A movement of people, ideas and experiences.",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "theme-color",
        content: "#0D0D14",
      },
    ],

    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=Archivo:wght@700;800;900&display=swap",
      },
      {
        rel: "icon",
        href: "/favicon.png",
        type: "image/png",
      },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>

      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Nav />
      <Outlet />
      <Footer />
      <Toaster />
    </QueryClientProvider>
  );
}
