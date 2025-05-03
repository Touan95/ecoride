import { useMutation, UseMutationOptions } from 'react-query';
import { ErrorResponse } from '../lib/types';
import { ContactParams, contactRequest } from '../lib/contact';

export const useContactMutation = ({ onSuccess, onError }: UseMutationOptions<void, ErrorResponse, ContactParams>) => {
  return useMutation((params: ContactParams) => contactRequest(params), {
    onSuccess: (data, params, context) => {
      if (onSuccess) {
        onSuccess(data, params, context);
      }
    },
    onError
  });
};
