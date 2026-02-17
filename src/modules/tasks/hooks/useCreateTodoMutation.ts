import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useShowError, useShowSuccess } from '../../../hooks';
import type { AxiosResponseError } from '../../../hooks';
import { createTodo } from '../services';
import type { ITodo, ICreateTodoInput } from '../../../interfaces';

export function useCreateTodoMutation() {
  const queryClient = useQueryClient();
  const { showError } = useShowError();
  const { showSuccess } = useShowSuccess();

  return useMutation<ITodo, AxiosResponseError, ICreateTodoInput>({
    mutationKey: ['CREATE_TODO'],
    mutationFn: async todoData => {
      return await createTodo.createTodo(todoData);
    },
    onSuccess: () => {
      showSuccess({ title: 'Éxito', description: 'Tarea creada con éxito' });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error: AxiosResponseError) => {
      showError(error);
    },
  });
}
