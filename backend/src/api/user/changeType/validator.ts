import { buildValidationMiddleware } from '../../../core/middlewares';
import validator from '../../../core/validator';
import { UserType } from '../../../entities/user.entity';

export interface ChangeTypeRequest {
  params: {
    userId: string;
  };
  body: {
    userType: UserType;
  };
}

export const changeTypeValidator = {
  params: validator.object({
    userId: validator.string().uuid().required(),
  }),
  body: validator.object({
    userType: validator
      .string()
      .valid(...Object.values(UserType))
      .required(),
  }),
};

export default buildValidationMiddleware(changeTypeValidator);
