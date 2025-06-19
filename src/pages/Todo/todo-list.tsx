import type { Todo } from './use-todo-list';
import cn from '../../helpers/cn';
import { getDueDateLabel, getDueHourLabel } from '../../helpers/get-due-date-label';

interface TodoListProps {
  todos: Todo[];
  handleCheck: (todoId: string) => void;
}

export default function TodoList({ todos, handleCheck }: TodoListProps) {
  return (
    <>
      {todos.map((todo, index) => {
        const dueDateLabel = getDueDateLabel(todo.dueDate);
        const dueHourLabel = getDueHourLabel(todo.dueDate);

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
            <div className="flex items-center gap-4 ">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleCheck(todo._id)}
                className="w-[16.5px] h-[16.5px] cursor-pointer mt-[1.4px]"
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
                <div className="lg:hidden flex flex-col gap-1">
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
            </div>
          </div>
        );
      })}
    </>
  );
}
