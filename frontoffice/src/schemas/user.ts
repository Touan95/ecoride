import { Energy } from '@/interfaces/car';
import { DisputeCreditAction, DisputeReviewAction } from '@/interfaces/review';
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
  carId: z.string(),
  price: z.number(),
  arrivalDate: z.date(),
  departureDate: z.date()
});

export type AddRideFormSchemaType = z.infer<typeof addRideFormSchema>;

export const searchRidesFormSchema = z.object({
  departureLocation: locationSchema.optional(),
  arrivalLocation: locationSchema.optional(),
  departureDate: z.date().optional()
});

export type SearchRidesFormSchemaType = z.infer<typeof searchRidesFormSchema>;

export const disputeResolutionActionFormSchema = z.object({
  credits: z.nativeEnum(DisputeCreditAction),
  review: z.nativeEnum(DisputeReviewAction)
});

export type DisputeResolutionActionFormSchemaType = z.infer<typeof disputeResolutionActionFormSchema>;
