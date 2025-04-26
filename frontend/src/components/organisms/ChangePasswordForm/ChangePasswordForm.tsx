'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/molecules/Button';
import { Typography } from '@/components/atoms/Typography';
import { useChangePasswordMutation } from '@/api/hooks/useAuthAPI';
import { changePasswordFormSchema, ChangePasswordFormSchemaType } from '@/schemas/auth';
import { Input } from '@/components/ui/input';

interface ChangePasswordFormProps {
  onSuccess?: () => void;
}

export const ChangePasswordForm = ({ onSuccess }: ChangePasswordFormProps) => {
  const form = useForm<ChangePasswordFormSchemaType>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  });

  const { errors } = form.formState;

  const buttonDisabled = form.formState.isSubmitting || Object.keys(errors).length > 0;

  const changeUserPasswordMutation = useChangePasswordMutation({
    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
      }
    }
  });

  const onSubmit = (data: ChangePasswordFormSchemaType) => {
    changeUserPasswordMutation.mutate({
      oldPassword: data.oldPassword,
      newPassword: data.newPassword
    });
  };

  return (
    <Form {...form}>
      <Typography variant="title" tag="p">
        Changer le mot de passe
      </Typography>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <Typography variant="cardTitleSm">Ancien mot de passe</Typography>
              <FormControl>
                <Input type="password" placeholder="Ancien mot de passe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <Typography variant="cardTitleSm">Nouveau mot de passe</Typography>
              <FormControl>
                <Input type="password" placeholder="Nouveau mot de passe" {...field} />
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
              <Typography variant="cardTitleSm">Confirmation du mot de passe</Typography>
              <FormControl>
                <Input type="password" placeholder="Confirmation du mot de passe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={buttonDisabled}>
          Valider
        </Button>
      </form>
    </Form>
  );
};
