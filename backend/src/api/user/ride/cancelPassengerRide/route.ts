import { NextFunction, Response } from 'express';
import { service } from './service';
import { CancelPassengerRideRequest } from './validator';
import { ValidatedRequest } from '../../../../core/utils/validatedExpressRequest';
import { AppDataSource } from '../../../../loader/database';
import { UserRepository } from '../../../../repositories/user.repository';
import { HttpStatuses } from '../../../../core/httpStatuses';
import serializer from './serializer';
import { RideRepository } from '../../../../repositories/ride.repository';
import { RidePassengerRepository } from '../../../../repositories/ridePassenger.repository';

type CancelPassengerRideRequestType = ValidatedRequest<CancelPassengerRideRequest>;

export default async (
  req: CancelPassengerRideRequestType,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { rideId } = req.params;
    const { userId } = req.jwt

    await service({
      userId,
      rideId,
      userRepository: AppDataSource.manager.withRepository(UserRepository),
      rideRepository: AppDataSource.manager.withRepository(RideRepository),
      ridePassengerRepository: AppDataSource.manager.withRepository(RidePassengerRepository),
    });

    const response = serializer();

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
