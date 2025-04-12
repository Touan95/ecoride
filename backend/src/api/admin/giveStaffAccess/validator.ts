import { buildValidationMiddleware } from '../../../core/middlewares';
import validator from '../../../core/validator';

export interface GiveStaffAccessRequest {
  params: {
    email: string;
  };
}

export const giveStaffAccessValidator = {
  params: validator.object({
    email: validator.string().email().required(),
  }),
};

export default buildValidationMiddleware(giveStaffAccessValidator);
