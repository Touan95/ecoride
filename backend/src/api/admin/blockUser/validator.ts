import { buildValidationMiddleware } from '../../../core/middlewares';
import validator from '../../../core/validator';

export interface BlockUserRequest {
  params: {
    userId: string;
  };
}

export const blockUserValidator = {
  params: validator.object({
    userId: validator.string().uuid().required(),
  }),
};

export default buildValidationMiddleware(blockUserValidator);
