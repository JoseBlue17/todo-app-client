import axiosInstance from '../../../../services/axios-config';
import type { ISignupBody } from '../signup.interface';

const ENDPOINT = '/users';

export const signupService = {
  signup: async (body: ISignupBody): Promise<void> => {
    await axiosInstance.post(`${ENDPOINT}/register`, body);
  },
};
