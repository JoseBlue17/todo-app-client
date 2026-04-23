import { useMutation } from '@tanstack/react-query';
import { Http } from '@/config/http';
import { useAuth } from '@/hooks';
import { useShowError } from '@/hooks';
import type { AxiosResponseError } from '@/hooks';
import type { ILoginInput, ILoginResponse } from '../login.interface';

export function useLogin() {
  const { onLogin } = useAuth();
  const { showError } = useShowError();

  const { mutate: login, isPending: isLoading } = useMutation<
    ILoginResponse,
    AxiosResponseError,
    ILoginInput
  >({
    mutationKey: ['LOGIN'],
    mutationFn: credentials =>
      Http.post<ILoginResponse>('/users/login', credentials).then(({ data }) => data),
    onSuccess: data => {
      onLogin({ token: data.token, user: data.user });
    },
    onError: error => showError(error),
  });

  return { login, isLoading };
}
