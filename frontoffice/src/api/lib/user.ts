import axiosInstance from '@/configs/axios';
import { BaseAPIResponse } from './types';
import { User, UserType } from '@/interfaces/user';
import { Car, Energy } from '@/interfaces/car';
import { DriverRide, PublicRideDetails, SearchedRide } from '@/interfaces/ride';
import { PassengerRide } from '@/interfaces/ridePassenger';

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
}

export enum RideStatus {
  UPCOMING = 'upcoming',
  ONGOING = 'ongoing',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

interface GetSearchedRidesResponse {
  rides: SearchedRide[];
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
