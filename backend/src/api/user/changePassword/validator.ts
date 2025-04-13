import { buildValidationMiddleware } from '../../../core/middlewares';
import validator from '../../../core/validator';

export interface ChangePasswordRequest {
  body: {
    oldPassword: string;
    newPassword: string;
  };
}

export const changeTypeValidator = {
  body: validator.object({
    oldPassword: validator.string().required(),
    newPassword: validator.string().required(),
  }),
};

export default buildValidationMiddleware(changeTypeValidator);
