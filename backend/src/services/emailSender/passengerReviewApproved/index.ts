import { resolve } from 'path';
import { emailRenderer } from '../../../core/mailer/emailRenderer';
import { sendEmail } from '../../../core/mailer';

interface EmailParams {
  departureCity: string;
  arrivalCity: string;
  departureDate: string;
  username: string;
  email: string;
}

export const sendPassengerReviewApproved = async (params: EmailParams): Promise<void> => {
  const passengerReviewApprovedHtml = await emailRenderer({
    subTemplatePath: resolve(__dirname, './templates/passengerReviewApproved.template.hbs'),
    params: {
      username: params.username,
      email: params.email,
      departureDate: params.departureDate,
      departureCity: params.departureCity,
      arrivalCity: params.arrivalCity,
    },
  });

  await sendEmail({
    to: params.email,
    html: passengerReviewApprovedHtml,
    subject: `[EcoRide] ${params.departureCity} -> ${params.arrivalCity} : Avis publié`,
  });
};
