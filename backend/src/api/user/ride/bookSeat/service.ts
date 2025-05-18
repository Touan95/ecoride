import { v4 as uuid } from 'uuid';
import { UpdateUser, UserRepositoryInterface } from '../../../../repositories/user.repository';
import userNotFoundError from '../../../common/errors/userNotFound.error';
import { RideRepositoryInterface, UpdateRide } from '../../../../repositories/ride.repository';
import rideNotFoundError from '../../../common/errors/rideNotFound.error';
import userAlreadyPassengerError from '../../../common/errors/userAlreadyPassenger.error';
import rideFullyBookedError from '../../../common/errors/rideFullyBooked.error';
import userIsTheDriverError from '../../../common/errors/userIsTheDriver.error';
import { processTransaction } from '../../../../core/database/processTransaction';
import userInsufficientCreditsError from '../../../common/errors/userInsufficientCredits.error';
import { RidePassengerRepositoryInterface } from '../../../../repositories/ridePassenger.repository';
import { RidePassengerEntityInterface } from '../../../../entities/ridePassenger.entity';
import ridePassengerEmailShareNotAcceptedError from '../../../common/errors/ridePassengerEmailShareNotAccepted.error';
import { emailSender } from '../../../../services/emailSender';
import dayjs from 'dayjs';

export interface BookSeatServiceOptions {
  userId: string;
  rideId: string;
  emailShareAccepted: boolean;
  userRepository: UserRepositoryInterface;
  rideRepository: RideRepositoryInterface;
  ridePassengerRepository: RidePassengerRepositoryInterface;
}

export const service = async ({
  userId,
  rideId,
  emailShareAccepted,
  userRepository,
  rideRepository,
  ridePassengerRepository,
}: BookSeatServiceOptions): Promise<void> => {
  // Vérifie que l'utilisateur existe
  const user = await userRepository.getOneById(userId);
  if (!user) {
    throw userNotFoundError();
  }

  // Vérifie que le trajet existe
  const ride = await rideRepository.getOneById(rideId);
  if (!ride) {
    throw rideNotFoundError();
  }

  // Vérifie que l'utilisateur n'est pas le conducteur du trajet
  const rideDriver = ride.driver;
  const isUserTheDriver = rideDriver.id === user.id;
  if (isUserTheDriver) {
    throw userIsTheDriverError();
  }

  // Vérifie que l'utilisateur n'est pas déjà passager du trajet
  const currentPassengers = ride.passengers;
  const isUserAlreadyPassenger = !!currentPassengers.find((passenger) => passenger.id === userId);
  if (isUserAlreadyPassenger) {
    throw userAlreadyPassengerError();
  }

  // Vérifie que le trajet a encore des places disponibles
  const seatsLeft = ride.car.seats - (ride.reservedSeats ?? 0);
  if (seatsLeft < 1) {
    throw rideFullyBookedError();
  }

  // Vérifie que l'utilisateur a suffisamment de crédits
  const currentUserCredits = user.credits;
  const ridePrice = ride.price;
  if (currentUserCredits < ridePrice) {
    throw userInsufficientCreditsError();
  }

  // Vérifie que l'utilisateur a accepté la partage de son adresse e-mail
  if (!emailShareAccepted) {
    throw ridePassengerEmailShareNotAcceptedError();
  }

  // Effectue la transaction
  // L'ensemble des opérations doit aboutir ou toutes les opérations seront annulées
  await processTransaction(async (transactionalEntityManager) => {
    const newPassengers = [...currentPassengers, user];
    const currentRideBalance = ride.balance;
    const newUserCredits = currentUserCredits - ridePrice;
    const newRideBalance = currentRideBalance + ridePrice;
    const now = new Date();

    // Met à jour le trajet
    const updateRide: UpdateRide = {
      ...ride,
      passengers: newPassengers,
      balance: newRideBalance,
      reservedSeats: newPassengers.length,
    };

    // Met à jour l'utilisateur
    const updateUser: UpdateUser = {
      ...user,
      credits: newUserCredits,
    };

    // Récupère le passager existant
    const ridePassenger = await ridePassengerRepository.getOneByIds(userId, rideId);

    // Crée un nouveau passager
    const newRidePassenger: RidePassengerEntityInterface = {
      id: ridePassenger?.id ?? uuid(),
      canceled: false,
      createdAt: now,
      user,
      ride,
      updatedAt: now,
      emailShareAccepted: true,
      emailShareAcceptedDate: ridePassenger?.emailShareAcceptedDate ?? now,
    };

    // Met à jour le trajet
    await rideRepository.updateRide(updateRide, transactionalEntityManager);

    // Met à jour l'utilisateur
    await userRepository.updateUser(userId, updateUser, transactionalEntityManager);

    // Crée le nouveau passager
    await ridePassengerRepository.createOrUpdate(newRidePassenger, transactionalEntityManager);
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
  void emailSender.driverBookingConfirmation({
    departureCity,
    arrivalCity,
    departureDate,
    username: driverUsername,
    email: driverEmail,
    passengerEmail,
    passengerUsername,
  });

  // Envoie l'e-mail de confirmation au passager
  void emailSender.passengerBookingConfirmation({
    departureCity,
    arrivalCity,
    departureDate,
    username: passengerUsername,
    email: passengerEmail,
  });
};
