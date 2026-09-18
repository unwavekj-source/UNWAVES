import { createFileRoute } from "@tanstack/react-router";
import { PublicFoundationPage } from "@/components/site/PublicFoundationPage";

export const Route = createFileRoute("/creators")({
  head: () => ({
    meta: [
      {
        title: "Creators — UNWAVES",
      },
      {
        name: "description",
        content:
          "A space for people who make, experiment, express ideas and create things worth sharing.",
      },
      {
        property: "og:title",
        content: "Creators — UNWAVES",
      },
      {
        property: "og:description",
        content:
          "Make something. Try something. Share something. Find your creative wave.",
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
  component: () => <PublicFoundationPage page="/creators" />,
});
