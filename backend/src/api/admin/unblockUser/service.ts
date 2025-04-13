import { UpdateUser, UserRepositoryInterface } from '../../../repositories/user.repository';
import userNotFoundError from '../../common/errors/userNotFound.error';
import userNotAdminError from '../../common/errors/userNotAdmin.error';
import userNotBlockedError from '../../common/errors/userNotBlocked.error';

interface UnblockUserOptions {
  adminId: string;
  userId: string;
  userRepository: UserRepositoryInterface;
}

export const service = async ({
  adminId,
  userId,
  userRepository,
}: UnblockUserOptions): Promise<void> => {
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

  if (!user.isBlocked) {
    throw userNotBlockedError();
  }

  const updatedUser: UpdateUser = {
    ...user,
    isBlocked: false,
  };

  await userRepository.updateUser(user.id, updatedUser);
};
