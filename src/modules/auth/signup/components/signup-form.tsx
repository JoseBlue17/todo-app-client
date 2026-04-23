import { Form, Formik } from 'formik';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSignup } from '../hooks/use-signup';
import { validationSchema } from '../validation-schema';
import type { ISignupValues } from '../signup.interface';

export function SignupForm() {
  const navigate = useNavigate();
  const { mutate: signup, isPending: isLoading } = useSignup();

  const inputClasses =
    'w-full px-3 py-2 border border-gray-500 rounded focus:outline-none placeholder:text-gray-500 placeholder:text-sm placeholder:font-semibold placeholder:font-lato';
  const errorClasses = 'text-red-500 text-xs mt-1';
  const wrapperClasses = 'w-full max-w-xs mb-3';

  const initialValues: ISignupValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const onSubmit = (values: ISignupValues) => {
    signup({
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim().toLowerCase(),
      password: values.password,
    });
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ getFieldProps, errors, touched }) => (
        <Form className="w-full max-w-xs flex flex-col items-center">
          <div className={wrapperClasses}>
            <input
              type="text"
              placeholder="First name"
              disabled={isLoading}
              className={inputClasses}
              {...getFieldProps('firstName')}
            />
            {touched.firstName && errors.firstName && (
              <p className={errorClasses}>{errors.firstName}</p>
            )}
          </div>

          <div className={wrapperClasses}>
            <input
              type="text"
              placeholder="Last name"
              disabled={isLoading}
              className={inputClasses}
              {...getFieldProps('lastName')}
            />
            {touched.lastName && errors.lastName && (
              <p className={errorClasses}>{errors.lastName}</p>
            )}
          </div>

          <div className={wrapperClasses}>
            <input
              type="email"
              placeholder="Email"
              disabled={isLoading}
              className={inputClasses}
              {...getFieldProps('email')}
            />
            {touched.email && errors.email && <p className={errorClasses}>{errors.email}</p>}
          </div>

          <div className={wrapperClasses}>
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

          <div className={wrapperClasses}>
            <input
              type="password"
              placeholder="Confirm Password"
              disabled={isLoading}
              className={inputClasses}
              {...getFieldProps('confirmPassword')}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <p className={errorClasses}>{errors.confirmPassword}</p>
            )}
          </div>

          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            className="w-full max-w-xs text-sm h-12! shadow-[0px_7px_20px_0px_#CBD6FF] bg-[#A275CA]! border-[#A275CA]! hover:bg-[#8e5bb1]! rounded-xl mt-2"
          >
            Create account
          </Button>

          <div className="flex justify-center text-xs font-bold max-w-xs mt-[40px] text-gray-700">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-[#A275CA] ml-1 hover:underline"
            >
              Log in here
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
