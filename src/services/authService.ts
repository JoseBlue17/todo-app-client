import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/users';

const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

const getProfile = async (token: string) => {
  const response = await axios.get(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export default { login, getProfile };