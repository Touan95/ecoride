'use client';

import { useAddCar, useGetOneUser, useAddRide } from '@/api/hooks/useUserAPI';
import { AddCarParams, AddRideParams } from '@/api/lib/user';
import { Typography } from '@/components/atoms/Typography';
import SectionContainer from '@/components/layout/SectionContainer';
import { AddRideForm } from '@/components/organisms/AddRideForm';
import { CarDetailsModal } from '@/components/organisms/CarDetailsModal';
import { useAuthContext } from '@/contexts/auth';
import { useState } from 'react';

export default function AddRide() {
  const { user } = useAuthContext();
  const { data: apiUser, refetch: refetchUser } = useGetOneUser(user?.id);
  const cars = apiUser?.cars ?? [];

  const addRide = useAddRide({});

  const addCar = useAddCar({
    onSuccess: () => {
      refetchUser();
      closeAddCarModal();
    }
  });

  const [isAddCarmodalOpen, setIsAddCarmodalOpen] = useState(false);

  const onCarDetailsSubmit = (params: Omit<AddCarParams, 'userId'>) => {
    if (user) {
      addCar.mutate({ ...params, userId: user.id });
    }
  };

  const openAddCarModal = () => {
    setIsAddCarmodalOpen(true);
  };

  const closeAddCarModal = () => {
    setIsAddCarmodalOpen(false);
  };

  const onSubmit = (params: Omit<AddRideParams, 'userId'>) => {
    if (user) {
      addRide.mutate({ ...params, userId: user.id });
    }
  };

  return (
    <>
      <SectionContainer className="flex flex-col gap-5 my-10">
        <Typography variant="title">Proposer un nouveau trajet</Typography>
        <div className="flex flex-col gap-4">
          <AddRideForm onAddCar={openAddCarModal} cars={cars} onSubmit={onSubmit} />
        </div>
      </SectionContainer>
      <CarDetailsModal isOpen={isAddCarmodalOpen} onClose={closeAddCarModal} onSubmit={onCarDetailsSubmit} />
    </>
  );
}
