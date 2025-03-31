import { Ride, RideEntityInterface } from "../../../../entities/ride.entity";

export interface SerializedGetDriverRide extends Ride {
  carSeats: number
}

export interface SerializedGetDriverRides {
  rides: SerializedGetDriverRide[];
}

export const serializeGetDriverRide = (ride: RideEntityInterface):SerializedGetDriverRide => {
  const { car, ...rideData } = ride
  const carSeats = car.seats

  return {
    carSeats,
    ...rideData
  }
}

export const serializer = (rides: RideEntityInterface[]): SerializedGetDriverRides => {
  const ridesWithSeats = rides.map((ride) => serializeGetDriverRide(ride))
  return { rides : ridesWithSeats }
};
