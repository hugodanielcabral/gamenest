import { Navigate, Outlet } from "react-router-dom";
import { AuthStatus } from "../types/auth";
import React from "react";
import { LogoLoading } from "./ui/loading/LogoLoading.tsx";

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
      <div className="flex min-h-screen items-center justify-center bg-base-100">
        <LogoLoading />
      </div>
    );

  if (!isAllowed) return <Navigate to={redirectTo} replace />;
  return children ? children : <Outlet />;
};
