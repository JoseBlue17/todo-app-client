import HeaderTodo from '../HeaderTodo/HeaderTodo';
import React from 'react';

interface TodoLayoutProps {
  children: React.ReactNode;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const TodoLayout: React.FC<TodoLayoutProps> = ({ children, searchTerm, setSearchTerm }) => {
  return (
    <div className="relative w-full min-h-screen">
      <div className="hidden lg:block absolute top-0 left-0 w-full h-[324px] bg-gradient-to-r from-[#F8BBC2] to-[#A074CA] z-0" />
      <div className="relative z-10 flex justify-center lg:pt-[162px] px-[17px] pb-0 lg:pb-[165px] lg:px-[251px]">
        <div className="w-full max-w-[396px] lg:max-w-[938px] min-h-screen lg:min-h-[697px] bg-white lg:rounded-[20px] lg:shadow-[0px_2px_30px_rgba(0,0,0,0.1)] lg:pt-6 lg:px-6 pt-5 relative flex flex-col">
          <HeaderTodo searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <div className="border-b border-[#EFEFEF] pb-4 -mx-4 lg:-mx-6 px-0 lg:px-6 hidden lg:block pointer-events-none" />
          <section className="lg:pt-4 px-0 flex flex-col gap-y-0 flex-1 lg:max-h-[580px]">
            {children}
          </section>
        </div>
      </div>
    </div>
  );
};

export default TodoLayout;
