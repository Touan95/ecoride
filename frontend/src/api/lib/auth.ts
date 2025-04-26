import axiosInstance from '@/configs/axios';
import { LoggedUser, User } from '@/interfaces/user';
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
  isStaff: boolean;
};

export type ChangePasswordParams = {
  oldPassword: string;
  newPassword: string;
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

export const registerRequest = async ({ email, password, username, isStaff }: RegisterParams): Promise<User> => {
  const { data } = await axiosInstance.post('/register', {
    email,
    password,
    username,
    isStaff
  });

  return data;
};

export const getMe = async (): Promise<LoggedUser> => {
  const { data } = await axiosInstance.get('/user/me/');
  return data;
};

export const testMailRequest = async (): Promise<void> => {
  const { data } = await axiosInstance.post('/testmail');

  return data;
};

export const changePasswordRequest = async ({ oldPassword, newPassword }: ChangePasswordParams): Promise<void> => {
  const { data } = await axiosInstance.patch('/user/password', {
    oldPassword,
    newPassword
  });

  return data;
};
