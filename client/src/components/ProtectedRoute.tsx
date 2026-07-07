import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ role }: { role: string }) {
  const { user } = useAuth();

  if (!user || user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
