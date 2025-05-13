import { UpdateUser, UserRepositoryInterface } from '../../../../repositories/user.repository';
import userNotFoundError from '../../../common/errors/userNotFound.error';
import { RideRepositoryInterface, UpdateRide } from '../../../../repositories/ride.repository';
import rideNotFoundError from '../../../common/errors/rideNotFound.error';
import { processTransaction } from '../../../../core/database/processTransaction';
import userNotDriverError from '../../../common/errors/userNotDriver.error';
import rideBalanceIssueError from '../../../common/errors/rideBalanceIssue.error';
import { RideStatus } from '../../../../entities/ride.entity';
import { emailSender } from '../../../../services/emailSender';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';

dayjs.locale('fr');

const checkBalanceGoodForRefund = (ridePrice: number, balance: number, passengerCount: number) => {
  if (passengerCount === 0) return true;
  return balance === ridePrice * passengerCount;
};

export interface CancelPassengerRideServiceOptions {
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
}: CancelPassengerRideServiceOptions): Promise<void> => {
  const user = await userRepository.getOneById(userId);
  if (!user) {
    throw userNotFoundError();
  }

  const ride = await rideRepository.getOneById(rideId);
  if (!ride) {
    throw rideNotFoundError();
  }

  const userIsNotDriver = ride.driver.id !== userId;
  if (userIsNotDriver) {
    throw userNotDriverError();
  }

  const isBalanceGoodForRefund = checkBalanceGoodForRefund(
    ride.price,
    ride.balance,
    ride.reservedSeats ?? 0,
  );
  if (!isBalanceGoodForRefund) {
    throw rideBalanceIssueError();
  }

  const passengers = ride.passengers;

  await processTransaction(async (transactionalEntityManager) => {
    const updateRide: UpdateRide = {
      ...ride,
      balance: 0,
      status: RideStatus.CANCELLED,
    };

    await rideRepository.updateRide(updateRide, transactionalEntityManager);

    const ridePrice = ride.price;

    passengers.map(async (passenger) => {
      const { id: passengerId, ...passengerRest } = passenger;
      const currentPassengerCredits = passenger.credits;
      const newPassengerCredits = currentPassengerCredits + ridePrice;
      const updatePassenger: UpdateUser = {
        ...passengerRest,
        credits: newPassengerCredits,
      };

      await userRepository.updateUser(passengerId, updatePassenger, transactionalEntityManager);
    });
  });

  const formattedEmailDate = dayjs(ride.departureDate).format('dddd D MMMM à HH[h]mm');

  passengers.map(async (passenger) => {
    void emailSender.rideCancelledByDriver({
      arrivalCity: ride.arrivalLocation.city ?? '',
      departureCity: ride.departureLocation.city ?? '',
      departureDate: formattedEmailDate,
      email: passenger.email,
      username: passenger.username,
    });
  });
};
