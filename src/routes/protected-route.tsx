import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import authService from '../services/auth-service';

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isValidAuthentication, setIsValidAuthentication] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        setIsValidAuthentication(false);
        return;
      }
      try {
        await authService.getProfile(token);
        setIsValidAuthentication(true);
      } catch {
        setIsValidAuthentication(false);
      }
    };
    checkAuth();
  }, []);

  if (isValidAuthentication === null) return null;
  if (!isValidAuthentication) return <Navigate to="/login" replace />;
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
