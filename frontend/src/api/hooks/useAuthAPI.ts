import { useMutation, UseMutationOptions, useQuery, useQueryClient } from 'react-query';

import { ErrorResponse } from '../lib/types';
import {
  ChangePasswordParams,
  changePasswordRequest,
  getMe,
  LoginParams,
  loginRequest,
  RegisterParams,
  registerRequest,
  testMailRequest,
  TokenResponse
} from '../lib/auth';
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

export const useGetMe = ({
  disabled,
  refetchInterval,
  onSettled
}: {
  disabled?: boolean;
  refetchInterval?: number;
  onSettled?: () => void;
}) => {
  return useQuery('me', getMe, {
    enabled: !disabled,
    refetchInterval,
    onSettled: () => {
      if (onSettled) {
        onSettled();
      }
    }
  });
};

export const useTestMail = () => {
  return useMutation(() => testMailRequest(), {});
};

export const useChangePasswordMutation = ({ onSuccess, onError }: UseMutationOptions<void, ErrorResponse, ChangePasswordParams>) => {
  return useMutation((params) => changePasswordRequest(params), {
    onSuccess,
    onError
  });
};
