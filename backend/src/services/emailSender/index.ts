import { sendPassengersRideCancelledByDriver } from './rideCancelledByDriver';

export interface EmailSenderMethods {
  rideCancelledByDriver: typeof sendPassengersRideCancelledByDriver;
}

export const emailSender: EmailSenderMethods = {
  rideCancelledByDriver: sendPassengersRideCancelledByDriver,
};
