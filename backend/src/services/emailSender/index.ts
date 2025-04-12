import { sendPassengersRideCancelledByDriver } from './rideCancelledByDriver';
import { sendPassengersRideCompleted } from './rideCompleted';

export interface EmailSenderMethods {
  rideCancelledByDriver: typeof sendPassengersRideCancelledByDriver;
  rideCompleted: typeof sendPassengersRideCompleted;
}

export const emailSender: EmailSenderMethods = {
  rideCancelledByDriver: sendPassengersRideCancelledByDriver,
  rideCompleted: sendPassengersRideCompleted,
};
