import { NextFunction, Response } from 'express';
import serializer from './serializer';
import { service } from './service';
import { ChangePasswordRequest } from './validator';
import { UserRepository } from '../../../repositories/user.repository';
import { AppDataSource } from '../../../loader/database';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ValidatedRequest } from '../../../core/utils/validatedExpressRequest';

type ChangePasswordRequestType = ValidatedRequest<ChangePasswordRequest>;

export default async (
  req: ChangePasswordRequestType,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { newPassword, oldPassword } = req.body;
    const { userId } = req.jwt;

    await service({
      userId,
      oldPassword,
      newPassword,
      userRepository: AppDataSource.manager.withRepository(UserRepository),
    });

    const response = serializer();

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
