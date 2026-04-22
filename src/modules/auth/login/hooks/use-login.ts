import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useShowError } from '../../../../hooks/use-show-error';
import { useShowSuccess } from '../../../../hooks/use-show-success';
import type { AxiosResponseError } from '../../../../hooks/use-show-error';
import { loginService } from '../services/login.service';
import type { ILoginValues } from '../login.interface';

export function useLogin() {
  const navigate = useNavigate();
  const { showError } = useShowError();
  const { showSuccess } = useShowSuccess();

  return useMutation<{ token: string }, AxiosResponseError, ILoginValues>({
    mutationKey: ['LOGIN'],
    mutationFn: body => loginService.login(body),
    onSuccess: ({ token }) => {
      localStorage.setItem('jwtToken', token);
      showSuccess({ title: 'Welcome back!', description: 'Login successful.' });
      navigate('/home', { replace: true });
    },
    onError: error => {
      showError(error);
    },
  });
}
