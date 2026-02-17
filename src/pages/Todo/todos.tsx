import { useTodo } from './useTodo';
import TodoLayout from './todo-layout';
import TodoList from './todo-list';

export default function Todo() {
  const { 
    todos, 
    loading, 
    error, 
    handleCheck, 
    handleLoadMore,
    hasNextPage,
    isFetchingNextPage,
    searchTerm, 
    setSearchTerm 
  } = useTodo();

  return (
    <TodoLayout searchTerm={searchTerm} setSearchTerm={setSearchTerm}>
      {loading && <p>Cargando tareas...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && todos.length === 0 && (
        <p className="text-gray-500">
          {searchTerm ? 'No se encontraron tareas.' : 'No hay tareas aún.'}
        </p>
      )}
      {!loading && !error && <TodoList todos={todos} handleCheck={handleCheck} />}
      
      {hasNextPage && !searchTerm && (
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
    </TodoLayout>
  );
}