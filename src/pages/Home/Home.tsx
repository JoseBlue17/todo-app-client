import { useHome } from './useHome';
import MenuIcon from '../../components/MenuIcon.tsx';
import SearchBar from '../../components/SearchBar.tsx';
import AddIcon from '../../components/AddIcon.tsx';
import TaskList from './TaskList';

export default function Home() {
  const { tasks, loading, error, handleCheck } = useHome();

  return (
    <div className="relative w-full min-h-screen">
      <div className="hidden lg:block absolute top-0 left-0 w-full h-[324px] bg-gradient-to-r from-[#F8BBC2] to-[#A074CA] z-0" />

      <div className="relative z-10 flex justify-center lg:pt-[162px] px-[17px] pb-0 lg:pb-[165px] lg:px-[251px]">
        <div className="w-full max-w-[396px] lg:max-w-[938px] min-h-screen lg:min-h-[697px] bg-white lg:rounded-[20px] lg:shadow-[0px_2px_30px_rgba(0,0,0,0.1)] lg:pt-6 lg:pb-6 lg:px-6 py-5 relative">
          <div className="w-full flex flex-col lg:flex-row gap-[18px] items-center">
            <div className="hidden lg:flex lg:flex-1 items-center gap-4">
              <MenuIcon className="w-[21px] h-[20px] text-black" />
            </div>

            <div className="hidden lg:flex flex-1 justify-center items-center text-center">
              <span className="text-[16px] leading-[100%] text-[#4A4A4A] font-normal">
                To Do List
              </span>
            </div>

            <div className="relative flex lg:hidden w-full items-center  h-[24px]">
              <div className="absolute left-0">
                <MenuIcon className="w-[21px] h-[20px] text-[#C18EC7]" />
              </div>

              <div className="absolute inset-x-0 text-center">
                <span className="text-[16px] leading-[100%] text-[#4A4A4A] font-normal">
                  To Do List
                </span>
              </div>
            </div>
            <div className="w-full lg:hidden">
              <div className="border-b border-[#EFEFEF] -mx-4 px-0 pointer-events-none" />
            </div>

            <div className="flex flex-row lg:flex-1 w-full lg:w-auto gap-3 lg:mt-0 justify-end items-center">
              <div className="w-full lg:w-[122px]">
                <SearchBar />
              </div>
              <AddIcon className="w-[20px] h-[20px]" />
            </div>
          </div>

          <div className="border-b border-[#EFEFEF] pb-4 -mx-4 lg:-mx-6 px-0 lg:px-6 hidden lg:block pointer-events-none" />

          <section className="lg:pt-4 px-0 flex flex-col gap-y-0">
            {loading && <p>Cargando tareas...</p>}
            {error && <p className="text-red-600">{error}</p>}
            {!loading && !error && tasks.length === 0 && (
              <p className="text-gray-500">No hay tareas aún.</p>
            )}
            {!loading && !error && <TaskList tasks={tasks} handleCheck={handleCheck} />}
          </section>
        </div>
      </div>
    </div>
  );
}
