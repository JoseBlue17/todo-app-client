import { useEffect, useState, useMemo } from 'react';
import { todoService } from '../../services/todo-list-service';
import { getDueDateLabel, getDueHourLabel } from '../../helpers/get-due-date-label';
import type { Todo } from '../../types/todo.types';

export function useTodo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchTodos = async () => {
    try {
      const response = await todoService.getTodos();
      const todos = Array.isArray(response) ? response : response.tasks || [];
      console.log(`Tareas cargadas: ${todos.length} tareas`);
      setTodos(todos);
    } catch (error) {
      console.error('Error al obtener tareas:', error);
      setError('No se pudieron cargar las tareas.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleCheck = (todoId: string) => {
    setTodos(prev =>
      prev.map(todo => (todo._id === todoId ? { ...todo, completed: !todo.completed } : todo)),
    );
  };

  const filteredTodos = useMemo(() => {
    if (!searchTerm.trim()) return todos;
    
    return todos.filter(todo =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (todo.description && todo.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (todo.category && todo.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [todos, searchTerm]);

  const getTodoWithLabels = (todo: Todo) => ({
    ...todo,
    dueDateLabel: getDueDateLabel(todo.dueDate ? (todo.dueDate instanceof Date ? todo.dueDate : new Date(todo.dueDate)) : undefined),
    dueHourLabel: getDueHourLabel(todo.dueDate ? (todo.dueDate instanceof Date ? todo.dueDate : new Date(todo.dueDate)) : undefined),
  });

  return {
    todos: filteredTodos,
    allTodos: todos,
    loading,
    error,
    handleCheck,
    getTodoWithLabels,
    refetchTodos: fetchTodos,
    searchTerm,
    setSearchTerm,
  };
}
