import { useGetTodos, useUpdateTask, useTodoSearch } from './hooks';

export function useTodo() {
  const {
    todos,
    isLoading: loading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetTodos();

  const { updateTask, isUpdating } = useUpdateTask();

  const { filteredTodos, searchTerm, setSearchTerm } = useTodoSearch(todos);

  const error = isError ? 'No se pudieron cargar las tareas.' : '';

  const handleCheck = (todoId: string, completed: boolean) => {
    updateTask({ id: todoId, completed });
  };

  const handleLoadMore = () => {
    fetchNextPage();
  };

  return {
    todos: filteredTodos,
    allTodos: todos,
    loading,
    isUpdating,
    isFetchingNextPage,
    hasNextPage,
    error,
    handleCheck,
    handleLoadMore,
    searchTerm,
    setSearchTerm,
  };
}
