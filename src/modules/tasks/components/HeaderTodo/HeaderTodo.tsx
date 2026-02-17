import { Form } from 'antd';
import AddIcon from './AddIcon';
import AddTodoModal from './AddTodoModal';
import { useHeaderTodo } from './useHeaderTodo';

interface IHeaderTodoProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export default function HeaderTodo({ searchTerm, setSearchTerm }: IHeaderTodoProps) {
  const [form] = Form.useForm();
  const {
    modalVisible,
    selectedColor,
    setSelectedColor,
    handleCreateTodo,
    handleOpenModal,
    handleCloseModal,
    isLoading,
  } = useHeaderTodo();

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div className="flex-1">
        <input
          type="text"
          placeholder="Buscar tareas..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleOpenModal}
          disabled={isLoading}
          className="btn-primary flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <AddIcon />
          Nueva Tarea
        </button>
      </div>

      <div className="w-full lg:hidden">
        <div className="border-b border-gray-200 -mx-4 px-0 pointer-events-none" />
        <div className="border-b border-gray-200 pb-4 -mx-4 lg:-mx-6 px-0 pointer-events-none" />
      </div>

      {modalVisible && (
        <AddTodoModal
          visible={modalVisible}
          onClose={handleCloseModal}
          onSubmit={handleCreateTodo}
          form={form}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
      )}
    </div>
  );
}
