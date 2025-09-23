import { Navigate } from "@tanstack/react-router";
import { useAuth } from "./AuthContext";

export function Protected({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" />;
  return <>{children}</>;
}
