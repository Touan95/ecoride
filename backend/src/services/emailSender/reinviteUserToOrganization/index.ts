import { resolve } from 'path';
import { emailRenderer } from '../../../core/mailer/emailRenderer';
import { sendEmail } from '../../../core/mailer';

interface EmailParams {
  organizationName: string;
  joinOrganizationUrl: string;
  email: string;
}

export const resendEmailToInviteUserToOrganization = async (params: EmailParams): Promise<void> => {
  const reinviteHtml = await emailRenderer({
    baseTemplate: 'internal',
    subTemplatePath: resolve(__dirname, './templates/reinvite.template.hbs'),
    params: {
      organizationName: params.organizationName,
      joinOrganizationUrl: params.joinOrganizationUrl,
      email: params.email,
    },
  });

  await sendEmail({
    to: params.email,
    html: reinviteHtml,
    subject: `[SIGNALEO] ${params.organizationName} : Invitation à rejoindre l'organisation`,
  });
};
