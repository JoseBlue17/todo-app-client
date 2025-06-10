import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import authService from '../../services/authService';

export function useLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const cleanedEmail = email.trim().toLowerCase();
    const cleanedPassword = password.trim();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!cleanedEmail || !cleanedPassword) {
      setGeneralError('All fields are required.');
      return;
    }
    if (!passwordRegex.test(cleanedPassword)) {
      setGeneralError(
        'Password must be at least 6 characters, contain one uppercase letter, one lowercase letter, and one number.',
      );
      return;
    }

    setGeneralError('');

    try {
      const data = await authService.login(cleanedEmail, cleanedPassword);
      const token = data.token;

      // Guardar solo con el nombre 'jwtToken'
      localStorage.setItem('jwtToken', token);

      navigate('/home');
    } catch (err) {
      console.error('Error al hacer login:', err);

      if (axios.isAxiosError(err) && err.response) {
        const { status } = err.response;

        if (status === 400 || status === 401) {
          setGeneralError('Email or password incorrect.');
        } else if (status >= 500) {
          setGeneralError('Server error. Please try again later.');
        } else {
          setGeneralError('An error occurred. Please try again.');
        }
      } else {
        setGeneralError('Could not connect to the server.');
      }
    }
  };

  const validatePassword = (value: string) => {
    if (!value) {
      setPasswordErrors([]);
      return;
    }
    const errors = [];
    if (value.length < 6) errors.push('Must be at least 6 characters.');
    if (!/[A-Z]/.test(value)) errors.push('Must contain at least one uppercase letter.');
    if (!/[a-z]/.test(value)) errors.push('Must contain at least one lowercase letter.');
    if (!/\d/.test(value)) errors.push('Must contain at least one number.');
    setPasswordErrors(errors);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    validatePassword(value);
  };

  return {
    email,
    setEmail,
    password,
    setPassword: handlePasswordChange,
    handleSubmit,
    generalError,
    passwordErrors,
    loginError: generalError,
  };
}
