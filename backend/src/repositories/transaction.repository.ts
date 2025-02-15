import { Repository } from 'typeorm';
import { Transaction, TransactionEntity, TransactionEntityInterface } from '../entities/transaction.entity';
import { AppDataSource } from '../loader/database';


export type transactionRepositoryInterface = Repository<TransactionEntity> & {
  createOne(transaction: TransactionEntityInterface): Promise<TransactionEntityInterface>;
};

export const TransactionRepository: transactionRepositoryInterface = AppDataSource.getRepository(
 TransactionEntity,
).extend({
  async createOne(transaction: TransactionEntityInterface): Promise<TransactionEntityInterface> {
    const newTransaction = this.create(transaction);
    await this.save(transaction);
    return newTransaction;
  },
});
