import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  return <>{user ? children : <Navigate to={"/"} />}</>;
};

export default ProtectedRoute;
