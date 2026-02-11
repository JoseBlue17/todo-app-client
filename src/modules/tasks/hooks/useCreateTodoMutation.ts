import { useMutation } from '@tanstack/react-query';
import { createTodo } from '../services';
import type { ITodo, ICreateTodoInput } from '@/interfaces';

export function useCreateTodoMutation() {
  return useMutation<ITodo, Error, ICreateTodoInput>({
    mutationFn: async todoData => {
      return await createTodo.createTodo(todoData);
    },
  });
}
