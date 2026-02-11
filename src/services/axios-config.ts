import axios from 'axios';

const BASE_URL = import.meta.env.VITE_PUBLIC_API;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export default axiosInstance;
