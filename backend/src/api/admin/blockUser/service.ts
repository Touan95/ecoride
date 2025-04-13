import { UpdateUser, UserRepositoryInterface } from '../../../repositories/user.repository';
import userNotFoundError from '../../common/errors/userNotFound.error';
import userNotAdminError from '../../common/errors/userNotAdmin.error';
import userAlreadyBlockedError from '../../common/errors/userAlreadyBlocked.error';

interface BlockUserOptions {
  adminId: string;
  userId: string;
  userRepository: UserRepositoryInterface;
}

export const service = async ({
  adminId,
  userId,
  userRepository,
}: BlockUserOptions): Promise<void> => {
  const admin = await userRepository.getOneById(adminId);
  if (!admin) {
    throw userNotFoundError();
  }

  if (!admin.isAdmin) {
    throw userNotAdminError();
  }

  const user = await userRepository.getOneById(userId);
  if (!user) {
    throw userNotFoundError();
  }

  if (user.isBlocked) {
    throw userAlreadyBlockedError();
  }

  const updatedUser: UpdateUser = {
    ...user,
    isBlocked: true,
  };

  await userRepository.updateUser(user.id, updatedUser);
};
