import { buildValidationMiddleware } from '../../../../core/middlewares';
import { validator } from '../../../../core/validator';

export interface LoginRequest {
  body: {
    email: string;
    password: string;
  };
}

export const loginValidator = {
  body: validator.object({
    email: validator.string().email().required(),
    password: validator.string().required(),
  }),
};

export default buildValidationMiddleware(loginValidator);
