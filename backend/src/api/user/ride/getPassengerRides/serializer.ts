import { Ride } from '../../../../entities/ride.entity';
import { RidePassengerEntityInterface } from '../../../../entities/ridePassenger.entity';

export interface SerializedGetPassengerRide extends Ride {
  createdAt: Date;
  updatedAt: Date;
  canceled: boolean;
}

export interface SerializedGetPassengerRides {
  rides: SerializedGetPassengerRide[];
}

export const serializeGetPassengerRide = (
  ridePassenger: RidePassengerEntityInterface,
): SerializedGetPassengerRide => {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const { ride, user, id, emailShareAccepted, emailShareAcceptedAt, ...passengerData } =
    ridePassenger;
  return {
    ...ride,
    ...passengerData,
  };
};

export const serializer = (
  ridePassengers: RidePassengerEntityInterface[],
): SerializedGetPassengerRides => {
  const rides = ridePassengers.map((ridePassenger) => serializeGetPassengerRide(ridePassenger));
  return { rides };
};
