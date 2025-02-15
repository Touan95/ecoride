import { useMutation, UseMutationOptions, useQueryClient } from 'react-query';

import { ErrorResponse } from '../lib/types';
import { LoginParams, loginRequest, RegisterParams, registerRequest, TokenResponse } from '../lib/auth';
import { User } from '@/interfaces/user';

export const useLoginMutation = ({ onSuccess, onError }: UseMutationOptions<TokenResponse, ErrorResponse, LoginParams>) => {
  const queryClient = useQueryClient();
  return useMutation((params) => loginRequest(params), {
    onSuccess: (data, params, context) => {
      queryClient.removeQueries();

      if (onSuccess) {
        onSuccess(data, params, context);
      }
    },
    onError
  });
};

export const useRegisterMutation = ({ onSuccess, onError }: UseMutationOptions<User, ErrorResponse, RegisterParams>) => {
  const queryClient = useQueryClient();
  return useMutation((params) => registerRequest(params), {
    onSuccess: (data, params, context) => {
      if (onSuccess) {
        onSuccess(data, params, context);
      }
    },
    onError
  });
};
