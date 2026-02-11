import axiosInstance from '@/config/http';
import type { ITodo, ICreateTodoInput } from '@/interfaces/todo.types';

export const createTodo = {
  createTodo: async (todoData: ICreateTodoInput): Promise<ITodo> => {
    const token = localStorage.getItem('jwtToken');
    if (!token) throw new Error('Token no encontrado');
    
    const response = await axiosInstance.post('/tasks', todoData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return response.data;
  },
};