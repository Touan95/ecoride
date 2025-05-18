import { resolve } from 'path';
import { emailRenderer } from '../../../core/mailer/emailRenderer';
import { sendEmail } from '../../../core/mailer';

interface EmailParams {
  departureCity: string;
  arrivalCity: string;
  departureDate: string;
  username: string;
  email: string;
  passengerEmail: string;
  passengerUsername: string;
}

export const sendDriverBookingCancelled = async (params: EmailParams): Promise<void> => {
  const driverBookingCancelledHtml = await emailRenderer({
    subTemplatePath: resolve(__dirname, './templates/driverBookingCancelled.template.hbs'),
    params: {
      departureCity: params.departureCity,
      arrivalCity: params.arrivalCity,
      departureDate: params.departureDate,
      username: params.username,
      email: params.email,
      passengerEmail: params.passengerEmail,
      passengerUsername: params.passengerUsername,
    },
  });

  await sendEmail({
    to: params.email,
    html: driverBookingCancelledHtml,
    subject: `[EcoRide] ${params.departureCity} -> ${params.arrivalCity} : Une réservation a été annulée`,
  });
};
