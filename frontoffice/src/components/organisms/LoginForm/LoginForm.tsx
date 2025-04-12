'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/molecules/Button';
import { Typography } from '@/components/atoms/Typography';
import { loginFormSchema, LoginSchemaType } from '@/schemas/auth';

interface LoginFormProps {
  onLogin: ({ email, password }: { email: string; password: string }) => void;
  onCreateAccountClick?: () => void;
  title?: string;
  buttonTitle?: string;
}

export const LoginForm = ({ onLogin, onCreateAccountClick, title = 'Connectez-vous', buttonTitle = 'Se connecter' }: LoginFormProps) => {
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = (values: LoginSchemaType) => {
    onLogin({ ...values });
  };

  return (
    <Form {...form}>
      <Typography variant="title" tag="p">
        {title}
      </Typography>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <Typography variant="cardTitleSm">Email</Typography>
              <FormControl>
                <Input placeholder="Email" {...field} />
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
                <Input type="password" placeholder="Mot de passe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{buttonTitle}</Button>
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
