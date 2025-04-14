import { SearchedRide } from '../../../../entities/ride.entity';
import { GetSearchedRidesResponse } from './service';

export interface SerializedGetSearchedRides {
  rides: SearchedRide[];
  fallbackRide?: SearchedRide;
}

export const serializer = (rides: GetSearchedRidesResponse): SerializedGetSearchedRides => {
  return {
    rides: rides.results,
    fallbackRide: rides.fallbackRide,
  };
};
