import { buildValidationMiddleware } from '../../../core/middlewares';
import validator from '../../../core/validator';

export interface GetOneReviewRequest {
  params: {
    reviewId: string;
  };
}

export const approveReviewValidator = {
  params: validator.object({
    reviewId: validator.string().uuid().required(),
  }),
};

export default buildValidationMiddleware(approveReviewValidator);
