import { useQuery } from '@tanstack/react-query';
import { todoService } from '@/services/todo-list-service';
import type { Todo } from '@/types/todo.types';

interface TodosResponse {
  tasks?: Todo[];
}

export function useGetTodos() {
  return useQuery<Todo[], Error>({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await todoService.getTodos();
      const todos = Array.isArray(response) ? response : (response as TodosResponse).tasks || [];
      console.log(`Tareas cargadas: ${todos.length} tareas`);
      return todos;
    },
    staleTime: 0,
  });
}
