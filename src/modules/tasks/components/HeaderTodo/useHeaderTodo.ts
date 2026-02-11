import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateTodoMutation } from '../../hooks';
import { useAddTodoModal } from './useAddTodoModal';
import type { ITodo, ITodoData } from '@/interfaces';
import type { AxiosError } from 'axios';

export function useHeaderTodo(setToast: (message: string | null) => void) {
  const [modalVisible, setModalVisible] = useState(false);
  const { selectedColor, setSelectedColor } = useAddTodoModal();
  const queryClient = useQueryClient();
  const createTodoMutation = useCreateTodoMutation();

  const handleCreateTodo = (todo: ITodo) => {
    const convertedTodo: ITodoData = {
      title: todo.title,
      description: todo.description,
      category: todo.category,
      dueDate: todo.dueDate,
      completed: todo.completed,
    };

    createTodoMutation.mutate(convertedTodo, {
      onSuccess: () => {
        setToast('¡Tarea creada con éxito!');
        setModalVisible(false);
        queryClient.invalidateQueries({ queryKey: ['tasks'] });
        setTimeout(() => setToast(null), 1500);
      },
      onError: (error: unknown) => {
        let errorMessage = 'Error al crear la tarea.';
        if (error && typeof error === 'object' && 'response' in error) {
          const axiosError = error as AxiosError<{ message?: string }>;
          if (axiosError.response?.status === 401) {
            errorMessage = 'Error de autenticación. Por favor, inicia sesión de nuevo.';
          } else if (axiosError.response?.status === 400) {
            errorMessage = `Error de validación: ${axiosError.response?.data?.message || 'Datos inválidos'}`;
          } else if (axiosError.response?.data?.message) {
            errorMessage = axiosError.response.data.message;
          }
        }
        setToast(errorMessage);
      },
    });
  };

  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  return {
    modalVisible,
    selectedColor,
    setSelectedColor,
    handleCreateTodo,
    handleOpenModal,
    handleCloseModal,
    isLoading: createTodoMutation.isPending,
  };
}