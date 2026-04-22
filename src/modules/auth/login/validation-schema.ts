import { object, string } from 'yup';

export const validationSchema = object({
  email: string().email('Enter a valid email address').required('Email is required'),
  password: string().required('Password is required'),
});
