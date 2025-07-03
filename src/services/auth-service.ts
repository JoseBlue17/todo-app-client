import axiosInstance from './axios-config';

const HOME_ENDPOINT = '/users';

const login = async (email: string, password: string) => {
  const response = await axiosInstance.post(`${HOME_ENDPOINT}/login`, { email, password });
  const token = response.data.token;

  localStorage.setItem('jwtToken', token);

  return response.data;
};

const getProfile = async (token: string) => {
  const response = await axiosInstance.get(`${HOME_ENDPOINT}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export default {
  login,
  getProfile,
};