import { NextFunction, Response } from 'express';
import { service } from './service';
import { GetUserRequest } from './validator';
import { serializer } from './serializer';
import { ValidatedRequest } from '../../../core/utils/validatedExpressRequest';
import { AppDataSource } from '../../../loader/database';
import { UserRepository } from '../../../repositories/user.repository';
import { HttpStatuses } from '../../../core/httpStatuses';

type GetUserRequestType = ValidatedRequest<GetUserRequest>;

export default async (
  req: GetUserRequestType,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { userId } = req.params;

    const user = await service({
      userId,
      userRepository: AppDataSource.manager.withRepository(UserRepository),
    });

    const response = serializer(user);

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
