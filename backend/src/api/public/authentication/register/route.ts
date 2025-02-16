import { NextFunction, Response } from 'express';
import { HttpStatuses } from '../../../../core/httpStatuses';
import { ValidatedRequest } from '../../../../core/utils/validatedExpressRequest';

import { AppDataSource } from '../../../../loader/database';
import service from './service';
import { RegisterRequest } from './validator';
import { UserRepository } from '../../../../repositories/user.repository';

type RegisterRequestType = ValidatedRequest<RegisterRequest>;

export default async (
  req: RegisterRequestType,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { email, password, username } = req.body;

    const response = await service({
      email,
      password,
      username,
      userRepository: AppDataSource.manager.withRepository(UserRepository),
    });

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
