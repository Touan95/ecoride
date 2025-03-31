import { buildValidationMiddleware } from '../../../../core/middlewares';
import validator from '../../../../core/validator';

export interface CancelPassengerRideRequest {
  params: {
    rideId: string;
  };
}

export const cancelPassengerRideValidator = {
  params: validator.object({
    rideId: validator.string().uuid().required(),
  })
};

export default buildValidationMiddleware(cancelPassengerRideValidator);
