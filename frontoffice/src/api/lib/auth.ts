import axiosInstance from '@/configs/axios';
import { User } from '@/interfaces/user';
import { setCookie } from '@/utils/cookie';

export type TokenResponse = {
  accessToken: string;
  refreshToken: string;
};

export type LoginParams = {
  email: string;
  password: string;
};

export type RegisterParams = {
  username: string;
  email: string;
  password: string;
};

export const loginRequest = async ({ email, password }: LoginParams): Promise<TokenResponse> => {
  const { data } = await axiosInstance.post('/login', {
    email,
    password
  });

  setCookie('accessToken', data.accessToken);
  setCookie('refreshToken', data.refreshToken);

  return data;
};

export const registerRequest = async ({ email, password, username }: RegisterParams): Promise<User> => {
  const { data } = await axiosInstance.post('/register', {
    email,
    password,
    username
  });

  return data;
};