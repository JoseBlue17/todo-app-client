import { object, ref, string } from 'yup';

export const validationSchema = object({
  email: string().email('Enter a valid email address').required('Email is required'),
  password: string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/\W/, 'Password must contain at least one special character'),
  confirmPassword: string()
    .required('Please confirm your password')
    .oneOf([ref('password')], 'The two passwords do not match'),
});
