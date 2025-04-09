import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { buildConfig } from './config';

export interface MailerSendOptions {
  to: string;
  html: string;
  subject: string;
  attachments?: Mail.Attachment[];
}

export type MailerFunction = (options: MailerSendOptions) => Promise<void>;

export const sendEmail: MailerFunction = async (options: MailerSendOptions): Promise<void> => {
  const config = buildConfig();
  if (!config.EMAIL_SEND) {
    return;
  }

  const transporter = createTransport({
    url: config.SMTP_URL,
    auth: {
      user: 'apikey',
      pass: config.MAILER_API_KEY,
    },
  });

  await transporter.sendMail({
    from: config.FROM_EMAIL,
    to: options.to,
    subject: options.subject,
    html: options.html,
    attachments: options.attachments,
  });
};
