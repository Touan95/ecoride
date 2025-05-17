import { buildValidationMiddleware } from '../../../../core/middlewares';
import validator from '../../../../core/validator';

export interface BookSeatRequest {
  params: {
    rideId: string;
  };
  body: {
    emailShareAccepted: boolean;
  };
}

export const bookSeatValidator = {
  params: validator.object({
    rideId: validator.string().uuid().required(),
  }),
  body: validator.object({
    emailShareAccepted: validator.boolean().required(),
  }),
};

export default buildValidationMiddleware(bookSeatValidator);
