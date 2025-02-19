import { NextFunction, Response } from 'express';
import { HttpStatuses } from '../../../../core/httpStatuses';
import { ValidatedRequest } from '../../../../core/utils/validatedExpressRequest';

import { AppDataSource } from '../../../../loader/database';
import serializer from './serializer';
import service from './service';
import { CreateTransactionRequest } from './validator';
import { UserRepository } from '../../../../repositories/user.repository';
import { TransactionRepository } from '../../../../repositories/transaction.repository';

type CreateTransactionRequestType = ValidatedRequest<CreateTransactionRequest>;

export default async (
  req: CreateTransactionRequestType,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const transactionData = req.body;

    await service({
      ...transactionData,
      userRepository: AppDataSource.manager.withRepository(UserRepository),
      transactionRepository: AppDataSource.manager.withRepository(TransactionRepository),
    });

    const response = serializer();

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
