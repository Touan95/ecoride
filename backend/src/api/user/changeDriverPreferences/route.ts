import { NextFunction, Response } from 'express';
import serializer from './serializer';
import { service } from './service';
import { ChangeDriverPreferencesRequest } from './validator';
import { UserRepository } from '../../../repositories/user.repository';
import { AppDataSource } from '../../../loader/database';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ValidatedRequest } from '../../../core/utils/validatedExpressRequest';

type ChangeDriverPreferencesRequestType = ValidatedRequest<ChangeDriverPreferencesRequest>;

export default async (
  req: ChangeDriverPreferencesRequestType,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { acceptsPets, acceptsSmoking, customRules } = req.body;
    const { userId } = req.jwt;

    await service({
      userId,
      acceptsPets,
      acceptsSmoking,
      customRules,
      userRepository: AppDataSource.manager.withRepository(UserRepository),
    });

    const response = serializer();

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
