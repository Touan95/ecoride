import { User } from '../../../entities/user.entity';
import { UserRepositoryInterface } from '../../../repositories/user.repository';
import userNotAdminError from '../../common/errors/userNotAdmin.error';
import userNotFoundError from '../../common/errors/userNotFound.error';

interface GetBlockedUserOptions {
  userId: string;
  userRepository: UserRepositoryInterface;
}

export const service = async ({
  userId,
  userRepository,
}: GetBlockedUserOptions): Promise<User[]> => {
  const user = await userRepository.getOneById(userId);
  if (!user) {
    throw userNotFoundError();
  }

  if (!user.isAdmin) {
    throw userNotAdminError();
  }

  const allBlockedUsers = await userRepository.getAllBlockedUsers();

  return allBlockedUsers;
};
