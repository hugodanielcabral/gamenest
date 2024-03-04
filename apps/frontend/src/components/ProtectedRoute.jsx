import { Navigate, Outlet } from "react-router-dom";
import propTypes from "prop-types";

// eslint-disable-next-line react/prop-types
export const ProtectedRoute = ({ redirectTo, isAllowed, children }) => {
  if (!isAllowed) return <Navigate to={redirectTo} replace />;
  return children ? children : <Outlet />;
};

ProtectedRoute.propTypes = {
  isAllowed: propTypes.bool.isRequired,
  redirectTo: propTypes.string.isRequired,
};
