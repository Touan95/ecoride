'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/molecules/Button';
import { Typography } from '@/components/atoms/Typography';
import { registerFormSchema, RegisterSchemaType } from '@/schemas/auth';

interface RegisterFormProps {
  onRegister: ({ username, email, password }: { username: string; email: string; password: string }) => void;
  onLoginClick?: () => void;
}

export const RegisterForm = ({ onRegister, onLoginClick }: RegisterFormProps) => {
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }
  });

  const onSubmit = (values: RegisterSchemaType) => {
    onRegister({ ...values });
  };

  return (
    <Form {...form}>
      <Typography variant="title" tag="p">
        Inscrivez-vous
      </Typography>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <Typography variant="cardTitleSm">Pseudonyme</Typography>
              <FormControl>
                <Input placeholder="Pseudonyme"  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <Typography variant="cardTitleSm">Email</Typography>
              <FormControl>
                <Input placeholder="Email"  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <Typography variant="cardTitleSm">Mot de passe</Typography>
              <FormControl>
                <Input type="password" placeholder="Mot de passe"  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{"S'inscrire"}</Button>
      </form>
      {onLoginClick && (
        <div className="mt-6">
          <Typography variant="cardTitleSm">Déjà inscrit ?</Typography>
          <div onClick={onLoginClick} className="cursor-pointer w-fit">
            <Typography variant="paragraph" customClassName="hover:text-secondary-500">
              Connectez-vous
            </Typography>
          </div>
        </div>
      )}
    </Form>
  );
};
