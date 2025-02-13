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
  username: z.string().min(1, { message: 'This field has to be filled.' }),
  email: z.string().min(1, { message: 'This field has to be filled.' }).email('This is not a valid email.'),
  password: z.string().min(1, { message: 'Must have at least 1 character' }).regex(passwordRegex, {
    message: 'Your password is not valid'
  })
});

interface RegisterFormProps {
  onRegister: ({ username, email, password }: { username: string; email: string; password: string }) => void;
  onLoginClick?: () => void;
}

export const RegisterForm = ({ onRegister, onLoginClick }: RegisterFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
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
                <Input placeholder="Pseudonyme" className="py-2 px-4" {...field} />
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
      {onLoginClick && (
        <div>
          <Typography variant="cardTitleSm">Déjà inscrit ?</Typography>
          <div onClick={onLoginClick} className="cursor-pointer w-fit hover:text-secondary-500">
            <Typography variant="paragraph">Connectez-vous</Typography>
          </div>
        </div>
      )}
    </Form>
  );
};
