import axiosInstance from "@/configs/axios";
import { BaseAPIResponse } from "./types";
import { UserType } from "@/interfaces/user";

export interface ChangeUserTypeParams {
  userId: string;
  userType: UserType
}

export const changeUserTypeRequest = async (params: ChangeUserTypeParams): Promise<BaseAPIResponse> => {
  const { userId, ...bodyParams } = params;
  const { data } = await axiosInstance.patch(`/user/${userId}/type`, bodyParams);
  return data;
};  