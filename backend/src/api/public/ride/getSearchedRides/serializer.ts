import { Ride, RideEntityInterface } from "../../../../entities/ride.entity";

export interface SerializedGetSearchedRides {
  rides: Ride[];
}

export const serializer = (rides: RideEntityInterface[]): SerializedGetSearchedRides => {
  return { rides };
};
