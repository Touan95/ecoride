import { NextFunction, Response } from 'express';
import { service } from './service';
import { PutCarRequest } from './validator';
import { ValidatedRequest } from '../../../../core/utils/validatedExpressRequest';
import { AppDataSource } from '../../../../loader/database';
import { UserRepository } from '../../../../repositories/user.repository';
import { HttpStatuses } from '../../../../core/httpStatuses';
import { CarRepository } from '../../../../repositories/car.repository';
import serializer from './serializer';

type PutCarRequestType = ValidatedRequest<PutCarRequest>;

export default async (
  req: PutCarRequestType,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { userId, carId } = req.params;
    const { brand, color, energy, model, plateNumber, registrationDate, seats } = req.body;

    await service({
      carId,
      userId,
      brand,
      color,
      energy,
      model,
      plateNumber,
      registrationDate,
      seats,
      userRepository: AppDataSource.manager.withRepository(UserRepository),
      carRepository: AppDataSource.manager.withRepository(CarRepository),
    });

    const response = serializer();

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
