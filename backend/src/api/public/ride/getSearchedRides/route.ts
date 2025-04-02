import { NextFunction, Response } from 'express';
import { serializer } from './serializer';
import { service } from './service';
import { GetSearchedRidesRequest } from './validator';
import { ValidatedRequest } from '../../../../core/utils/validatedExpressRequest';
import { AppDataSource } from '../../../../loader/database';
import { RideRepository } from '../../../../repositories/ride.repository';
import { HttpStatuses } from '../../../../core/httpStatuses';

type GetSearchedRidesRequestType = ValidatedRequest<GetSearchedRidesRequest>;

export default async (
  req: GetSearchedRidesRequestType,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const {
      arrivalLatitude,
      arrivalLongitude,
      departureDate,
      departureLatitude,
      departureLongitude,
    } = req.query;
    const rides = await service({
      arrivalLatitude,
      arrivalLongitude,
      departureDate,
      departureLatitude,
      departureLongitude,
      rideRepository: AppDataSource.manager.withRepository(RideRepository),
    });

    const response = serializer(rides);

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
