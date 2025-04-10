import apiRouter from '../api';
import config from './config';
import buildApp from './app';
import { initDatabase } from './database';
import { buildConfig } from '../core/mailer/config';

export default async (): Promise<void> => {
  try {
    await initDatabase();

    const app = buildApp({
      prefix: config.API_PREFIX,
      router: apiRouter,
    });

    const mailConfig = buildConfig();

    app.listen(config.PORT, () =>
      console.log(
        `App is running on ${config.PORT} port. Allowed origin is ${config.ALLOWED_ORIGINS}. Mailer config is SMTP_URL=${mailConfig.SMTP_URL} | FROM_EMAIL=${mailConfig.FROM_EMAIL}`,
      ),
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
