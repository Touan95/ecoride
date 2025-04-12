import { NextFunction, Response } from 'express';
import { service } from './service';
import { UserRepository } from '../../../repositories/user.repository';
import { AppDataSource } from '../../../loader/database';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ValidatedRequest } from '../../../core/utils/validatedExpressRequest';
import { ResolveDisputeRequest } from './validator';
import serializer from './serializer';
import { RideRepository } from '../../../repositories/ride.repository';
import { PlatformCreditRepository } from '../../../repositories/platformCredit.repository';

type ResolveDisputeRequestType = ValidatedRequest<ResolveDisputeRequest>;

export default async (
  req: ResolveDisputeRequestType,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { reviewId } = req.params;
    const { userId } = req.jwt;
    const { refundPassenger, approveReview } = req.body;

    await service({
      reviewId,
      userId,
      refundPassenger,
      approveReview,
      userRepository: AppDataSource.manager.withRepository(UserRepository),
      rideRepository: AppDataSource.manager.withRepository(RideRepository),
      platformCreditRepository: AppDataSource.manager.withRepository(PlatformCreditRepository),
    });

    const response = serializer();

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
