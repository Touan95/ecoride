'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { passwordRegex } from '@/utils/password';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/molecules/Button';
import { Typography } from '@/components/atoms/Typography';

const formSchema = z.object({
  email: z.string().min(1, { message: 'This field has to be filled.' }).email('This is not a valid email.'),
  password: z.string().min(1, { message: 'Must have at least 1 character' }).regex(passwordRegex, {
    message: 'Your password is not valid'
  })
});

interface LoginFormProps {
  onLogin: ({ email, password }: { email: string; password: string }) => void;
  onCreateAccountClick?: () => void;
}

export const LoginForm = ({ onLogin, onCreateAccountClick }: LoginFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onLogin({ ...values });
  };

  return (
    <Form {...form}>
      <Typography variant="title" tag="p">
        Connectez-vous
      </Typography>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <Typography variant="cardTitleSm">Email</Typography>
              <FormControl>
                <Input placeholder="Email" className="py-2 px-4" {...field} />
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
                <Input type="password" placeholder="Mot de passe" className="py-2 px-4" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
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
