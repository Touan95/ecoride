import axiosInstance from '@/configs/axios';
import { BaseAPIResponse } from './types';
import { User, UserType } from '@/interfaces/user';
import { Car, Energy } from '@/interfaces/car';

export interface ChangeUserTypeParams {
  userId: string;
  userType: UserType;
}

export interface ChangeDriverPreferencesParams {
  userId: string;
  acceptsPets: boolean;
  acceptsSmoking: boolean;
  customRules: string[];
}

export interface AddCarParams {
  userId: string;
  plateNumber: string;
  registrationDate: Date;
  color: string;
  brand: string;
  model: string;
  seats: number;
  energy: Energy;
}

interface GetOneUserResponse extends User {
  cars: Car[];
}

export const changeUserTypeRequest = async (params: ChangeUserTypeParams): Promise<BaseAPIResponse> => {
  const { userId, ...bodyParams } = params;
  const { data } = await axiosInstance.patch(`/user/${userId}/type`, bodyParams);
  return data;
};

export const changeDriverPreferencesRequest = async (params: ChangeDriverPreferencesParams): Promise<BaseAPIResponse> => {
  const { userId, ...bodyParams } = params;
  const { data } = await axiosInstance.patch(`/user/${userId}/driver`, bodyParams);
  return data;
};

export const getOneUserRequest = async (userId: string): Promise<GetOneUserResponse> => {
  const { data } = await axiosInstance.get(`/user/${userId}`);
  return data;
};

export const addCarRequest = async (params: AddCarParams): Promise<BaseAPIResponse> => {
  const { userId, ...bodyParams } = params;
  const { data } = await axiosInstance.post(`/user/${userId}/car`, bodyParams);
  return data;
};
