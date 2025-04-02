import { buildValidationMiddleware } from '../../../../core/middlewares';
import validator from '../../../../core/validator';

export interface EndRideRequest {
  params: {
    rideId: string;
  };
}

export const endRideValidator = {
  params: validator.object({
    rideId: validator.string().uuid().required(),
  }),
};

export default buildValidationMiddleware(endRideValidator);
