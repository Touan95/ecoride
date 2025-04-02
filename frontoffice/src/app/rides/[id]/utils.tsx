import { PublicRideDetails } from '@/interfaces/ride';
import { ItineraryProps } from '@/components/molecules/Itinerary';
import { InfoCardProps } from '@/components/molecules/InfoCard';
import { Typography } from '@/components/atoms/Typography';
import { DriverCardProps } from '@/components/molecules/DriverCard';
import { Button } from '@/components/molecules/Button';
import { isCarGreen } from '@/utils/car';
import { DEFAULT_AVATAR_URL } from '@/interfaces/user';
import { RideStatus } from '@/api/lib/user';

export const rideApiToItinerary = (apiRide: PublicRideDetails): ItineraryProps => {
  return {
    arrivalDate: apiRide.arrivalDate,
    departureDate: apiRide.departureDate,
    arrivalLocation: apiRide.arrivalLocation.city ?? '',
    departureLocation: apiRide.departureLocation.city ?? ''
  };
};

export const rideApiToInfoCard = (apiRide: PublicRideDetails): InfoCardProps => {
  const isRideCarGreen = isCarGreen(apiRide.car);
  const duration = new Date(apiRide.arrivalDate).getTime() - new Date(apiRide.departureDate).getTime();
  return {
    carBrand: apiRide.car.brand,
    carEnergy: apiRide.car.energy,
    carModel: apiRide.car.model,
    seats: apiRide.car.seats,
    reservedSeats: apiRide.reservedSeats ?? 0,
    duration,
    isGreen: isRideCarGreen
  };
};

export const rideApiToDriverCard = (apiRide: PublicRideDetails): DriverCardProps => {
  return {
    avatar: apiRide.driver.avatarUrl ?? DEFAULT_AVATAR_URL,
    rating: apiRide.driver.rate ?? undefined,
    username: apiRide.driver.username,
    acceptsPets: apiRide.driver.acceptsPets,
    acceptsSmoking: apiRide.driver.acceptsSmoking,
    customRules: apiRide.driver.customRules,
    reviews: [] //apiRide.driver.reviews
  };
};

interface GetBaseActionProps {
  status: RideStatus;
  bookComponent: React.ReactNode;
}

export const getPublicAction = ({ bookComponent, status }: GetBaseActionProps): React.ReactNode => {
  switch (status) {
    case RideStatus.UPCOMING:
      return bookComponent;
    case RideStatus.ONGOING:
      return (
        <Typography variant="cardTitleSm" align="center">
          Ce co-voiturage est sur la route !
        </Typography>
      );
    case RideStatus.CANCELLED:
      return (
        <Typography variant="cardTitleSm" align="center">
          Le conducteur a annulé ce trajet
        </Typography>
      );
    case RideStatus.COMPLETED:
      return (
        <Typography variant="cardTitleSm" align="center">
          Ce trajet est fini !
        </Typography>
      );
  }
};

interface GetDriverActionProps {
  status: RideStatus;
  onStartRide: () => void;
  onEndRide: () => void;
  canStartRide: boolean;
  canEndRide: boolean;
}

export const getDriverAction = ({ status, canEndRide, canStartRide, onEndRide, onStartRide }: GetDriverActionProps): React.ReactNode => {
  switch (status) {
    case RideStatus.UPCOMING:
      return canStartRide ? (
        <Button onClick={onStartRide} color="primary">
          Démarrer
        </Button>
      ) : (
        <Typography variant="cardTitleSm" align="center">
          Vous êtes le conducteur. Vous pourrez démarrer ce trajet jusqu’à 1 heure avant l’heure de départ prévue.
        </Typography>
      );
    case RideStatus.ONGOING:
      return canEndRide ? (
        <Button onClick={onEndRide} color="secondary">
          Arrivée à destination
        </Button>
      ) : (
        <Typography variant="cardTitleSm" align="center">
          Vous êtes en route !
        </Typography>
      );
    case RideStatus.CANCELLED:
      return (
        <Typography variant="cardTitleSm" align="center">
          Vous avez annulé ce trajet
        </Typography>
      );
    case RideStatus.COMPLETED:
      return (
        <Typography variant="cardTitleSm" align="center">
          Ce trajet est terminé !
        </Typography>
      );
  }
};

export const getPassengerAction = (status: RideStatus): React.ReactNode => {
  switch (status) {
    case RideStatus.UPCOMING:
      return (
        <Typography variant="cardTitleSm" align="center">
          {"Vous êtes passager de ce trajet à venir. Vous pouvez l'annuler sur votre espace"}
        </Typography>
      );
    case RideStatus.ONGOING:
      return (
        <Typography variant="cardTitleSm" align="center">
          Vous êtes en route !
        </Typography>
      );
    case RideStatus.CANCELLED:
      return (
        <Typography variant="cardTitleSm" align="center">
          Votre conducteur a annulé ce trajet
        </Typography>
      );
    case RideStatus.COMPLETED:
      return (
        <Typography variant="cardTitleSm" align="center">
          Vous avez déjà réalisé ce trajet !
        </Typography>
      );
  }
};
