import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;
const TASKS_ENDPOINT = `${BASE_URL}/tasks?size=100`;

export const todoService = {
  getTodos: async () => {
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
  },
};
