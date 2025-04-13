import { buildValidationMiddleware } from '../../../core/middlewares';
import validator from '../../../core/validator';

export interface UnblockUserRequest {
  params: {
    userId: string;
  };
}

export const unblockUserValidator = {
  params: validator.object({
    userId: validator.string().uuid().required(),
  }),
};

export default buildValidationMiddleware(unblockUserValidator);
