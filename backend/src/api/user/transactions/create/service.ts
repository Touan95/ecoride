import { v4 as uuid } from 'uuid';
import { transactionRepositoryInterface } from '../../../../repositories/transaction.repository';
import {
  TransactionEntityInterface,
  TransactionType,
} from '../../../../entities/transaction.entity';
import { UserRepositoryInterface } from '../../../../repositories/user.repository';
import payerNotFoundError from '../../../common/errors/payerNotFound.error';
import receiverNotFoundError from '../../../common/errors/receiverNotFound.error';

export interface CreateOneTransactionServiceOptions {
  amount: number;
  transactionType: TransactionType;
  description: string;
  payerId: string;
  receiverId: string;
  userRepository: UserRepositoryInterface;
  transactionRepository: transactionRepositoryInterface;
}

export default async ({
  amount,
  transactionType,
  description,
  payerId,
  receiverId,
  userRepository,
  transactionRepository,
}: CreateOneTransactionServiceOptions): Promise<TransactionEntityInterface> => {
  const payer = await userRepository.getOneById(payerId);
  if (!payer) {
    throw payerNotFoundError();
  }

  const receiver = await userRepository.getOneById(receiverId);
  if (!receiver) {
    throw receiverNotFoundError();
  }

  const transaction = await transactionRepository.createOne({
    amount,
    date: new Date(),
    description,
    id: uuid(),
    transactionType,
    payer,
    receiver,
  });

  return transaction;
};
