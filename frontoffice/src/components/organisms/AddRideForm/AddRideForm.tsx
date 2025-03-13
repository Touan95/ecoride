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
import { AddRideParams } from '@/api/lib/user';

dayjs.locale('fr');

interface AddRideFormProps {
  onSubmit: (params: Omit<AddRideParams, 'userId'>) => void;
  initialValues?: AddRideFormSchemaType;
  cars: Car[];
  onAddCar: () => void;
}

export const AddRideForm = ({ onSubmit, initialValues, cars, onAddCar }: AddRideFormProps) => {
  const [selectedCarId, setSelectedCarId] = useState<string | undefined>(undefined);

  const form = useForm<AddRideFormSchemaType>({
    resolver: zodResolver(addRideFormSchema),
    defaultValues: { ...initialValues }
  });

  const handleSubmit = () => {
    const formValues = form.getValues();
    onSubmit(formValues);
  };

  const onSelectCar = (carId: string) => {
    setSelectedCarId(carId);
    form.setValue('carId', carId);
  };

  const onPriceChange = (price?: number) => {
    form.setValue('price', price ?? 0);
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
              <PriceField onValueChange={onPriceChange} />
              <Button className="h-16" color="secondary" onClick={handleSubmit}>
                {"C'est parti !"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};
