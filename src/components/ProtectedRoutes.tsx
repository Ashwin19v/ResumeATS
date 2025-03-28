import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const ProtectedRoutes = () => {
  const { user } = useAppContext();

  if (!user) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
