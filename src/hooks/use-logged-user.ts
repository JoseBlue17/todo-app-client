import { useQueryClient } from '@tanstack/react-query';
import type { IUser } from '../interfaces';

export default function useLoggedUser() {
  const queryClient = useQueryClient();

  const updateLoggedUser = (user: IUser | null) => {
    queryClient.setQueryData(['USER_PROFILE'], user);
  };

  const updateToken = (token: string | null) => {
    if (token) {
      localStorage.setItem('jwtToken', token);
    } else {
      localStorage.removeItem('jwtToken');
    }
  };

  return { updateLoggedUser, updateToken };
}
