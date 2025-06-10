import { useState } from 'react';
import ListTodoIcon from '../../components/ListTodoIcon.tsx';
import AddTask from '../../components/AddTask';
import SettingsLogo from '../../components/SettingsLogo';
import LogOut from '../../components/LogOut.tsx';
import SearchBar from '../../components/SearchBar.tsx';
import LogoAdd from '../../components/LogoAdd.tsx';
import { useHome } from './useHome';
import dayjs from 'dayjs';
import AddTaskForm from '../../components/AddTaskForm';
import authService from '../../services/authService';
import type { CreateTaskPayload } from '../../services/authService';

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
  const [checkedTasks, setCheckedTasks] = useState<Record<number, boolean>>({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCheck = (taskId: number) => {
    setCheckedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCreateTask = async (values: CreateTaskPayload) => {
    try {
      await authService.createTask(values);
      setIsModalVisible(false);
      // Opcional: Recargar tareas o actualizar el estado de tareas
      // fetchTasks(); // Si tienes una función para recargar las tareas
      alert('¡Tarea creada con éxito!');
    } catch (error) {
      console.error('Error al crear la tarea:', error);
      alert('Error al crear la tarea.');
    }
  };

  return (
    <div className="relative w-full min-h-screen">
      {/* Gradiente desktop */}
      <div className="hidden lg:block absolute top-0 left-0 w-full h-[324px] bg-gradient-to-r from-[#F8BBC2] to-[#A074CA] z-0" />

      {/* Contenedor principal */}
      <div className="relative z-10 flex justify-center pt-0 lg:pt-[162px] pb-0 lg:pb-[165px] px-4 lg:px-[251px]">
        <div className="w-full max-w-[396px] lg:max-w-[938px] min-h-screen lg:min-h-[697px] bg-white lg:rounded-[20px] lg:shadow-[0px_2px_30px_rgba(0,0,0,0.1)] pt-[17px] pb-[20px] lg:pt-6 lg:pb-6 px-4 lg:px-6 relative">
          {/* Header */}
          <div className="absolute lg:static top-[22px] lg:top-0 left-0 w-full flex items-center z-10 h-[20px] lg:h-auto mb-4">
            {/* Lado izquierdo */}
            <div className="flex-1 flex items-center">
              <button
                type="button"
                onClick={() => setMenuOpen(open => !open)}
                className="relative left-0 top-0 w-[21px] h-[20px] flex items-center justify-center focus:outline-none"
              >
                <ListTodoIcon className="w-[21px] h-[20px] text-[#C18EC7] lg:text-black" />
              </button>
            </div>
            {/* Centro */}
            <div className="flex-1 flex justify-center items-center text-center">
              <span className="w-[72px] h-[20px] text-center font-[Lato] font-normal text-[16px] leading-[100%] text-[#4A4A4A] flex items-center justify-center">
                To Do List
              </span>
            </div>
            {/* Lado derecho */}
            <div className="flex-1 hidden lg:flex items-center gap-3 justify-end">
              <SearchBar className="lg:w-[122px] lg:h-[37px] rounded-[8px] border border-gray-300" />
              <LogoAdd className="w-[20px] h-[20px]" onClick={showModal} />
            </div>
            {/* Lado derecho vacío en mobile para equilibrar */}
            <div className="flex-1 flex items-center justify-end lg:hidden" />
          </div>

          {/* Línea separadora unificada */}
          <div
            className="absolute left-0 right-0 top-[60px] w-[100vw] -ml-4 border-t border-[#EFEFEF] lg:static lg:w-auto lg:ml-0 lg:left-0 lg:right-0 lg:top-[72px]"
            style={{ pointerEvents: 'none' }}
          />

          {/* Menú lateral */}
          {menuOpen && (
            <div className="absolute top-[60px] lg:top-14 left-4 lg:left-0 bg-white rounded-[8px] shadow-lg flex flex-col z-30 py-2 px-4">
              <AddTask className="cursor-pointer" onClick={showModal} />
              <SettingsLogo className="mt-4" />
              <LogOut className="mt-4" />
            </div>
          )}

          {/* Barra búsqueda mobile: izquierda y derecha */}
          <div className="lg:hidden absolute top-[80px] left-0 right-0 w-full flex justify-between items-center px-4">
            <SearchBar className="h-[37px] w-[calc(100%-40px)] rounded-[8px] border border-gray-300" />
            <LogoAdd className="w-[20px] h-[20px]  text-[#C18EC7]" onClick={showModal} />
          </div>

          {/* Lista de tareas */}
          <section className="pt-[130px] lg:pt-4 px-0">
            {loading && <p>Cargando tareas...</p>}
            {error && <p className="text-red-600">{error}</p>}
            {!loading && !error && tasks.length === 0 && (
              <p className="text-gray-500">No hay tareas aún.</p>
            )}

            {!loading &&
              !error &&
              tasks.map(task => (
                <div
                  key={task.id}
                  className="mb-5 border-b border-[#EFEFEF] pb-4 -mx-4 lg:-mx-6 px-0 lg:px-6"
                >
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      checked={checkedTasks[task.id] || false}
                      onChange={() => handleCheck(task.id)}
                      className="w-[16.5px] h-[16.5px] mt-1  cursor-pointer"
                    />
                    <div
                      className="w-[20px] h-[20px] rounded-[4px] mt-1"
                      style={{ backgroundColor: checkedTasks[task.id] ? '#A174CA' : task.category }}
                    />
                    <div className="flex-1">
                      {/* Título y fecha */}
                      <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4">
                        <p
                          className={`text-[14px] font-normal text-[#4A4A4A] ${
                            checkedTasks[task.id] ? 'line-through' : ''
                          }`}
                        >
                          {task.title}
                        </p>
                        <p
                          className={`text-[14px] font-normal ${
                            checkedTasks[task.id] ? 'text-[#BD8BC8]' : 'text-[#4A4A4A]'
                          } lg:ml-4`}
                        >
                          {getDueDateLabel(task.dueDate)}
                        </p>
                        {/* Descripción escritorio */}
                        <p className="hidden lg:block text-[14px] font-normal leading-[120%] text-[#0620618A] lg:ml-4 truncate">
                          {task.description}
                        </p>
                        {/* Hora escritorio */}
                        <span className="hidden lg:inline-block text-[14px] font-medium leading-[120%] tracking-[-0.01em] text-[#0620618A] ml-auto">
                          {dayjs(task.dueDate).format('hh:mm A')}
                        </span>
                      </div>
                      {/* Descripción y hora mobile */}
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

          <AddTaskForm visible={isModalVisible} onOk={handleCreateTask} onCancel={handleCancel} />
        </div>
      </div>
    </div>
  );
}
