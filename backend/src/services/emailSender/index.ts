import { sendContactRequest } from './contactRequest';
import { sendDriverBookingConfirmation } from './driverBookingConfirmation';
import { sendPassengerBookingConfirmation } from './passengerBookingConfirmation';
import { sendPassengersRideCancelledByDriver } from './rideCancelledByDriver';
import { sendPassengersRideCompleted } from './rideCompleted';

export interface EmailSenderMethods {
  rideCancelledByDriver: typeof sendPassengersRideCancelledByDriver;
  rideCompleted: typeof sendPassengersRideCompleted;
  contactRequest: typeof sendContactRequest;
  driverBookingConfirmation: typeof sendDriverBookingConfirmation;
  passengerBookingConfirmation: typeof sendPassengerBookingConfirmation;
}

export const emailSender: EmailSenderMethods = {
  rideCancelledByDriver: sendPassengersRideCancelledByDriver,
  rideCompleted: sendPassengersRideCompleted,
  contactRequest: sendContactRequest,
  driverBookingConfirmation: sendDriverBookingConfirmation,
  passengerBookingConfirmation: sendPassengerBookingConfirmation,
};
