import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";

const PrivateRoute = ({ allowedRoles }) => {
  const { user } = useUser();

  if (!user) return <Navigate to="/login" />;

  if (!allowedRoles.includes(user.rol)) return <Navigate to="/login" />;

  return <Outlet />;
};

export default PrivateRoute;
