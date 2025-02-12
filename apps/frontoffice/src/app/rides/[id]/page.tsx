'use client';

import SectionContainer from '@/components/layout/SectionContainer';
import { Ride, rideMock } from '@/interfaces/ride';
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

const ride = rideMock;

const rideApiToItinerary = (apiRide: Ride): ItineraryProps => {
  return {
    arrivalDate: apiRide.arrivalDate,
    departureDate: apiRide.departureDate,
    arrivalLocation: apiRide.arrivalLocation,
    departureLocation: apiRide.departureLocation
  };
};

const rideApiToInfoCard = (apiRide: Ride): InfoCardProps => {
  return {
    carBrand: apiRide.car.brand,
    carEnergy: apiRide.car.energy,
    carModel: apiRide.car.model,
    seats: apiRide.car.seats,
    reservedSeats: apiRide.reservedSeats,
    duration: apiRide.duration,
    isGreen: apiRide.car.green
  };
};

const rideApiToDriverCard = (apiRide: Ride): DriverCardProps => {
  return {
    avatar: apiRide.driver.avatar,
    rating: apiRide.driver.rate,
    username: apiRide.driver.username,
    allowPets: apiRide.driver.allowPets,
    allowSmokers: apiRide.driver.allowSmokers,
    customPreferences: apiRide.driver.customPreferences,
    reviews: apiRide.driver.reviews
  };
};

export default function Rides() {
  const isConnected = false;
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [confirmBookingModalOpen, setConfirmBookingModalOpen] = useState<boolean>(false);

  const itineraryData = useMemo(() => {
    return rideApiToItinerary(ride);
  }, [ride]);

  const infoData = useMemo(() => {
    return rideApiToInfoCard(ride);
  }, [ride]);

  const driverData = useMemo(() => {
    return rideApiToDriverCard(ride);
  }, [ride]);

  const isAvailable = ride.car.seats - (ride.reservedSeats ?? 0) > 0;

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

  const onLogin = ({ email, password }: { email: string; password: string }) => {
    console.log('Logged in with email : ', email);
    console.log('Logged in with password : ', password);
  };

  return (
    <>
      <SectionContainer className="flex flex-col gap-5 my-10">
        <Typography variant="title">Votre itinéraire</Typography>
        <div className="grid gap-4 grid-cols-[3fr_1fr]">
          <div className="flex flex-col gap-4">
            {ride.car.green && <GreenCard />}
            <Itinerary {...itineraryData} />
            <DriverCard {...driverData} />
          </div>
          <div className="flex flex-col gap-4">
            <InfoCard {...infoData} />
            <PriceCard price={ride.price} />
            <Button disabled={!isAvailable} onClick={onBookClick}>
              Réserver
            </Button>
          </div>
        </div>
      </SectionContainer>
      <LoginModal isOpen={loginModalOpen} onClose={closeLoginModal} onLogin={onLogin} />
      <ConfirmBookingModal
        isOpen={confirmBookingModalOpen}
        onClose={closeConfirmBookingModal}
        price={ride.price}
        onValidate={onConfirmBooking}
      />
    </>
  );
}
