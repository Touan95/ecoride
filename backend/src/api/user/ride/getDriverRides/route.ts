import { NextFunction, Request, Response } from 'express';
import { serializer } from './serializer';
import { service } from './service';
import { AppDataSource } from '../../../../loader/database';
import { HttpStatuses } from '../../../../core/httpStatuses';
import { UserRepository } from '../../../../repositories/user.repository';
import { RideRepository } from '../../../../repositories/ride.repository';


export default async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { userId } = req.jwt;
    const rides = await service({
      userId,
      userRepository: AppDataSource.manager.withRepository(UserRepository),
      rideRepository: AppDataSource.manager.withRepository(RideRepository),
    });

    const response = serializer(rides);

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
