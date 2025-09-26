import { createFileRoute } from "@tanstack/react-router";
import { Product } from "../../pages/Product";

export const Route = createFileRoute("/product/$productId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Product />;
}
