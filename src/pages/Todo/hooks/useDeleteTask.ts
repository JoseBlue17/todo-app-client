import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Http } from '@/config/http';
import { useShowError, useShowSuccess } from '@/hooks';
import type { AxiosResponseError } from '@/hooks';

export function useDeleteTask() {
  const queryClient = useQueryClient();
  const { showError } = useShowError();
  const { showSuccess } = useShowSuccess();

  const { mutate: deleteTask, isPending: isDeleting } = useMutation<
    void,
    AxiosResponseError,
    string
  >({
    mutationKey: ['DELETE_TASK'],
    mutationFn: (id: string) => Http.delete(`/tasks/${id}`).then(({ data }) => data),
    onSuccess: () => {
      showSuccess({ title: 'Éxito', description: 'Tarea eliminada correctamente' });
      queryClient.invalidateQueries({ queryKey: ['TASKS'] });
    },
    onError: (error: AxiosResponseError) => showError(error),
  });

  return { deleteTask, isDeleting };
}
