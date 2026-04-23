import { Popconfirm } from 'antd';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import type { Todo } from '@/interfaces';
import { cn, getDueDateLabel, getDueHourLabel } from '@/helpers';

interface TodoListProps {
  todos: Todo[];
  handleCheck: (todoId: string, completed: boolean) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

export default function TodoList({
  todos,
  handleCheck,
  onEdit,
  onDelete,
  isDeleting,
}: TodoListProps) {
  return (
    <>
      {todos.map((todo, index) => {
        const dueDateLabel = getDueDateLabel(
          todo.dueDate
            ? todo.dueDate instanceof Date
              ? todo.dueDate
              : new Date(todo.dueDate)
            : undefined,
        );
        const dueHourLabel = getDueHourLabel(
          todo.dueDate
            ? todo.dueDate instanceof Date
              ? todo.dueDate
              : new Date(todo.dueDate)
            : undefined,
        );

        return (
          <div
            key={todo._id}
            className={cn(
              'py-4',
              'border-b',
              'border-[#EFEFEF]',
              '-mx-4',
              'px-4',
              'lg:px-6',
              'lg:-mx-6',
              index === 0 && 'pt-5 lg:pt-0',
            )}
          >
            <div className="flex lg:items-center items-start gap-4">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleCheck(todo._id, !todo.completed)}
                className={cn(
                  'w-[16.5px] h-[16.5px] cursor-pointer mt-[1.4px]',
                  'accent-[#A175CA]',
                )}
              />
              <div
                className={cn(
                  'w-[20px]',
                  'h-[20px]',
                  'rounded-[4px]',
                  todo.completed && 'bg-[#A174CA]',
                )}
                style={!todo.completed ? { backgroundColor: todo.category } : undefined}
              />
              <div className="flex-1">
                {/* Desktop layout */}
                <div className="hidden lg:grid lg:grid-cols-[1.3fr_1.5fr_3.8fr_0.8fr] lg:gap-5 items-center">
                  <p
                    className={cn(
                      'text-[14px]',
                      'font-normal',
                      'text-[#4A4A4A]',
                      todo.completed && 'line-through',
                    )}
                  >
                    {todo.title}
                  </p>
                  <p
                    className={cn(
                      'text-[14px]',
                      'font-normal',
                      todo.completed ? 'text-[#BD8BC8]' : 'text-[#4A4A4A]',
                    )}
                  >
                    {dueDateLabel}
                  </p>
                  <p className="text-[14px] font-normal leading-[120%] text-[#0620618A]">
                    {todo.description}
                  </p>
                  <span className="text-[14px] font-medium leading-[120%] tracking-[-0.01em] text-[#0620618A] text-right">
                    {dueHourLabel}
                  </span>
                </div>

                {/* Mobile layout */}
                <div className="lg:hidden flex flex-col gap-2">
                  <div className="flex flex-row justify-between items-start">
                    <p
                      className={cn(
                        'text-[14px]',
                        'font-normal',
                        'text-[#4A4A4A]',
                        todo.completed && 'line-through',
                      )}
                    >
                      {todo.title}
                    </p>
                    <p
                      className={cn(
                        'text-[14px]',
                        'font-normal',
                        'text-right',
                        todo.completed ? 'text-[#BD8BC8]' : 'text-[#4A4A4A]',
                      )}
                    >
                      {dueDateLabel}
                    </p>
                  </div>

                  <div className="flex flex-row items-center gap-2">
                    <p className="text-[14px] font-normal leading-[120%] text-[#0620618A] w-[70%]">
                      {todo.description}
                    </p>
                  </div>

                  <div>
                    <p className="text-[14px] font-medium leading-[120%] tracking-[-0.01em] text-[#0620618A]">
                      {dueHourLabel}
                    </p>
                  </div>
                </div>
              </div>

              
              <div className="flex items-center gap-2 ml-auto shrink-0">
                <button
                  onClick={() => onEdit(todo._id)}
                  disabled={todo.completed}
                  className={cn(
                    'p-1.5 rounded-md transition-colors',
                    todo.completed
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-[#A175CA] hover:bg-[#A175CA]/10',
                  )}
                  title="Editar tarea"
                >
                  <FiEdit2 size={15} />
                </button>

                <Popconfirm
                  title="¿Eliminar tarea?"
                  description="Esta acción no se puede deshacer."
                  onConfirm={() => onDelete(todo._id)}
                  okText="Sí, eliminar"
                  cancelText="Cancelar"
                  okButtonProps={{ danger: true, loading: isDeleting }}
                >
                  <button
                    className="p-1.5 rounded-md text-red-400 hover:bg-red-50 transition-colors"
                    title="Eliminar tarea"
                  >
                    <FiTrash2 size={15} />
                  </button>
                </Popconfirm>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
