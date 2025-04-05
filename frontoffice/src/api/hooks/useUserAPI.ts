import { useMutation, UseMutationOptions, useQuery, useQueryClient } from 'react-query';
import {
  AddCarParams,
  addCarRequest,
  AddReviewParams,
  addReviewRequest,
  AddRideParams,
  addRideRequest,
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
  getDriverRidesRequest,
  getOneUserRequest,
  getPassengerRidesRequest,
  GetReviewParams,
  getRideDetailsRequest,
  getRideReviewsRequest,
  GetSearchedRidesParams,
  getSearchedRidesRequest,
  PutCarParams,
  putCarRequest,
  startRideRequest
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

export const useRideCar = ({ onSuccess, onError }: UseMutationOptions<BaseAPIResponse, ErrorResponse, AddRideParams>) => {
  return useMutation((params) => addRideRequest(params), {
    onSuccess: (data, params, context) => {
      if (onSuccess) {
        onSuccess(data, params, context);
      }
    },
    onError
  });
};

export const useGetSearchedRides = ({ ...params }: GetSearchedRidesParams) => {
  return useQuery(['searched_rides', params], () => getSearchedRidesRequest(params));
};

export const useGetRideDetails = (rideId?: string) => {
  return useQuery(['ride', rideId], () => getRideDetailsRequest(rideId ?? ''), { enabled: !!rideId });
};

export const useBookRide = ({ onSuccess, onError }: UseMutationOptions<BaseAPIResponse, ErrorResponse, string>) => {
  const queryClient = useQueryClient();
  return useMutation((rideId) => bookRideRequest(rideId), {
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
