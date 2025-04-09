export interface AppConfig {
  NODE_ENV: string;
  API_PREFIX: string;
  PORT: number;
  MIGRATION_RUN: boolean;
  DB_SSL: boolean;
  ALLOWED_ORIGINS: string[];
  ACCESS_TOKEN_SECRET: string;
  REFRESH_TOKEN_SECRET: string;
  MONGO_URI: string;
  ACCESS_TOKEN_LIFE: number;
  REFRESH_TOKEN_LIFE: number;
}

const REQUIRED_VARIABLES: string[] = [
  'ACCESS_TOKEN_SECRET',
  'REFRESH_TOKEN_SECRET',
  'ACCESS_TOKEN_LIFE',
  'REFRESH_TOKEN_LIFE',
  'MONGO_URI'
];

function checkRequiredVariables(config: NodeJS.ProcessEnv): void {
  REQUIRED_VARIABLES.forEach((key): void => {
    if (!config[key] || config[key] === '') {
      throw new Error(`${key} env variable is required`);
    }
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseConfig(config: any): AppConfig {
  return {
    NODE_ENV: config.NODE_ENV ?? 'development',
    PORT: config.PORT ?? 8080,
    API_PREFIX: config.API_PREFIX ?? '',
    MIGRATION_RUN: config.MIGRATION_RUN ?? false,
    DB_SSL: config.DB_SSL ?? false,
    ALLOWED_ORIGINS: config.ALLOWED_ORIGINS ? config.ALLOWED_ORIGINS.split(',') : [],
    ACCESS_TOKEN_SECRET: config.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: config.REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_LIFE: config.ACCESS_TOKEN_LIFE,
    REFRESH_TOKEN_LIFE: config.REFRESH_TOKEN_LIFE,
    MONGO_URI: config.MONGO_URI
  };
}

function buildConfig(config = process.env): AppConfig {
  checkRequiredVariables(config);
  return parseConfig(config);
}

export default buildConfig();
