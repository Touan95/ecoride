import { NextFunction, Response, Request } from 'express';
import { service } from './service';
import { UserRepository } from '../../../repositories/user.repository';
import { AppDataSource } from '../../../loader/database';
import { HttpStatuses } from '../../../core/httpStatuses';
import { serializer } from './serializer';

export default async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { userId } = req.jwt;

    const review = await service({
      userId,
      userRepository: AppDataSource.manager.withRepository(UserRepository),
    });

    const response = serializer(review);

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
