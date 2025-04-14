import { buildValidationMiddleware } from '../../../../core/middlewares';
import validator from '../../../../core/validator';
import { RideStatus } from '../../../../entities/ride.entity';

export interface GetSearchedRidesRequest {
  query: {
    departureLatitude?: number;
    departureLongitude?: number;
    arrivalLatitude?: number;
    arrivalLongitude?: number;
    departureDate?: Date;
    statuses?: RideStatus[];
    onlyAvailable?: boolean;
    onlyInTheFuture?: boolean;
  };
}

export const getSearchedRidesValidator = {
  query: validator.object({
    departureLatitude: validator.number(),
    departureLongitude: validator.number(),
    arrivalLatitude: validator.number(),
    arrivalLongitude: validator.number(),
    departureDate: validator.date(),
    statuses: validator.array().items(validator.string().valid(...Object.values(RideStatus))),
    onlyAvailable: validator.boolean(),
    onlyInTheFuture: validator.boolean(),
  }),
};

export default buildValidationMiddleware(getSearchedRidesValidator);
