import { NextFunction, Response } from 'express';
import { service } from './service';
import { BookSeatRequest } from './validator';
import { ValidatedRequest } from '../../../../core/utils/validatedExpressRequest';
import { AppDataSource } from '../../../../loader/database';
import { UserRepository } from '../../../../repositories/user.repository';
import { HttpStatuses } from '../../../../core/httpStatuses';
import serializer from './serializer';
import { RideRepository } from '../../../../repositories/ride.repository';
import { RidePassengerRepository } from '../../../../repositories/ridePassenger.repository';

type BookSeatRequestType = ValidatedRequest<BookSeatRequest>;

export default async (
  req: BookSeatRequestType,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { rideId } = req.params;
    const { userId } = req.jwt;
    const { emailShareAccepted } = req.body;

    await service({
      userId,
      rideId,
      emailShareAccepted,
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
