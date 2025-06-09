import { v4 as uuid } from 'uuid';
import { processTransaction } from '../../../core/database';
import RideReview from '../../../models/rideReview.model';
import { PlatformCreditRepositoryInterface } from '../../../repositories/platformCredit.repository';
import { RideRepositoryInterface, UpdateRide } from '../../../repositories/ride.repository';
import { UpdateUser, UserRepositoryInterface } from '../../../repositories/user.repository';
import { SERVICE_FEE } from '../../../utils/serviceFee';
import reviewAlreadyApprovedError from '../../common/errors/reviewAlreadyApproved.error';
import rideNotFoundError from '../../common/errors/rideNotFound.error';
import userNotFoundError from '../../common/errors/userNotFound.error';
import userNotStaffError from '../../common/errors/userNotStaff.error';
import { PlatformCreditEntityInterface } from '../../../entities/plateformCredit.entity';
import dayjs from 'dayjs';
import { emailSender } from '../../../services/emailSender';

interface ResolveDisputeOptions {
  reviewId: string;
  userId: string;
  refundPassenger: boolean;
  approveReview: boolean;
  userRepository: UserRepositoryInterface;
  rideRepository: RideRepositoryInterface;
  platformCreditRepository: PlatformCreditRepositoryInterface;
}

export const service = async ({
  reviewId,
  userId,
  refundPassenger,
  approveReview,
  userRepository,
  rideRepository,
  platformCreditRepository,
}: ResolveDisputeOptions): Promise<void> => {
  // Vérifie si l'utilisateur existe
  const user = await userRepository.getOneById(userId);
  if (!user) {
    throw userNotFoundError();
  }

  // Vérifie si l'utilisateur est un staff
  if (!user.isStaff) {
    throw userNotStaffError();
  }

  // Effectue les opérations dans une transaction
  // Récupère ride, passenger et driver si la transaction a abouti
  const { ride, driver, passenger } = await processTransaction(
    async (transactionalEntityManager) => {
      // Récupère l'avis et met à jour son statut
      const updatedReview = await RideReview.findOneAndUpdate(
        { _id: reviewId, approved: null },
        { $set: { approved: approveReview } },
        { new: true, projection: { driverId: 1, rideId: 1, userId: 1 } },
      );

      // Vérifie si l'avis n'a pas déjà été approuvé
      if (!updatedReview) {
        throw reviewAlreadyApprovedError();
      }

      // Récupère l'identifiant du conducteur, du passager et du trajet
      const driverId = updatedReview?.driverId;
      const passengerId = updatedReview?.userId;
      const rideId = updatedReview?.rideId;

      // Vérifie que l'Id du conducteur existe
      if (!driverId) {
        throw userNotFoundError();
      }

      // Vérifie que l'Id du passager existe
      if (!passengerId) {
        throw userNotFoundError();
      }

      // Vérifie que l'Id du trajet existe
      if (!rideId) {
        throw rideNotFoundError();
      }

      // Récupère la moyenne des notes du conducteur
      const driverRatingsResult = await RideReview.aggregate([
        // Filtre les avis dont le driverId est celui du conducteur et qui ont été approuvés
        { $match: { driverId, approved: true } },
        // Calcule la moyenne des notes des avis récupérés
        { $group: { _id: '$driverId', averageRating: { $avg: '$rating' } } },
      ]);

      // Si aucun avis n'a été trouvé, la note moyenne est de 0
      const averageRating =
        driverRatingsResult.length > 0 ? (driverRatingsResult[0].averageRating as number) : 0;

      // Récupère le conducteur
      const driver = await userRepository.getOneById(driverId);
      // Vérifie que le conducteur existe
      if (!driver) {
        throw userNotFoundError();
      }

      // Récupère le passager
      const passenger = await userRepository.getOneById(passengerId);
      // Vérifie que le passager existe
      if (!passenger) {
        throw userNotFoundError();
      }

      // Récupère le trajet
      const ride = await rideRepository.getOneById(rideId);
      // Vérifie que le trajet existe
      if (!ride) {
        throw rideNotFoundError();
      }

      // Vérifie si le service a déjà été payé
      const hasAlreadyPaidService = ride.servicePaid;

      // Calcule la commission du service à appliquer
      const appliedServiceFee = hasAlreadyPaidService || refundPassenger ? 0 : SERVICE_FEE;

      // Récupère le prix du trajet
      const ridePrice = ride.price;

      // Récupère le solde initial du trajet
      const initialRideBalance = ride.balance;

      // Récupère le solde initial du conducteur
      const initialDriverCredits = driver.credits;

      // Calcule les gains sur le trajet pour le conducteur
      const driverRideEarnings = refundPassenger ? 0 : ridePrice;

      // Récupère le solde initial du passager
      const initialPassengerCredits = passenger.credits;

      // Calcule le montant du remboursement pour le passager
      const passengerRefundAmount = refundPassenger ? ridePrice : 0;

      // Si le service n'a pas été payé et que le passager n'a pas été remboursé, on crée une nouvelle commission
      if (!hasAlreadyPaidService && !refundPassenger) {
        const newPlatformCredit: PlatformCreditEntityInterface = {
          id: uuid(),
          createdAt: new Date(),
          credit: appliedServiceFee,
          ride,
        };

        await platformCreditRepository.createOne(newPlatformCredit, transactionalEntityManager);
      }

      // Crée un conducteur avec le solde et la note moyenne mis à jour
      const updatedDriverCreditsAndRating: UpdateUser = {
        ...driver,
        rate: averageRating,
        credits: initialDriverCredits + driverRideEarnings - appliedServiceFee,
      };

      // Crée un passager avec le solde mis à jour
      const updatedPassengerCredits: UpdateUser = {
        ...passenger,
        credits: initialPassengerCredits + passengerRefundAmount,
      };

      // Crée un trajet avec le solde et la commission mis à jour
      const updateRideBalance: UpdateRide = {
        ...ride,
        balance: initialRideBalance - ridePrice,
        servicePaid: refundPassenger ? hasAlreadyPaidService : true,
      };

      // Met à jour le conducteur
      await userRepository.updateUser(
        driverId,
        updatedDriverCreditsAndRating,
        transactionalEntityManager,
      );

      // Met à jour le passager
      await userRepository.updateUser(
        passengerId,
        updatedPassengerCredits,
        transactionalEntityManager,
      );

      // Met à jour le trajet
      await rideRepository.updateRide(updateRideBalance);

      return { ride, driver, passenger };
    },
  );

  // Envoi des e-mails si la transaction a abouti
  // Récupère les informations pour les e-mails
  const departureDate = dayjs(ride.departureDate)
    .tz('Europe/Paris')
    .format('dddd D MMMM à HH[h]mm');
  const departureCity = ride.departureLocation.city ?? '';
  const arrivalCity = ride.arrivalLocation.city ?? '';
  const passengerUsername = passenger.username;
  const passengerEmail = passenger.email;
  const driverUsername = driver.username;
  const driverEmail = driver.email;

  // Envoie l'e-mail de confirmation au conducteur
  void emailSender.driverResolvedDispute({
    departureCity,
    arrivalCity,
    departureDate,
    username: driverUsername,
    email: driverEmail,
    passengerUsername,
    refundPassenger,
    approveReview,
  });

  // Envoie l'e-mail de confirmation au passager
  void emailSender.passengerResolvedDispute({
    departureCity,
    arrivalCity,
    departureDate,
    username: passengerUsername,
    email: passengerEmail,
    refundPassenger,
    approveReview,
  });
};
