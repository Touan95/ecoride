import { SearchedRide } from '../../../../entities/ride.entity';

export interface SerializedGetSearchedRides {
  rides: SearchedRide[];
}

export const serializer = (rides: SearchedRide[]): SerializedGetSearchedRides => {
  return { rides };
};
