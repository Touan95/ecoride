import { sendContactRequest } from './contactRequest';
import { sendPassengersRideCancelledByDriver } from './rideCancelledByDriver';
import { sendPassengersRideCompleted } from './rideCompleted';

export interface EmailSenderMethods {
  rideCancelledByDriver: typeof sendPassengersRideCancelledByDriver;
  rideCompleted: typeof sendPassengersRideCompleted;
  contactRequest: typeof sendContactRequest;
}

export const emailSender: EmailSenderMethods = {
  rideCancelledByDriver: sendPassengersRideCancelledByDriver,
  rideCompleted: sendPassengersRideCompleted,
  contactRequest: sendContactRequest,
};
