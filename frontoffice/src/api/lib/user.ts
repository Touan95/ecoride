import axiosInstance from "@/configs/axios";
import { BaseAPIResponse } from "./types";
import { User, UserType } from "@/interfaces/user";

export interface ChangeUserTypeParams {
  userId: string;
  userType: UserType
}

export interface ChangeDriverPreferencesParams {
  userId: string;
  acceptsPets: boolean
  acceptsSmoking: boolean
  customRules: string[]
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

export const getOneUserRequest = async (userId: string): Promise<User> => {
  const { data } = await axiosInstance.get(`/user/${userId}`);
  return data;
};
