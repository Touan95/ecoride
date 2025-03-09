import { buildValidationMiddleware } from '../../../../core/middlewares';
import validator from '../../../../core/validator';
import { Energy } from '../../../../entities/car.entity';

export interface AddCarRequest {
  params: {
    userId: string;
  };
  body: {
    plateNumber: string;
    registrationDate: Date;
    color: string;
    brand: string;
    model: string;
    seats: number;
    energy: Energy;
  };
}

export const addCarValidator = {
  params: validator.object({
    userId: validator.string().uuid().required(),
  }),
  body: validator.object({
    plateNumber: validator.string().required(),
    registrationDate: validator.date().required(),
    color: validator.string().required(),
    brand: validator.string().required(),
    model: validator.string().required(),
    seats: validator.number().required(),
    energy: validator
      .string()
      .valid(...Object.values(Energy))
      .required(),
  }),
};

export default buildValidationMiddleware(addCarValidator);
