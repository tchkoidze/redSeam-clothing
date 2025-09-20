import { createFileRoute } from "@tanstack/react-router";
import { Listing } from "../pages/Listing";

export const Route = createFileRoute("/listing")({
  component: RouteComponent,
});

function RouteComponent() {
  // return <div>Hello "/listing"!</div>;
  return <Listing />;
}
