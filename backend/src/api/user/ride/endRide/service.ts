import { UserRepositoryInterface } from '../../../../repositories/user.repository';
import userNotFoundError from '../../../common/errors/userNotFound.error';
import { RideRepositoryInterface, UpdateRide } from '../../../../repositories/ride.repository';
import rideNotFoundError from '../../../common/errors/rideNotFound.error';
import userNotDriverError from '../../../common/errors/userNotDriver.error';
import { RideStatus } from '../../../../entities/ride.entity';
import rideEndStatusError from '../../../common/errors/rideEndStatus.error';
import { emailSender } from '../../../../services/emailSender';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
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

  const endDate = new Date();

  const updateRide: UpdateRide = {
    ...ride,
    status: RideStatus.COMPLETED,
    endDate,
  };
  await rideRepository.updateRide(updateRide);

  const passengers = ride.passengers;

  const formattedEmailDate = dayjs(endDate).tz('Europe/Paris').format('dddd D MMMM à HH[h]mm');

  passengers.map(async (passenger) => {
    void emailSender.rideCompleted({
      departureCity: ride.departureLocation.city ?? '',
      arrivalCity: ride.arrivalLocation.city ?? '',
      endDate: formattedEmailDate,

      email: passenger.email,
      username: passenger.username,
      rideId: ride.id,
    });
  });
};
