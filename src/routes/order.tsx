import { createFileRoute, redirect } from "@tanstack/react-router";
import Order from "../pages/Order";
import { useAuth } from "../AuthContext";
import { Protected } from "../ProtectedRoute";

export const Route = createFileRoute("/order")({
  component: RouteComponent,
});
// export const Route = createFileRoute("/order")({
//   beforeLoad: () => {
//     const { token } = useAuth();
//     if (!token) {
//       throw redirect({
//         to: "/login",
//         search: { redirect: "/order" },
//       });
//     }
//   },
//   component: Order,
// });

function RouteComponent() {
  return (
    <Protected>
      <Order />
    </Protected>
  );
}
