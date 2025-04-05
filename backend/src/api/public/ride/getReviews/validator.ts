import { buildValidationMiddleware } from '../../../../core/middlewares';
import validator from '../../../../core/validator';

export interface GetReviewsRequest {
  params: {
    rideId: string;
  },
  query:{
    approvedOnly?: boolean
  }
}

export const getReviewsValidator = {
  params: validator.object({
    rideId: validator.string().uuid().required(),
  }),
  query: validator.object({
    approvedOnly: validator.boolean(),
  }),
};

export default buildValidationMiddleware(getReviewsValidator);
