import { parseBoolean } from '../../utils/env.util';
import { configBuilder } from '../configBuilder';

export interface SesMailerConfig {
  FROM_EMAIL: string;
  SMTP_URL: string;
  EMAIL_SEND: boolean;
}

export const buildConfig = (): SesMailerConfig => {
  return configBuilder<SesMailerConfig>({
    requiredVariables: ['FROM_EMAIL', 'SMTP_URL'],
    parseFunction: (config) => ({
      FROM_EMAIL: config.FROM_EMAIL,
      SMTP_URL: config.SMTP_URL,
      EMAIL_SEND: parseBoolean(config.EMAIL_SEND) ?? true,
    }),
  })();
};
