import React from 'react';
import AddTodoForm from './add-todo-form';
import ModalCloseIcon from './modal-close-icon';
import { colorOptions } from './color-options';
import type { TodoData } from '../types/todo.types';

interface AddTodoModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (values: TodoData) => void;
  selectedColor: (typeof colorOptions)[0];
  setSelectedColor: (color: (typeof colorOptions)[0]) => void;
}

const inputSizeClass = 'w-[367px] h-[37px]';

const AddTodoModal: React.FC<AddTodoModalProps> = ({
  visible,
  onCancel,
  onOk,
  selectedColor,
  setSelectedColor,
}) => {
  // Recibe los valores del formulario y llama a onOk con el objeto TodoData
  const handleFormSubmit = (values: {
    title: string;
    description: string;
    dueDate: string | null;
  }) => {
    const todo: TodoData = {
      title: values.title,
      description: values.description,
      dueDate: values.dueDate ? new Date(values.dueDate) : undefined,
      category: selectedColor.hex,
    };
    onOk(todo);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#393939ce] ">
      <div className="bg-white rounded-lg shadow-lg w-[436px] relative">
        <button className="absolute top-4 right-4" onClick={onCancel} aria-label="Close">
          <ModalCloseIcon />
        </button>
        <div className="w-full text-center text-[16px] font-semibold pt-6 pb-2">Add Task</div>
        <div className="px-[33px] pb-6">
          <AddTodoForm
            colorOptions={colorOptions}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            inputSizeClass={inputSizeClass}
            onSubmit={handleFormSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default AddTodoModal;
