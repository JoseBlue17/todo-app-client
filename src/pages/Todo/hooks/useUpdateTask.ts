import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Http } from '@/config/http';
import { useShowError, useShowSuccess } from '@/hooks';

export function useUpdateTask() {
  const queryClient = useQueryClient();
  const { showError } = useShowError();
  const { showSuccess } = useShowSuccess();

  const { mutate: updateTask, isPending: isUpdating } = useMutation({
    mutationKey: ['UPDATE_TASK'],
    mutationFn: ({ id, completed }: { id: string; completed: boolean }) =>
      Http.patch(`/tasks/${id}`, { completed }).then(({ data }) => data),
    onSuccess: () => {
      showSuccess({ title: 'Éxito', description: 'Tarea actualizada correctamente' });
      queryClient.invalidateQueries({ queryKey: ['TASKS'] });
    },
    onError: (error: unknown) => {
      showError(error as any);
    },
  });

  return { updateTask, isUpdating };
}