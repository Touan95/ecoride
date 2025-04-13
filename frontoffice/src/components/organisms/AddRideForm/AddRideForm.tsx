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
import { useEffect, useState } from 'react';
import { PriceField } from './AddRideFields/PriceField';
import { Button } from '@/components/molecules/Button';
import { AddRideParams } from '@/api/lib/user';
import { SchemaError } from '@/schemas/errors';
import { SERVICE_FEE } from '@/utils/ride';

dayjs.locale('fr');

interface AddRideFormProps {
  onSubmit: (params: Omit<AddRideParams, 'userId'>) => void;
  initialValues?: AddRideFormSchemaType;
  cars: Car[];
  onAddCar: () => void;
}

export const AddRideForm = ({ onSubmit, initialValues, cars, onAddCar }: AddRideFormProps) => {
  const [selectedCarId, setSelectedCarId] = useState<string | undefined>(undefined);

  const now = new Date();

  const form = useForm<AddRideFormSchemaType>({
    resolver: zodResolver(addRideFormSchema),
    defaultValues: {
      ...initialValues,
      carId: undefined,
      price: 0,
      arrivalDate: now,
      departureDate: now,
      arrivalLocation: {
        address: undefined,
        coordinate: {
          latitude: undefined,
          longitude: undefined
        }
      },
      departureLocation: {
        address: undefined,
        coordinate: {
          latitude: undefined,
          longitude: undefined
        }
      }
    }
  });

  const { errors } = form.formState;

  const formValues = form.getValues();

  const handleSubmit = () => {
    if (formValues.carId === undefined) {
      form.setError('carId', { type: 'required', message: SchemaError.CAR_REQUIRED });
    }

    if (formValues.price < 2) {
      form.setError('price', { type: 'required', message: SchemaError.RIDE_PRICE });
    }

    if (formValues.departureDate === undefined) {
      form.setError('departureDate', { type: 'required', message: SchemaError.REQUIRED });
    }

    if (formValues.arrivalDate === undefined) {
      form.setError('arrivalDate', { type: 'required', message: SchemaError.REQUIRED });
    }

    if (formValues.departureLocation === undefined) {
      form.setError('departureLocation', { type: 'required', message: SchemaError.REQUIRED });
    }

    if (formValues.arrivalLocation === undefined) {
      form.setError('arrivalLocation', { type: 'required', message: SchemaError.REQUIRED });
    }

    onSubmit(formValues);
  };

  const onSelectCar = (carId: string) => {
    setSelectedCarId(carId);
    form.setValue('carId', carId);
  };

  const onPriceChange = (price?: number) => {
    form.setValue('price', price ?? 0);
    if (price && price > SERVICE_FEE) {
      form.clearErrors('price');
    }
  };

  useEffect(() => {
    if (selectedCarId) {
      form.clearErrors('carId');
    }
  }, [selectedCarId]);

  useEffect(() => {
    if (formValues.departureLocation) {
      form.clearErrors('departureLocation');
    }
  }, [formValues.departureLocation]);

  useEffect(() => {
    if (formValues.arrivalLocation) {
      form.clearErrors('arrivalLocation');
    }
  }, [formValues.arrivalLocation]);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
          <ItineraryFields
            form={form}
            departureLocationError={errors.departureLocation?.message}
            arrivalLocationError={errors.arrivalLocation?.message}
          />
          <div className="grid grid-cols-[2fr_1fr] gap-4">
            <AccountCarsCard
              cars={cars}
              onAddCar={onAddCar}
              onSelectCar={onSelectCar}
              selectedCarIds={selectedCarId ? [selectedCarId] : undefined}
              error={errors.carId?.message}
            />
            <div className="flex flex-col gap-4">
              <PriceField onValueChange={onPriceChange} error={errors.price?.message} />
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
