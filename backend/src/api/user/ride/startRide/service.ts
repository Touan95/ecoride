import { UserRepositoryInterface } from '../../../../repositories/user.repository';
import userNotFoundError from '../../../common/errors/userNotFound.error';
import { RideRepositoryInterface, UpdateRide } from '../../../../repositories/ride.repository';
import rideNotFoundError from '../../../common/errors/rideNotFound.error';
import userNotDriverError from '../../../common/errors/userNotDriver.error';
import rideStartTooSoonError from '../../../common/errors/rideStartTooSoon.error';
import { RideStatus } from '../../../../entities/ride.entity';
import rideStartStatusError from '../../../common/errors/rideStartStatus.error';

const checkCanStartRideTime = (departureDate: Date, nowDate: Date) => {
  const departureTime = departureDate.getTime();
  const now = nowDate.getTime();

  return now >= departureTime - 60 * 60 * 1000;
};

export interface StartRideServiceOptions {
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
}: StartRideServiceOptions): Promise<void> => {
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

  const canStartRideStatus = ride.status === RideStatus.UPCOMING;
  if (!canStartRideStatus) {
    throw rideStartStatusError();
  }

  const now = new Date();
  const canStartRideTime = checkCanStartRideTime(ride.departureDate, now);
  if (!canStartRideTime) {
    throw rideStartTooSoonError();
  }

  const updateRide: UpdateRide = {
    ...ride,
    status: RideStatus.ONGOING,
    startDate: now,
  };
  await rideRepository.updateRide(updateRide);
};
