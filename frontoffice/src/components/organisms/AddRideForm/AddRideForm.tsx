'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Form } from '@/components/ui/form';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import { ItineraryFields } from './AddRideFields/ItineraryFields';
import { addRideFormSchema, AddRideFormSchemaType } from '@/schemas/user';
import { AccountCarsCard } from '@/components/molecules/AccountCarsCard';
import { Car } from '@/interfaces/car';
import { useState } from 'react';
import { PriceField } from './AddRideFields/PriceField';
import { Button } from '@/components/molecules/Button';

dayjs.locale('fr');

interface AddRideFormProps {
  // onSubmit: (params: Omit<AddCarParams, 'userId'>) => void;
  initialValues?: AddRideFormSchemaType;
  cars: Car[];
  onAddCar: () => void;
}

export const AddRideForm = ({ initialValues, cars, onAddCar }: AddRideFormProps) => {
  const [selectedCarId, setSelectedCarId] = useState<string | undefined>(undefined);
  const form = useForm<AddRideFormSchemaType>({
    resolver: zodResolver(addRideFormSchema),
    defaultValues: { ...initialValues }
  });
  console.log('🚀 ~ form:', form.getValues());

  const handleSubmit = (values: AddRideFormSchemaType) => {
    // onSubmit({ ...values });
  };

  const onSelectCar = (carId: string) => {
    setSelectedCarId(carId);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
          <ItineraryFields form={form} />
          <div className="grid grid-cols-[2fr_1fr] gap-4">
            <AccountCarsCard
              cars={cars}
              onAddCar={onAddCar}
              onSelectCar={onSelectCar}
              selectedCarIds={selectedCarId ? [selectedCarId] : undefined}
            />
            <div className="flex flex-col gap-4">
              <PriceField />
              <Button className="h-16" color="secondary" type="submit">
                {"C'est parti !"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};
