import { NextFunction, Response } from 'express';
import { HttpStatuses } from '../../../../core/httpStatuses';
import { ValidatedRequest } from '../../../../core/utils/validatedExpressRequest';

import { AppDataSource } from '../../../../loader/database';
import { UserRepository } from '../../../../repositories/user.repository';
import { IRefreshRequest } from './validator';
import service from './service';

type RefreshRequest = ValidatedRequest<IRefreshRequest>;

export default async (
  req: RefreshRequest,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { accessToken, refreshToken } = req.body;

    const response = await service({
      accessToken,
      refreshToken,
      userRepository: AppDataSource.manager.withRepository(UserRepository),
    });

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
