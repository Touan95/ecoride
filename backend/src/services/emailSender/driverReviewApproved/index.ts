import { resolve } from 'path';
import { emailRenderer } from '../../../core/mailer/emailRenderer';
import { sendEmail } from '../../../core/mailer';

interface EmailParams {
  departureCity: string;
  arrivalCity: string;
  departureDate: string;
  username: string;
  email: string;
  passengerUsername: string;
}

export const sendDriverReviewApproved = async (params: EmailParams): Promise<void> => {
  const driverReviewApprovedHtml = await emailRenderer({
    subTemplatePath: resolve(__dirname, './templates/driverReviewApproved.template.hbs'),
    params: {
      username: params.username,
      email: params.email,
      departureDate: params.departureDate,
      departureCity: params.departureCity,
      arrivalCity: params.arrivalCity,
      passengerUsername: params.passengerUsername,
    },
  });

  await sendEmail({
    to: params.email,
    html: driverReviewApprovedHtml,
    subject: `[EcoRide] ${params.departureCity} -> ${params.arrivalCity} : Un nouveau commentaire a été publié`,
  });
};
