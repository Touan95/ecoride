import { NextFunction, Response } from 'express';
import { service } from './service';
import { GetUserForAdminRequest } from './validator';
import { serializer } from './serializer';
import { ValidatedRequest } from '../../../core/utils/validatedExpressRequest';
import { AppDataSource } from '../../../loader/database';
import { UserRepository } from '../../../repositories/user.repository';
import { HttpStatuses } from '../../../core/httpStatuses';

type GetUserForAdminRequestType = ValidatedRequest<GetUserForAdminRequest>;

export default async (
  req: GetUserForAdminRequestType,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { username, email, staffOnly, notStaff } = req.query;
    const { userId: adminId } = req.jwt;

    const user = await service({
      username,
      email,
      adminId,
      staffOnly,
      notStaff,
      userRepository: AppDataSource.manager.withRepository(UserRepository),
    });

    const response = serializer(user);

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
