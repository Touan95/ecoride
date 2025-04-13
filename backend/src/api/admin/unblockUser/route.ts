import { NextFunction, Response } from 'express';
import { service } from './service';
import { UserRepository } from '../../../repositories/user.repository';
import { AppDataSource } from '../../../loader/database';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ValidatedRequest } from '../../../core/utils/validatedExpressRequest';
import { UnblockUserRequest } from './validator';
import serializer from './serializer';

type UnblockUserRequestType = ValidatedRequest<UnblockUserRequest>;

export default async (
  req: UnblockUserRequestType,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { userId } = req.params;
    const { userId: adminId } = req.jwt;

    await service({
      adminId,
      userId,
      userRepository: AppDataSource.manager.withRepository(UserRepository),
    });

    const response = serializer();

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
