import { NextFunction, Response } from 'express';
import { service } from './service';
import { AddReviewRequest } from './validator';
import { ValidatedRequest } from '../../../../core/utils/validatedExpressRequest';
import { AppDataSource } from '../../../../loader/database';
import { UserRepository } from '../../../../repositories/user.repository';
import { HttpStatuses } from '../../../../core/httpStatuses';
import serializer from './serializer';
import { RideRepository } from '../../../../repositories/ride.repository';

type AddRideRequestType = ValidatedRequest<AddReviewRequest>;

export default async (
  req: AddRideRequestType,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { userId } = req.jwt;
    const { comment, rating, dispute } = req.body;
    const { rideId } = req.params;

    await service({
      userId,
      comment,
      rating,
      rideId,
      dispute,
      userRepository: AppDataSource.manager.withRepository(UserRepository),
      rideRepository: AppDataSource.manager.withRepository(RideRepository),
    });

    const response = serializer();

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
