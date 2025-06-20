import { useEffect, useState } from 'react';
import { todoService } from '../../services/todo-service';
import { getDueDateLabel, getDueHourLabel } from '../../helpers/get-due-date-label';

export type Todo = {
  _id: string;
  title: string;
  description: string;
  category?: string;
  dueDate: string;
  completed: boolean;
};

export function useTodo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
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

    fetchTodos();
  }, []);

  const handleCheck = (todoId: string) => {
    setTodos(prev =>
      prev.map(todo => (todo._id === todoId ? { ...todo, completed: !todo.completed } : todo)),
    );
  };

  const getTodoWithLabels = (todo: Todo) => ({
    ...todo,
    dueDateLabel: getDueDateLabel(todo.dueDate),
    dueHourLabel: getDueHourLabel(todo.dueDate),
  });

  return {
    todos,
    loading,
    error,
    handleCheck,
    getTodoWithLabels,
  };
}
