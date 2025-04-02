import { buildValidationMiddleware } from '../../../../core/middlewares';
import validator from '../../../../core/validator';

export interface BookSeatRequest {
  params: {
    rideId: string;
  };
}

export const bookSeatValidator = {
  params: validator.object({
    rideId: validator.string().uuid().required(),
  }),
};

export default buildValidationMiddleware(bookSeatValidator);
