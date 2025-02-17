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
import { AccountDetailsCard } from '@/components/molecules/AccountDetailsCard';
import { userMock, UserType } from '@/interfaces/user';
import { CreditAmountCard } from '@/components/molecules/CreditAmountCard';
import { UserTypeModal } from '@/components/organisms/UserTypeModal';
import { useChangeUserTypeMutation, useGetOneUser } from '@/api/hooks/useUserAPI';
import { AccountDriverCard } from '@/components/molecules/AccountDriverCard';
import { DriverPreferencesModal } from '@/components/organisms/DriverPreferencesModal';
import { DriverPreferencesFormSchemaType } from '@/schemas/user';
import { AccountCarsCard } from '@/components/molecules/AccountCarsCard';
import { CarDetailsModal } from '@/components/organisms/CarDetailsModal';
import { Car } from '@/interfaces/car';

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
    acceptsPets: apiRide.driver.acceptsPets,
    acceptsSmoking: apiRide.driver.acceptsSmoking,
    customRules: apiRide.driver.customRules,
    reviews: apiRide.driver.reviews
  };
};

export default function Rides() {
  const { user } = useAuthContext()
  const { data: apiUser } = useGetOneUser(user?.id)
  const cars = apiUser?.cars ?? []
  
  const [userTypeModalOpen, setUserTypeModalOpen] = useState<boolean>(false);
  const [driverPreferencesModalOpen, setDriverPreferencesModalOpen] = useState<boolean>(false);
  const [carDetailsModalProp, setCarDetailsModalProp] = useState< Car | 'new' | undefined >(undefined);
  const [carToRemoveID, setCarToRemoveID] = useState<string | undefined>(undefined);

  const driverCardsVisible = apiUser?.type === UserType.DRIVER || apiUser?.type === UserType.BOTH

  const driverPreferences = {
    acceptsPets: apiUser?.acceptsPets ?? false,
    acceptsSmoking: apiUser?.acceptsSmoking ?? false,
    customRules: apiUser?.customRules ?? [],
  }

  const openUserTypeModal = () => {
    setUserTypeModalOpen(true);
  };

  const closeUserTypeModal = () => {
    setUserTypeModalOpen(false);
  };

  const openDriverPreferencesModal = () => {
    setDriverPreferencesModalOpen(true);
  };

  const closeDriverPreferencesModal = () => {
    setDriverPreferencesModalOpen(false);
  };

  const openEditCarDetailsModal = (carId: string) => {
    setCarDetailsModalProp('new');
  };

  const openNewCarDetailsModal = () => {
    setCarDetailsModalProp('new');
  };

  const closeCarDetailsModal = () => {
    setCarDetailsModalProp(undefined);
  };

  const openRemoveCarModal = (carId: string) => {
    setCarToRemoveID(carId);
  };

  const closeRemoveCarModal = () => {
    setCarToRemoveID(undefined);
  };

  if(!apiUser){
    return null
  }

  return (
    <>
      <SectionContainer className="flex flex-col gap-5 my-10">
        <Typography variant="title">Votre compte</Typography>
        <div className='grid grid-cols-[1fr_150px] gap-4'>
          <AccountDetailsCard 
            username={apiUser.username} 
            email={apiUser.email} 
            avatarUrl={userMock.avatarUrl} 
            type={apiUser.type} 
            onUserTypeEdit={openUserTypeModal}
          />
          <CreditAmountCard credits={200}/>
        </div>
          {driverCardsVisible && 
            <>
              <AccountDriverCard onEditClick={openDriverPreferencesModal} values={driverPreferences}/>
              <AccountCarsCard cars={cars} onAddCar={openNewCarDetailsModal} onEditCar={openEditCarDetailsModal} onRemoveCar={openRemoveCarModal}/>
            </>
          }
      </SectionContainer>
      <UserTypeModal
        isOpen={userTypeModalOpen}
        onClose={closeUserTypeModal}
        userType={apiUser.type}
        onValidate={closeUserTypeModal}
        userId={apiUser.id}
      />
      <DriverPreferencesModal
        isOpen={driverPreferencesModalOpen}
        onClose={closeDriverPreferencesModal}
        userType={apiUser.type}
        onValidate={closeDriverPreferencesModal}
        userId={apiUser.id}
        values={driverPreferences}
      />
      <CarDetailsModal
        isOpen={!!carDetailsModalProp}
        onClose={closeCarDetailsModal}
        onValidate={closeCarDetailsModal}
        userId={apiUser.id}
      />
    </>
  );
}
