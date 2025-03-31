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

export interface BookSeatServiceOptions {
  userId: string;
  rideId: string;
  userRepository: UserRepositoryInterface;
  rideRepository: RideRepositoryInterface,
  ridePassengerRepository: RidePassengerRepositoryInterface,
}

export const service = async ({
  userId,
  rideId,
  userRepository,
  rideRepository,
  ridePassengerRepository
}: BookSeatServiceOptions): Promise<void> => {
  const user = await userRepository.getOneById(userId);
  if (!user) {
    throw userNotFoundError();
  }

  const ride = await rideRepository.getOneById(rideId);
  if (!ride) {
    throw rideNotFoundError();
  }

  const rideDriver = ride.driver
  const isUserTheDriver = rideDriver.id === user.id
  if (isUserTheDriver) {
    throw userIsTheDriverError();
  }

  const currentPassengers = ride.passengers
  const isUserAlreadyPassenger = !!currentPassengers.find((passenger)=> passenger.id === userId)
  if (isUserAlreadyPassenger) {
    throw userAlreadyPassengerError();
  }
  
  const seatsLeft = ride.car.seats - (ride.reservedSeats ?? 0)
  if(seatsLeft < 1){
    throw rideFullyBookedError();
  }
  
  const currentUserCredits = user.credits
  const ridePrice = ride.price
  if (currentUserCredits < ridePrice) {
    throw userInsufficientCreditsError();
  }
  
  await processTransaction(async (transactionalEntityManager) => {
    const newPassengers = [...currentPassengers, user]
    const currentRideBalance = ride.balance
    const newUserCredits = currentUserCredits - ridePrice
    const newRideBalance = currentRideBalance + ridePrice
    const now = new Date()
  
    const updateRide : UpdateRide = {
      ...ride, 
      passengers: newPassengers, 
      balance: newRideBalance, 
      reservedSeats: newPassengers.length
    }
  
    const updateUser : UpdateUser = {
      ...user, 
      credits: newUserCredits
    }
  

    const newRidePassenger : RidePassengerEntityInterface = {
      id: uuid(),
      canceled: false,
      createdAt: now,
      user,
      ride,
      updatedAt: now
    }

    await rideRepository.updateRide(updateRide, transactionalEntityManager);
    await userRepository.updateUser(userId, updateUser, transactionalEntityManager);
    await ridePassengerRepository.createOne(newRidePassenger, transactionalEntityManager);
  });
};
