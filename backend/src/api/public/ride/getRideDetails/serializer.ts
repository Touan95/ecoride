import { PublicRideDetails, RideEntityInterface } from '../../../../entities/ride.entity';

export const serializer = (ride: RideEntityInterface): PublicRideDetails => {
  const { passengers, ...rest} = ride
  const passengerIds = passengers.map((passenger)=>passenger.id)
  return { ...rest, passengerIds };
};
