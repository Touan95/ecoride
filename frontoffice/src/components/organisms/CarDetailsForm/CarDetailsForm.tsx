'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input, inputClassname } from '@/components/ui/input';
import { Button } from '@/components/molecules/Button';
import { Button as ShadButton } from '@/components/ui/button';
import { Typography } from '@/components/atoms/Typography';
import { carDetailsFormSchema, CarDetailsFormSchemaType } from '@/schemas/user';
import { Energy } from '@/interfaces/car';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import clsxm from '@/utils/clsxm';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { getEnergyLabel } from '@/utils/values';
import { fr } from 'date-fns/locale';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMemo } from 'react';
import { AddCarParams } from '@/api/lib/user';

dayjs.locale('fr');

interface CarDetailsFormProps {
  onSubmit: (params: Omit<AddCarParams, 'userId'>) => void;
  initialValues?: CarDetailsFormSchemaType;
  editMode?: boolean;
}

export const CarDetailsForm = ({ onSubmit, initialValues, editMode = false }: CarDetailsFormProps) => {
  const seats = useMemo(() => {
    return [...Array(10)].map((_, index) => {
      return (
        <SelectItem value={index.toString()} className="hover:bg-primary-300" key={index}>
          {index}
        </SelectItem>
      );
    });
  }, []);

  const form = useForm<CarDetailsFormSchemaType>({
    resolver: zodResolver(carDetailsFormSchema),
    defaultValues: {
      brand: initialValues?.brand ?? '',
      color: initialValues?.color ?? '',
      energy: initialValues?.energy ?? Energy.UNKNOWN,
      model: initialValues?.model ?? '',
      plateNumber: initialValues?.plateNumber ?? '',
      registrationDate: initialValues?.registrationDate ? new Date(initialValues?.registrationDate) : new Date(),
      seats: initialValues?.seats ?? 1
    }
  });

  const handleSubmit = (values: CarDetailsFormSchemaType) => {
    onSubmit({ ...values });
  };

  return (
    <Form {...form}>
      <Typography variant="cardTitle" customClassName="mb-5" align="center">
        {editMode ? 'Modifiez votre véhicule' : 'Ajoutez un nouveau véhicule'}
      </Typography>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="place-items-center">
        <div className="grid grid-cols-2 gap-20">
          <div>
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <Typography variant="cardTitleSm">Marque</Typography>
                  <FormControl>
                    <Input placeholder="Marque" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <Typography variant="cardTitleSm">Modèle</Typography>
                  <FormControl>
                    <Input placeholder="Modèle" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="energy"
              render={({ field }) => (
                <FormItem>
                  <Typography variant="cardTitleSm">{"Veuillez choisir l'énergie de votre véhicule"}</Typography>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1 text-primary-900"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={Energy.DIESEL} />
                        </FormControl>
                        <Typography variant="cardTitleSm" weight="light">
                          {getEnergyLabel(Energy.DIESEL)}
                        </Typography>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={Energy.GASOLINE} />
                        </FormControl>
                        <Typography variant="cardTitleSm" weight="light">
                          {getEnergyLabel(Energy.GASOLINE)}
                        </Typography>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={Energy.HYBRID} />
                        </FormControl>
                        <Typography variant="cardTitleSm" weight="light">
                          {getEnergyLabel(Energy.HYBRID)}
                        </Typography>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={Energy.ELECTRIC} />
                        </FormControl>
                        <Typography variant="cardTitleSm" weight="light">
                          {getEnergyLabel(Energy.ELECTRIC)}
                        </Typography>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="seats"
              render={({ field }) => (
                <FormItem>
                  <Typography variant="cardTitleSm">Place(s) passager</Typography>
                  <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value.toString()}>
                    <FormControl>
                      <SelectTrigger className={clsxm(inputClassname, 'justify-end gap-1 items-center')}>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="z-[9999] bg-primary-50">{seats}</SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <Typography variant="cardTitleSm">Couleur</Typography>
                  <FormControl>
                    <Input placeholder="Couleur" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="plateNumber"
              render={({ field }) => (
                <FormItem>
                  <Typography variant="cardTitleSm">Immatriculation</Typography>
                  <FormControl>
                    <Input placeholder="Immatriculation" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="registrationDate"
              render={({ field }) => {
                const date = dayjs(field.value);
                const formattedDate = date.format('DD/MM/YYYY');
                return (
                  <FormItem className="flex flex-col">
                    <Typography variant="cardTitleSm">Date de première immatriculation</Typography>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <ShadButton className={clsxm(inputClassname, !field.value && 'text-muted-foreground')}>
                            {field.value ? formattedDate : <span>Choisir une date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </ShadButton>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full z-[9999] bg-primary-50" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                          initialFocus
                          locale={fr}
                          fromDate={new Date('1900-01-01')}
                          toDate={new Date()}
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
        </div>
        <Button type="submit" className="w-40" disabled={!form.formState.isDirty}>
          {editMode ? 'Modifier' : 'Ajouter'}
        </Button>
      </form>
    </Form>
  );
};
