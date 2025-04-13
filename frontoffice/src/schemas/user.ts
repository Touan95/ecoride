import { Energy } from '@/interfaces/car';
import { UserType } from '@/interfaces/user';
import { z } from 'zod';
import { SchemaError } from './errors';
import { SERVICE_FEE } from '@/utils/ride';

export const userTypeFormSchema = z.object({
  type: z.enum([UserType.PASSENGER, UserType.DRIVER, UserType.BOTH]).refine((value) => value !== undefined, {
    message: SchemaError.REQUIRED
  })
});

export type UserTypeFormSchemaType = z.infer<typeof userTypeFormSchema>;

export const driverPreferencesFormSchema = z.object({
  acceptsPets: z.boolean().refine((value) => value !== undefined, {
    message: SchemaError.REQUIRED
  }),
  acceptsSmoking: z.boolean().refine((value) => value !== undefined, {
    message: SchemaError.REQUIRED
  }),
  customRules: z.array(z.string())
});

export type DriverPreferencesFormSchemaType = z.infer<typeof driverPreferencesFormSchema>;

export const carDetailsFormSchema = z.object({
  plateNumber: z.string().nonempty({ message: SchemaError.REQUIRED }),
  registrationDate: z.date().refine((value) => !isNaN(value.getTime()), {
    message: SchemaError.REQUIRED
  }),
  color: z.string().nonempty({ message: SchemaError.REQUIRED }),
  brand: z.string().nonempty({ message: SchemaError.REQUIRED }),
  model: z.string().nonempty({ message: SchemaError.REQUIRED }),
  seats: z.number().min(0),
  energy: z.nativeEnum(Energy).refine((value) => value !== undefined, {
    message: SchemaError.REQUIRED
  })
});

export type CarDetailsFormSchemaType = z.infer<typeof carDetailsFormSchema>;

const locationSchema = z.object({
  address: z.string().max(255).nullable(),
  postalCode: z
    .string()
    .regex(/^\d{4,10}$/)
    .nullable(),
  city: z.string().max(100).nullable(),
  coordinate: z.object({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180)
  })
});

export const addRideFormSchema = z.object({
  departureLocation: locationSchema,
  arrivalLocation: locationSchema,
  carId: z.string().nonempty({ message: "L'ID de la voiture est requis." }),
  price: z.number().min(SERVICE_FEE + 1, { message: SchemaError.RIDE_PRICE }),
  arrivalDate: z.date().refine((value) => !isNaN(value.getTime()), {
    message: SchemaError.REQUIRED
  }),
  departureDate: z.date().refine((value) => !isNaN(value.getTime()), {
    message: SchemaError.REQUIRED
  })
});

export type AddRideFormSchemaType = z.infer<typeof addRideFormSchema>;

export const searchRidesFormSchema = z.object({
  departureLocation: locationSchema.optional(),
  arrivalLocation: locationSchema.optional(),
  departureDate: z.date().optional()
});

export type SearchRidesFormSchemaType = z.infer<typeof searchRidesFormSchema>;
