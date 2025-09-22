import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import Header from "../components/Header";
import { AuthProvider } from "../AuthContext";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      {/* <div>Hello "__root"!</div> */}
      <AuthProvider>
        <Header />
        <Outlet />
      </AuthProvider>
    </React.Fragment>
  );
}
