import ListIcon from '../../components/ListIcon.tsx';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validatePassword = (password: string) => {
    if (password.length < 6) return 'Debe tener al menos 6 caracteres.';
    if (!/[A-Z]/.test(password)) return 'Debe contener al menos una mayúscula.';
    if (!/[a-z]/.test(password)) return 'Debe contener al menos una minúscula.';
    if (!/\d/.test(password)) return 'Debe contener al menos un número.';
    return '';
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setError(validatePassword(newPassword));
  };

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

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    setError('');
    navigate('/home');
  };

  const inputWrapperClasses = 'w-[296px] h-[32px] mb-4';
  const inputClasses =
    'w-full h-full px-3 py-[8px] border border-[#626262] rounded-[4px] focus:outline-none focus:ring-2 placeholder:text-[#626262] placeholder:text-[14px] placeholder:font-semibold placeholder:font-lato';

  return (
    <section className="min-h-screen flex font-lato">
      <div className="hidden md:flex flex-col justify-between items-center w-[901px] h-[647apx] bg-[radial-gradient(circle,_#F8BBC2,_#A074CA)] p-6">
        <div className="flex-1 flex items-center justify-center">
          <img
            src="../public/images/image_login.png"
            alt="Login Visual"
            className="flex w-[700px] h-[700px] top-[253px] left-[253px] object-contain"
          />
        </div>
        <div className="text-center text-white font-LexendDeca font-semibold">
          <h2 className="text-[24px] font-semibold mb-6">
            Task Management &<br />
            To-Do List
          </h2>
          <p className="text-[14px] leading-snug font-normal mb-[45px] font-LexendDeca">
            This productive tool is designed to help
            <br />
            you better manage your task
            <br />
            project-wise conveniently!
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-full md:flex-1 px-6 bg-white">
        <div className="flex flex-col items-center mb-8 text-center">
          <ListIcon className="w-[68px] h-[65px]" />
          <h2 className="text-xl font-semibold text-[#4A4A4A] mt-[35px]">To Do List</h2>
          <p className="text-sm text-[#64748B]">Task Management App</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg w-full max-w-sm flex flex-col items-center"
        >
          <div className={inputWrapperClasses}>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={inputClasses}
              placeholder="Email"
            />
          </div>
          <div className={inputWrapperClasses}>
            <input
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className={inputClasses}
              placeholder="Password"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <div className="flex justify-center w-full font-bold text-sm text-[#12223A] mb-3">
            Forgot your password?
          </div>
          <button
            type="submit"
            className="w-full h-[52px] shadow-[0px_10px_20px_0px_#CBD6FF] bg-[#A275CA] text-white py-2 px-4 mt-[25px] rounded-[10px] hover:bg-[#8e5bb1] transition"
          >
            Log in
          </button>
          <div className="flex justify-center text-center text-[#334155] font-bold text-[12px] font-lato w-[203px] h-[14px] mt-[93px]">
            Not registered yet? Create an account
          </div>
        </form>
      </div>
    </section>
  );
}
