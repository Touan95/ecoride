import { NextFunction, Response } from 'express';
import { service } from './service';
import { GetReviewsRequest } from './validator';
import { serializer } from './serializer';
import { ValidatedRequest } from '../../../../core/utils/validatedExpressRequest';
import { AppDataSource } from '../../../../loader/database';
import { RideRepository } from '../../../../repositories/ride.repository';
import { HttpStatuses } from '../../../../core/httpStatuses';

type GetReviewsRequestType = ValidatedRequest<GetReviewsRequest>;

export default async (
  req: GetReviewsRequestType,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { rideId } = req.params;
    const { approvedOnly } = req.query;

    const reviews = await service({
      rideId,
      rideRepository: AppDataSource.manager.withRepository(RideRepository),
    });

    const response = serializer(reviews, approvedOnly);

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
