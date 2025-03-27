import { v4 as uuid } from 'uuid';
import { CarRepositoryInterface } from '../../../../repositories/car.repository';
import { UserRepositoryInterface } from '../../../../repositories/user.repository';
import userNotFoundError from '../../../common/errors/userNotFound.error';
import { RideEntityInterface, RideLocation, RideStatus } from '../../../../entities/ride.entity';
import { RideRepositoryInterface } from '../../../../repositories/ride.repository';
import userCarNotFoundError from '../../../common/errors/userCarNotFound.error';
import carNotFoundError from '../../../common/errors/carNotFound.error';

export interface AddRideServiceOptions {
  userId: string;
  userRepository: UserRepositoryInterface;
  arrivalLocation: RideLocation,
  departureLocation: RideLocation,
  carId: string,
  price: number,
  arrivalDate: Date,
  departureDate: Date,
  rideRepository: RideRepositoryInterface,
  carRepository: CarRepositoryInterface,
}

export const service = async ({
  userId,
  userRepository,
  arrivalLocation,
  departureLocation,
  carId,
  price,
  arrivalDate,
  departureDate,
  rideRepository,
  carRepository
}: AddRideServiceOptions): Promise<RideEntityInterface | undefined> => {
  const user = await userRepository.getOneForAccount(userId);
  if (!user) {
    throw userNotFoundError();
  }
  
  const userCarIds = user.cars?.map((car)=> car.id) ?? []
  
  if(!userCarIds.includes(carId)){
    throw userCarNotFoundError();
  }
  
  const car = await carRepository.getOneById(carId);
  if (!car) {
    throw carNotFoundError();
  }

  const carWithOwner = {
    ...car,
    owner: user,
  }

  const newRide = await rideRepository.createOne({
    id: uuid(),
    arrivalDate,
    arrivalLocation,
    departureDate,
    departureLocation,
    price,
    reservedSeats: 0,
    status: RideStatus.UPCOMING,
    driver: user,
    car: carWithOwner,
    departurePoint: {
      type: 'Point',
      coordinates: [departureLocation.coordinate.longitude, departureLocation.coordinate.latitude],
    },
    arrivalPoint: {
      type: 'Point',
      coordinates: [arrivalLocation.coordinate.longitude, arrivalLocation.coordinate.latitude],
    },
    passengers:[]
  });

  return newRide;
};
