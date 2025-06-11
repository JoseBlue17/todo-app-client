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

      <div className="relative z-10 flex justify-center lg:pt-[162px] px-[17px] pt-5 pb-0 lg:pb-[165px] lg:px-[251px]">
        <div className="w-full max-w-[396px] lg:max-w-[938px] min-h-screen lg:min-h-[697px] bg-white lg:rounded-[20px] lg:shadow-[0px_2px_30px_rgba(0,0,0,0.1)] lg:pt-6 lg:pb-6 lg:px-6 relative">
          <div className="w-full flex flex-col lg:flex-row items-center mb-4">
            {/* Ícono - izquierda (solo en desktop) */}
            <div className="hidden lg:flex lg:flex-1 items-center gap-4">
              <ListTodoHome className="w-[21px] h-[20px] text-black" />
            </div>

            {/* Título centrado (solo en desktop) */}
            <div className="hidden lg:flex flex-1 justify-center items-center text-center">
              <span className="text-[16px] leading-[100%] text-[#4A4A4A] font-normal">
                To Do List
              </span>
            </div>

            {/* Logo izquierda + título centrado (solo en móvil) */}
            <div className="relative flex lg:hidden w-full items-center mt-2 mb-2 h-[24px]">
              {/* Logo a la izquierda */}
              <div className="absolute left-0">
                <ListTodoHome className="w-[21px] h-[20px] text-[#C18EC7]" />
              </div>

              {/* Título centrado */}
              <div className="absolute inset-x-0 text-center">
                <span className="text-[16px] leading-[100%] text-[#4A4A4A] font-normal">
                  To Do List
                </span>
              </div>
            </div>

            {/* Buscador + botón (siempre visible) */}
            <div className="flex flex-row lg:flex-1 w-full lg:w-auto gap-3 mt-2 lg:mt-0 justify-end items-center">
              <div className="w-full lg:w-[122px]">
                <SearchBar className="w-full h-[37px] rounded-[8px] border border-gray-300" />
              </div>
              <LogoAdd className="w-[20px] h-[20px]" />
            </div>
          </div>

          <div
            className="mb-5 border-b border-[#EFEFEF] pb-4 -mx-4 lg:-mx-6 px-0 lg:px-6"
            style={{ pointerEvents: 'none' }}
          />

          <section className=" lg:pt-4 px-0">
            {loading && <p>Cargando tareas...</p>}
            {error && <p className="text-red-600">{error}</p>}
            {!loading && !error && tasks.length === 0 && (
              <p className="text-gray-500">No hay tareas aún.</p>
            )}

            {!loading &&
              !error &&
              tasks.map(task => (
                <div
                  key={task._id}
                  className="mb-5 border-b border-[#EFEFEF] pb-4 -mx-4 lg:-mx-6 px-0 lg:px-6"
                >
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      checked={checkedTasks[task._id] || false}
                      onChange={() => handleCheck(task._id)}
                      className="w-[16.5px] h-[16.5px] mt-1  cursor-pointer"
                    />
                    <div
                      className="w-[20px] h-[20px] rounded-[4px] mt-1"
                      style={{
                        backgroundColor: checkedTasks[task._id] ? '#A174CA' : task.category,
                      }}
                    />
                    <div className="flex-1">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4">
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
                          } lg:ml-4`}
                        >
                          {getDueDateLabel(task.dueDate)}
                        </p>
                        <p className="hidden lg:block text-[14px] font-normal leading-[120%] text-[#0620618A] lg:ml-4 truncate">
                          {task.description}
                        </p>
                        <span className="hidden lg:inline-block text-[14px] font-medium leading-[120%] tracking-[-0.01em] text-[#0620618A] ml-auto">
                          {dayjs(task.dueDate).format('hh:mm A')}
                        </span>
                      </div>
                      <div className="flex flex-col mt-[6px] gap-[12px] lg:hidden">
                        <p className="text-[14px] font-normal leading-[120%] text-[#0620618A]">
                          {task.description}
                        </p>
                        <p className="text-[14px] font-medium leading-[120%] tracking-[-0.01em] text-[#0620618A] text-right">
                          {dayjs(task.dueDate).format('hh:mm A')}
                        </p>
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
