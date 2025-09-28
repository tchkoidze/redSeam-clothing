import { createFileRoute } from "@tanstack/react-router";
import Order from "../pages/Order";
import { Protected } from "../ProtectedRoute";

export const Route = createFileRoute("/order")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Protected>
      <Order />
    </Protected>
  );
}
