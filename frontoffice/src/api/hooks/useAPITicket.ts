import { useMutation } from 'react-query';

import { CreateTicketParams, createTicketRequest, CreateTicketResponse } from '../lib/ticket';
import { ErrorResponse } from '../lib/types';

export const useCreateTicketMutation = ({
  onSuccess,
  onError
}: {
  onSuccess?: (data: CreateTicketResponse) => void;
  onError?: (error: ErrorResponse) => void;
}) => {
  return useMutation<CreateTicketResponse, ErrorResponse, CreateTicketParams>(createTicketRequest, {
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: (error: ErrorResponse) => {
      if (onError) {
        onError(error);
      }
    }
  });
};
