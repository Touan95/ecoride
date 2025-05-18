import { UpdateUser, UserRepositoryInterface } from '../../../../repositories/user.repository';
import userNotFoundError from '../../../common/errors/userNotFound.error';
import { RideRepositoryInterface, UpdateRide } from '../../../../repositories/ride.repository';
import rideNotFoundError from '../../../common/errors/rideNotFound.error';
import { processTransaction } from '../../../../core/database/processTransaction';
import { RidePassengerRepositoryInterface } from '../../../../repositories/ridePassenger.repository';
import userNotPassengerError from '../../../common/errors/userNotPassenger.error';
import ridePassengerNotFoundError from '../../../common/errors/ridePassengerNotFound.error';
import { emailSender } from '../../../../services/emailSender';
import dayjs from 'dayjs';

export interface CancelPassengerRideServiceOptions {
  userId: string;
  rideId: string;
  userRepository: UserRepositoryInterface;
  rideRepository: RideRepositoryInterface;
  ridePassengerRepository: RidePassengerRepositoryInterface;
}

export const service = async ({
  userId,
  rideId,
  userRepository,
  rideRepository,
  ridePassengerRepository,
}: CancelPassengerRideServiceOptions): Promise<void> => {
  const user = await userRepository.getOneById(userId);
  if (!user) {
    throw userNotFoundError();
  }

  const ride = await rideRepository.getOneById(rideId);
  if (!ride) {
    throw rideNotFoundError();
  }

  const ridePassenger = await ridePassengerRepository.getOneByIds(userId, rideId);
  if (!ridePassenger) {
    throw ridePassengerNotFoundError();
  }

  const currentPassengers = ride.passengers;
  const userIsNotPassenger = !currentPassengers.find((passenger) => passenger.id === userId);
  if (userIsNotPassenger) {
    throw userNotPassengerError();
  }

  await processTransaction(async (transactionalEntityManager) => {
    const currentUserCredits = user.credits;
    const ridePrice = ride.price;
    const newPassengers = currentPassengers.filter((passenger) => passenger.id !== userId);
    const currentRideBalance = ride.balance;
    const newUserCredits = currentUserCredits + ridePrice;
    const newRideBalance = currentRideBalance - ridePrice;
    const now = new Date();

    const updateRide: UpdateRide = {
      ...ride,
      passengers: newPassengers,
      balance: newRideBalance,
      reservedSeats: newPassengers.length,
    };

    const updateUser: UpdateUser = {
      ...user,
      credits: newUserCredits,
    };

    const updateRidePassenger = {
      ...ridePassenger,
      canceled: true,
      updatedAt: now,
    };

    await rideRepository.updateRide(updateRide, transactionalEntityManager);
    await userRepository.updateUser(userId, updateUser, transactionalEntityManager);
    await ridePassengerRepository.createOrUpdate(updateRidePassenger, transactionalEntityManager);
  });

  // Envoi des e-mails si la transaction a abouti
  // Récupère les informations pour les e-mails
  const departureDate = dayjs(ride.departureDate).format('dddd D MMMM à HH[h]mm');
  const departureCity = ride.departureLocation.city ?? '';
  const arrivalCity = ride.arrivalLocation.city ?? '';
  const passengerUsername = user.username;
  const passengerEmail = user.email;
  const driverUsername = ride.driver.username;
  const driverEmail = ride.driver.email;

  // Envoie l'e-mail de confirmation au conducteur
  void emailSender.driverBookingCancelled({
    departureCity,
    arrivalCity,
    departureDate,
    username: driverUsername,
    email: driverEmail,
    passengerEmail,
    passengerUsername,
  });

  // Envoie l'e-mail de confirmation au passager
  void emailSender.passengerBookingCancelled({
    departureCity,
    arrivalCity,
    departureDate,
    username: passengerUsername,
    email: passengerEmail,
  });
};
