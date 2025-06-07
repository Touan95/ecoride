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
  isLoading?: boolean;
  isSuccess?: boolean;
}

export const AddRideForm = ({ onSubmit, initialValues, cars, onAddCar, isLoading, isSuccess }: AddRideFormProps) => {
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

  const onValid = (formValues: AddRideFormSchemaType) => {
    const now = new Date();
    let hasError = false;

    if (!formValues.carId) {
      form.setError('carId', { type: 'required', message: SchemaError.CAR_REQUIRED });
      hasError = true;
    }

    if (formValues.price < 2) {
      form.setError('price', { type: 'required', message: SchemaError.RIDE_PRICE });
      hasError = true;
    }

    if (!formValues.departureDate) {
      form.setError('departureDate', { type: 'required', message: SchemaError.REQUIRED });
      hasError = true;
    } else if (formValues.departureDate < now) {
      form.setError('departureDate', { type: 'required', message: SchemaError.DEPARTURE_DATE_PAST });
      hasError = true;
    }

    if (!formValues.arrivalDate) {
      form.setError('arrivalDate', { type: 'required', message: SchemaError.REQUIRED });
      hasError = true;
    } else if (formValues.departureDate && formValues.departureDate > formValues.arrivalDate) {
      form.setError('arrivalDate', { type: 'required', message: SchemaError.DEPARTURE_DATE_AFTER_ARRIVAL });
      hasError = true;
    }

    if (!formValues.departureLocation) {
      form.setError('departureLocation', { type: 'required', message: SchemaError.REQUIRED });
      hasError = true;
    }

    if (!formValues.arrivalLocation) {
      form.setError('arrivalLocation', { type: 'required', message: SchemaError.REQUIRED });
      hasError = true;
    }

    if (hasError) return;

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
        <form onSubmit={form.handleSubmit(onValid)} className="flex flex-col gap-4">
          <ItineraryFields
            form={form}
            departureLocationError={errors.departureLocation?.message}
            arrivalLocationError={errors.arrivalLocation?.message}
          />
          <div className="grid md:grid-cols-[2fr_1fr] grid-cols-1 gap-4">
            <AccountCarsCard
              cars={cars}
              onAddCar={onAddCar}
              onSelectCar={onSelectCar}
              selectedCarIds={selectedCarId ? [selectedCarId] : undefined}
              error={errors.carId?.message}
            />
            <div className="flex flex-col gap-4 items-center">
              <PriceField onValueChange={onPriceChange} error={errors.price?.message} />
              <Button type="submit" className="md:h-16 h-14 w-40 md:w-full" color="secondary" disabled={isLoading || isSuccess}>
                {"C'est parti !"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};
