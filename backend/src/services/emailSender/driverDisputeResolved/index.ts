import { resolve } from 'path';
import { emailRenderer } from '../../../core/mailer/emailRenderer';
import { sendEmail } from '../../../core/mailer';

interface EmailParams {
  departureCity: string;
  arrivalCity: string;
  departureDate: string;
  username: string;
  email: string;
  refundPassenger: boolean;
  approveReview: boolean;
  passengerUsername: string;
}

export const sendDriverDisputeResolved = async (params: EmailParams): Promise<void> => {
  const driverDisputeResolvedHtml = await emailRenderer({
    subTemplatePath: resolve(__dirname, './templates/driverDisputeResolved.template.hbs'),
    params: {
      username: params.username,
      email: params.email,
      departureDate: params.departureDate,
      departureCity: params.departureCity,
      arrivalCity: params.arrivalCity,
      refundPassenger: params.refundPassenger,
      approveReview: params.approveReview,
      passengerUsername: params.passengerUsername,
    },
  });

  await sendEmail({
    to: params.email,
    html: driverDisputeResolvedHtml,
    subject: `[EcoRide] ${params.departureCity} -> ${params.arrivalCity} : Litige modéré`,
  });
};
