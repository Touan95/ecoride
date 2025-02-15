import { EntityManager } from 'typeorm';
import { AppDataSource } from '../../loader/database';

export type FunctionCallbackType<T> = (transactionalEntityManager: EntityManager) => Promise<T>;

export type IProcessTransaction = <T>(func: FunctionCallbackType<T>) => Promise<T>;

export const processTransaction: IProcessTransaction = async <T>(
  func: FunctionCallbackType<T>,
): Promise<T> =>
  AppDataSource.transaction(async (transactionalEntityManager: EntityManager) =>
    func(transactionalEntityManager),
  );
