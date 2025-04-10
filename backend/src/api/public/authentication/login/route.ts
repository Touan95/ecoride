import { NextFunction, Response } from 'express';
import { HttpStatuses } from '../../../../core/httpStatuses';
import { ValidatedRequest } from '../../../../core/utils/validatedExpressRequest';

import { AppDataSource } from '../../../../loader/database';
import service from './service';
import { LoginRequest } from './validator';
import { UserRepository } from '../../../../repositories/user.repository';

type LoginRequestType = ValidatedRequest<LoginRequest>;

export default async (
  req: LoginRequestType,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { email, password } = req.body;

    const response = await service({
      email,
      password,
      userRepository: AppDataSource.manager.withRepository(UserRepository),
    });

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
