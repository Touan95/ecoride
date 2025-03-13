import { NextFunction, Response } from 'express';
import { service } from './service';
import { AddRideRequest } from './validator';
import { ValidatedRequest } from '../../../../core/utils/validatedExpressRequest';
import { AppDataSource } from '../../../../loader/database';
import { UserRepository } from '../../../../repositories/user.repository';
import { HttpStatuses } from '../../../../core/httpStatuses';
import serializer from './serializer';
import { RideRepository } from '../../../../repositories/ride.repository';
import { CarRepository } from '../../../../repositories/car.repository';

type AddRideRequestType = ValidatedRequest<AddRideRequest>;

export default async (
  req: AddRideRequestType,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { userId } = req.params;
    const { arrivalLocation, carId, departureLocation, price, arrivalDate, departureDate } = req.body;

    await service({
      userId,
      arrivalLocation,
      departureLocation,
      carId,
      price,
      arrivalDate,
      departureDate,
      userRepository: AppDataSource.manager.withRepository(UserRepository),
      rideRepository: AppDataSource.manager.withRepository(RideRepository),
      carRepository: AppDataSource.manager.withRepository(CarRepository),
    });

    const response = serializer();

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
