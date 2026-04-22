import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useShowError } from '../../../../hooks/use-show-error';
import { useShowSuccess } from '../../../../hooks/use-show-success';
import type { AxiosResponseError } from '../../../../hooks/use-show-error';
import { signupService } from '../services/signup.service';
import type { ISignupBody } from '../signup.interface';

export function useSignup() {
  const navigate = useNavigate();
  const { showError } = useShowError();
  const { showSuccess } = useShowSuccess();

  return useMutation<void, AxiosResponseError, ISignupBody>({
    mutationKey: ['SIGNUP'],
    mutationFn: body => signupService.signup(body),
    onSuccess: () => {
      showSuccess({ title: 'Registro exitoso', description: 'Por favor inicia sesión.' });
      navigate('/login', { replace: true });
    },
    onError: error => {
      showError(error);
    },
  });
}
