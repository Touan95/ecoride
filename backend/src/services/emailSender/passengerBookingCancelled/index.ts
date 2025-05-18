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

export const sendPassengerBookingCancelled = async (params: EmailParams): Promise<void> => {
  const passengerBookingCancelledHtml = await emailRenderer({
    subTemplatePath: resolve(__dirname, './templates/passengerBookingCancelled.template.hbs'),
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
    html: passengerBookingCancelledHtml,
    subject: `[EcoRide] ${params.departureCity} -> ${params.arrivalCity} : Réservation annulée`,
  });
};
