import { buildValidationMiddleware } from '../../../core/middlewares';
import validator from '../../../core/validator';

export interface ChangeDriverPreferencesRequest {
  params: {
    userId: string;
  };
  body: {
    acceptsPets: boolean
    acceptsSmoking:boolean
    customRules: string[]
  };
}

export const changeDriverPreferencesValidator = {
  params: validator.object({
    userId: validator.string().uuid().required(),
  }),
  body: validator.object({
    acceptsPets: validator.boolean().required(),
    acceptsSmoking:validator.boolean().required(),
    customRules: validator.array().items(validator.string().min(0)),
  }),
};

export default buildValidationMiddleware(changeDriverPreferencesValidator);
