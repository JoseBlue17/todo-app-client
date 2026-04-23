import { Http } from '../../../../config/http';
import type { ISignupBody } from '../signup.interface';

export const signupService = {
  signup: async (body: ISignupBody): Promise<void> => {
    await Http.post('/users/sign-up', body);
  },
};
