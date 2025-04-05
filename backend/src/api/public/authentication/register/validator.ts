import { buildValidationMiddleware } from '../../../../core/middlewares';
import { validator } from '../../../../core/validator';

export interface RegisterRequest {
  body: {
    email: string;
    password: string;
    username: string;
    isStaff: boolean;
  };
}

export const registerValidator = {
  body: validator.object({
    email: validator.string().email().required(),
    password: validator.string().required(),
    username: validator.string().required(),
    isStaff: validator.boolean().required(),
  }),
};

export default buildValidationMiddleware(registerValidator);
