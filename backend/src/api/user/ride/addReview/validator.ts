import { buildValidationMiddleware } from '../../../../core/middlewares';
import validator from '../../../../core/validator';

export interface AddReviewRequest {
  params: {
    rideId: string;
  };
  body: {
    rating: number
    comment: string
    dispute: boolean
  };
}

export const addReviewValidator = {
  params: validator.object({
    rideId: validator.string().uuid().required(),
  }),
  body: validator.object({
    rating: validator.number().required(),
    comment: validator.string().required(),
    dispute: validator.boolean().required(),
  }),
};

export default buildValidationMiddleware(addReviewValidator);
