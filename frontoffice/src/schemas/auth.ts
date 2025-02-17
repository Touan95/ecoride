import { passwordRegex } from '@/utils/password';
import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.string().min(1, { message: 'This field has to be filled.' }).email('This is not a valid email.'),
  password: z.string().min(1, { message: 'Must have at least 1 character' }).regex(passwordRegex, {
    message: 'Your password is not valid'
  })
});

export type LoginSchemaType = z.infer<typeof loginFormSchema>;

export const registerFormSchema = z.object({
  username: z.string().min(1, { message: 'This field has to be filled.' }),
  email: z.string().min(1, { message: 'This field has to be filled.' }).email('This is not a valid email.'),
  password: z.string().min(1, { message: 'Must have at least 1 character' }).regex(passwordRegex, {
    message: 'Your password is not valid'
  })
});

export type RegisterSchemaType = z.infer<typeof registerFormSchema>;
