import { buildValidationMiddleware } from '../../../../core/middlewares';
import validator from '../../../../core/validator';

export interface IRefreshRequest {
  body: {
    accessToken: string;
    refreshToken: string;
  };
}

export const RefreshValidator = {
  body: validator.object({
    accessToken: validator.string().required(),
    refreshToken: validator.string().required(),
  }),
};

export default buildValidationMiddleware(RefreshValidator);
