import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/season-1")({
  beforeLoad: () => {
    throw redirect({ to: "/season-one" });
  },
});