import { buildValidationMiddleware } from '../../../core/middlewares';
import validator from '../../../core/validator';

export interface ContactRequest {
  body: {
    email: string;
    message: string;
    name: string;
  };
}

export const contactValidator = {
  body: validator.object({
    email: validator.string().email().required(),
    message: validator.string().max(1000).required(),
    name: validator.string().required(),
  }),
};

export default buildValidationMiddleware(contactValidator);
