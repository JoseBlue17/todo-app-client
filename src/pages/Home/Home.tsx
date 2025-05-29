import { useState } from 'react';
import ListTodoIcon from '../../components/ListTodoIcon.tsx';
import SearchBar from '../../components/SearchBar.tsx';
import LogoAdd from '../../components/LogoAdd.tsx';

export default function Home() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="relative w-[396px] h-[260px]">
      {/* Ícono */}
      <div className="absolute top-[20px] left-[20px] w-[21px] h-[20px] flex items-center justify-center">
        <ListTodoIcon className="w-[21px] h-[20px]" />
      </div>

      {/* Texto */}
      <div className="absolute top-[22px] left-[160px] w-[72px] h-[20px] text-center font-normal text-[16px] text-[#4A4A4A] font-[Lao_Sans_Pro]">
        To Do List
      </div>

      {/* Línea superior */}
      <div className="absolute top-[60px] left-[-3px] w-[396px] border-t border-[#EFEFEF]" />

      <div className="absolute top-[80px] left-[17px] font-lato font-normal w-[315px] h-[37px] border border-[#EFEFEF] rounded-[8px]">
        <SearchBar />
      </div>

      <div className="absolute top-[86px] left-[353px] w-[20px] h-[20px]">
        <LogoAdd className="w-full h-full" />
      </div>

      <section className="absolute top-[135px] left-0 w-full px-[21px]">
        <div className="flex items-start gap-[8px]">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={e => setIsChecked(e.target.checked)}
            className="w-[16.5px] h-[16.5px] mt-[8px] accent-purple-600 cursor-pointer"
          />

          <div className="w-[20px] h-[20px] bg-[#FF0202] rounded-[4px] mt-[6px]" />

          <div className="flex-1">
            <div className="flex justify-between">
              <p
                className={`text-[14px] font-normal text-[#4A4A4A] ${
                  isChecked ? 'line-through' : ''
                }`}
              >
                Catch up on email
              </p>

              <p
                className={`text-[14px] font-normal mr-[21px] ${
                  isChecked ? 'text-[#BD8BC8]' : 'text-[#4A4A4A]'
                }`}
              >
                Due Tomorrow
              </p>
            </div>
            <p className="mt-[6px] w-[278px] text-[14px] font-normal leading-[120%] font-lato text-[#0620618A] text-opacity-54">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <p className="mt-[12px] text-[14px] font-medium leading-[120%] tracking-[-0.01em] font-[Lato]  text-[#0620618A] text-opacity-54">
              10:30 AM
            </p>
          </div>
        </div>
      </section>

      <div className="absolute top-[251px] left-[-3px] w-[396px] border-t border-[#EFEFEF]" />
    </div>
  );
}
