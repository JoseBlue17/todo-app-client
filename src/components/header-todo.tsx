import { useState } from 'react';
import MenuIcon from './menu-icon';
import SearchBar from './search-bar';
import AddIcon from './add-icon';
import AddTodoModal from './add-todo-modal';
import { useAddTodoModal } from './useAddTodoModal';
import { useCreateTodo } from './useCreateTodo';
import type { TodoData } from '../types/todo.types';

export default function HeaderTodo({
  fetchTodo,
  setToast,
}: {
  fetchTodo: () => Promise<void>;
  setToast: (msg: string | null) => void;
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const { selectedColor, setSelectedColor } = useAddTodoModal();
  const { handleCreateTodo: createTodoHandler } = useCreateTodo({
    fetchTodos: fetchTodo,
    setToast,
  });

  const handleCreateTodo = async (todo: TodoData) => {
    await createTodoHandler(todo);
    setModalVisible(false);
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-[18px] items-center">
      <div className="hidden lg:flex lg:flex-1 items-center gap-4">
        <MenuIcon className="w-[21px] h-[20px] text-black" />
      </div>

      <div className="hidden lg:flex flex-1 justify-center items-center text-center">
        <span className="text-[16px] leading-[100%] text-[#4A4A4A] font-normal">To Do List</span>
      </div>

      <div className="relative flex lg:hidden w-full items-center  h-[24px]">
        <div className="absolute left-0">
          <MenuIcon className="w-[21px] h-[20px] text-[#C18EC7]" />
        </div>

        <div className="absolute inset-x-0 text-center">
          <span className="text-[16px] leading-[100%] text-[#4A4A4A] font-normal">To Do List</span>
        </div>
      </div>
      <div className="w-full lg:hidden">
        <div className="border-b border-[#EFEFEF] -mx-4 px-0 pointer-events-none" />
      </div>

      <div className="flex flex-row lg:flex-1 w-full lg:w-auto gap-3 lg:mt-0 justify-end items-center">
        <div className="w-full lg:w-[122px]">
          <SearchBar />
        </div>
        <button
          className="flex items-center justify-center  text-white rounded-full w-10 h-10 transition-colors"
          onClick={() => setModalVisible(true)}
          aria-label="Agregar tarea"
        >
          <AddIcon className="w-[20px] h-[20px]" />
        </button>
      </div>
      <AddTodoModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleCreateTodo}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />
    </div>
  );
}
