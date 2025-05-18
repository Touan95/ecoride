import { resolve } from 'path';
import { emailRenderer } from '../../../core/mailer/emailRenderer';
import { sendEmail } from '../../../core/mailer';

interface EmailParams {
  username: string;
  email: string;
}

export const sendUserRegistrationConfirmation = async (params: EmailParams): Promise<void> => {
  const userRegistrationConfirmationHtml = await emailRenderer({
    subTemplatePath: resolve(__dirname, './templates/userRegistrationConfirmation.template.hbs'),
    params: {
      username: params.username,
      email: params.email,
    },
  });

  await sendEmail({
    to: params.email,
    html: userRegistrationConfirmationHtml,
    subject: `[EcoRide] Inscription confirmée`,
  });
};
