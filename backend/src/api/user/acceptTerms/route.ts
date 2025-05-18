import { NextFunction, Response } from 'express';
import serializer from './serializer';
import { service } from './service';
import { AcceptTermsRequest } from './validator';
import { UserRepository } from '../../../repositories/user.repository';
import { AppDataSource } from '../../../loader/database';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ValidatedRequest } from '../../../core/utils/validatedExpressRequest';

type AcceptTermsRequestType = ValidatedRequest<AcceptTermsRequest>;

export default async (
  req: AcceptTermsRequestType,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { termsAccepted } = req.body;
    const { userId } = req.jwt;

    await service({
      userId,
      termsAccepted,
      userRepository: AppDataSource.manager.withRepository(UserRepository),
    });

    const response = serializer();

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
