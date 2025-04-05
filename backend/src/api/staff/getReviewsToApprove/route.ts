import { NextFunction, Response, Request } from 'express';
import { service } from './service';
import { serializer } from './serializer';
import { AppDataSource } from '../../../loader/database';
import { UserRepository } from '../../../repositories/user.repository';
import { HttpStatuses } from '../../../core/httpStatuses';

export default async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { userId } = req.jwt;

    const reviews = await service({
      userId,
      userRepository: AppDataSource.manager.withRepository(UserRepository),
    });

    const response = serializer(reviews);

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
