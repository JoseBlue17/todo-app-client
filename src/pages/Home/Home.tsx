import { useState } from 'react';
import ListTodoHome from '../../components/ListTodoHome.tsx';
import SearchBar from '../../components/SearchBar.tsx';
import LogoAdd from '../../components/LogoAdd.tsx';
import { useHome } from './useHome';
import dayjs from 'dayjs';

function getDueDateLabel(dueDate: string | Date) {
  const today = dayjs().startOf('day');
  const due = dayjs(dueDate).startOf('day');
  const diff = due.diff(today, 'day');
  if (diff === 0) return 'Due Today';
  if (diff === 1) return 'Due Tomorrow';
  if (diff === 2) return 'Due In 2 Days';
  return `Due On ${dayjs(dueDate).format('MMM DD, YYYY')}`;
}

export default function Home() {
  const { tasks, loading, error } = useHome();
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>({});

  const handleCheck = (taskId: string) => {
    setCheckedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  return (
    <div className="relative w-full min-h-screen">
      <div className="hidden lg:block absolute top-0 left-0 w-full h-[324px] bg-gradient-to-r from-[#F8BBC2] to-[#A074CA] z-0" />

      <div className="relative z-10 flex justify-center lg:pt-[162px] px-[17px] pb-0 lg:pb-[165px] lg:px-[251px]">
        <div className="w-full max-w-[396px] lg:max-w-[938px] min-h-screen lg:min-h-[697px] bg-white lg:rounded-[20px] lg:shadow-[0px_2px_30px_rgba(0,0,0,0.1)] lg:pt-6 lg:pb-6 lg:px-6 py-5 relative">
          <div className="w-full flex flex-col lg:flex-row gap-[18px] items-center">
            <div className="hidden lg:flex lg:flex-1 items-center gap-4">
              <ListTodoHome className="w-[21px] h-[20px] text-black" />
            </div>

            <div className="hidden lg:flex flex-1 justify-center items-center text-center">
              <span className="text-[16px] leading-[100%] text-[#4A4A4A] font-normal">
                To Do List
              </span>
            </div>

            <div className="relative flex lg:hidden w-full items-center  h-[24px]">
              <div className="absolute left-0">
                <ListTodoHome className="w-[21px] h-[20px] text-[#C18EC7]" />
              </div>

              <div className="absolute inset-x-0 text-center">
                <span className="text-[16px] leading-[100%] text-[#4A4A4A] font-normal">
                  To Do List
                </span>
              </div>
            </div>
            <div className="w-full lg:hidden">
              <div
                className="border-b border-[#EFEFEF] -mx-4 px-0"
                style={{ pointerEvents: 'none' }}
              />
            </div>

            <div className="flex flex-row lg:flex-1 w-full lg:w-auto gap-3 lg:mt-0 justify-end items-center">
              <div className="w-full lg:w-[122px]">
                <SearchBar className="w-full h-[37px] rounded-[8px] border border-gray-300" />
              </div>
              <LogoAdd className="w-[20px] h-[20px]" />
            </div>
          </div>

          <div
            className="border-b border-[#EFEFEF] pb-4 -mx-4 lg:-mx-6 px-0 lg:px-6 hidden lg:block"
            style={{ pointerEvents: 'none' }}
          />

          <section className="lg:pt-4 px-0 flex flex-col gap-y-0">
            {loading && <p>Cargando tareas...</p>}
            {error && <p className="text-red-600">{error}</p>}
            {!loading && !error && tasks.length === 0 && (
              <p className="text-gray-500">No hay tareas aún.</p>
            )}

            {!loading &&
              !error &&
              tasks.map((task, idx) => (
                <div
                  key={task._id}
                  className={`mb-5 border-b border-[#EFEFEF] pb-4 -mx-4 px-4 lg:px-6 lg:-mx-6 ${
                    idx === 0 ? ' pt-5 lg:pt-0' : ''
                  }`}
                >
                  <div className="flex items-start gap-4 ">
                    <input
                      type="checkbox"
                      checked={checkedTasks[task._id] || false}
                      onChange={() => handleCheck(task._id)}
                      className="w-[16.5px] h-[16.5px] cursor-pointer mt-[1.4px]"
                    />
                    <div
                      className="w-[20px] h-[20px] rounded-[4px]"
                      style={{
                        backgroundColor: checkedTasks[task._id] ? '#A174CA' : task.category,
                      }}
                    />
                    <div className="flex-1">
                      <div className="hidden lg:grid lg:grid-cols-[2fr_1.5fr_3fr_1fr] lg:gap-4 items-center">
                        <p
                          className={`text-[14px] font-normal text-[#4A4A4A] ${
                            checkedTasks[task._id] ? 'line-through' : ''
                          }`}
                        >
                          {task.title}
                        </p>
                        <p
                          className={`text-[14px] font-normal ${
                            checkedTasks[task._id] ? 'text-[#BD8BC8]' : 'text-[#4A4A4A]'
                          }`}
                        >
                          {getDueDateLabel(task.dueDate)}
                        </p>
                        <p className="text-[14px] font-normal leading-[120%] text-[#0620618A] truncate">
                          {task.description}
                        </p>
                        <span className="text-[14px] font-medium leading-[120%] tracking-[-0.01em] text-[#0620618A] text-right">
                          {dayjs(task.dueDate).format('hh:mm A')}
                        </span>
                      </div>
                      <div className="lg:hidden flex flex-col gap-1">
                        <div className="flex flex-row justify-between items-start">
                          <p
                            className={`text-[14px] font-normal text-[#4A4A4A] ${
                              checkedTasks[task._id] ? 'line-through' : ''
                            }`}
                          >
                            {task.title}
                          </p>
                          <p
                            className={`text-[14px] font-normal text-right ${
                              checkedTasks[task._id] ? 'text-[#BD8BC8]' : 'text-[#4A4A4A]'
                            }`}
                          >
                            {getDueDateLabel(task.dueDate)}
                          </p>
                        </div>

                        <div className="flex flex-row items-center gap-2">
                          <p className="text-[14px] font-normal leading-[120%] text-[#0620618A] w-[70%]">
                            {task.description}
                          </p>
                        </div>

                        <div>
                          <p className="text-[14px] font-medium leading-[120%] tracking-[-0.01em] text-[#0620618A]">
                            {dayjs(task.dueDate).format('hh:mm A')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </section>
        </div>
      </div>
    </div>
  );
}
