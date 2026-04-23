import { useTodo } from './useTodo';
import TodoLayout from './todo-layout';
import TodoList from './todo-list';
import { Empty, LoadingFallback } from '@/components';
import EditTodoModal from '@/components/edit-todo-modal';

export default function Todo() {
  const {
    todos,
    loading,
    error,
    handleCheck,
    handleEdit,
    handleDelete,
    handleLoadMore,
    hasNextPage,
    isFetchingNextPage,
    searchTerm,
    setSearchTerm,
    editingTodoId,
    setEditingTodoId,
    isEditing,
    isDeleting,
  } = useTodo();

  const editingTodo = todos.find(t => t._id === editingTodoId) ?? null;

  return (
    <TodoLayout searchTerm={searchTerm} setSearchTerm={setSearchTerm}>
      {loading && <LoadingFallback description="Cargando tareas..." />}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && todos.length === 0 && (
        <Empty text={searchTerm ? 'No se encontraron tareas.' : 'No hay tareas aún.'} />
      )}
      {!loading && !error && todos.length > 0 && (
        <TodoList
          todos={todos}
          handleCheck={handleCheck}
          onEdit={id => setEditingTodoId(id)}
          onDelete={handleDelete}
          isDeleting={isDeleting}
        />
      )}

      {hasNextPage && (
        <div className="flex justify-center py-4">
          <button
            onClick={handleLoadMore}
            disabled={isFetchingNextPage}
            className="px-4 py-2 text-sm text-[#A175CA] border border-[#A175CA] rounded-lg hover:bg-[#A175CA]/10 transition-colors disabled:opacity-50"
          >
            {isFetchingNextPage ? 'Cargando...' : 'Ver más tareas'}
          </button>
        </div>
      )}

      <EditTodoModal
        todo={editingTodo}
        visible={!!editingTodoId}
        onCancel={() => setEditingTodoId(null)}
        onOk={handleEdit}
        isLoading={isEditing}
      />
    </TodoLayout>
  );
}
