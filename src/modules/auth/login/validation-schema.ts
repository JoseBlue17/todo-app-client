import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
  email: Yup.string().email('Correo inválido').required('El correo es requerido'),
  password: Yup.string()
    .min(6, 'Mínimo 6 caracteres')
    .matches(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .matches(/[a-z]/, 'Debe contener al menos una minúscula')
    .matches(/\d/, 'Debe contener al menos un número')
    .required('La contraseña es requerida'),
});
