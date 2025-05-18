import { passwordRegex } from '@/utils/password';
import { z } from 'zod';
import { SchemaError } from './errors';

export const loginFormSchema = z.object({
  email: z.string().min(1, { message: SchemaError.REQUIRED }).email(SchemaError.INVALID_EMAIL),
  password: z.string().min(1, { message: SchemaError.REQUIRED })
});

export type LoginSchemaType = z.infer<typeof loginFormSchema>;

export const registerFormSchema = z
  .object({
    username: z.string().min(1, { message: SchemaError.REQUIRED }),
    email: z.string().min(1, { message: SchemaError.REQUIRED }).email(SchemaError.INVALID_EMAIL),
    password: z.string().min(1, { message: SchemaError.REQUIRED }).regex(passwordRegex, {
      message: SchemaError.INVALID_PASSWORD
    }),
    confirmPassword: z.string().min(1, { message: SchemaError.REQUIRED }),
    termsAccepted: z.boolean().refine((data) => data, { message: SchemaError.REQUIRED })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: SchemaError.PASSWORD_NOT_MATCH,
    path: ['confirmPassword']
  })
  .refine((data) => data.confirmPassword.match(passwordRegex), {
    message: SchemaError.INVALID_PASSWORD,
    path: ['confirmPassword']
  });

export type RegisterSchemaType = z.infer<typeof registerFormSchema>;

export const changePasswordFormSchema = z
  .object({
    oldPassword: z.string().min(1, { message: SchemaError.REQUIRED }),
    newPassword: z.string().min(1, { message: SchemaError.REQUIRED }).regex(passwordRegex, {
      message: SchemaError.INVALID_PASSWORD
    }),
    confirmPassword: z.string().min(1, { message: SchemaError.REQUIRED })
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: SchemaError.PASSWORD_NOT_MATCH,
    path: ['confirmPassword']
  })
  .refine((data) => data.confirmPassword.match(passwordRegex), {
    message: SchemaError.INVALID_PASSWORD,
    path: ['confirmPassword']
  });

export type ChangePasswordFormSchemaType = z.infer<typeof changePasswordFormSchema>;
