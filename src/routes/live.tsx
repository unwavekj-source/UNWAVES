import { createFileRoute } from "@tanstack/react-router";
import { PublicFoundationPage } from "@/components/site/PublicFoundationPage";

export const Route = createFileRoute("/live")({
  head: () => ({
    meta: [
      {
        title: "Live — UNWAVES",
      },
      {
        name: "description",
        content:
          "Gatherings, conversations and shared experiences that bring the UNWAVES community together.",
      },
      {
        property: "og:title",
        content: "Live — UNWAVES",
      },
      {
        property: "og:description",
        content:
          "Come together. Be present. Experience the wave as it happens.",
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
  component: () => <PublicFoundationPage page="/live" />,
});
