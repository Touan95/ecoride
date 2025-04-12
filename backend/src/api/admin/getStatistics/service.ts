import { DailyStatistics } from '../../../entities/ride.entity';
import { RideRepositoryInterface } from '../../../repositories/ride.repository';
import { UserRepositoryInterface } from '../../../repositories/user.repository';
import userNotAdminError from '../../common/errors/userNotAdmin.error';
import userNotFoundError from '../../common/errors/userNotFound.error';

interface GetStatisticsOptions {
  userId: string;
  userRepository: UserRepositoryInterface;
  rideRepository: RideRepositoryInterface;
}

export const service = async ({
  userId,
  userRepository,
  rideRepository,
}: GetStatisticsOptions): Promise<DailyStatistics[]> => {
  const user = await userRepository.getOneById(userId);
  if (!user) {
    throw userNotFoundError();
  }

  if (!user.isAdmin) {
    throw userNotAdminError();
  }

  const statistics = await rideRepository.getDailyStatistics();

  return statistics;
};
