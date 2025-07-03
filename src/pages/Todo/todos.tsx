import { useTodo } from './use-todo-list.tsx';
import TodoLayout from './todo-layout';
import TodoList from './todo-list.tsx';

export default function Todo() {
  const { todos, loading, error, handleCheck, refetchTodos } = useTodo();

  return (
    <TodoLayout fetchTodos={refetchTodos}>
      {loading && <p>Cargando tareas...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && todos.length === 0 && (
        <p className="text-gray-500">No hay tareas aún.</p>
      )}
      {!loading && !error && <TodoList todos={todos} handleCheck={handleCheck} />}
    </TodoLayout>
  );
}
