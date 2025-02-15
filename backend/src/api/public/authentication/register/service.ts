import { v4 as uuid } from 'uuid';
import { UserRepositoryInterface } from '../../../../repositories/user.repository';
import userEmailAlreadyExistsError from '../../../common/errors/userEmailAlreadyExists.error';
import { processTransaction } from '../../../../core/database';
import { hashPassword } from '../common/services/password.service';
import { UserEntityInterface, UserType } from '../../../../entities/user.entity';
import { transactionRepositoryInterface } from '../../../../repositories/transaction.repository';
import { TransactionEntityInterface, TransactionType } from '../../../../entities/transaction.entity';

export interface RegisterServiceOptions {
  email: string;
  password: string;
  username: string
  userRepository: UserRepositoryInterface;
}

export interface RegisterServiceResponse {
  accessToken: string;
  refreshToken: string;
}

export default async ({
  email,
  password,
  username,
  userRepository,
}: RegisterServiceOptions): Promise<UserEntityInterface|undefined> => {
  const user = await userRepository.getOneByEmail(email);
  if (user) {
    throw userEmailAlreadyExistsError();
  }

  let newUser

  await processTransaction(async (transactionalEntityManager) => {
    const hashedPassword = await hashPassword(password);


    newUser = await userRepository.createOne({
      id: uuid(),
      email,
      password: hashedPassword,
      username,
      acceptsPets: true,
      acceptsSmoking: true,
      avatarUrl: null,
      credits:200,
      customRules:[],
      type: UserType.PASSENGER,
    });
  });

  return newUser;
};
