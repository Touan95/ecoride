import { Ride } from './ride';

export interface PassengerRide extends Ride {
  createdAt: Date;
  updatedAt: Date;
  canceled: boolean;
}
