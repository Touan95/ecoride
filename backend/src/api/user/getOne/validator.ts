import { buildValidationMiddleware } from '../../../core/middlewares';
import validator from '../../../core/validator';

export interface GetUserRequest {
  params: {
    userId: string;
  };
}

export const getUserValidator = {
  params: validator.object({
    userId: validator.string().uuid().required(),
  }),
};

export default buildValidationMiddleware(getUserValidator);
