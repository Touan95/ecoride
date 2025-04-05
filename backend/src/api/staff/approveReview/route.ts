import { NextFunction, Response } from 'express';
import { service } from './service';
import { UserRepository } from '../../../repositories/user.repository';
import { AppDataSource } from '../../../loader/database';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ValidatedRequest } from '../../../core/utils/validatedExpressRequest';
import { ApproveReviewRequest } from './validator';
import serializer from './serializer';
import { RideRepository } from '../../../repositories/ride.repository';
import { PlatformCreditRepository } from '../../../repositories/platformCredit.repository';

type ApproveReviewRequestType = ValidatedRequest<ApproveReviewRequest>;

export default async (
  req: ApproveReviewRequestType,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { reviewId } = req.params;
    const { userId } = req.jwt;

    await service({
      reviewId,
      userId,
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
