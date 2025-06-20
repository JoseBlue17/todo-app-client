import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;
const HOME_ENDPOINT = `${BASE_URL}/users`;

const login = async (email: string, password: string) => {
  const response = await axios.post(`${HOME_ENDPOINT}/login`, { email, password });
  const token = response.data.token;

  localStorage.setItem('jwtToken', token);

  return response.data;
};

const getProfile = async (token: string) => {
  const response = await axios.get(`${HOME_ENDPOINT}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export type CreateTaskPayload = {
  title: string;
  description?: string | null;
  completed?: boolean;
  category?: string | null;
  dueDate?: string | null;
}

export default {
  login,
  getProfile,
};
