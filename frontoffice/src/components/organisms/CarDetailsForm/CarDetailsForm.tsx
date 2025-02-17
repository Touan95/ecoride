'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';

import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/molecules/Button';
import { Button as ShadButton } from '@/components/ui/button';
import { Typography } from '@/components/atoms/Typography';
import { carDetailsFormSchema, CarDetailsFormSchemaType } from '@/schemas/user';
import { Energy } from '@/interfaces/car';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { getEnergyLabel } from '@/utils/values';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import clsxm from '@/utils/clsxm';

interface CarDetailsFormProps {
  onLogin?: ({ email, password }: { email: string; password: string }) => void;
  onCreateAccountClick?: () => void;
  initialValues?: CarDetailsFormSchemaType;
  editMode?: boolean;
}

export const CarDetailsForm = ({ onLogin, onCreateAccountClick, initialValues, editMode = false }: CarDetailsFormProps) => {
  const form = useForm<CarDetailsFormSchemaType>({
    resolver: zodResolver(carDetailsFormSchema),
    defaultValues: {
      brand: initialValues?.brand ?? '',
      color: initialValues?.color ?? '',
      energy: initialValues?.energy ?? Energy.UNKNOWN,
      model: initialValues?.model ?? '',
      plateNumber: initialValues?.plateNumber ?? '',
      registrationDate: initialValues?.registrationDate ?? new Date(),
      seats: initialValues?.seats ?? 0
    }
  });

  const onSubmit = (values: CarDetailsFormSchemaType) => {
    // onLogin({ ...values });
  };

  return (
    <Form {...form}>
      <Typography variant="cardTitle" customClassName="mb-5">
        {editMode ? 'Modifiez votre véhicule' : 'Ajoutez un nouveau véhicule'}
      </Typography>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-1">
        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem>
              <Typography variant="cardTitleSm">Marque</Typography>
              <FormControl>
                <Input placeholder="Marque" className="py-2 px-4" {...field} />
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
                <Input placeholder="Modèle" className="py-2 px-4" {...field} />
              </FormControl>
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
                <Input placeholder="Couleur" className="py-2 px-4" {...field} />
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
                <Input placeholder="Immatriculation" className="py-2 px-4" {...field} />
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
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1 text-primary-900">
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
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={Energy.UNKNOWN} />
                    </FormControl>
                    <Typography variant="cardTitleSm" weight="light">
                      {getEnergyLabel(Energy.UNKNOWN)}
                    </Typography>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="seats"
          render={({ field }) => (
            <FormItem>
              <Typography variant="cardTitleSm">Place(s) passager</Typography>
              <FormControl>
                <Input type="number" placeholder="Place(s) passager" className="py-2 px-4" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="registrationDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Typography variant="cardTitleSm">Couleur</Typography>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <ShadButton
                      variant={'outline'}
                      className={clsxm('w-[240px] pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                    >
                      {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </ShadButton>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>Your date of birth is used to calculate your age.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
      {onCreateAccountClick && (
        <div className="mt-6">
          <Typography variant="cardTitleSm">Pas encore inscrit ?</Typography>
          <div onClick={onCreateAccountClick} className="cursor-pointer w-fit">
            <Typography variant="paragraph" customClassName="hover:text-secondary-500">
              Créez un compte
            </Typography>
          </div>
        </div>
      )}
    </Form>
  );
};
