import { useState } from 'react';
import { useCreateTodoMutation } from '../../hooks';
import { useAddTodoModal } from './useAddTodoModal';
import type { ITodo, ITodoData } from '@/interfaces';

export function useHeaderTodo() {
  const [modalVisible, setModalVisible] = useState(false);
  const { selectedColor, setSelectedColor } = useAddTodoModal();
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
      onSuccess: () => {-
        setModalVisible(false);
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
