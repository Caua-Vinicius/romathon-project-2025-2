import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface PrivateProps {
  children: JSX.Element;
}

export function Private({ children }: PrivateProps) {
  const isAuthenticated = localStorage.getItem("token");

  return isAuthenticated ? children : <Navigate to="/" />;
}