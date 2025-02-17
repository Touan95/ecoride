'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/molecules/Button';
import { Typography } from '@/components/atoms/Typography';
import { useChangeDriverPreferencesMutation } from '@/api/hooks/useUserAPI';
import { driverPreferencesFormSchema, DriverPreferencesFormSchemaType } from '@/schemas/user';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface DriverPreferencesFormProps {
  initialValues: DriverPreferencesFormSchemaType;
  userId: string;
  onValidate: () => void;
}

export const DriverPreferencesForm = ({ initialValues, userId, onValidate }: DriverPreferencesFormProps) => {
  const [newPreference, setNewPreference] = useState('');
  const [preferences, setPreferences] = useState(initialValues.customRules);
  const form = useForm<DriverPreferencesFormSchemaType>({
    resolver: zodResolver(driverPreferencesFormSchema),
    defaultValues: initialValues
  });

  const changeDriverPreferencesMutation = useChangeDriverPreferencesMutation({
    onSuccess: () => {
      onValidate();
    }
  });

  const onSubmit = (data: DriverPreferencesFormSchemaType) => {
    const newDriverPreferences = { ...data, customRules: preferences };
    changeDriverPreferencesMutation.mutate({
      userId,
      ...newDriverPreferences
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <FormField
          control={form.control}
          name="acceptsSmoking"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-3 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <Typography variant="cardTitleSm" weight="light">
                J'accepte les fumeurs
              </Typography>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="acceptsPets"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-3 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <Typography variant="cardTitleSm" weight="light">
                J'accepte les animaux
              </Typography>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-3">
          <div>
            <Typography variant="cardTitleSm" weight="light">
              Préférences personnalisées
            </Typography>
            <Typography variant="extraSmall" weight="light">
              (60 caractères maximum)
            </Typography>
          </div>

          <div className="flex gap-2 items-center">
            <Input
              placeholder="Ajouter une préférence..."
              value={newPreference}
              onChange={(e) => setNewPreference(e.target.value)}
              className="py-1 px-3 text-sm"
              maxLength={60}
            />
            <Button
              type="button"
              onClick={() => {
                setPreferences((prev) => [...prev, newPreference]);
                setNewPreference('');
              }}
              className="w-8 h-8 rounded-full text-xl"
            >
              +
            </Button>
          </div>

          <ul className="flex flex-col gap-1">
            {preferences.map((preference, index) => (
              <li key={index} className="flex gap-2 items-center">
                <Input
                  placeholder="Ajouter une préférence..."
                  value={preference}
                  onChange={(e) => setNewPreference(e.target.value)}
                  className="py-1 px-3 text-sm opacity-50"
                  readOnly
                />
                <Button
                  className="w-8 h-8 rounded-full bg-red-500 text-2xl"
                  type="button"
                  onClick={() => setPreferences((prev) => prev.filter((_, i) => i !== index))}
                >
                  -
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <Button type="submit" className="w-full">
          Confirmer
        </Button>
      </form>
    </Form>
  );
};
