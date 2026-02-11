import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useVerifyToken } from '../hooks/use-verify-token';

interface PublicRouteProps {
  children?: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { isAuthenticated, isVerifyingToken } = useVerifyToken();

  if (isVerifyingToken) return null;
  if (isAuthenticated) return <Navigate to="/home" replace />;
  return children ? <>{children}</> : <Outlet />;
};

export default PublicRoute;
