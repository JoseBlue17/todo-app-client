import { useState } from 'react';
import type { Task } from './useHome';
import TruncatedText from '../../components/truncated-text';
import useIsMobile from '../../hooks/useIsMobile';

interface TaskListProps {
  tasks: Task[];
  handleCheck: (taskId: string) => void;
}

export default function TaskList({ tasks, handleCheck }: TaskListProps) {
  const isMobile = useIsMobile();
  const maxLength = isMobile ? 20 : 25;

  const [expanded, setExpanded] = useState<
    Record<string, { title: boolean; description: boolean }>
  >({});

  const toggleExpand = (taskId: string, field: 'title' | 'description') => {
    setExpanded(prev => ({
      ...prev,
      [taskId]: {
        ...prev[taskId],
        [field]: !prev[taskId]?.[field],
      },
    }));
  };

  return (
    <>
      {tasks.map((task, index) => {
        const isTitleExpanded = expanded[task._id]?.title ?? false;
        const isDescriptionExpanded = expanded[task._id]?.description ?? false;

        return (
          <div
            key={task._id}
            className={`mb-5 border-b border-[#EFEFEF] pb-4 -mx-4 px-4 lg:px-6 lg:-mx-6 ${
              index === 0 ? 'pt-5 lg:pt-0' : ''
            }`}
          >
            <div className="flex items-start gap-4">
              <input
                type="checkbox"
                checked={task.checked}
                onChange={() => handleCheck(task._id)}
                className="w-[16.5px] h-[16.5px] cursor-pointer mt-[1.4px]"
              />
              <div
                className={`w-[20px] h-[20px] rounded-[4px] ${task.checked ? 'bg-[#A174CA]' : ''}`}
                style={!task.checked ? { backgroundColor: task.category } : undefined}
              />
              <div className="flex-1">
                <div className="hidden lg:grid lg:grid-cols-[2fr_1.5fr_3fr_1fr] lg:gap-4 items-center">
                  <div className="text-[14px] font-normal text-[#4A4A4A]">
                    <TruncatedText
                      text={task.title}
                      expanded={isTitleExpanded}
                      onToggle={() => toggleExpand(task._id, 'title')}
                      className={task.checked ? 'line-through' : ''}
                    />
                  </div>

                  <p
                    className={`text-[14px] font-normal ${
                      task.checked ? 'text-[#BD8BC8]' : 'text-[#4A4A4A]'
                    }`}
                  >
                    {task.dueDateLabel}
                  </p>

                  <div className="text-[14px] font-normal leading-[120%] text-[#0620618A]">
                    <TruncatedText
                      text={task.description || ''}
                      expanded={isDescriptionExpanded}
                      onToggle={() => toggleExpand(task._id, 'description')}
                    />
                  </div>

                  <span className="text-[14px] font-medium leading-[120%] tracking-[-0.01em] text-[#0620618A] text-right">
                    {task.dueHourLabel}
                  </span>
                </div>

                <div className="lg:hidden flex flex-col gap-1">
                  <div className="flex flex-row justify-between items-start">
                    <div className="text-[14px] font-normal text-[#4A4A4A] w-[50%]">
                      <TruncatedText
                        text={task.title}
                        expanded={isTitleExpanded}
                        onToggle={() => toggleExpand(task._id, 'title')}
                        className={task.checked ? 'line-through' : ''}
                        maxLength={maxLength}
                      />
                    </div>
                    <p
                      className={`text-[14px] font-normal text-right ${
                        task.checked ? 'text-[#BD8BC8]' : 'text-[#4A4A4A]'
                      }`}
                    >
                      {task.dueDateLabel}
                    </p>
                  </div>

                  <div className="flex flex-row items-center gap-2">
                    <div className="text-[14px] font-normal leading-[120%] text-[#0620618A] w-[100%]">
                      <TruncatedText
                        text={task.description || ''}
                        expanded={isDescriptionExpanded}
                        onToggle={() => toggleExpand(task._id, 'description')}
                        maxLength={maxLength}
                      />
                    </div>
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
        );
      })}
    </>
  );
}
