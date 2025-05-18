import { sendContactRequest } from './contactRequest';
import { sendDriverReviewApproved } from './driverReviewApproved';
import { sendDriverBookingCancelled } from './driverBookingCancelled';
import { sendDriverBookingConfirmation } from './driverBookingConfirmation';
import { sendDriverDisputeResolved } from './driverDisputeResolved';
import { sendPassengerReviewApproved } from './passengerReviewApproved';
import { sendPassengerBookingCancelled } from './passengerBookingCancelled';
import { sendPassengerBookingConfirmation } from './passengerBookingConfirmation';
import { sendPassengerDisputeResolved } from './passengerDisputeResolved';
import { sendPassengerRideCancelledByDriver } from './passengerRideCancelledByDriver';
import { sendPassengerRideCompleted } from './passengerRideCompleted';
import { sendUserRegistrationConfirmation } from './userRegistrationConfirmation';

export interface EmailSenderMethods {
  rideCancelledByDriver: typeof sendPassengerRideCancelledByDriver;
  rideCompleted: typeof sendPassengerRideCompleted;
  contactRequest: typeof sendContactRequest;
  driverBookingConfirmation: typeof sendDriverBookingConfirmation;
  passengerBookingConfirmation: typeof sendPassengerBookingConfirmation;
  driverApprovedReview: typeof sendDriverReviewApproved;
  driverResolvedDispute: typeof sendDriverDisputeResolved;
  passengerApprovedReview: typeof sendPassengerReviewApproved;
  passengerResolvedDispute: typeof sendPassengerDisputeResolved;
  driverBookingCancelled: typeof sendDriverBookingCancelled;
  passengerBookingCancelled: typeof sendPassengerBookingCancelled;
  userRegistrationConfirmation: typeof sendUserRegistrationConfirmation;
}

export const emailSender: EmailSenderMethods = {
  rideCancelledByDriver: sendPassengerRideCancelledByDriver,
  rideCompleted: sendPassengerRideCompleted,
  contactRequest: sendContactRequest,
  driverBookingConfirmation: sendDriverBookingConfirmation,
  passengerBookingConfirmation: sendPassengerBookingConfirmation,
  driverApprovedReview: sendDriverReviewApproved,
  driverResolvedDispute: sendDriverDisputeResolved,
  passengerApprovedReview: sendPassengerReviewApproved,
  passengerResolvedDispute: sendPassengerDisputeResolved,
  driverBookingCancelled: sendDriverBookingCancelled,
  passengerBookingCancelled: sendPassengerBookingCancelled,
  userRegistrationConfirmation: sendUserRegistrationConfirmation,
};
