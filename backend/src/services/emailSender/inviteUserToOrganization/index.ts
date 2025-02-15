import { resolve } from 'path';
import { emailRenderer } from '../../../core/mailer/emailRenderer';
import { sendEmail } from '../../../core/mailer';

interface EmailParams {
  organizationName: string;
  joinOrganizationUrl: string;
  email: string;
}

export const sendEmailToInviteUserToOrganization = async (params: EmailParams): Promise<void> => {
  const inviteHtml = await emailRenderer({
    baseTemplate: 'internal',
    subTemplatePath: resolve(__dirname, './templates/invite.template.hbs'),
    params: {
      organizationName: params.organizationName,
      joinOrganizationUrl: params.joinOrganizationUrl,
      email: params.email,
    },
  });

  await sendEmail({
    to: params.email,
    html: inviteHtml,
    subject: `[SIGNALEO] ${params.organizationName} : Invitation à rejoindre l'organisation`,
  });
};
  