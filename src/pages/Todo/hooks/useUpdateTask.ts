import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { InfiniteData } from '@tanstack/react-query';
import { Http } from '@/config/http';
import { useShowError } from '@/hooks';
import type { Todo } from '@/interfaces';

type UpdatePayload = { id: string; completed: boolean };

export function useUpdateTask() {
  const queryClient = useQueryClient();
  const { showError } = useShowError();

  const { mutate: updateTask, isPending: isUpdating } = useMutation({
    mutationKey: ['UPDATE_TASK'],
    mutationFn: ({ id, completed }: UpdatePayload) =>
      Http.patch(`/tasks/${id}`, { completed }).then(({ data }) => data),

    onMutate: async ({ id, completed }: UpdatePayload) => {
      await queryClient.cancelQueries({ queryKey: ['TASKS'] });
      const previous = queryClient.getQueryData<InfiniteData<Todo[]>>(['TASKS']);

      queryClient.setQueryData<InfiniteData<Todo[]>>(['TASKS'], old => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map(page =>
            page.map(todo => (todo._id === id ? { ...todo, completed } : todo)),
          ),
        };
      });

      return { previous };
    },

    onError: (error: unknown, _vars, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData(['TASKS'], ctx.previous);
      }
      showError(error as any);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['TASKS'] });
    },
  });

  return { updateTask, isUpdating };
}
