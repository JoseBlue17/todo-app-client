import ListIcon from '../../../../components/list-icon';
import { LoginLayout } from '../../../../pages/Login/login-layout';
import { SignupForm } from '../components/signup-form';

export function SignUpPage() {
  return (
    <LoginLayout>
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-6 bg-white md:self-center">
        <div className="flex flex-col items-center text-center">
          <ListIcon className="w-[68.61px] h-[65px]" />
          <h2 className="text-xl font-semibold text-[#4A4A4A] mt-[35px] mb-[10px]">Crear cuenta</h2>
          <p className="text-sm text-[#64748B] mb-[25px]">Task Management App</p>
        </div>
        <SignupForm />
      </div>
    </LoginLayout>
  );
}
