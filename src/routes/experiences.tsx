import { createFileRoute } from "@tanstack/react-router";
import { PublicFoundationPage } from "@/components/site/PublicFoundationPage";

export const Route = createFileRoute("/experiences")({
  head: () => ({ meta: [
    { title: "Experiences — UNWAVES" },
    { name: "description", content: "Explore the experiences that make up the UNWAVES movement." },
    { property: "og:title", content: "Experiences — UNWAVES" },
    { property: "og:description", content: "Find your way into the UNWAVES movement." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <PublicFoundationPage page="/experiences" />,
});