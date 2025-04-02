import { NextFunction, Response } from 'express';
import { service } from './service';
import { CancelDriverRideRequest } from './validator';
import { ValidatedRequest } from '../../../../core/utils/validatedExpressRequest';
import { AppDataSource } from '../../../../loader/database';
import { UserRepository } from '../../../../repositories/user.repository';
import { HttpStatuses } from '../../../../core/httpStatuses';
import serializer from './serializer';
import { RideRepository } from '../../../../repositories/ride.repository';

type CancelDriverRideRequestType = ValidatedRequest<CancelDriverRideRequest>;

export default async (
  req: CancelDriverRideRequestType,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { rideId } = req.params;
    const { userId } = req.jwt;

    await service({
      userId,
      rideId,
      userRepository: AppDataSource.manager.withRepository(UserRepository),
      rideRepository: AppDataSource.manager.withRepository(RideRepository),
    });

    const response = serializer();

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
