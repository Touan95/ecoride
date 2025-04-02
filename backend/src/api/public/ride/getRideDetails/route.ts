import { NextFunction, Response } from 'express';
import { service } from './service';
import { GetRideDetailsRequest } from './validator';
import { serializer } from './serializer';
import { ValidatedRequest } from '../../../../core/utils/validatedExpressRequest';
import { AppDataSource } from '../../../../loader/database';
import { RideRepository } from '../../../../repositories/ride.repository';
import { HttpStatuses } from '../../../../core/httpStatuses';

type GetRideDetailsRequestType = ValidatedRequest<GetRideDetailsRequest>;

export default async (
  req: GetRideDetailsRequestType,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { rideId } = req.params;

    const ride = await service({
      rideId,
      rideRepository: AppDataSource.manager.withRepository(RideRepository),
    });

    const response = serializer(ride);

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
