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
import { useLoginMutation, useRegisterMutation } from '@/api/hooks/useAuthAPI';
import { LoginSchemaType, RegisterSchemaType } from '@/schemas/auth';
import { useAuthContext } from '@/contexts/auth';
import { AccountCard } from '@/components/molecules/AccountCard';
import { userMock } from '@/interfaces/user';
import { CreditAmountCard } from '@/components/molecules/CreditAmountCard';
import { UserTypeModal } from '@/components/organisms/UserTypeModal';
import { useChangeUserTypeMutation } from '@/api/hooks/useUserAPI';

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
  const { user } = useAuthContext()
  const [userTypeModalOpen, setUserTypeModalOpen] = useState<boolean>(false);


  const openUserTypeModal = () => {
    setUserTypeModalOpen(true);
  };

  const closeUserTypeModal = () => {
    setUserTypeModalOpen(false);
  };

  if(!user){
    return null
  }

  return (
    <>
      <SectionContainer className="flex flex-col gap-5 my-10">
        <Typography variant="title">Votre compte</Typography>
        <div className='grid grid-cols-[1fr_150px] gap-4'>
          <AccountCard 
            username={user.username} 
            email={user.email} 
            avatarUrl={userMock.avatarUrl} 
            type={user.type} 
            onUserTypeEdit={openUserTypeModal}
          />
          <CreditAmountCard credits={200}/>
        </div>
      </SectionContainer>
      <UserTypeModal
        isOpen={userTypeModalOpen}
        onClose={closeUserTypeModal}
        userType={user.type}
        onValidate={closeUserTypeModal}
        userId={user.id}
      />
    </>
  );
}
