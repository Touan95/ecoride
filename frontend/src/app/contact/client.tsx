'use client';

import SectionContainer from '@/components/layout/SectionContainer';
import { Typography } from '@/components/atoms/Typography';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Input, inputClassname } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/molecules/Button';
import { contactFormSchema, ContactFormSchemaType } from '@/schemas/contact';
import { zodResolver } from '@hookform/resolvers/zod';
import clsxm from '@/utils/clsxm';
import { useContactMutation } from '@/api/hooks/useContactAPI';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { ROUTES } from '@/configs/routes';
import { useState } from 'react';

export default function ContactPageClient() {
  const [privacyChecked, setPrivacyChecked] = useState(false);
  console.log('🚀 ~ checked:', privacyChecked);
  const contact = useContactMutation({});
  const form = useForm<ContactFormSchemaType>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: '', email: '', message: '' }
  });
  const { errors } = form.formState;
  const buttonDisabled = form.formState.isSubmitting || Object.keys(errors).length > 0;
  const onSubmit = (values: ContactFormSchemaType) => {
    contact.mutate({
      name: values.name,
      email: values.email,
      message: values.message
    });
  };
  const handleCheckboxChange = (checked: boolean) => {
    setPrivacyChecked(checked);
  };
  return (
    <SectionContainer className="flex flex-col gap-5 my-10">
      <div className="flex flex-col gap-2">
        <Typography variant="title">Nous contacter</Typography>
        <Typography variant="h2">Une question, une suggestion ou besoin d’assistance ?</Typography>
        <Typography variant="paragraph">
          Chez EcoRide, nous sommes à votre écoute. Que vous soyez utilisateur, conducteur, partenaire ou simplement curieux, n’hésitez pas
          à nous contacter via ce formulaire. Nous mettons un point d’honneur à vous répondre dans les plus brefs délais afin de vous offrir
          un service de qualité, à la hauteur de vos attentes.
        </Typography>
        <Typography variant="paragraph">
          Nota : Ce site a été réalisé dans le cadre d’un projet fictif de formation. Vos messages sont toutefois bien pris en compte.
        </Typography>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-xl p-5 bg-primary-50 rounded-xl shadow space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <Typography variant="cardTitleSm">Nom</Typography>
                <FormControl>
                  <Input placeholder="Nom" {...field} aria-label="Nom" />
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
                  <Input placeholder="Email" {...field} aria-label="Email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <Typography variant="cardTitleSm">Message</Typography>
                <FormControl>
                  <Textarea
                    {...field}
                    className={clsxm(inputClassname, 'rounded-lg focus-visible:ring-[1px] resize-y w-full max-w-[656px] mb-2 border-none')}
                    placeholder="Votre message"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="h-10 items-center flex gap-4">
            <Checkbox
              id="privacy-checkbox"
              aria-label="Accepter la politique de confidentialité"
              onCheckedChange={handleCheckboxChange}
              checked={privacyChecked}
            />
            <Typography variant="small" htmlFor="privacy-checkbox">
              Je consens à ce que les informations saisies soient utilisées uniquement pour me recontacter, conformément à la{' '}
              <Link href={ROUTES.PRIVACY_POLICY} className="underline">
                politique de confidentialité
              </Link>
            </Typography>
          </div>
          <Button type="submit" className="w-full" disabled={buttonDisabled || !privacyChecked}>
            Envoyer
          </Button>
        </form>
      </Form>
    </SectionContainer>
  );
}
