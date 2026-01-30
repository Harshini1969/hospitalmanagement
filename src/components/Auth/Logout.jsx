import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ allowedRole }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || !role) {
    return <Navigate to="/" replace />;
  }

  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/login"  />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
