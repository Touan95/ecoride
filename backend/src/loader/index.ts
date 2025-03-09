import apiRouter from '../api';
import config from './config';
import buildApp from './app';
import { initDatabase } from './database';

export default async (): Promise<void> => {
  try {
    await initDatabase();

    const app = buildApp({
      prefix: config.API_PREFIX,
      router: apiRouter,
    });

    app.listen(config.PORT, () =>
      console.log(
        `App is running on ${config.PORT} port. Allowed origin is ${config.ALLOWED_ORIGINS}`,
      ),
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
