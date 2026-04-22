import { Form, Formik } from 'formik';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import ListIcon from '../../../../components/list-icon';
import { useLogin } from '../hooks/use-login';
import { validationSchema } from '../validation-schema';
import type { ILoginValues } from '../login.interface';

export function LoginForm() {
  const navigate = useNavigate();
  const { mutate: login, isPending: isLoading } = useLogin();

  const inputWrapperClasses = 'w-full max-w-xs mb-4';
  const inputClasses =
    'w-full px-3 py-2 border border-gray-500 rounded focus:outline-none placeholder:text-gray-500 placeholder:text-sm placeholder:font-semibold placeholder:font-lato';
  const errorClasses = 'text-red-500 text-xs mt-1';

  const initialValues: ILoginValues = { email: '', password: '' };

  const onSubmit = (values: ILoginValues) => {
    login({ email: values.email.trim().toLowerCase(), password: values.password });
  };

  return (
    <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-6 bg-white md:self-center">
      <div className="flex flex-col items-center text-center">
        <ListIcon className="w-[68.61px] h-[65px]" />
        <h2 className="text-xl font-semibold text-[#4A4A4A] mt-[35px] mb-[35px]">To Do List</h2>
        <p className="text-sm text-[#64748B]">Task Management App</p>
      </div>

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ getFieldProps, errors, touched }) => (
          <Form className="bg-white p-8 rounded-lg w-full max-w-sm flex flex-col items-center">
            <div className={inputWrapperClasses}>
              <input
                type="email"
                placeholder="Email"
                disabled={isLoading}
                className={inputClasses}
                {...getFieldProps('email')}
              />
              {touched.email && errors.email && <p className={errorClasses}>{errors.email}</p>}
            </div>

            <div className={inputWrapperClasses}>
              <input
                type="password"
                placeholder="Password"
                disabled={isLoading}
                className={inputClasses}
                {...getFieldProps('password')}
              />
              {touched.password && errors.password && (
                <p className={errorClasses}>{errors.password}</p>
              )}
            </div>

            <div className="flex justify-center text-xs w-full max-w-xs font-bold text-[#12223A] mb-[25px]">
              Forgot your password?
            </div>

            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              className="w-full max-w-xs text-sm h-10! shadow-[0px_7px_20px_0px_#CBD6FF] bg-[#A275CA]! border-[#A275CA]! hover:bg-[#8e5bb1]! rounded-xl mt-2"
            >
              Log in
            </Button>

            <div className="flex justify-center text-xs font-bold max-w-xs mt-[93px] text-gray-700">
              Not registered yet?{' '}
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="text-[#A275CA] ml-1 hover:underline"
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
