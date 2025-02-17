import { Energy } from '@/interfaces/car';
import { UserType } from '@/interfaces/user';
import { z } from 'zod';

export const userTypeFormSchema = z.object({
  type: z.enum([UserType.PASSENGER, UserType.DRIVER, UserType.BOTH])
});

export type UserTypeFormSchemaType = z.infer<typeof userTypeFormSchema>;

export const driverPreferencesFormSchema = z.object({
  acceptsPets: z.boolean(),
  acceptsSmoking: z.boolean(),
  customRules: z.array(z.string())
});

export type DriverPreferencesFormSchemaType = z.infer<typeof driverPreferencesFormSchema>;

export const carDetailsFormSchema = z.object({
  plateNumber: z.string(),
  registrationDate: z.date(),
  color: z.string(),
  brand: z.string(),
  model: z.string(),
  seats: z.number().min(0),
  energy: z.nativeEnum(Energy)
});

export type CarDetailsFormSchemaType = z.infer<typeof carDetailsFormSchema>;
