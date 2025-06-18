import MenuIcon from './menu-icon';
import SearchBar from './search-bar';
import AddIcon from './add-icon';

export default function HeaderTodo() {
  return (
    <div className="w-full flex flex-col lg:flex-row gap-[18px] items-center">
      <div className="hidden lg:flex lg:flex-1 items-center gap-4">
        <MenuIcon className="w-[21px] h-[20px] text-black" />
      </div>

      <div className="hidden lg:flex flex-1 justify-center items-center text-center">
        <span className="text-[16px] leading-[100%] text-[#4A4A4A] font-normal">To Do List</span>
      </div>

      <div className="relative flex lg:hidden w-full items-center  h-[24px]">
        <div className="absolute left-0">
          <MenuIcon className="w-[21px] h-[20px] text-[#C18EC7]" />
        </div>

        <div className="absolute inset-x-0 text-center">
          <span className="text-[16px] leading-[100%] text-[#4A4A4A] font-normal">To Do List</span>
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
  );
}
