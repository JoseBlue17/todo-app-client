import ListIcon from '../../components/ListIcon.tsx';
import { useLogin } from './useLogin.tsx';
import elementos from '../../assets/images/image_login.png';

export default function Login() {
  const { email, setEmail, password, setPassword, handleSubmit, error } = useLogin();

  const inputWrapperClasses = 'w-full max-w-xs mb-4';
  const inputClasses =
    'w-full px-3 py-2 border border-gray-500 rounded focus:outline-none placeholder:text-gray-500 placeholder:text-sm placeholder:font-semibold placeholder:font-lato';

  return (
    <section className="min-h-screen flex font-lato overflow-hidden">
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
            Task Management &<br/>
            To-Do List
          </h2>
          <p className="text-sm leading-snug font-normal font-LexendDeca">
            This productive tool is designed to help
            <br/>
            you better manage your task
            <br/>
            project-wise conveniently!
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-6 bg-white md:self-center">
        <div className="flex flex-col items-center text-center">
          <ListIcon className="w-[68.61px] h-[65px]" />
          <h2 className="text-xl text-base font-semibold text-[#4A4A4A] mt-[35px] mb-[35px]">To Do List</h2>
          <p className="text-sm text-[#64748B]">Task Management App</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg w-full max-w-sm flex flex-col items-center"
        >
          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
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
          </div>
          <div className="flex justify-center text-xs w-full max-w-xs font-bold text-sm text-[#12223A] mb-[25px]">
            Forgot your password?
          </div>
          <button
            type="submit"
            className="w-full text-sm max-w-xs h-12 shadow-[0px_10px_20px_0px_#CBD6FF] bg-[#A275CA] text-white py-2 px-4 rounded-xl hover:bg-[#8e5bb1] transition"
          >
            Log in
          </button>
          <div className="flex justify-center text-xs font-bold max-w-xs mt-[93px] text-gray-700">
            Not registered yet? Create an account
          </div>
        </form>
      </div>
    </section>
  );
}
