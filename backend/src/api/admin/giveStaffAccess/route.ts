import { NextFunction, Response } from 'express';
import { service } from './service';
import { UserRepository } from '../../../repositories/user.repository';
import { AppDataSource } from '../../../loader/database';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ValidatedRequest } from '../../../core/utils/validatedExpressRequest';
import { GiveStaffAccessRequest } from './validator';
import serializer from './serializer';

type GiveStaffAccessRequestType = ValidatedRequest<GiveStaffAccessRequest>;

export default async (
  req: GiveStaffAccessRequestType,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { email } = req.params;
    const { userId: adminId } = req.jwt;

    await service({
      adminId,
      email,
      userRepository: AppDataSource.manager.withRepository(UserRepository),
    });

    const response = serializer();

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
