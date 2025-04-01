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

export const sendPassengersRideCancelledByDriver = async (params: EmailParams): Promise<void> => {
  const rideCancelledHtml = await emailRenderer({
    subTemplatePath: resolve(__dirname, './templates/rideCancelledByDriver.template.hbs'),
    params: {
      departureCity: params.departureCity,
      arrivalCity: params.arrivalCity,
      departureDate: params.departureDate,
      username: params.username,
      email: params.email,
    },
  });

  await sendEmail({
    to: params.email,
    html: rideCancelledHtml,
    subject: `[EcoRide] ${params.departureCity} -> ${params.arrivalCity} : Trajet annulé`,
  });
};
