import { buildValidationMiddleware } from '../../../../core/middlewares';
import validator from '../../../../core/validator';

export interface GetRideDetailsRequest {
  params: {
    rideId: string;
  };
}

export const getRideDetailsValidator = {
  params: validator.object({
    rideId: validator.string().uuid().required(),
  }),
};

export default buildValidationMiddleware(getRideDetailsValidator);
