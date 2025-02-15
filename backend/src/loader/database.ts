import path from 'path';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { SnakeCaseNamingStrategy } from '../core/database/snakeCaseNamingStrategy';
import { buildConfig } from './databaseConfig';

const config = buildConfig();
const buildPath = (ext: string): string => path.resolve(__dirname, '..', 'migrations', `*.${ext}`);

export const entitiesPath = path.join(__dirname, '..', 'entities');

let prodEnv: Partial<PostgresConnectionOptions> | undefined = undefined;
if (config.INSTANCE_CONNECTION_NAME) {
  prodEnv = {
    extra: {
      socketPath: `/cloudsql/${config.INSTANCE_CONNECTION_NAME}`,
    },
    host: `/cloudsql/${config.INSTANCE_CONNECTION_NAME}`,
    port: undefined,
  };
}

const dbEnvConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: config.DB_HOST,
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_DATABASE,
  port: config.DB_PORT,
  entities: [path.join(entitiesPath, '**', '*.ts'), path.join(entitiesPath, '**', '*.js')],
  logging: config.DB_LOGGING,
  migrationsRun: config.MIGRATION_RUN,
  synchronize: false,
  migrations: [buildPath('ts'), buildPath('js')],
  namingStrategy: new SnakeCaseNamingStrategy(),
  ...prodEnv,
};

export const AppDataSource = new DataSource(dbEnvConfig);
export const initDatabase = async (): Promise<void> => {
  await AppDataSource.initialize();
};
