import axiosInstance from './axios-config';

const TASKS_ENDPOINT = '/tasks?size=100';

export const taskService = {
  getTasks: async () => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      throw new Error('Token no encontrado');
    }
    const response = await axiosInstance.get(TASKS_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};
