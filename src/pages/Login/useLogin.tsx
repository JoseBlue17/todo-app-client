import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import authService from '../../services/authService';

export function useLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('El email no es válido.');
      return;
    }

    setError('');

    try {
      const data = await authService.login(email, password);
      const token = data.token;
      
      localStorage.setItem('jwtToken', token);
      navigate('/home');

    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'Error de autenticación.');
      } else {
        setError('Ocurrió un error. Inténtalo de nuevo.');
      }
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    error,
  };
}
