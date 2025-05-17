import { v4 as uuid } from 'uuid';
import { CarRepositoryInterface } from '../../../../repositories/car.repository';
import { UserRepositoryInterface } from '../../../../repositories/user.repository';
import userNotFoundError from '../../../common/errors/userNotFound.error';
import { CarEntityInterface, Energy } from '../../../../entities/car.entity';

export interface AddCarServiceOptions {
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
}: AddCarServiceOptions): Promise<CarEntityInterface | undefined> => {
  const user = await userRepository.getOneById(userId);
  if (!user) {
    throw userNotFoundError();
  }

  const newCar = await carRepository.createOne({
    id: uuid(),
    plateNumber,
    registrationDate,
    color,
    brand,
    model,
    seats,
    energy,
    isDeleted: false,
    owner: user,
  });

  return newCar;
};
