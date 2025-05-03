import { emailSender } from '../../../services/emailSender';

export interface ContactServiceOptions {
  email: string;
  message: string;
  name: string;
}

export default async ({ email, message, name }: ContactServiceOptions): Promise<void> => {
  void emailSender.contactRequest({ email, message, name });
};
