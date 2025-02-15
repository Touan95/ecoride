import { buildValidationMiddleware } from '../../../../core/middlewares';
import { validator } from '../../../../core/validator';

export interface RegisterRequest {
  body: {
    email: string;
    password: string;
    username: string
  };
}

export const registerValidator = {
  body: validator.object({
    email: validator.string().email().required(),
    password: validator.string().required(),
    username: validator.string().required(),
  }),
};

export default buildValidationMiddleware(registerValidator);
