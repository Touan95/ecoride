import { Driver, driverMock } from '@/interfaces/driver';
import { Car, carMock } from '@/interfaces/car';

export interface Ride {
  driver: Driver;
  reservedSeats?: number;
  price: number;
  departureDate: Date;
  arrivalDate: Date;
  duration: number;
  arrivalLocation: string;
  departureLocation: string;
  car: Car;
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
