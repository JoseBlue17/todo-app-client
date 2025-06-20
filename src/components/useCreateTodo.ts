import { useRef } from 'react';
import type { CreateTodoData } from '../types/todo.types';
import { createTodo } from '../services/create-todo-service';

export function useCreateTodo({ fetchTodos, setToast }: { fetchTodos: () => Promise<void>, setToast: (msg: string | null) => void }) {
    const toastTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const handleCreateTodo = async (values: CreateTodoData) => {
    try {
      console.log('Intentando crear tarea con datos:', JSON.stringify(values, null, 2));
      await createTodo.createTodo(values);
      await fetchTodos();
      setToast('¡Tarea creada con éxito!');
      if (toastTimeout.current) clearTimeout(toastTimeout.current);
      toastTimeout.current = setTimeout(() => setToast(null), 2500);
        } catch (error) {
      console.error('Error al crear la tarea:', error);

      let errorMessage = 'Error al crear la tarea.';
      if (error instanceof Error && 'response' in error) {
        const axiosError = error as { response?: { status?: number; data?: { message?: string } } };
        if (axiosError.response?.status === 401) {
          errorMessage = 'Error de autenticación. Por favor, inicia sesión de nuevo.';
        } else if (axiosError.response?.status === 400) {
          errorMessage = `Error de validación: ${axiosError.response?.data?.message || 'Datos inválidos'}`;
        } else if (axiosError.response?.data?.message) {
          errorMessage = axiosError.response.data.message;
        }
      }

      setToast(errorMessage);
      if (toastTimeout.current) clearTimeout(toastTimeout.current);
      toastTimeout.current = setTimeout(() => setToast(null), 2500);
    }
  };

  return { handleCreateTodo };
}
