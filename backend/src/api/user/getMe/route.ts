import type { NextFunction, Response, Request } from 'express';
import { AppDataSource } from '../../../loader/database';
import { UserRepository } from '../../../repositories/user.repository';
import { HttpStatuses } from '../../../core/httpStatuses';
import service from './service';
import serializer from './serializer';

export default async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { userId } = req.jwt;

    const getMe = await service({
      userId,
      userRepository: AppDataSource.manager.withRepository(UserRepository),
    });

    const response = serializer(getMe.user);

    return res.status(HttpStatuses.OK).send(response);
  } catch (error) {
    return next(error);
  }
};
