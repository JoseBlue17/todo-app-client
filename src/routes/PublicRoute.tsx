import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import authService from '../services/authService';

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        setIsValid(false);
        return;
      }
      try {
        await authService.getProfile(token);
        setIsValid(true);
      } catch {
        setIsValid(false);
      }
    };
    checkAuth();
  }, []);

  if (isValid === null) return null; // O un loader/spinner
  if (!isValid) return <Navigate to="/login" replace />;
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;