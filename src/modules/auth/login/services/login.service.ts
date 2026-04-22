import axiosInstance from '../../../../services/axios-config';
import type { ILoginValues } from '../login.interface';

const ENDPOINT = '/users';

export const loginService = {
  login: async (body: ILoginValues) => {
    const response = await axiosInstance.post(`${ENDPOINT}/login`, body);
    return response.data;
  },
};
