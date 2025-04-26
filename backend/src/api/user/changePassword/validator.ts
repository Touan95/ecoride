import { buildValidationMiddleware } from '../../../core/middlewares';
import validator from '../../../core/validator';
import { passwordRegex } from '../../public/authentication/common/const/regex';

export interface ChangePasswordRequest {
  body: {
    oldPassword: string;
    newPassword: string;
  };
}

export const changeTypeValidator = {
  body: validator.object({
    oldPassword: validator.string().required(),
    newPassword: validator.string().regex(passwordRegex).required(),
  }),
};

export default buildValidationMiddleware(changeTypeValidator);
