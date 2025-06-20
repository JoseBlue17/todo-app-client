import { type ReactNode } from 'react';
import elementos from '../../assets/images/image_login.png';

interface LoginLayoutProps {
  children: ReactNode;
}

export function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <section className="min-h-screen flex overflow-hidden">
      <div className="hidden md:flex md:w-1/2 min-h-screen relative overflow-hidden bg-gradient-to-r from-[#F8BBC2] to-[#A074CA]">
        <div className="absolute inset-0">
          <img
            src={elementos}
            alt="Login Visual"
            className="w-full h-full object-cover object-bottom"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 text-center text-white font-LexendDeca font-semibold p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Task Management &<br />
            To-Do List
          </h2>
          <p className="text-sm leading-snug font-normal font-LexendDeca">
            This productive tool is designed to help
            <br />
            you better manage your task
            <br />
            project-wise conveniently!
          </p>
        </div>
      </div>

      {children}
    </section>
  );
}
