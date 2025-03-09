import { useMutation, UseMutationOptions, useQuery, useQueryClient } from 'react-query';
import {
  AddCarParams,
  addCarRequest,
  ChangeDriverPreferencesParams,
  changeDriverPreferencesRequest,
  ChangeUserTypeParams,
  changeUserTypeRequest,
  DeleteCarParams,
  deleteCarRequest,
  getOneUserRequest,
  PutCarParams,
  putCarRequest
} from '../lib/user';
import { BaseAPIResponse, ErrorResponse } from '../lib/types';

export const useChangeUserTypeMutation = ({ onSuccess }: UseMutationOptions<BaseAPIResponse, ErrorResponse, ChangeUserTypeParams>) => {
  const queryClient = useQueryClient();
  return useMutation<BaseAPIResponse, ErrorResponse, ChangeUserTypeParams>(changeUserTypeRequest, {
    onSuccess: (data, params, context) => {
      queryClient.invalidateQueries({ queryKey: ['user', params.userId] });
      if (onSuccess) {
        onSuccess(data, params, context);
      }
    }
  });
};

export const useChangeDriverPreferencesMutation = ({
  onSuccess
}: UseMutationOptions<BaseAPIResponse, ErrorResponse, ChangeDriverPreferencesParams>) => {
  const queryClient = useQueryClient();
  return useMutation<BaseAPIResponse, ErrorResponse, ChangeDriverPreferencesParams>(changeDriverPreferencesRequest, {
    onSuccess: (data, params, context) => {
      queryClient.invalidateQueries({ queryKey: ['user', params.userId] });
      if (onSuccess) {
        onSuccess(data, params, context);
      }
    }
  });
};

export const useGetOneUser = (userId?: string) => {
  return useQuery(['user', userId], () => getOneUserRequest(userId ?? ''), { enabled: !!userId });
};

export const useAddCar = ({ onSuccess, onError }: UseMutationOptions<BaseAPIResponse, ErrorResponse, AddCarParams>) => {
  return useMutation((params) => addCarRequest(params), {
    onSuccess: (data, params, context) => {
      if (onSuccess) {
        onSuccess(data, params, context);
      }
    },
    onError
  });
};

export const usePutCar = ({ onSuccess, onError }: UseMutationOptions<BaseAPIResponse, ErrorResponse, PutCarParams>) => {
  return useMutation((params) => putCarRequest(params), {
    onSuccess: (data, params, context) => {
      if (onSuccess) {
        onSuccess(data, params, context);
      }
    },
    onError
  });
};

export const useDeleteCarMutation = ({ onSuccess, onError }: UseMutationOptions<BaseAPIResponse, ErrorResponse, DeleteCarParams>) => {
  const queryClient = useQueryClient();
  return useMutation<BaseAPIResponse, ErrorResponse, DeleteCarParams>(deleteCarRequest, {
    onSuccess: (data, params, context) => {
      queryClient.invalidateQueries('cars');
      queryClient.invalidateQueries({ queryKey: ['car', params.carId] });
      if (onSuccess) {
        onSuccess(data, params, context);
      }
    },
    onError
  });
};
