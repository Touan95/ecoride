import { Car, CarLight } from '@/interfaces/car';
import { RideLocation, RideStatus } from '@/api/lib/user';
import { User, UserLight } from '@/interfaces/user';

export interface Ride {
  id: string;
  reservedSeats: number | null;
  price: number;
  departureDate: Date;
  arrivalDate: Date;
  arrivalLocation: RideLocation;
  departureLocation: RideLocation;
  status: RideStatus;
  balance: number;
}

export interface SearchedRide extends Ride {
  car: CarLight;
  driver: UserLight;
}

export interface PublicRideDetails extends Ride {
  car: Car;
  driver: User;
}
