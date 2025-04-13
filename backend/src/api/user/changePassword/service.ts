import argon2 from 'argon2';
import { UpdateUser, UserRepositoryInterface } from '../../../repositories/user.repository';
import userNotFoundError from '../../common/errors/userNotFound.error';
import badCredentialsError from '../../common/errors/badCredentials.error';
import { processTransaction } from '../../../core/database';
import { hashPassword } from '../../public/authentication/common/services/password.service';

interface ChangePasswordOptions {
  userId: string;
  oldPassword: string;
  newPassword: string;
  userRepository: UserRepositoryInterface;
}

export const service = async ({
  userId,
  oldPassword,
  newPassword,
  userRepository,
}: ChangePasswordOptions): Promise<void> => {
  const user = await userRepository.getOneById(userId, true);
  if (!user) {
    throw userNotFoundError();
  }

  const isGoodPassword = await argon2.verify(user.password, oldPassword);
  if (!isGoodPassword) {
    throw badCredentialsError();
  }

  await processTransaction(async (transactionalEntityManager) => {
    const hashedPassword = await hashPassword(newPassword);
    const updatedUser: UpdateUser = { ...user, password: hashedPassword };

    await userRepository.updateUser(userId, updatedUser, transactionalEntityManager);
  });
};
