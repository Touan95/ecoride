import { NextFunction, Response } from 'express';
import { service } from './service';
import { UserRepository } from '../../../repositories/user.repository';
import { AppDataSource } from '../../../loader/database';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ValidatedRequest } from '../../../core/utils/validatedExpressRequest';
import { GetOneReviewRequest } from './validator';
import { serializer } from './serializer';

type GetOneReviewRequestType = ValidatedRequest<GetOneReviewRequest>;

export default async (
  req: GetOneReviewRequestType,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { reviewId } = req.params;
    const { userId } = req.jwt;

    const review = await service({
      reviewId,
      userId,
      userRepository: AppDataSource.manager.withRepository(UserRepository),
    });

    const response = serializer(review);

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
