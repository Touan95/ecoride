import { driverMock } from '@/interfaces/driver';
import { CarLight, carMock } from '@/interfaces/car';
import { RideLocation, RideStatus } from '@/api/lib/user';
import { UserLight } from '@/interfaces/user';

export interface Ride {
  id: string;
  reservedSeats: number | null;
  price: number;
  departureDate: Date;
  arrivalDate: Date;
  arrivalLocation: RideLocation;
  departureLocation: RideLocation;
  status: RideStatus;
}

export interface SearchedRide extends Ride {
  car: CarLight;
  driver: UserLight;
}

export const rideMock: Ride = {
  driver: driverMock,
  car: carMock,
  price: 100,
  reservedSeats: 2,
  arrivalDate: new Date('December 17, 2025 04:24:00'),
  departureDate: new Date('December 17, 2025 02:34:00'),
  arrivalLocation: 'Paris',
  departureLocation: 'Marseille',
  duration: 5400000
};
