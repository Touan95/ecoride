'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/molecules/Button';
import { Typography } from '@/components/atoms/Typography';
import { loginFormSchema, LoginSchemaType } from '@/schemas/auth';
import { HTMLTag } from '@/components/atoms/Typography/interface';
import { PasswordInput } from '@/components/inputs/PasswordInput';

interface LoginFormProps {
  onLogin: ({ email, password }: { email: string; password: string }) => void;
  onCreateAccountClick?: () => void;
  title?: string;
  buttonTitle?: string;
  titleTag?: HTMLTag;
}

export const LoginForm = ({
  onLogin,
  onCreateAccountClick,
  title = 'Connectez-vous',
  buttonTitle = 'Se connecter',
  titleTag = 'p'
}: LoginFormProps) => {
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const { errors } = form.formState;

  const buttonDisabled = form.formState.isSubmitting || Object.keys(errors).length > 0;

  const onSubmit = (values: LoginSchemaType) => {
    onLogin({ ...values });
  };

  return (
    <Form {...form}>
      <Typography variant="title" tag={titleTag}>
        {title}
      </Typography>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
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
                <PasswordInput placeholder="Mot de passe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-4" disabled={buttonDisabled}>
          {buttonTitle}
        </Button>
      </form>
      {onCreateAccountClick && (
        <div className="mt-6">
          <Typography variant="cardTitleSm" tag="h2">
            Pas encore inscrit ?
          </Typography>
          <button onClick={onCreateAccountClick} className="cursor-pointer w-fit" type="button" aria-label="Créer un compte">
            <Typography variant="paragraph" customClassName="hover:text-secondary-500">
              Créez un compte
            </Typography>
          </button>
        </div>
      )}
    </Form>
  );
};
