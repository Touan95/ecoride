import { NextFunction, Response } from 'express';
import serializer from './serializer';
import { service } from './service';
import { ChangeTypeRequest } from './validator';
import { UserRepository } from '../../../repositories/user.repository';
import { AppDataSource } from '../../../loader/database';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ValidatedRequest } from '../../../core/utils/validatedExpressRequest';

type ChangeTypeRequestType = ValidatedRequest<ChangeTypeRequest>;

export default async (
  req: ChangeTypeRequestType,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { userType } = req.body;
    const { userId } = req.jwt;

    await service({
      userId,
      userType,
      userRepository: AppDataSource.manager.withRepository(UserRepository),
    });

    const response = serializer();

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
