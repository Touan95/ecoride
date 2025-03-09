import { Energy } from '../../../entities/car.entity';
import { CarRepositoryInterface } from '../../../repositories/car.repository';
import { UserRepositoryInterface } from '../../../repositories/user.repository';
import userNotFoundError from '../../common/errors/userNotFound.error';
import carNotFoundError from '../../common/errors/carNotFound.error';

export interface AddCarServiceOptions {
  carId: string;
  userId: string;
  plateNumber: string;
  registrationDate: Date;
  color: string;
  brand: string;
  model: string;
  seats: number;
  energy: Energy;
  userRepository: UserRepositoryInterface;
  carRepository: CarRepositoryInterface;
}

export const service = async ({
  carId,
  userId,
  plateNumber,
  registrationDate,
  color,
  brand,
  model,
  seats,
  energy,
  userRepository,
  carRepository,
}: AddCarServiceOptions): Promise<void> => {
  const user = await userRepository.getOneById(userId);
  if (!user) {
    throw userNotFoundError();
  }

  const car = await carRepository.getOneById(carId);
  if (!car) {
    throw carNotFoundError();
  }

  const updatedCar = {
    ...car,
    plateNumber,
    registrationDate,
    color,
    brand,
    model,
    seats,
    energy,
  };

  await carRepository.updateCar(carId, updatedCar);
};
