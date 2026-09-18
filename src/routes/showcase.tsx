import { createFileRoute } from "@tanstack/react-router";
import { PublicFoundationPage } from "@/components/site/PublicFoundationPage";

export const Route = createFileRoute("/showcase")({
  head: () => ({
    meta: [
      {
        title: "Showcase — UNWAVES",
      },
      {
        name: "description",
        content:
          "Discover ideas, creations and experiences made by people across the UNWAVES movement.",
      },
      {
        property: "og:title",
        content: "Showcase — UNWAVES",
      },
      {
        property: "og:description",
        content:
          "Ideas become things. See what the UNWAVES community creates.",
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
  component: () => <PublicFoundationPage page="/showcase" />,
});
