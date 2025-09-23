import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import Header from "../components/Header";
import { AuthProvider } from "../AuthContext";
import CartSidePanel from "../components/CartSidePanel";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const [isCartSidePanelOpen, setIsCartSidePanelOpen] = React.useState(false);
  return (
    <React.Fragment>
      <AuthProvider>
        <Header close={setIsCartSidePanelOpen} />
        <Outlet />
        {isCartSidePanelOpen && (
          <CartSidePanel close={setIsCartSidePanelOpen} />
        )}
      </AuthProvider>
    </React.Fragment>
  );
}
