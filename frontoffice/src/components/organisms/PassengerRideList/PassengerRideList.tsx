import { Typography } from '@/components/atoms/Typography';
import { UserRideCard, UserRideCardProps } from '@/components/molecules/UserRideCard';
import { PassengerRide } from '@/interfaces/ridePassenger';

interface PassengerRideList {
  rides: PassengerRide[];
  onDetailClick: (id: string) => () => void;
  onCancelClick: (id: string) => () => void;
}

const passengerRideApiToUserRideCard = (apiRide: PassengerRide): UserRideCardProps => {
  const duration = new Date(apiRide.arrivalDate).getTime() - new Date(apiRide.departureDate).getTime();

  return {
    id: apiRide.id,
    arrivalCity: apiRide.arrivalLocation.city ?? '',
    departureCity: apiRide.departureLocation.city ?? '',
    arrivalDate: apiRide.arrivalDate,
    departureDate: apiRide.departureDate,
    duration,
    price: apiRide.price,
    isCancelledByPassenger: apiRide.canceled,
    status: apiRide.status
  };
};

export const PassengerRideList = ({ onDetailClick, rides, onCancelClick }: PassengerRideList) => {
  if (rides.length > 0) {
    const passengerCardData = rides.map((ride) => passengerRideApiToUserRideCard(ride));
    return (
      <div className="flex flex-col gap-3">
        {passengerCardData.map((ride) => {
          return <UserRideCard key={ride.id} {...ride} onDetailClick={onDetailClick(ride.id)} onCancelClick={onCancelClick(ride.id)} />;
        })}
      </div>
    );
  } else {
    return (
      <div className="p-10">
        <Typography variant="cardTitleSm" align="center">
          {"Vous n'avez aucun trajet en tant que passager"}
        </Typography>
      </div>
    );
  }
};
