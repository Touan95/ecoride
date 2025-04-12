'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/molecules/Button';
import { Typography } from '@/components/atoms/Typography';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import { disputeResolutionActionFormSchema, DisputeResolutionActionFormSchemaType } from '@/schemas/user';
import { DisputeCreditAction, DisputeReviewAction } from '@/interfaces/review';

dayjs.locale('fr');

interface DisputeResolutionFormProps {
  onSubmit: (params: DisputeResolutionActionFormSchemaType) => void;
}

export const DisputeResolutionForm = ({ onSubmit }: DisputeResolutionFormProps) => {
  const form = useForm<DisputeResolutionActionFormSchemaType>({
    resolver: zodResolver(disputeResolutionActionFormSchema)
  });

  const handleSubmit = (values: DisputeResolutionActionFormSchemaType) => {
    onSubmit({ ...values });
  };

  const values = form.getValues();
  const buttonDisabled = !values.credits || !values.review;
  return (
    <Form {...form}>
      <Typography variant="cardTitle" customClassName="mb-5" align="center">
        Arbitrage sur le litige
      </Typography>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="place-items-center">
        <div className="w-full">
          <FormField
            control={form.control}
            name="credits"
            render={({ field }) => (
              <FormItem>
                <Typography variant="cardTitleSm">Que faire des crédits payés par le passager ?</Typography>
                <FormControl>
                  <RadioGroup onValueChange={field.onChange} className="flex flex-col space-y-1 text-primary-900">
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={DisputeCreditAction.REFUND_PASSENGER} />
                      </FormControl>
                      <Typography variant="cardTitleSm" weight="light">
                        Rembourser le passager
                      </Typography>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={DisputeCreditAction.PAY_DRIVER} />
                      </FormControl>
                      <Typography variant="cardTitleSm" weight="light">
                        Payer le chauffeur
                      </Typography>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className=" w-full">
          <FormField
            control={form.control}
            name="review"
            render={({ field }) => (
              <FormItem>
                <Typography variant="cardTitleSm">{"Que faire de l'avis laissé par le passager ?"}</Typography>
                <FormControl>
                  <RadioGroup onValueChange={field.onChange} className="flex flex-col space-y-1 text-primary-900">
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={DisputeReviewAction.REJECT_REVIEW} />
                      </FormControl>
                      <Typography variant="cardTitleSm" weight="light">
                        {"Ne pas publier l'avis"}
                      </Typography>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={DisputeReviewAction.VALIDATE_REVIEW} />
                      </FormControl>
                      <Typography variant="cardTitleSm" weight="light">
                        {"Publier l'avis"}
                      </Typography>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-40" disabled={buttonDisabled}>
          Valider
        </Button>
      </form>
    </Form>
  );
};
