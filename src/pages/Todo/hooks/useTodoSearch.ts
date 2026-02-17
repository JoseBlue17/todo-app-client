import { useState, useMemo } from 'react';
import type { Todo } from '@/interfaces';

export function useTodoSearch(todos: Todo[]) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTodos = useMemo(() => {
    if (!searchTerm.trim()) return todos;

    return todos.filter(
      (todo: Todo) =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (todo.description?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (todo.category?.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [todos, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredTodos,
  };
}