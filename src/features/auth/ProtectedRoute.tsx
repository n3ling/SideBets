import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import type { JSX } from "react";

function AuthLoadingSpinner() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      role="status"
      aria-label="Checking authentication"
    >
      <div
        className="w-8 h-8 border-2 border-current border-t-transparent rounded-full animate-spin"
        aria-hidden
      />
    </div>
  );
}

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();

  if (loading) return <AuthLoadingSpinner />;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
