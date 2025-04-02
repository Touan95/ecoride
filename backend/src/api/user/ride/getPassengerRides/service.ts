import { RidePassengerEntityInterface } from '../../../../entities/ridePassenger.entity';
import { RidePassengerRepositoryInterface } from '../../../../repositories/ridePassenger.repository';
import { UserRepositoryInterface } from '../../../../repositories/user.repository';
import userNotFoundError from '../../../common/errors/userNotFound.error';

interface GetPassengerRidesService {
  userId: string;
  userRepository: UserRepositoryInterface;
  ridePassengerRepository: RidePassengerRepositoryInterface;
}

export const service = async ({
  userId,
  userRepository,
  ridePassengerRepository,
}: GetPassengerRidesService): Promise<RidePassengerEntityInterface[]> => {
  const user = await userRepository.getOneById(userId);
  if (!user) {
    throw userNotFoundError();
  }

  return await ridePassengerRepository.getAllByPassengerId(userId);
};
