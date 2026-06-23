import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Protected({ role, children }) {
  const { user, role: userRole, loading } = useAuth();
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-muted-foreground">
        Loading…
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  if (role && userRole !== role) {
    return (
      <div className="mx-auto max-w-md p-8 text-center">
        <h2 className="text-xl font-semibold">Access denied</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Your account does not have access to this area.
        </p>
      </div>
    );
  }
  return children;
}