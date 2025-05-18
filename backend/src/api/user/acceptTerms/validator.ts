import { buildValidationMiddleware } from '../../../core/middlewares';
import validator from '../../../core/validator';

export interface AcceptTermsRequest {
  body: {
    termsAccepted: boolean;
  };
}

export const acceptTermsValidator = {
  body: validator.object({
    termsAccepted: validator.boolean().required(),
  }),
};

export default buildValidationMiddleware(acceptTermsValidator);
