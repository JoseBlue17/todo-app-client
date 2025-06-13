import { useEffect, useState } from 'react';
import authService from '../services/authService';

export function useVerifyToken() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isVerifyingToken, setIsVerifyingToken] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      setIsVerifyingToken(true);
      const token = localStorage.getItem('jwtToken');
      if (token) {
        try {
          await authService.getProfile(token);
          setIsAuthenticated(true);
        } catch {
          localStorage.removeItem('jwtToken');
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setIsVerifyingToken(false);
    };
    checkAuth();
  }, []);

  return { isAuthenticated, isVerifyingToken };
}
