import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { loginValidationSchema } from '../validation-schema';
import { useLogin } from '../hooks/use-login';
import ListIcon from '@/components/list-icon';
import { cn } from '@/helpers';

const inputClasses =
  'w-full px-3 py-2 border border-gray-500 rounded focus:outline-none placeholder:text-gray-500 placeholder:text-sm placeholder:font-semibold placeholder:font-lato';

export function LoginForm() {
  const { login, isLoading } = useLogin();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-6 bg-white md:self-center">
      <div className="flex flex-col items-center text-center">
        <ListIcon className="w-[68.61px] h-[65px]" />
        <h2 className="text-xl font-semibold text-[#4A4A4A] mt-[35px] mb-[35px]">To Do List</h2>
        <p className="text-sm text-[#64748B]">Task Management App</p>
      </div>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginValidationSchema}
        onSubmit={values => login(values)}
      >
        {({ isSubmitting }) => (
          <Form className="bg-white p-8 rounded-lg w-full max-w-sm flex flex-col items-center">
            <div className="w-full max-w-xs mb-1">
              <Field name="email" type="email" placeholder="Email" className={inputClasses} />
              <ErrorMessage name="email" component="p" className="text-red-500 text-xs mt-1 mb-3" />
            </div>

            <div className="w-full max-w-xs mb-1">
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className={inputClasses}
              />
              <ErrorMessage
                name="password"
                component="p"
                className="text-red-500 text-xs mt-1 mb-3"
              />
            </div>

            <div className="flex justify-center text-xs w-full max-w-xs font-bold text-[#12223A] mb-[25px]">
              Forgot your password?
            </div>

            <button
              type="submit"
              disabled={isLoading || isSubmitting}
              className={cn(
                'w-full text-sm max-w-xs h-12 shadow-[0px_7px_20px_0px_#CBD6FF] bg-[#A275CA] text-white py-2 px-4 rounded-xl transition',
                isLoading || isSubmitting ? 'opacity-60 cursor-not-allowed' : 'hover:bg-[#8e5bb1]',
              )}
            >
              {isLoading ? 'Ingresando...' : 'Log in'}
            </button>

            <div className="flex justify-center items-center gap-1 text-xs font-bold max-w-xs mt-[93px] text-gray-700">
              Not registered yet?
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="text-[#A275CA] hover:underline"
              >
                Create an account
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
