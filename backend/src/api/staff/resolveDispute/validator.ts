import { buildValidationMiddleware } from '../../../core/middlewares';
import validator from '../../../core/validator';

export interface ResolveDisputeRequest {
  params: {
    reviewId: string;
  };
  body: {
    refundPassenger: boolean;
    approveReview: boolean;
  };
}

export const resolveDisputeValidator = {
  params: validator.object({
    reviewId: validator.string().uuid().required(),
  }),
  body: validator.object({
    refundPassenger: validator.boolean().required(),
    approveReview: validator.boolean().required(),
  }),
};

export default buildValidationMiddleware(resolveDisputeValidator);
