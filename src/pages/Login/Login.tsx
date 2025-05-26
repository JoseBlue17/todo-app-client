import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('El email no es válido.');
      return;
    }

    setError('');
    navigate('/home');
  };

  //SVG Icono Todo List
  const group = (
    <svg width="71" height="67" viewBox="0 0 71 67" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.6667 1H51.5556V11.8333H22.6667V1ZM22.6667 28.0833H58.7778V38.9167H22.6667V28.0833ZM22.6667 55.1667H69.6111V66H22.6667V55.1667Z" fill="#C18EC7" stroke="#C18EC7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.61111 10.0277C6.60547 10.0277 8.22222 8.41099 8.22222 6.41662C8.22222 4.42226 6.60547 2.80551 4.61111 2.80551C2.61675 2.80551 1 4.42226 1 6.41662C1 8.41099 2.61675 10.0277 4.61111 10.0277Z" fill="#C18EC7" stroke="#C18EC7" strokeWidth="2"/>
      <path d="M4.61111 37.1111C6.60547 37.1111 8.22222 35.4944 8.22222 33.5C8.22222 31.5057 6.60547 29.8889 4.61111 29.8889C2.61675 29.8889 1 31.5057 1 33.5C1 35.4944 2.61675 37.1111 4.61111 37.1111Z" fill="#C18EC7" stroke="#C18EC7" strokeWidth="2"/>
      <path d="M4.61111 64.1945C6.60547 64.1945 8.22222 62.5777 8.22222 60.5834C8.22222 58.589 6.60547 56.9723 4.61111 56.9723C2.61675 56.9723 1 58.589 1 60.5834C1 62.5777 2.61675 64.1945 4.61111 64.1945Z" fill="#C18EC7" stroke="#C18EC7" strokeWidth="2"/>
    </svg>
  );

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-white font-lato px-4 sm:px-6">
      <div className="flex flex-col mt-[60px] sm:mt-[191px] items-center mb-8 text-center">
        {group}
        <h2 className="text-xl font-semibold text-[#4A4A4A] mt-[35px]">To Do List</h2>
        <p className="text-sm text-[#64748B]">Task Management App</p>      
      </div>
        
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg w-full max-w-sm flex flex-col items-center"> {/* Estilos del texto de eroor*/}
      {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}


{/* Email */}
<div className="relative w-[296px] h-[32px] mb-4">
  <input
    id="email"
    type="email"
    value={email}
    onChange={e => setEmail(e.target.value)}
    className="peer w-[296px] h-[32px] px-3 py-[8px] border border-[#626262] font-montserrat rounded-[4px] focus:outline-none focus:ring-2 placeholder-transparent"
    placeholder="Email"
  />
  <label
    htmlFor="email"
    className="absolute w-[41px] h-[17px] left-[24px] top-[8px] text-[14px] font-semibold text-[#626262] font-montserrat transition-all
      peer-placeholder-shown:opacity-100 peer-focus:top-[2px] peer-focus:text-[12px] peer-not-placeholder-shown:opacity-0"
  >
    Email
  </label>
</div>

{/* Password */}
<div className="relative w-[296px] h-[32px] mb-4">
  <input
    id="password"
    type="password"
    value={password}
    onChange={e => setPassword(e.target.value)}
    className="peer w-[296px] h-[32px] px-3 py-[8px] border border-[#757897] rounded-[4px] font-lato focus:outline-none focus:ring-2 placeholder-transparent"
    placeholder="Password"
  />
  <label
    htmlFor="password"
    className="absolute w-[60px] h-[17px] left-[20px] top-[7.5px] text-[14px] font-semibold text-[#626262] font-lato transition-all
      peer-placeholder-shown:opacity-100 peer-focus:top-[2px] peer-focus:text-[12px] peer-not-placeholder-shown:opacity-0 box-border"
  >
    Password
  </label>
</div>




        <div className="flex justify-center w-full max-w-[296px] font-bold text-sm text-[#12223A] mb-3">
          Forgot your password?
        </div>

        <button
          type="submit"
          className="w-full max-w-[296px] h-[52px] shadow-[0px_10px_20px_0px_#CBD6FF] bg-[#A275CA] text-white py-2 px-4 mt-[25px] rounded-[10px] hover:bg-[#8e5bb1] transition"
        >
          Log in
        </button>

        <div className="flex justify-center text-[12px] font-bold max-w-[203px] mt-[93px] h-3.5 text-sm text-[#334155] mb-[220px]">
          Not registered yet? Create an account
        </div>
      </form>
    </section>
  );
}
