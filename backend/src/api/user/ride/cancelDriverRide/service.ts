import { UpdateUser, UserRepositoryInterface } from '../../../../repositories/user.repository';
import userNotFoundError from '../../../common/errors/userNotFound.error';
import { RideRepositoryInterface, UpdateRide } from '../../../../repositories/ride.repository';
import rideNotFoundError from '../../../common/errors/rideNotFound.error';
import { processTransaction } from '../../../../core/database/processTransaction';
import userNotDriverError from '../../../common/errors/userNotDriver.error';
import rideBalanceIssueError from '../../../common/errors/rideBalanceIssue.error';
import { RideStatus } from '../../../../entities/ride.entity';

const checkBalanceGoodForRefund = (ridePrice: number, balance: number, passengerCount: number) => {
  return (balance / passengerCount === ridePrice)
}

export interface CancelPassengerRideServiceOptions {
  userId: string;
  rideId: string;
  userRepository: UserRepositoryInterface;
  rideRepository: RideRepositoryInterface,
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
  
  const userIsNotDriver = ride.driver.id !== userId
  if (userIsNotDriver) {
    throw userNotDriverError();
  }

  const isBalanceGoodForRefund = checkBalanceGoodForRefund(ride.price, ride.balance, ride.reservedSeats ?? 0)
  if (!isBalanceGoodForRefund) {
    throw rideBalanceIssueError();
  }

  await processTransaction(async (transactionalEntityManager) => {
    
    const updateRide : UpdateRide = {
      ...ride, 
      balance: 0,
      status: RideStatus.CANCELLED
    }
    
    
    await rideRepository.updateRide(updateRide, transactionalEntityManager);
    
    const passengers = ride.passengers
    const ridePrice = ride.price

    passengers.map(async (passenger)=>{
      const {id: passengerId, ...passengerRest} = passenger
      const currentPassengerCredits = passenger.credits
      const newPassengerCredits = currentPassengerCredits + ridePrice
      const updatePassenger : UpdateUser = {
        ...passengerRest, 
        credits: newPassengerCredits
      }
      
      await userRepository.updateUser(passengerId, updatePassenger, transactionalEntityManager);
    })
    
  });
};
