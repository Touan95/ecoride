import { LoggerOptions } from 'typeorm/logger/LoggerOptions';
import { parseBoolean } from '../utils/env.util';

function checkRequiredVariables(requiredVariables: string[], config: NodeJS.ProcessEnv): void {
  requiredVariables.forEach((key): void => {
    if (!config[key] || config[key] === '') {
      throw new Error(`${key} env variable is required`);
    }
  });
}

export const configBuilder =
  <T>({ requiredVariables, parseFunction }: ConfigBuilderOptions<T>) =>
  (): T => {
    if (requiredVariables) {
      checkRequiredVariables(requiredVariables, process.env);
    }

    return parseFunction(process.env);
  };

export interface ConfigBuilderOptions<T> {
  requiredVariables?: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parseFunction: (config: any) => T;
}

export interface DatabaseConfig {
  DB_LOGGING: LoggerOptions;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;
  DB_HOST?: string;
  DB_PORT?: number;
  INSTANCE_CONNECTION_NAME?: string;
  MIGRATION_RUN?: boolean;
}

function parseNumber(val?: string): number | undefined {
  if (!val) {
    return undefined;
  }
  return parseInt(val, 10);
}

const requiredVariables: string[] = ['DB_USERNAME', 'DB_PASSWORD', 'DB_DATABASE'];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseConfig(config: any): DatabaseConfig {
  return {
    DB_USERNAME: config.DB_USERNAME,
    DB_PASSWORD: config.DB_PASSWORD,
    DB_DATABASE: config.DB_DATABASE,
    DB_HOST: config.DB_HOST,
    DB_PORT: parseNumber(config.DB_PORT),
    INSTANCE_CONNECTION_NAME: config.INSTANCE_CONNECTION_NAME,
    DB_LOGGING: parseBoolean(config.DB_LOGGING) ?? (config.DB_LOGGING as LoggerOptions),
    MIGRATION_RUN: parseBoolean(config.MIGRATION_RUN),
  };
}

export const buildConfig = configBuilder<DatabaseConfig>({
  requiredVariables,
  parseFunction: parseConfig,
});
