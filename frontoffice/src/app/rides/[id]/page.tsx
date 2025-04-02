'use client';

import SectionContainer from '@/components/layout/SectionContainer';
import { PublicRideDetails } from '@/interfaces/ride';
import { useMemo, useState } from 'react';
import { Itinerary, ItineraryProps } from '@/components/molecules/Itinerary';
import { InfoCard, InfoCardProps } from '@/components/molecules/InfoCard';
import { Typography } from '@/components/atoms/Typography';
import { PriceCard } from '@/components/molecules/PriceCard';
import { DriverCard, DriverCardProps } from '@/components/molecules/DriverCard';
import { GreenCard } from '@/components/molecules/GreenCard';
import { Button } from '@/components/molecules/Button';
import { LoginModal } from '@/components/organisms/LoginModal';
import { ConfirmBookingModal } from '@/components/organisms/ConfirmBookingModal';
import { useLoginMutation, useRegisterMutation } from '@/api/hooks/useAuthAPI';
import { LoginSchemaType, RegisterSchemaType } from '@/schemas/auth';
import { useAuthContext } from '@/contexts/auth';
import { isCarGreen } from '@/utils/car';
import { useParams } from 'next/navigation';
import { useBookRide, useGetRideDetails } from '@/api/hooks/useUserAPI';
import { DEFAULT_AVATAR_URL } from '@/interfaces/user';
import { RideStatus } from '@/api/lib/user';

const rideApiToItinerary = (apiRide: PublicRideDetails): ItineraryProps => {
  return {
    arrivalDate: apiRide.arrivalDate,
    departureDate: apiRide.departureDate,
    arrivalLocation: apiRide.arrivalLocation.city ?? '',
    departureLocation: apiRide.departureLocation.city ?? ''
  };
};

const rideApiToInfoCard = (apiRide: PublicRideDetails): InfoCardProps => {
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

const rideApiToDriverCard = (apiRide: PublicRideDetails): DriverCardProps => {
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

const getRideAction = (status: RideStatus, bookComponent: React.ReactNode, isDriver?: boolean): React.ReactNode => {
  switch (status) {
    case RideStatus.UPCOMING:
      return isDriver ? (
        <Typography variant="cardTitleSm" align="center">
          Vous êtes le conducteur. Vous pourrez démarrer ce trajet jusqu’à 1 heure avant l’heure de départ prévue.
        </Typography>
      ) : (
        bookComponent
      );
    case RideStatus.ONGOING:
      return (
        <Typography variant="cardTitleSm" align="center">
          {isDriver ? 'Vous êtes en route !' : 'Ce co-voiturage est sur la route !'}
        </Typography>
      );
    case RideStatus.CANCELLED:
      return (
        <Typography variant="cardTitleSm" align="center">
          {isDriver ? 'Vous avez annulé ce trajet' : 'Le conducteur a annulé ce trajet'}
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

export default function Rides() {
  const { saveToken, isLogged, user } = useAuthContext();
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [confirmBookingModalOpen, setConfirmBookingModalOpen] = useState<boolean>(false);
  const { id: rideId } = useParams<{ id: string }>();

  const { data: ride, refetch: refetchRide } = useGetRideDetails(rideId);

  const bookRide = useBookRide({
    onSuccess: () => {
      refetchRide();
    }
  });

  const isGreen = ride ? isCarGreen(ride.car) : false;
  const isSeatAvailable = ride ? ride.car.seats - (ride.reservedSeats ?? 0) > 0 : false;
  const isUserTheDriver = isLogged && user?.id === ride?.driver.id;

  const canStartRide = useMemo(() => {
    if (!ride?.departureDate) return false;

    const departureTime = new Date(ride.departureDate).getTime();
    const now = Date.now();

    return now >= departureTime - 60 * 60 * 1000 && now < departureTime;
  }, [ride?.departureDate]);

  const itineraryData = useMemo(() => {
    if (ride) {
      return rideApiToItinerary(ride);
    } else {
      return undefined;
    }
  }, [ride]);

  const infoData = useMemo(() => {
    if (ride) {
      return rideApiToInfoCard(ride);
    } else {
      return undefined;
    }
  }, [ride]);

  const driverData = useMemo(() => {
    if (ride) {
      return rideApiToDriverCard(ride);
    } else {
      return undefined;
    }
  }, [ride]);

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  const openConfirmBookingModal = () => {
    setConfirmBookingModalOpen(true);
  };

  const closeConfirmBookingModal = () => {
    setConfirmBookingModalOpen(false);
  };

  const onBookClick = () => {
    if (isLogged) {
      openConfirmBookingModal();
    } else {
      openLoginModal();
    }
  };

  const onStartRide = () => {
    console.log('🚀 ~ onStartRide:');
  };

  const onConfirmBooking = () => {
    bookRide.mutate(rideId);
    console.log('Booking confirmed');
  };

  const loginMutation = useLoginMutation({
    onSuccess: (data) => {
      saveToken(data.accessToken, data.refreshToken);
      closeLoginModal();
    }
  });

  const registerMutation = useRegisterMutation({
    onSuccess: (_data, variables) => {
      const loginData = {
        email: variables.email,
        password: variables.password
      };
      loginMutation.mutate(loginData);
    }
  });

  const onLogin = (data: LoginSchemaType) => {
    loginMutation.mutate(data);
  };

  const onRegister = (data: RegisterSchemaType) => {
    registerMutation.mutate(data);
  };

  const renderAction = useMemo(() => {
    const bookComponent = (
      <Button disabled={!isSeatAvailable} onClick={onBookClick}>
        Réserver
      </Button>
    );

    if (isUserTheDriver && canStartRide) {
      return <Button onClick={onStartRide}>{"C'est parti !"}</Button>;
    } else {
      return ride?.status && getRideAction(ride.status, bookComponent, isUserTheDriver);
    }
  }, [isUserTheDriver, canStartRide, ride?.status, isSeatAvailable, onBookClick, onStartRide]);

  if (!ride) {
    return null;
  }

  return (
    <>
      <SectionContainer className="flex flex-col gap-5 my-10">
        <Typography variant="title">Votre itinéraire</Typography>
        <div className="grid gap-4 grid-cols-[3fr_1fr]">
          <div className="flex flex-col gap-4">
            {isGreen && <GreenCard />}
            {itineraryData && <Itinerary {...itineraryData} />}
            {driverData && <DriverCard {...driverData} />}
          </div>
          <div className="flex flex-col gap-4">
            {infoData && <InfoCard {...infoData} />}
            <PriceCard price={ride.price} />
            {renderAction}
          </div>
        </div>
      </SectionContainer>
      <LoginModal isOpen={loginModalOpen} onClose={closeLoginModal} onLogin={onLogin} onRegister={onRegister} />
      <ConfirmBookingModal
        isOpen={confirmBookingModalOpen}
        onClose={closeConfirmBookingModal}
        price={ride.price}
        onValidate={onConfirmBooking}
      />
    </>
  );
}
