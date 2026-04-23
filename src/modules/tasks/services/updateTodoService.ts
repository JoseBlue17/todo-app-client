import { Http } from '../../../config/http';
import type { ITodo } from '../../../interfaces/todo.types';

export const updateTodoService = {
  updateTodo: async (todoId: string, completed: boolean): Promise<ITodo> => {
    const response = await Http.patch(`/tasks/${todoId}`, { completed });
    return response.data;
  },
};
