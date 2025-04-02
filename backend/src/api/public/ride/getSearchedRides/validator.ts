import { buildValidationMiddleware } from '../../../../core/middlewares';
import validator from '../../../../core/validator';

export interface GetSearchedRidesRequest {
  query: {
    departureLatitude?: number;
    departureLongitude?: number;
    arrivalLatitude?: number;
    arrivalLongitude?: number;
    departureDate?: Date;
  };
}

export const getSearchedRidesValidator = {
  query: validator.object({
    departureLatitude: validator.number(),
    departureLongitude: validator.number(),
    arrivalLatitude: validator.number(),
    arrivalLongitude: validator.number(),
    departureDate: validator.date(),
  }),
};

export default buildValidationMiddleware(getSearchedRidesValidator);
