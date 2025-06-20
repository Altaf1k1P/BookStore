// src/Components/AuthRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children, allowedRoles = [] }) => {
  const { accessToken, user } = useSelector((state) => state.auth);

  // Not authenticated
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  // If specific roles are required but user role doesn't match
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />; // Or redirect to a 403 page
  }

  return children;
};

export default AuthRoute;
