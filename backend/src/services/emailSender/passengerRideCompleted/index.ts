import { resolve } from 'path';
import { emailRenderer } from '../../../core/mailer/emailRenderer';
import { sendEmail } from '../../../core/mailer';

interface EmailParams {
  departureCity: string;
  arrivalCity: string;
  endDate: string;
  username: string;
  email: string;
  rideId: string;
}

export const sendPassengerRideCompleted = async (params: EmailParams): Promise<void> => {
  const rideUrl = `https://ecoride-sooty.vercel.app/trajets/${params.rideId}?review=true`;
  const passengerRideCompletedHtml = await emailRenderer({
    subTemplatePath: resolve(__dirname, './templates/passengerRideCompleted.template.hbs'),
    params: {
      departureCity: params.departureCity,
      arrivalCity: params.arrivalCity,
      endDate: params.endDate,
      username: params.username,
      email: params.email,
      rideUrl,
    },
  });

  await sendEmail({
    to: params.email,
    html: passengerRideCompletedHtml,
    subject: `[EcoRide] ${params.departureCity} -> ${params.arrivalCity} : Trajet terminé`,
  });
};
