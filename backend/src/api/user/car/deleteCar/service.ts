import { RideStatus } from '../../../../entities/ride.entity';
import { CarRepositoryInterface } from '../../../../repositories/car.repository';
import { RideRepositoryInterface } from '../../../../repositories/ride.repository';
import { UserRepositoryInterface } from '../../../../repositories/user.repository';
import userCarAlreadyDeletedError from '../../../common/errors/userCarAlreadyDeleted.error';
import userCarBlockedByRideError from '../../../common/errors/userCarBlockedByRide.error';
import userCarNotFoundError from '../../../common/errors/userCarNotFound.error';
import userNotFoundError from '../../../common/errors/userNotFound.error';

export interface DeleteCarServiceOptions {
  carId: string;
  userId: string;
  carRepository: CarRepositoryInterface;
  userRepository: UserRepositoryInterface;
  rideRepository: RideRepositoryInterface;
}

export const service = async ({
  carId,
  carRepository,
  userId,
  userRepository,
  rideRepository,
}: DeleteCarServiceOptions): Promise<void> => {
  const user = await userRepository.getOneById(userId);
  if (!user) {
    throw userNotFoundError();
  }

  const car = await carRepository.getOneById(carId);
  if (!car) {
    throw userCarNotFoundError();
  }

  if (car.isDeleted) {
    throw userCarAlreadyDeletedError();
  }

  const carRides = await rideRepository.getAllByCarId(carId);

  if (carRides.length > 0) {
    const blockingRide = carRides.find(
      (ride) => ride.status === RideStatus.UPCOMING || ride.status === RideStatus.ONGOING,
    );

    if (blockingRide) {
      throw userCarBlockedByRideError();
    }
  }

  await carRepository.deleteOne(carId);
};
