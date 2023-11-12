import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isPublic, isAuthorized }) => {
  console.log("isPublic", JSON.stringify(isPublic, null, 2));
  return isPublic || isAuthorized ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
