import { z } from 'zod';
import { SchemaError } from './errors';

export const contactFormSchema = z.object({
  email: z.string().min(1, { message: SchemaError.REQUIRED }).email(SchemaError.INVALID_EMAIL),
  message: z.string().min(1, { message: SchemaError.REQUIRED }).max(1000, { message: SchemaError.CONTACT_MAX_LENGTH }),
  name: z.string().min(1, { message: SchemaError.REQUIRED })
});

export type ContactFormSchemaType = z.infer<typeof contactFormSchema>;
