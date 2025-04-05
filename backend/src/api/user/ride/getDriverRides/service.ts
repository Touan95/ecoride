import { RideEntityInterface } from '../../../../entities/ride.entity';
import { RideRepositoryInterface } from '../../../../repositories/ride.repository';
import { UserRepositoryInterface } from '../../../../repositories/user.repository';
import userNotFoundError from '../../../common/errors/userNotFound.error';

interface GetDriverRidesService {
  userId: string;
  userRepository: UserRepositoryInterface;
  rideRepository: RideRepositoryInterface;
}

export const service = async ({
  userId,
  userRepository,
  rideRepository,
}: GetDriverRidesService): Promise<RideEntityInterface[]> => {
  const user = await userRepository.getOneById(userId);
  if (!user) {
    throw userNotFoundError();
  }

  return rideRepository.getAllByDriverId(userId);
};
