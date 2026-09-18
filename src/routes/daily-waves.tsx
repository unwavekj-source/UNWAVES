import { createFileRoute } from "@tanstack/react-router";
import { PublicFoundationPage } from "@/components/site/PublicFoundationPage";

export const Route = createFileRoute("/daily-waves")({
  head: () => ({
    meta: [
      {
        title: "Daily Waves — UNWAVES",
      },
      {
        name: "description",
        content:
          "Small daily experiences to notice, create, explore and move differently.",
      },
      {
        property: "og:title",
        content: "Daily Waves — UNWAVES",
      },
      {
        property: "og:description",
        content:
          "One small wave each day. No leaderboard. No pressure. Just participate.",
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
  component: () => <PublicFoundationPage page="/daily-waves" />,
});
