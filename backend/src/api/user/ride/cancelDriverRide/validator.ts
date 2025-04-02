import { buildValidationMiddleware } from '../../../../core/middlewares';
import validator from '../../../../core/validator';

export interface CancelDriverRideRequest {
  params: {
    rideId: string;
  };
}

export const cancelDriverRideValidator = {
  params: validator.object({
    rideId: validator.string().uuid().required(),
  }),
};

export default buildValidationMiddleware(cancelDriverRideValidator);
