import { useMutation, UseMutationOptions, useQuery, useQueryClient } from 'react-query';

import { ErrorResponse } from '../lib/types';
import { getMe, LoginParams, loginRequest, RegisterParams, registerRequest, testMailRequest, TokenResponse } from '../lib/auth';
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
  return useMutation((params) => registerRequest(params), {
    onSuccess: (data, params, context) => {
      if (onSuccess) {
        onSuccess(data, params, context);
      }
    },
    onError
  });
};

export const useGetMe = ({ disabled, refetchInterval }: { disabled?: boolean; refetchInterval?: number }) => {
  return useQuery('me', getMe, { enabled: !disabled, refetchInterval });
};

export const useTestMail = () => {
  return useMutation(() => testMailRequest(), {});
};
