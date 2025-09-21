import { createFileRoute } from "@tanstack/react-router";
import Order from "../pages/Order";

export const Route = createFileRoute("/order")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Order />;
}
