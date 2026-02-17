import { useState } from 'react';
import { Form } from 'antd';
import SearchBar from './search-bar';
import AddIcon from './add-icon';
import AddTodoModal from './add-todo-modal';
import { useAddTodoModal } from './useAddTodoModal';
import { useCreateTodoMutation } from '../modules/tasks/hooks/useCreateTodoMutation';
import TaskDropdown from '../modules/tasks/components/Dropdown';
import { getMenuItems } from '../modules/tasks/components/Dropdown';
import { cn } from '../helpers';
import type { Todo, TodoData } from '../types/todo.types';

import { useAuth } from '../hooks/use-auth';

export default function HeaderTodo({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}) {
  const { onLogout } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const { selectedColor, setSelectedColor } = useAddTodoModal();
  const createTodoMutation = useCreateTodoMutation();
  const [form] = Form.useForm();

  const handleLogout = () => {
    onLogout();
  };

  const menuItems = getMenuItems(handleLogout, () => {});

  const handleCreateTodo = (todo: Todo) => {
    const convertedTodo: TodoData = {
      ...todo,
      dueDate: todo.dueDate ? new Date(todo.dueDate as string) : undefined,
    };
    createTodoMutation.mutate(convertedTodo as any, {
      onSuccess: () => {
        setModalVisible(false);
      },
    });
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-4 items-center">
      <div className="hidden lg:flex lg:flex-1 items-start gap-4">
        <TaskDropdown items={menuItems} iconClassName="flex !text-[#C18EC7]" />
      </div>

      <div className="hidden lg:flex flex-1 justify-center items-center text-center">
        <span className="text-[16px] leading-[100%] text-neutral-600 font-normal">To Do List</span>
      </div>

      <div className="relative flex lg:hidden w-full items-center  h-[24px]">
        <div className="absolute left-0">
          <TaskDropdown items={menuItems} iconClassName="!text-[#C18EC7]" />
        </div>
      </div>
      <div className="w-full lg:hidden">
        <div className="border-b border-zinc-100 -mx-4 px-0 pointer-events-none" />
      </div>

      <div className="flex flex-row lg:flex-1 w-full lg:w-auto gap-3 lg:mt-0 justify-end items-center">
        <div className="w-full lg:w-[122px]">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>
        <button
          className={cn(
            'flex items-center justify-center text-white rounded-full w-10 h-10 transition-colors',
          )}
          onClick={() => setModalVisible(true)}
          aria-label="Agregar tarea"
        >
          <AddIcon />
        </button>
      </div>
      <AddTodoModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleCreateTodo}
        form={form}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />
    </div>
  );
}
