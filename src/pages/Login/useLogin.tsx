import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import authService from '../../services/authService';

export function useLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [generalError, setGeneralError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanedEmail = email.trim().toLowerCase();
    const cleanedPassword = password.trim();

    if (!cleanedEmail || !cleanedPassword) {
      setGeneralError('Todos los campos son obligatorios.');
      return;
    }

    setGeneralError('');

    try {
      const data = await authService.login(cleanedEmail, cleanedPassword);
      const token = data.token;

      localStorage.setItem('jwtToken', token);
      navigate('/home');
    } catch (err) {
      console.error('Error al hacer login:', err);

      if (axios.isAxiosError(err) && err.response) {
        const { status } = err.response;

        if (status === 400 || status === 401) {
          setGeneralError('Correo o contraseña incorrectos.');
        } else if (status >= 500) {
          setGeneralError('Error del servidor. Intenta más tarde.');
        } else {
          setGeneralError('Ocurrió un error. Inténtalo de nuevo.');
        }
      } else {
        setGeneralError('No se pudo conectar con el servidor.');
      }
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    generalError,
  };
}
