import { useMutation, UseMutationOptions, useQuery, useQueryClient } from 'react-query';
import {
  AddCarParams,
  addCarRequest,
  AddReviewParams,
  addReviewRequest,
  AddRideParams,
  addRideRequest,
  approveReviewRequest,
  blockUserRequest,
  bookRideRequest,
  cancelDriverRideRequest,
  cancelPassengerRideRequest,
  ChangeDriverPreferencesParams,
  changeDriverPreferencesRequest,
  ChangeUserTypeParams,
  changeUserTypeRequest,
  DeleteCarParams,
  deleteCarRequest,
  endRideRequest,
  getAllStaffRequest,
  getDriverRidesRequest,
  getOneReviewRequest,
  getOneUserRequest,
  getPassengerRidesRequest,
  GetReviewParams,
  getReviewsToApproveRequest,
  getRideDetailsRequest,
  getRideReviewsRequest,
  GetSearchedRidesParams,
  getSearchedRidesRequest,
  getStatisticsRequest,
  GetUserForAdminParams,
  getUserForAdminRequest,
  GetUserForAdminResponse,
  giveStaffAccessRequest,
  PutCarParams,
  putCarRequest,
  ResolveDisputeParams,
  resolveDisputeRequest,
  startRideRequest,
  unblockUserRequest,
  getBlockedUsersRequest,
  BookRideParams,
  acceptTermsRequest
} from '../lib/user';
import { BaseAPIResponse, ErrorResponse } from '../lib/types';

export const useChangeUserTypeMutation = ({ onSuccess }: UseMutationOptions<BaseAPIResponse, ErrorResponse, ChangeUserTypeParams>) => {
  const queryClient = useQueryClient();
  return useMutation<BaseAPIResponse, ErrorResponse, ChangeUserTypeParams>(changeUserTypeRequest, {
    onSuccess: (data, params, context) => {
      if (onSuccess) {
        onSuccess(data, params, context);
      }
      queryClient.invalidateQueries({ queryKey: ['user', params.userId] });
    }
  });
};

export const useChangeDriverPreferencesMutation = ({
  onSuccess
}: UseMutationOptions<BaseAPIResponse, ErrorResponse, ChangeDriverPreferencesParams>) => {
  const queryClient = useQueryClient();
  return useMutation<BaseAPIResponse, ErrorResponse, ChangeDriverPreferencesParams>(changeDriverPreferencesRequest, {
    onSuccess: (data, params, context) => {
      if (onSuccess) {
        onSuccess(data, params, context);
      }
      queryClient.invalidateQueries({ queryKey: ['user', params.userId] });
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
      if (onSuccess) {
        onSuccess(data, params, context);
      }
      queryClient.invalidateQueries('cars');
      queryClient.invalidateQueries({ queryKey: ['car', params.carId] });
    },
    onError
  });
};

export const useAddRide = ({ onSuccess, onError }: UseMutationOptions<BaseAPIResponse, ErrorResponse, AddRideParams>) => {
  return useMutation((params) => addRideRequest(params), {
    onSuccess: (data, params, context) => {
      if (onSuccess) {
        onSuccess(data, params, context);
      }
    },
    onError
  });
};

export const useGetSearchedRides = (params: GetSearchedRidesParams) => {
  return useQuery(['searched_rides', params], () => getSearchedRidesRequest(params), {
    enabled: !!params && Object.keys(params).length > 0
  });
};

export const useGetRideDetails = (rideId?: string) => {
  return useQuery(['ride', rideId], () => getRideDetailsRequest(rideId ?? ''), { enabled: !!rideId });
};

export const useBookRide = ({ onSuccess, onError }: UseMutationOptions<BaseAPIResponse, ErrorResponse, BookRideParams>) => {
  const queryClient = useQueryClient();
  return useMutation((params) => bookRideRequest(params), {
    onSuccess: (data, params, context) => {
      if (onSuccess) {
        onSuccess(data, params, context);
      }
      queryClient.invalidateQueries({ queryKey: ['ride', params.rideId] });
      queryClient.invalidateQueries({ queryKey: ['passenger_rides'] });
      queryClient.invalidateQueries({ queryKey: ['driver_rides'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError
  });
};

export const useGetPassengerRides = () => {
  return useQuery(['passenger_rides'], () => getPassengerRidesRequest());
};

export const useGetDriverRides = () => {
  return useQuery(['driver_rides'], () => getDriverRidesRequest());
};

export const useCancelPassengerRide = ({ onSuccess, onError }: UseMutationOptions<BaseAPIResponse, ErrorResponse, string>) => {
  const queryClient = useQueryClient();
  return useMutation((rideId) => cancelPassengerRideRequest(rideId), {
    onSuccess: (data, rideId, context) => {
      if (onSuccess) {
        onSuccess(data, rideId, context);
      }
      queryClient.invalidateQueries({ queryKey: ['ride', rideId] });
      queryClient.invalidateQueries({ queryKey: ['passenger_rides'] });
      queryClient.invalidateQueries({ queryKey: ['driver_rides'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError
  });
};

export const useCancelDriverRide = ({ onSuccess, onError }: UseMutationOptions<BaseAPIResponse, ErrorResponse, string>) => {
  const queryClient = useQueryClient();
  return useMutation((rideId) => cancelDriverRideRequest(rideId), {
    onSuccess: (data, rideId, context) => {
      if (onSuccess) {
        onSuccess(data, rideId, context);
      }
      queryClient.invalidateQueries({ queryKey: ['ride', rideId] });
      queryClient.invalidateQueries({ queryKey: ['passenger_rides'] });
      queryClient.invalidateQueries({ queryKey: ['driver_rides'] });
    },
    onError
  });
};

export const useStartRide = ({ onSuccess, onError }: UseMutationOptions<BaseAPIResponse, ErrorResponse, string>) => {
  const queryClient = useQueryClient();
  return useMutation((rideId) => startRideRequest(rideId), {
    onSuccess: (data, rideId, context) => {
      if (onSuccess) {
        onSuccess(data, rideId, context);
      }
      queryClient.invalidateQueries({ queryKey: ['ride', rideId] });
      queryClient.invalidateQueries({ queryKey: ['passenger_rides'] });
      queryClient.invalidateQueries({ queryKey: ['driver_rides'] });
    },
    onError
  });
};

export const useEndRide = ({ onSuccess, onError }: UseMutationOptions<BaseAPIResponse, ErrorResponse, string>) => {
  const queryClient = useQueryClient();
  return useMutation((rideId) => endRideRequest(rideId), {
    onSuccess: (data, rideId, context) => {
      if (onSuccess) {
        onSuccess(data, rideId, context);
      }
      queryClient.invalidateQueries({ queryKey: ['ride', rideId] });
      queryClient.invalidateQueries({ queryKey: ['passenger_rides'] });
      queryClient.invalidateQueries({ queryKey: ['driver_rides'] });
    },
    onError
  });
};

export const useAddReview = ({ onSuccess, onError }: UseMutationOptions<BaseAPIResponse, ErrorResponse, AddReviewParams>) => {
  const queryClient = useQueryClient();
  return useMutation((params) => addReviewRequest(params), {
    onSuccess: (data, params, context) => {
      if (onSuccess) {
        onSuccess(data, params, context);
      }
      queryClient.invalidateQueries({ queryKey: ['reviews', params.rideId] });
      queryClient.invalidateQueries({ queryKey: ['ride', params.rideId] });
    },
    onError
  });
};

export const useGetRideReviews = (params: GetReviewParams) => {
  return useQuery(['reviews', params.rideId], () => getRideReviewsRequest(params));
};

export const useGetReviewsToApprove = ({ disabled }: { disabled?: boolean }) => {
  return useQuery(['reviews_to_approve'], () => getReviewsToApproveRequest(), { enabled: !disabled });
};

export const useApproveReview = ({ onSuccess, onError }: UseMutationOptions<BaseAPIResponse, ErrorResponse, string>) => {
  const queryClient = useQueryClient();
  return useMutation((reviewId) => approveReviewRequest(reviewId), {
    onSuccess: (data, rideId, context) => {
      if (onSuccess) {
        onSuccess(data, rideId, context);
      }
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['reviews_to_approve'] });
    },
    onError
  });
};

export const useResolveDispute = ({ onSuccess, onError }: UseMutationOptions<BaseAPIResponse, ErrorResponse, ResolveDisputeParams>) => {
  const queryClient = useQueryClient();
  return useMutation((params) => resolveDisputeRequest(params), {
    onSuccess: (data, params, context) => {
      if (onSuccess) {
        onSuccess(data, params, context);
      }
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['reviews_to_approve'] });
    },
    onError
  });
};

export const useGetOneReview = (reviewId?: string) => {
  return useQuery(['review', reviewId], () => getOneReviewRequest(reviewId ?? ''), { enabled: !!reviewId });
};

export const useGiveStaffAccess = ({ onSuccess, onError }: UseMutationOptions<BaseAPIResponse, ErrorResponse, string>) => {
  return useMutation((email) => giveStaffAccessRequest(email), {
    onSuccess,
    onError
  });
};

export const useGetStatistics = ({ disabled }: { disabled?: boolean }) => {
  return useQuery(['statistics'], () => getStatisticsRequest(), { enabled: !disabled });
};

export const useGetAllStaff = ({ disabled }: { disabled?: boolean }) => {
  return useQuery(['all_staff'], () => getAllStaffRequest(), { enabled: !disabled });
};

export const useBlockUser = ({ onSuccess, onError }: UseMutationOptions<BaseAPIResponse, ErrorResponse, string>) => {
  const queryClient = useQueryClient();
  return useMutation((userId) => blockUserRequest(userId), {
    onSuccess: (data, params, context) => {
      if (onSuccess) {
        onSuccess(data, params, context);
      }
      queryClient.invalidateQueries({ queryKey: ['all_staff'] });
      queryClient.invalidateQueries({ queryKey: ['blocked_users'] });
    },
    onError
  });
};

export const useUnblockUser = ({ onSuccess, onError }: UseMutationOptions<BaseAPIResponse, ErrorResponse, string>) => {
  const queryClient = useQueryClient();
  return useMutation((userId) => unblockUserRequest(userId), {
    onSuccess: (data, params, context) => {
      if (onSuccess) {
        onSuccess(data, params, context);
      }
      queryClient.invalidateQueries({ queryKey: ['all_staff'] });
      queryClient.invalidateQueries({ queryKey: ['blocked_users'] });
    },
    onError
  });
};

export const useGetBlockedUsers = ({ disabled }: { disabled?: boolean }) => {
  return useQuery(['blocked_users'], () => getBlockedUsersRequest(), {
    enabled: !disabled
  });
};

export const useGetUserForAdmin = (
  params: GetUserForAdminParams,
  { onSuccess }: { onSuccess?: (data: GetUserForAdminResponse) => void }
) => {
  return useQuery(['user_for_admin', params], () => getUserForAdminRequest(params), {
    enabled: false,
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess(data);
      }
    }
  });
};

export const useAcceptTerms = ({ onSuccess }: UseMutationOptions<BaseAPIResponse, ErrorResponse, boolean>) => {
  return useMutation<BaseAPIResponse, ErrorResponse, boolean>(acceptTermsRequest, {
    onSuccess: (data, params, context) => {
      if (onSuccess) {
        onSuccess(data, params, context);
      }
    }
  });
};
