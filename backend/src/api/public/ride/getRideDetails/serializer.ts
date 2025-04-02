import { PublicRideDetails } from '../../../../entities/ride.entity';

export const serializer = (ride: PublicRideDetails): PublicRideDetails => {
  return { ...ride };
};
