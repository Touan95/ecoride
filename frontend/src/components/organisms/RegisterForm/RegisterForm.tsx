'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/molecules/Button';
import { Typography } from '@/components/atoms/Typography';
import { registerFormSchema, RegisterSchemaType } from '@/schemas/auth';
import { RegisterParams } from '@/api/lib/auth';
import { HTMLTag } from '@/components/atoms/Typography/interface';

interface RegisterFormProps {
  onRegister: (params: Omit<RegisterParams, 'isStaff'>) => void;
  onLoginClick?: () => void;
  title?: string;
  buttonTitle?: string;
  titleTag?: HTMLTag;
}

export const RegisterForm = ({
  onRegister,
  onLoginClick,
  title = 'Inscrivez-vous',
  buttonTitle = "S'inscrire",
  titleTag = 'p'
}: RegisterFormProps) => {
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const { errors } = form.formState;

  const onSubmit = (values: RegisterSchemaType) => {
    onRegister({ ...values });
  };

  const buttonDisabled = form.formState.isSubmitting || Object.keys(errors).length > 0;

  return (
    <Form {...form}>
      <Typography variant="title" tag={titleTag}>
        {title}
      </Typography>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <Typography variant="cardTitleSm">Pseudonyme</Typography>
              <FormControl>
                <Input placeholder="Pseudonyme" {...field} />
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <Typography variant="cardTitleSm">Vérification du mot de passe</Typography>
              <FormControl>
                <Input type="password" placeholder="Vérification du mot de passe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={buttonDisabled} className="mt-4">
          {buttonTitle}
        </Button>
      </form>
      {onLoginClick && (
        <div className="mt-6">
          <Typography variant="cardTitleSm" tag="h2">
            Déjà inscrit ?
          </Typography>
          <button onClick={onLoginClick} className="cursor-pointer w-fit" type="button" aria-label="Se connecter">
            <Typography variant="paragraph" customClassName="hover:text-secondary-500">
              Connectez-vous
            </Typography>
          </button>
        </div>
      )}
    </Form>
  );
};
