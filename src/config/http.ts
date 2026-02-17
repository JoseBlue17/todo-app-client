import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir token de autenticación
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de autenticación
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('jwtToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;