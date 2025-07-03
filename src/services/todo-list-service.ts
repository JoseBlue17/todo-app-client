import axiosInstance from './axios-config';

const TODO_ENDPOINT = '/tasks?size=100';

export const todoService = {
  getTodos: async () => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      throw new Error('Token no encontrado');
    }
    const response = await axiosInstance.get(TODO_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};
