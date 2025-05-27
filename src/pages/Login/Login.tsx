import ListIcon from '../../components/ListIcon.tsx';
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

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-white font-lato px-4 sm:px-6">
      <div className="flex flex-col mt-[60px] sm:mt-[191px] items-center mb-8 text-center">
        <ListIcon />
        <h2 className="text-xl font-semibold text-[#4A4A4A] mt-[35px]">To Do List</h2>
        <p className="text-sm text-[#64748B]">Task Management App</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg w-full max-w-sm flex flex-col items-center"
      >
        {' '}
        {/* Estilos del texto de eroor*/}
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        {/* Email */}
        <div className="w-[296px] h-[32px] mb-4">
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full h-full px-3 py-[8px] border border-[#626262] rounded-[4px] focus:outline-none focus:ring-2 
                  placeholder:text-[#626262] placeholder:text-[14px] placeholder:font-semibold placeholder:font-montserrat 
                    "
            placeholder="Email"
          />
        </div>
        {/* Password */}
        <div className="w-full max-w-[296px] max-h-8 mb-4 ">
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full h-full px-3 py-[8px] border border-[#757897] rounded-[4px] focus:outline-none focus:ring-2 
                  placeholder:text-[#626262] placeholder:text-[14px] placeholder:font-semibold placeholder:font-lato 
                    ]"
            placeholder="Password"
          />
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
