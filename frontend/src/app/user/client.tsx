'use client';

import SectionContainer from '@/components/layout/SectionContainer';
import { useState } from 'react';
import { Typography } from '@/components/atoms/Typography';
import { useAuthContext } from '@/contexts/auth';
import { AccountDetailsCard } from '@/components/molecules/AccountDetailsCard';
import { DEFAULT_AVATAR_URL, UserType } from '@/interfaces/user';
import { CreditAmountCard } from '@/components/molecules/CreditAmountCard';
import { UserTypeModal } from '@/components/organisms/UserTypeModal';
import { useAddCar, useDeleteCarMutation, useGetOneUser, usePutCar } from '@/api/hooks/useUserAPI';
import { AccountDriverCard } from '@/components/molecules/AccountDriverCard';
import { DriverPreferencesModal } from '@/components/organisms/DriverPreferencesModal';
import { AccountCarsCard } from '@/components/molecules/AccountCarsCard';
import { CarDetailsModal } from '@/components/organisms/CarDetailsModal';
import { Car } from '@/interfaces/car';
import { AddCarParams } from '@/api/lib/user';
import { ConfirmCarDeletionModal } from '@/components/organisms/ConfirmCarDeletionModal';
import { ChangePasswordModal } from '@/components/organisms/ChangePasswordModal';

export default function UserPageClient() {
  const { user } = useAuthContext();
  const { data: apiUser, refetch: refetchUser } = useGetOneUser(user?.id);
  const addCar = useAddCar({
    onSuccess: () => {
      refetchUser();
      closeCarDetailsModal();
    }
  });
  const updateCar = usePutCar({
    onSuccess: () => {
      refetchUser();
      closeCarDetailsModal();
    }
  });
  const deleteCar = useDeleteCarMutation({
    onSuccess: () => {
      refetchUser();
      closeRemoveCarModal();
    }
  });
  const cars = apiUser?.cars ?? [];

  const [userTypeModalOpen, setUserTypeModalOpen] = useState<boolean>(false);
  const [driverPreferencesModalOpen, setDriverPreferencesModalOpen] = useState<boolean>(false);
  const [carDetailsModalProp, setCarDetailsModalProp] = useState<Car | 'new' | undefined>(undefined);
  const [carToRemoveID, setCarToRemoveID] = useState<string | undefined>(undefined);
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState<boolean>(false);
  const driverCardsVisible = apiUser?.type === UserType.DRIVER || apiUser?.type === UserType.BOTH;

  const driverPreferences = {
    acceptsPets: apiUser?.acceptsPets ?? false,
    acceptsSmoking: apiUser?.acceptsSmoking ?? false,
    customRules: apiUser?.customRules ?? []
  };

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
    const carToEdit = cars.find((car) => car.id === carId);
    setCarDetailsModalProp(carToEdit);
  };

  const openNewCarDetailsModal = () => {
    setCarDetailsModalProp('new');
  };

  const closeCarDetailsModal = () => {
    setCarDetailsModalProp(undefined);
  };

  const openChangePasswordModal = () => {
    setChangePasswordModalOpen(true);
  };

  const closeChangePasswordModal = () => {
    setChangePasswordModalOpen(false);
  };

  const onCarDetailsSubmit = (params: Omit<AddCarParams, 'userId'>) => {
    if (!carDetailsModalProp || !user) {
      return;
    }

    if (carDetailsModalProp === 'new') {
      addCar.mutate({ ...params, userId: user.id });
    } else {
      updateCar.mutate({ ...params, userId: user.id, carId: carDetailsModalProp.id });
    }
  };

  const openRemoveCarModal = (carId: string) => {
    setCarToRemoveID(carId);
  };

  const closeRemoveCarModal = () => {
    setCarToRemoveID(undefined);
  };

  const onCarDeletion = () => {
    if (carToRemoveID && user) {
      deleteCar.mutate({ carId: carToRemoveID, userId: user.id });
    }
  };

  if (!apiUser) {
    return null;
  }

  return (
    <>
      <SectionContainer className="flex flex-col gap-5 my-10">
        <Typography variant="title">Votre compte</Typography>
        <div className="grid grid-cols-[1fr_150px] gap-4">
          <AccountDetailsCard
            username={apiUser.username}
            email={apiUser.email}
            avatarUrl={apiUser.avatarUrl ?? DEFAULT_AVATAR_URL}
            type={apiUser.type}
            onUserTypeEdit={openUserTypeModal}
            onPasswordEdit={openChangePasswordModal}
          />
          <CreditAmountCard credits={apiUser.credits} />
        </div>
        {driverCardsVisible && (
          <>
            <AccountDriverCard onEditClick={openDriverPreferencesModal} values={driverPreferences} />
            <AccountCarsCard
              cars={cars}
              onAddCar={openNewCarDetailsModal}
              onEditCar={openEditCarDetailsModal}
              onRemoveCar={openRemoveCarModal}
            />
          </>
        )}
      </SectionContainer>
      <ChangePasswordModal isOpen={changePasswordModalOpen} onClose={closeChangePasswordModal} />
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
        onSubmit={onCarDetailsSubmit}
        car={carDetailsModalProp !== 'new' ? carDetailsModalProp : undefined}
      />
      <ConfirmCarDeletionModal isOpen={!!carToRemoveID} onClose={closeRemoveCarModal} onValidate={onCarDeletion} />
    </>
  );
}
