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

interface ApproveReviewOptions {
  reviewId: string;
  userId: string;
  userRepository: UserRepositoryInterface;
  rideRepository: RideRepositoryInterface;
  platformCreditRepository: PlatformCreditRepositoryInterface;
}

export const service = async ({
  reviewId,
  userId,
  userRepository,
  rideRepository,
  platformCreditRepository,
}: ApproveReviewOptions): Promise<void> => {
  // Vérifie que l'utilisateur existe
  const user = await userRepository.getOneById(userId);
  if (!user) {
    throw userNotFoundError();
  }

  // Vérifie que l'utilisateur est un staff
  if (!user.isStaff) {
    throw userNotStaffError();
  }

  // Effectue les opérations dans une transaction
  // Récupère ride, passenger et driver si la transaction a abouti
  const { ride, passenger, driver } = await processTransaction(
    async (transactionalEntityManager) => {
      // Récupère l'avis et met à jour son statut
      const updatedReview = await RideReview.findOneAndUpdate(
        { _id: reviewId, approved: null },
        { $set: { approved: true } },
        { new: true, projection: { driverId: 1, rideId: 1, userId: 1 } },
      );

      // Vérifie si l'avis n'a pas déjà été approuvé
      if (!updatedReview) {
        throw reviewAlreadyApprovedError();
      }

      // Récupère l'identifiant du conducteur et du trajet
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
      const appliedServiceFee = hasAlreadyPaidService ? 0 : SERVICE_FEE;

      // Récupère le prix du trajet
      const ridePrice = ride.price;

      // Récupère le solde initial du trajet et du conducteur
      const initialRideBalance = ride.balance;
      const initialDriverCredits = driver.credits;

      // Si le service n'a pas été payé, on crée une nouvelle commission
      if (!hasAlreadyPaidService) {
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
        credits: initialDriverCredits + ridePrice - appliedServiceFee,
      };

      // Crée un trajet avec le solde et la commission mis à jour
      const updateRideBalance: UpdateRide = {
        ...ride,
        balance: initialRideBalance - ridePrice,
        servicePaid: true,
      };

      // Met à jour le conducteur
      await userRepository.updateUser(
        driverId,
        updatedDriverCreditsAndRating,
        transactionalEntityManager,
      );

      // Met à jour le trajet
      await rideRepository.updateRide(updateRideBalance);

      return { ride, passenger, driver };
    },
  );

  // Envoi des e-mails si la transaction a abouti
  // Récupère les informations pour les e-mails
  const departureDate = dayjs(ride.departureDate).format('dddd D MMMM à HH[h]mm');
  const departureCity = ride.departureLocation.city ?? '';
  const arrivalCity = ride.arrivalLocation.city ?? '';
  const passengerUsername = passenger.username;
  const passengerEmail = passenger.email;
  const driverUsername = driver.username;
  const driverEmail = driver.email;

  // Envoie l'e-mail de confirmation au conducteur
  void emailSender.driverApprovedReview({
    departureCity,
    arrivalCity,
    departureDate,
    username: driverUsername,
    email: driverEmail,
    passengerUsername,
  });

  // Envoie l'e-mail de confirmation au passager
  void emailSender.passengerApprovedReview({
    departureCity,
    arrivalCity,
    departureDate,
    username: passengerUsername,
    email: passengerEmail,
  });
};
