import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { ChangeUserTypeParams, changeUserTypeRequest } from "../lib/user";
import { BaseAPIResponse, ErrorResponse } from "../lib/types";

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
