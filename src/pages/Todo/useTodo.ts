import { useState } from 'react';
import { useGetTodos, useUpdateTask, useEditTask, useDeleteTask } from './hooks';
import type { ICreateTodoInput } from '@/interfaces';

export function useTodo() {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);

  const {
    todos,
    isLoading: loading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetTodos(searchTerm.trim() || undefined);

  const { updateTask, isUpdating } = useUpdateTask();

  const { editTask, isEditing } = useEditTask({
    onSuccess: () => setEditingTodoId(null),
  });

  const { deleteTask, isDeleting } = useDeleteTask();

  const error = isError ? 'No se pudieron cargar las tareas.' : '';

  const handleCheck = (todoId: string, completed: boolean) => {
    updateTask({ id: todoId, completed });
  };

  const handleEdit = (id: string, payload: ICreateTodoInput) => {
    editTask({ id, ...payload });
  };

  const handleDelete = (id: string) => {
    deleteTask(id);
  };

  const handleLoadMore = () => {
    fetchNextPage();
  };

  return {
    todos,
    loading,
    isUpdating,
    isEditing,
    isDeleting,
    isFetchingNextPage,
    hasNextPage,
    error,
    handleCheck,
    handleEdit,
    handleDelete,
    handleLoadMore,
    searchTerm,
    setSearchTerm,
    editingTodoId,
    setEditingTodoId,
  };
}
