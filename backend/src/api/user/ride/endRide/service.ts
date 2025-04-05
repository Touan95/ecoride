import { UserRepositoryInterface } from '../../../../repositories/user.repository';
import userNotFoundError from '../../../common/errors/userNotFound.error';
import { RideRepositoryInterface, UpdateRide } from '../../../../repositories/ride.repository';
import rideNotFoundError from '../../../common/errors/rideNotFound.error';
import userNotDriverError from '../../../common/errors/userNotDriver.error';
import { RideStatus } from '../../../../entities/ride.entity';
import rideEndStatusError from '../../../common/errors/rideEndStatus.error';

export interface EndRideServiceOptions {
  userId: string;
  rideId: string;
  userRepository: UserRepositoryInterface;
  rideRepository: RideRepositoryInterface;
}

export const service = async ({
  userId,
  rideId,
  userRepository,
  rideRepository,
}: EndRideServiceOptions): Promise<void> => {
  const user = await userRepository.getOneById(userId);
  if (!user) {
    throw userNotFoundError();
  }

  const ride = await rideRepository.getOneById(rideId);
  if (!ride) {
    throw rideNotFoundError();
  }

  const isUserTheDriver = ride.driver.id === user.id;
  if (!isUserTheDriver) {
    throw userNotDriverError();
  }

  const canEndRideStatus = ride.status === RideStatus.ONGOING;
  if (!canEndRideStatus) {
    throw rideEndStatusError();
  }

  const updateRide: UpdateRide = {
    ...ride,
    status: RideStatus.COMPLETED,
    endDate: new Date(),
  };
  await rideRepository.updateRide(updateRide);
};
