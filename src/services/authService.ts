import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;
const HOME_ENDPOINT = `${BASE_URL}/users`;
const TASKS_ENDPOINT = `${BASE_URL}/tasks`;

const login = async (email: string, password: string) => {
  const response = await axios.post(`${HOME_ENDPOINT}/login`, { email, password });
  const token = response.data.token;

  localStorage.setItem('jwtToken', token);

  return response.data;
};

const getTasks = async () => {
  const token = localStorage.getItem('jwtToken');

  if (!token) {
    throw new Error('Token no encontrado');
  }

  const response = await axios.get(TASKS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

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

const createTask = async (taskData: CreateTaskPayload) => {
  const token = localStorage.getItem('jwtToken');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await axios.post(`${TASKS_ENDPOINT}/`, taskData, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (response.status !== 201) {
    throw new Error(response.data.message || 'Failed to create task');
  }

  return response.data;
};

export default {
  login,
  getProfile,
  getTasks,
  createTask,
};
