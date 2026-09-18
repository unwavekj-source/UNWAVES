import { createFileRoute } from "@tanstack/react-router";
import { PublicFoundationPage } from "@/components/site/PublicFoundationPage";

export const Route = createFileRoute("/season-one")({
  head: () => ({
    meta: [
      {
        title: "Season One — UNWAVES",
      },
      {
        name: "description",
        content:
          "Season One is the first chapter of the UNWAVES movement — a space to explore, create, connect and experience something different.",
      },
      {
        property: "og:title",
        content: "Season One — UNWAVES",
      },
      {
        property: "og:description",
        content:
          "The first chapter of the UNWAVES movement — explore, create, connect and experience something different.",
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

  component: SeasonOnePage,
});

function SeasonOnePage() {
  return <PublicFoundationPage page="/season-one" />;
}
