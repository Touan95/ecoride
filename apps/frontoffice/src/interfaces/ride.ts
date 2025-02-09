import { Driver } from '@/interfaces/driver';

export interface Ride {
  driver: Driver;
  seats: number;
  reservedSeats?: number;
  price: number;
  departureDate: Date;
  arrivalDate: Date;
  isGreen?: boolean;
}
