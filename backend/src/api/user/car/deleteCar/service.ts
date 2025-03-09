import { CarRepositoryInterface } from '../../../../repositories/car.repository';
import { UserRepositoryInterface } from '../../../../repositories/user.repository';
import userNotFoundError from '../../../common/errors/userNotFound.error';

export interface DeleteCarServiceOptions {
  carId: string;
  userId: string;
  carRepository: CarRepositoryInterface;
  userRepository: UserRepositoryInterface;
}

export const service = async ({
  carId,
  carRepository,
  userId,
  userRepository
}: DeleteCarServiceOptions): Promise<void> => {
  const user = await userRepository.getOneById(userId);
    if (!user) {
      throw userNotFoundError();
    }

  await carRepository.deleteOne(carId);
};
