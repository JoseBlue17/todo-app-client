import axiosInstance from './axios-config';

const TODO_ENDPOINT = '/tasks/';
export const createTodo = {
  createTodo: async (todoData: {
    title: string;
    description?: string;
    category?: string;
    dueDate?: string;
  }) => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      throw new Error('Token no encontrado');
    }
    const response = await axiosInstance.post(TODO_ENDPOINT, todoData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};