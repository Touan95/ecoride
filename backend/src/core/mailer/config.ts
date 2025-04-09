import { parseBoolean } from '../../utils/env.util';
import { configBuilder } from '../configBuilder';

export interface SesMailerConfig {
  FROM_EMAIL: string;
  SMTP_URL: string;
  MAILER_API_KEY: string;
  EMAIL_SEND: boolean;
}

export const buildConfig = (): SesMailerConfig => {
  return configBuilder<SesMailerConfig>({
    requiredVariables: ['FROM_EMAIL', 'SMTP_URL'],
    parseFunction: (config) => ({
      FROM_EMAIL: config.FROM_EMAIL,
      SMTP_URL: config.SMTP_URL,
      MAILER_API_KEY: config.MAILER_API_KEY,
      EMAIL_SEND: parseBoolean(config.EMAIL_SEND) ?? true,
    }),
  })();
};
