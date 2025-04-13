import { buildValidationMiddleware } from '../../../core/middlewares';
import validator from '../../../core/validator';

export interface GetUserForAdminRequest {
  query: {
    username: string;
    email: string;
  };
}

export const getUserForAdminValidator = {
  query: validator
    .object({
      username: validator.string(),
      email: validator.string().email(),
    })
    .or('username', 'email'),
};

export default buildValidationMiddleware(getUserForAdminValidator);
