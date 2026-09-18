import { createFileRoute } from "@tanstack/react-router";
import { PublicFoundationPage } from "@/components/site/PublicFoundationPage";

export const Route = createFileRoute("/stories")({
  head: () => ({
    meta: [
      {
        title: "Stories — UNWAVES",
      },
      {
        name: "description",
        content:
          "Real stories, reflections and moments from people finding their own way through the wave.",
      },
      {
        property: "og:title",
        content: "Stories — UNWAVES",
      },
      {
        property: "og:description",
        content:
          "People, moments and stories that make the movement what it is.",
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
  component: () => <PublicFoundationPage page="/stories" />,
});
