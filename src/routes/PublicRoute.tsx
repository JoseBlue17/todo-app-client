import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import authService from '../services/authService';

interface PublicRouteProps {
  children?: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        try {
          await authService.getProfile(token);
          setIsAuthenticated(true);
        } catch {
          // Token inválido o expirado, lo tratamos como no autenticado
          localStorage.removeItem('jwtToken');
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) return null; // O un loader/spinner mientras se verifica
  if (isAuthenticated) return <Navigate to="/home" replace />;
  return children ? <>{children}</> : <Outlet />;
};

export default PublicRoute;
