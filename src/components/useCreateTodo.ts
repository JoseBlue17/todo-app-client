import { useRef } from 'react';
import type {Todo} from '../pages/Todo/use-todo-list';
import { createTodo } from '../services/create-todo-service';

export function useCreateTodo({ fetchTodos, setToast }: { fetchTodos: () => Promise<void>, setToast: (msg: string | null) => void }) {
    const toastTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const handleCreateTodo = async (values: Todo) => {
    try {
      await createTodo.createTodo(values);
      await fetchTodos();
      setToast('¡Tarea creada con éxito!');
      if (toastTimeout.current) clearTimeout(toastTimeout.current);
      toastTimeout.current = setTimeout(() => setToast(null), 2500);
    } catch (error) {
      console.error('Error al crear la tarea:', error);
      setToast('Error al crear la tarea.');
      if (toastTimeout.current) clearTimeout(toastTimeout.current);
      toastTimeout.current = setTimeout(() => setToast(null), 2500);
    }
  };

  return { handleCreateTodo };
}
