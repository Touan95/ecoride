import { buildValidationMiddleware } from '../../../../core/middlewares';
import validator from '../../../../core/validator';

export interface StartRideRequest {
  params: {
    rideId: string;
  };
}

export const startRideValidator = {
  params: validator.object({
    rideId: validator.string().uuid().required(),
  }),
};

export default buildValidationMiddleware(startRideValidator);
