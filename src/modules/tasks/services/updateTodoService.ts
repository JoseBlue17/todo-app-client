import axiosInstance from '../../../config/http';
import type { ITodo } from '../../../interfaces/todo.types';

export const updateTodoService = {
  updateTodo: async (todoId: string, completed: boolean): Promise<ITodo> => {
    const token = localStorage.getItem('jwtToken');
    if (!token) throw new Error('Token no encontrado');
    
    const response = await axiosInstance.patch(
      `/tasks/${todoId}`,
      { completed },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    return response.data;
  },
};