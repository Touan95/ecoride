import { resolve } from 'path';
import { emailRenderer } from '../../../core/mailer/emailRenderer';
import { sendEmail } from '../../../core/mailer';

interface EmailParams {
  siteUrl: string;
  emailAskResetPasswordUrl: string;
  email: string;
}

export const sendEmailToRequestResetPassword = async (params: EmailParams): Promise<void> => {
  const askResetPasswordHtml = await emailRenderer({
    baseTemplate: 'internal',
    subTemplatePath: resolve(__dirname, './templates/askResetPassword.template.hbs'),
    params: {
      siteUrl: params.siteUrl,
      emailAskResetPasswordUrl: params.emailAskResetPasswordUrl,
      email: params.email,
    },
  });

  await sendEmail({
    to: params.email,
    html: askResetPasswordHtml,
    subject: 'Veuillez changer votre mot de passe en cliquant sur le lien',
  });
};
