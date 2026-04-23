import { Http } from '../../../config/http';
import type { ITodo, ICreateTodoInput } from '../../../interfaces/todo.types';

export const createTodo = {
  createTodo: async (todoData: ICreateTodoInput): Promise<ITodo> => {
    const response = await Http.post('/tasks', todoData);
    return response.data;
  },
};
