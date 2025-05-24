import { RideStatus } from '@/api/lib/user';
import { DriverRide } from '@/interfaces/ride';
import { PassengerRide } from '@/interfaces/ridePassenger';

export const getRideStatusLabel = (status: RideStatus) => {
  switch (status) {
    case RideStatus.CANCELLED:
      return 'Annulé par le chauffeur';
    case RideStatus.COMPLETED:
      return 'Finalisé';
    case RideStatus.ONGOING:
      return 'En cours';
    case RideStatus.UPCOMING:
      return 'A venir';
  }
};

export const SERVICE_FEE = 2;

export const orderRides = (rides: DriverRide[] | PassengerRide[]) => {
  const ongoingRides = rides.filter((ride) => ride.status === RideStatus.ONGOING);
  const upcomingRides = rides.filter((ride) => ride.status === RideStatus.UPCOMING);
  const completedRides = rides.filter((ride) => ride.status === RideStatus.COMPLETED);
  const cancelledRides = rides.filter((ride) => ride.status === RideStatus.CANCELLED);
  return [...ongoingRides, ...upcomingRides, ...completedRides, ...cancelledRides];
};
