import type { Task } from './use-todo-list';
import cn from '../../helpers/cn';

interface TaskListProps {
  tasks: Task[];
  handleCheck: (taskId: string) => void;
}

export default function TaskList({ tasks, handleCheck }: TaskListProps) {
  return (
    <>
      {tasks.map((task, index) => (
        <div
          key={task._id}
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
              checked={task.checked}
              onChange={() => handleCheck(task._id)}
              className="w-[16.5px] h-[16.5px] cursor-pointer mt-[1.4px]"
            />
            <div
              className={cn(
                'w-[20px]',
                'h-[20px]',
                'rounded-[4px]',
                task.checked && 'bg-[#A174CA]',
              )}
              style={!task.checked ? { backgroundColor: task.category } : undefined}
            />
            <div className="flex-1">
              <div className="hidden lg:grid lg:grid-cols-[1.3fr_1.5fr_3.8fr_0.8fr] lg:gap-5 items-center">
                <p
                  className={cn(
                    'text-[14px]',
                    'font-normal',
                    'text-[#4A4A4A]',
                    task.checked && 'line-through',
                  )}
                >
                  {task.title}
                </p>
                <p
                  className={cn(
                    'text-[14px]',
                    'font-normal',
                    task.checked ? 'text-[#BD8BC8]' : 'text-[#4A4A4A]',
                  )}
                >
                  {task.dueDateLabel}
                </p>
                <p className="text-[14px] font-normal leading-[120%] text-[#0620618A]">
                  {task.description}
                </p>
                <span className="text-[14px] font-medium leading-[120%] tracking-[-0.01em] text-[#0620618A] text-right">
                  {task.dueHourLabel}
                </span>
              </div>
              <div className="lg:hidden flex flex-col gap-1">
                <div className="flex flex-row justify-between items-start">
                  <p
                    className={cn(
                      'text-[14px]',
                      'font-normal',
                      'text-[#4A4A4A]',
                      task.checked && 'line-through',
                    )}
                  >
                    {task.title}
                  </p>
                  <p
                    className={cn(
                      'text-[14px]',
                      'font-normal',
                      'text-right',
                      task.checked ? 'text-[#BD8BC8]' : 'text-[#4A4A4A]',
                    )}
                  >
                    {task.dueDateLabel}
                  </p>
                </div>

                <div className="flex flex-row items-center gap-2">
                  <p className="text-[14px] font-normal leading-[120%] text-[#0620618A] w-[70%]">
                    {task.description}
                  </p>
                </div>

                <div>
                  <p className="text-[14px] font-medium leading-[120%] tracking-[-0.01em] text-[#0620618A]">
                    {task.dueHourLabel}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
