import axiosInstance from '@/configs/axios';
import { BaseAPIResponse } from './types';
import { User, UserType } from '@/interfaces/user';
import { Car, Energy } from '@/interfaces/car';
import { DailyStatistics, DriverRide, PublicRideDetails, SearchedRide } from '@/interfaces/ride';
import { PassengerRide } from '@/interfaces/ridePassenger';
import { Review } from '@/interfaces/review';

export interface ChangeUserTypeParams {
  userId: string;
  userType: UserType;
}

export interface ChangeDriverPreferencesParams {
  userId: string;
  acceptsPets: boolean;
  acceptsSmoking: boolean;
  customRules: string[];
}

export interface AddCarParams {
  userId: string;
  plateNumber: string;
  registrationDate: Date;
  color: string;
  brand: string;
  model: string;
  seats: number;
  energy: Energy;
}

export interface PutCarParams extends AddCarParams {
  carId: string;
}

export interface DeleteCarParams {
  userId: string;
  carId: string;
}

export interface AddRideParams {
  userId: string;
  departureLocation: RideLocation;
  arrivalLocation: RideLocation;
  carId: string;
  price: number;
  arrivalDate: Date;
  departureDate: Date;
}

interface GetOneUserResponse extends User {
  cars: Car[];
}

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface RideLocation {
  address: string | null;
  postalCode: string | null;
  city: string | null;
  coordinate: Coordinate;
}

export interface GetSearchedRidesParams {
  departureLatitude?: number;
  departureLongitude?: number;
  arrivalLatitude?: number;
  arrivalLongitude?: number;
  departureDate?: Date;
  statuses?: RideStatus[];
  onlyAvailable?: boolean;
  onlyInTheFuture?: boolean;
}

export enum RideStatus {
  UPCOMING = 'upcoming',
  ONGOING = 'ongoing',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

interface GetSearchedRidesResponse {
  rides: SearchedRide[];
  fallbackRide?: SearchedRide;
}

export interface AddReviewParams {
  rideId: string;
  rating: number;
  comment: string;
  dispute: boolean;
}
export interface GetReviewParams {
  rideId: string;
  approvedOnly?: boolean;
}

interface GetRideReviewsResponse {
  reviews: Review[];
  allReviewerIds: string[];
}

interface GetReviewsToApproveResponse {
  reviews: Review[];
}
interface GetStatisticsResponse {
  dailyStatistics: DailyStatistics[];
  totalCredits: number;
  totalRides: number;
}

export interface ResolveDisputeParams {
  reviewId: string;
  approveReview: boolean;
  refundPassenger: boolean;
}

export interface GetAllStaffResponse {
  allStaff: User[];
}

export interface GetUserForAdminParams {
  username?: string;
  email?: string;
  staffOnly?: boolean;
  notStaff?: boolean;
}

export interface GetUserForAdminResponse {
  user: User | null;
}

export interface GetBlockedUsersResponse {
  blockedUsers: User[];
}

export const changeUserTypeRequest = async (params: ChangeUserTypeParams): Promise<BaseAPIResponse> => {
  const { userId, ...bodyParams } = params;
  const { data } = await axiosInstance.patch(`/user/${userId}/type`, bodyParams);
  return data;
};

export const changeDriverPreferencesRequest = async (params: ChangeDriverPreferencesParams): Promise<BaseAPIResponse> => {
  const { userId, ...bodyParams } = params;
  const { data } = await axiosInstance.patch(`/user/${userId}/driver`, bodyParams);
  return data;
};

export const getOneUserRequest = async (userId: string): Promise<GetOneUserResponse> => {
  const { data } = await axiosInstance.get(`/user/${userId}`);
  return data;
};

export const addCarRequest = async (params: AddCarParams): Promise<BaseAPIResponse> => {
  const { userId, ...bodyParams } = params;
  const { data } = await axiosInstance.post(`/user/${userId}/car`, bodyParams);
  return data;
};

export const putCarRequest = async (params: PutCarParams): Promise<BaseAPIResponse> => {
  const { userId, carId, ...bodyParams } = params;
  const { data } = await axiosInstance.put(`/user/${userId}/car/${carId}`, bodyParams);
  return data;
};

export const deleteCarRequest = async (params: DeleteCarParams): Promise<BaseAPIResponse> => {
  const { userId, carId } = params;
  const { data } = await axiosInstance.delete(`/user/${userId}/car/${carId}`);
  return data;
};

export const addRideRequest = async (params: AddRideParams): Promise<BaseAPIResponse> => {
  const { userId, ...bodyParams } = params;
  const { data } = await axiosInstance.post(`/user/${userId}/ride/add`, bodyParams);
  return data;
};

export const getSearchedRidesRequest = async (params: GetSearchedRidesParams): Promise<GetSearchedRidesResponse> => {
  const { data } = await axiosInstance.get(`/rides`, { params });
  return data;
};

export const getRideDetailsRequest = async (rideId: string): Promise<PublicRideDetails> => {
  const { data } = await axiosInstance.get(`/ride/${rideId}`);
  return data;
};

export const bookRideRequest = async (rideId: string): Promise<BaseAPIResponse> => {
  const { data } = await axiosInstance.put(`/user/ride/${rideId}/book`);
  return data;
};

export const getPassengerRidesRequest = async (): Promise<PassengerRide[]> => {
  const { data } = await axiosInstance.get(`/user/rides/passenger`);
  return data.rides;
};

export const getDriverRidesRequest = async (): Promise<DriverRide[]> => {
  const { data } = await axiosInstance.get(`/user/rides/driver`);
  return data.rides;
};

export const cancelPassengerRideRequest = async (rideId: string): Promise<BaseAPIResponse> => {
  const { data } = await axiosInstance.patch(`/user/ride/${rideId}/cancel/passenger`);
  return data;
};

export const cancelDriverRideRequest = async (rideId: string): Promise<BaseAPIResponse> => {
  const { data } = await axiosInstance.patch(`/user/ride/${rideId}/cancel/driver`);
  return data;
};

export const startRideRequest = async (rideId: string): Promise<BaseAPIResponse> => {
  const { data } = await axiosInstance.patch(`/user/ride/${rideId}/start`);
  return data;
};

export const endRideRequest = async (rideId: string): Promise<BaseAPIResponse> => {
  const { data } = await axiosInstance.patch(`/user/ride/${rideId}/end`);
  return data;
};

export const addReviewRequest = async (params: AddReviewParams): Promise<BaseAPIResponse> => {
  const { rideId, ...bodyParams } = params;
  const { data } = await axiosInstance.post(`/user/ride/${rideId}/review`, bodyParams);
  return data;
};

export const getRideReviewsRequest = async (params: GetReviewParams): Promise<GetRideReviewsResponse> => {
  const { rideId, ...queryParams } = params;
  const { data } = await axiosInstance.get(`/ride/${rideId}/reviews`, { params: queryParams });

  return data;
};

export const getReviewsToApproveRequest = async (): Promise<GetReviewsToApproveResponse> => {
  const { data } = await axiosInstance.get(`/staff/reviews`);

  return data;
};

export const approveReviewRequest = async (reviewId: string): Promise<BaseAPIResponse> => {
  const { data } = await axiosInstance.patch(`/staff/review/${reviewId}/approve`);
  return data;
};

export const getOneReviewRequest = async (reviewId: string): Promise<Review> => {
  const { data } = await axiosInstance.get(`/staff/review/${reviewId}`);
  return data;
};

export const resolveDisputeRequest = async (params: ResolveDisputeParams): Promise<BaseAPIResponse> => {
  const { reviewId, ...bodyParams } = params;
  const { data } = await axiosInstance.patch(`/staff/review/${reviewId}/dispute`, bodyParams);
  return data;
};

export const giveStaffAccessRequest = async (email: string): Promise<BaseAPIResponse> => {
  const { data } = await axiosInstance.patch(`/admin/user/${email}/staff`);
  return data;
};

export const getStatisticsRequest = async (): Promise<GetStatisticsResponse> => {
  const { data } = await axiosInstance.get(`/admin/statistics`);
  return data;
};

export const getAllStaffRequest = async (): Promise<GetAllStaffResponse> => {
  const { data } = await axiosInstance.get(`/admin/staff`);
  return data;
};

export const blockUserRequest = async (userId: string): Promise<BaseAPIResponse> => {
  const { data } = await axiosInstance.patch(`/admin/user/${userId}/block`);
  return data;
};

export const unblockUserRequest = async (userId: string): Promise<BaseAPIResponse> => {
  const { data } = await axiosInstance.patch(`/admin/user/${userId}/unblock`);
  return data;
};

export const getUserForAdminRequest = async (params: GetUserForAdminParams): Promise<GetUserForAdminResponse> => {
  const { data } = await axiosInstance.get(`/admin/user`, { params });
  return data;
};

export const getBlockedUsersRequest = async (): Promise<GetBlockedUsersResponse> => {
  const { data } = await axiosInstance.get(`/admin/users/blocked`);
  return data;
};
