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
import { useGetRideDetails } from '@/api/hooks/useUserAPI';
import { DEFAULT_AVATAR_URL } from '@/interfaces/user';

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

export default function Rides() {
  const { saveToken } = useAuthContext();
  const isConnected = false;
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [confirmBookingModalOpen, setConfirmBookingModalOpen] = useState<boolean>(false);
  const { id: rideId } = useParams<{ id: string }>();

  const { data: ride } = useGetRideDetails(rideId);

  const isGreen = ride ? isCarGreen(ride.car) : false;

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

  const isAvailable = ride ? ride.car.seats - (ride.reservedSeats ?? 0) > 0 : false;

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
    if (isConnected) {
      openConfirmBookingModal();
    } else {
      openLoginModal();
    }
  };

  const onConfirmBooking = () => {
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
            <Button disabled={!isAvailable} onClick={onBookClick}>
              Réserver
            </Button>
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
