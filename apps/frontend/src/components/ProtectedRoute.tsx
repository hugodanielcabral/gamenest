import { Navigate, Outlet } from "react-router-dom";
import { Loading } from "./ui/loading/Loading";
import { AuthStatus } from "../types/auth";
import React from "react";

interface ProtectedRouteProps {
  isAllowed: boolean;
  authStatus: AuthStatus;
  redirectTo: string;
  children?: React.ReactNode;
}

export const ProtectedRoute = ({
  isAllowed,
  authStatus,
  redirectTo,
  children,
}: ProtectedRouteProps) => {
  if (authStatus === AuthStatus.Authenticating)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loading color="neutral" />
      </div>
    );    

  if (!isAllowed) return <Navigate to={redirectTo} replace />;
  return children ? children : <Outlet />;
};
