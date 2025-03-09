import { NextFunction, Response } from 'express';
import { ValidatedRequest } from '../../../../core/utils/validatedExpressRequest';
import { HttpStatuses } from '../../../../core/httpStatuses';
import { AppDataSource } from '../../../../loader/database';
import { DeleteCarRequest } from './validator';
import { service } from './service';
import serializer from './serializer';
import { CarRepository } from '../../../../repositories/car.repository';
import { UserRepository } from '../../../../repositories/user.repository';

type DeleteCarRequestType = ValidatedRequest<DeleteCarRequest>;

export default async (
  req: DeleteCarRequestType,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { carId, userId } = req.params;

    await service({
      carId,
      userId,
      carRepository: AppDataSource.manager.withRepository(CarRepository),
      userRepository: AppDataSource.manager.withRepository(UserRepository),
    });

    const response = serializer();

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
