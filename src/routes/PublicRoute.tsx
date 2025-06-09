import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface PublicRouteProps {
  children?: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('jwtToken');

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default PublicRoute;
