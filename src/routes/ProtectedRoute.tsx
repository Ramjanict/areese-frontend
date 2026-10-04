import { Navigate, Outlet } from "react-router-dom";

type Props = {
  allowedRole: "admin" | "collaborator" | "team";
};

const ROLE_REDIRECT: Record<string, string> = {
  admin: "/admin/dashboard",
  team: "/team/dashboard",
  collaborator: "/collaborator/dashboard",
};

const ProtectedRoute: React.FC<Props> = ({ allowedRole }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || !role) {
    return <Navigate to="/login" replace />;
  }

  if (role !== allowedRole) {
    const redirectTo = ROLE_REDIRECT[role] ?? "/login";
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
