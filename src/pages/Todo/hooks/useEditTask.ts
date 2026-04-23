import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Http } from '@/config/http';
import { useShowError, useShowSuccess } from '@/hooks';
import type { AxiosResponseError } from '@/hooks';
import type { ICreateTodoInput } from '@/interfaces';

export function useEditTask({ onSuccess }: { onSuccess: () => void }) {
  const queryClient = useQueryClient();
  const { showError } = useShowError();
  const { showSuccess } = useShowSuccess();

  const { mutate: editTask, isPending: isEditing } = useMutation<
    void,
    AxiosResponseError,
    { id: string } & ICreateTodoInput
  >({
    mutationKey: ['EDIT_TASK'],
    mutationFn: ({ id, ...payload }) =>
      Http.patch(`/tasks/${id}`, payload).then(({ data }) => data),
    onSuccess: () => {
      showSuccess({ title: 'Éxito', description: 'Tarea actualizada correctamente' });
      queryClient.invalidateQueries({ queryKey: ['TASKS'] });
      onSuccess();
    },
    onError: (error: AxiosResponseError) => showError(error),
  });

  return { editTask, isEditing };
}
