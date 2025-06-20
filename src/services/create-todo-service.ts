import axiosInstance from './axios-config';

const TODO_ENDPOINT = '/tasks/';

export const createTodo = {
  createTodo: async (todoData: {
    title: string;
    description?: string;
    category?: string;
    dueDate?: Date;
  }) => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      throw new Error('Token no encontrado');
    }

    console.log('Enviando datos al backend:', JSON.stringify(todoData, null, 2));
    console.log('Token:', token ? 'Presente' : 'Ausente');

    try {
      const response = await axiosInstance.post(TODO_ENDPOINT, todoData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error completo:', error);
      throw error;
    }
  },
};
