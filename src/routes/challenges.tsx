import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/challenges")({
  beforeLoad: () => {
    throw redirect({ to: "/missions" });
  },
});