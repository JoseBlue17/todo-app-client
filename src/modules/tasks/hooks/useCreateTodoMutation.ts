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
      console.log('Creating todo with data:', todoData);
      const result = await createTodo.createTodo(todoData);
      console.log('Created todo result:', result);
      return result;
    },
    onSuccess: () => {
      showSuccess({ title: 'Éxito', description: 'Tarea creada con éxito' });
      queryClient.invalidateQueries({ queryKey: ['TASKS'] });
      console.log('Invalidated TASKS query');
    },
    onError: (error: AxiosResponseError) => {
      showError(error);
    },
  });
}
