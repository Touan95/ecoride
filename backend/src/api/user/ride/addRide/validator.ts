import { buildValidationMiddleware } from '../../../../core/middlewares';
import validator from '../../../../core/validator';
import { RideLocation } from '../../../../entities/ride.entity';
import { rideLocationValidator } from '../../../../utils/joiCustomValidators';

export interface AddRideRequest {
  params: {
    userId: string;
  };
  body: {
    departureLocation: RideLocation;
    arrivalLocation: RideLocation;
    price: number;
    carId: string;
    arrivalDate: Date;
    departureDate: Date;
  };
}

export const addRideValidator = {
  params: validator.object({
    userId: validator.string().uuid().required(),
  }),
  body: validator.object({
    departureLocation: rideLocationValidator,
    arrivalLocation: rideLocationValidator,
    carId: validator.string().uuid().required(),
    price: validator.number().required(),
    arrivalDate: validator.date().required(),
    departureDate: validator.date().required(),
  }),
};

export default buildValidationMiddleware(addRideValidator);
