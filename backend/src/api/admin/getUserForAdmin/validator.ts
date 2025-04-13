import { buildValidationMiddleware } from '../../../core/middlewares';
import validator from '../../../core/validator';

export interface GetUserForAdminRequest {
  query: {
    username: string;
    email: string;
    staffOnly: boolean;
    notStaff: boolean;
  };
}

export const getUserForAdminValidator = {
  query: validator
    .object({
      username: validator.string(),
      email: validator.string().email(),
      staffOnly: validator.boolean(),
      notStaff: validator.boolean(),
    })
    .or('username', 'email'),
};

export default buildValidationMiddleware(getUserForAdminValidator);
