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
  const user = await userRepository.getOneById(userId);
  if (!user) {
    throw userNotFoundError();
  }

  if (!user.isStaff) {
    throw userNotStaffError();
  }

  await processTransaction(async (transactionalEntityManager) => {
    const updatedReview = await RideReview.findOneAndUpdate(
      { _id: reviewId, approved: null },
      { $set: { approved: approveReview } },
      { new: true, projection: { driverId: 1, rideId: 1, userId: 1 } },
    );

    if (!updatedReview) {
      throw reviewAlreadyApprovedError();
    }

    const driverId = updatedReview?.driverId;
    const passengerId = updatedReview?.userId;
    const rideId = updatedReview?.rideId;

    if (!driverId) {
      throw userNotFoundError();
    }

    if (!rideId) {
      throw rideNotFoundError();
    }

    const driverRatingsResult = await RideReview.aggregate([
      { $match: { driverId, approved: true } },
      { $group: { _id: '$driverId', averageRating: { $avg: '$rating' } } },
    ]);

    const averageRating =
      driverRatingsResult.length > 0 ? (driverRatingsResult[0].averageRating as number) : 0;

    const driver = await userRepository.getOneById(driverId);
    if (!driver) {
      throw userNotFoundError();
    }

    const passenger = await userRepository.getOneById(passengerId);
    if (!passenger) {
      throw userNotFoundError();
    }

    const ride = await rideRepository.getOneById(rideId);
    if (!ride) {
      throw rideNotFoundError();
    }

    const hasAlreadyPaidService = ride.servicePaid;
    const appliedServiceFee = hasAlreadyPaidService || refundPassenger ? 0 : SERVICE_FEE;
    const ridePrice = ride.price;
    const initialRideBalance = ride.balance;
    const initialDriverCredits = driver.credits;
    const driverRideEarnings = refundPassenger ? 0 : ridePrice;
    const initialPassengerCredits = passenger.credits;
    const passengerRefundAmount = refundPassenger ? ridePrice : 0;

    if (!hasAlreadyPaidService && !refundPassenger) {
      const newPlatformCredit: PlatformCreditEntityInterface = {
        id: uuid(),
        createdAt: new Date(),
        credit: appliedServiceFee,
        ride,
      };

      await platformCreditRepository.createOne(newPlatformCredit, transactionalEntityManager);
    }

    const updatedDriverCreditsAndRating: UpdateUser = {
      ...driver,
      rate: averageRating,
      credits: initialDriverCredits + driverRideEarnings - appliedServiceFee,
    };

    const updatedPassengerCredits: UpdateUser = {
      ...passenger,
      credits: initialPassengerCredits + passengerRefundAmount,
    };

    const updateRideBalance: UpdateRide = {
      ...ride,
      balance: initialRideBalance - ridePrice,
      servicePaid: refundPassenger ? hasAlreadyPaidService : true,
    };

    await userRepository.updateUser(
      driverId,
      updatedDriverCreditsAndRating,
      transactionalEntityManager,
    );

    await userRepository.updateUser(
      passengerId,
      updatedPassengerCredits,
      transactionalEntityManager,
    );
    await rideRepository.updateRide(updateRideBalance);
  });
};
