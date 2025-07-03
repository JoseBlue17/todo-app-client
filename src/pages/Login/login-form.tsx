import ListIcon from '../../components/list-icon.tsx';
import { useLogin } from './use-login.tsx';

export function LoginForm() {
  const { email, setEmail, password, setPassword, handleSubmit, loginError, passwordErrors } =
    useLogin();

  const inputWrapperClasses = 'w-full max-w-xs mb-4';
  const inputClasses =
    'w-full px-3 py-2 border border-gray-500 rounded focus:outline-none placeholder:text-gray-500 placeholder:text-sm placeholder:font-semibold placeholder:font-lato';

  return (
    <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-6 bg-white md:self-center">
      <div className="flex flex-col items-center text-center">
        <ListIcon className="w-[68.61px] h-[65px]" />
        <h2 className="text-xl font-semibold text-[#4A4A4A] mt-[35px] mb-[35px]">To Do List</h2>
        <p className="text-sm text-[#64748B]">Task Management App</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg w-full max-w-sm flex flex-col items-center"
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
            onChange={e => setPassword(e.target.value)}
            className={inputClasses}
            placeholder="Password"
          />
          {(passwordErrors.length > 0 || loginError) && (
            <ul className="text-red-500 text-xs mt-1 list-disc pl-5">
              {passwordErrors.map((passwordError, index) => (
                <li key={index}>{passwordError}</li>
              ))}
              {loginError && (
                <li className="font-bold">
                  <span>Email or password incorrect</span>
                </li>
              )}
            </ul>
          )}
        </div>
        <div className="flex justify-center text-xs w-full max-w-xs font-bold text-[#12223A] mb-[25px]">
          Forgot your password?
        </div>
        <button
          type="submit"
          className="w-full text-sm max-w-xs h-12 shadow-[0px_7px_20px_0px_#CBD6FF] bg-[#A275CA] text-white py-2 px-4 rounded-xl hover:bg-[#8e5bb1] transition"
        >
          Log in
        </button>
        <div className="flex justify-center text-xs font-bold max-w-xs mt-[93px] text-gray-700">
          Not registered yet? Create an account
        </div>
      </form>
    </div>
  );
}
