import { object, ref, string } from 'yup';

export const validationSchema = object({
  firstName: string().required('First name is required'),
  lastName: string().required('Last name is required'),
  email: string().email('Enter a valid email address').required('Email is required'),
  password: string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/\d/, 'Password must contain at least one number'),
  confirmPassword: string()
    .required('Please confirm your password')
    .oneOf([ref('password')], 'The two passwords do not match'),
});
