import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "../pages/landing";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return <Landing />;
}
