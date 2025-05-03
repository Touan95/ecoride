import { resolve } from 'path';
import { emailRenderer } from '../../../core/mailer/emailRenderer';
import { sendEmail } from '../../../core/mailer';

interface EmailParams {
  name: string;
  email: string;
  message: string;
}

export const sendContactRequest = async (params: EmailParams): Promise<void> => {
  const contactRequestHtml = await emailRenderer({
    subTemplatePath: resolve(__dirname, './templates/contactRequest.template.hbs'),
    params: {
      name: params.name,
      email: params.email,
      message: params.message,
    },
    internal: true,
  });

  await sendEmail({
    to: 'anthony.hoang@snowpact.com',
    html: contactRequestHtml,
    subject: '[EcoRide] Demande de contact',
  });
};
