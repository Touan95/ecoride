import { buildValidationMiddleware } from '../../../../core/middlewares';
import validator from '../../../../core/validator';

export interface DeleteCarRequest {
  params: {
    userId: string;
    carId: string;
  };
}

export const deleteCarValidator = {
  params: validator.object({
    userId: validator.string().uuid().required(),
    carId: validator.string().uuid().required(),
  }),
};

export default buildValidationMiddleware(deleteCarValidator);
