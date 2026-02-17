import { useState, useMemo } from 'react';
import { useGetTodos } from './use-get-todos';
import { getDueDateLabel, getDueHourLabel } from '../../helpers/get-due-date-label';
import type { Todo } from '../../types/todo.types';

export function useTodo() {
  const { data: todos = [], isLoading: loading, error: queryError } = useGetTodos();
  const [searchTerm, setSearchTerm] = useState('');

  const error = queryError ? 'No se pudieron cargar las tareas.' : '';

  const handleCheck = (todoId: string) => {

    console.log('Check todo:', todoId);
  };

  const filteredTodos = useMemo(() => {
    if (!searchTerm.trim()) return todos;

    return todos.filter(
      (todo: Todo) =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (todo.description && todo.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (todo.category && todo.category.toLowerCase().includes(searchTerm.toLowerCase())),
    );
  }, [todos, searchTerm]);

  const getTodoWithLabels = (todo: Todo) => ({
    ...todo,
    dueDateLabel: getDueDateLabel(
      todo.dueDate
        ? todo.dueDate instanceof Date
          ? todo.dueDate
          : new Date(todo.dueDate)
        : undefined,
    ),
    dueHourLabel: getDueHourLabel(
      todo.dueDate
        ? todo.dueDate instanceof Date
          ? todo.dueDate
          : new Date(todo.dueDate)
        : undefined,
    ),
  });

  return {
    todos: filteredTodos,
    allTodos: todos,
    loading,
    error,
    handleCheck,
    getTodoWithLabels,
    searchTerm,
    setSearchTerm,
  };
}
