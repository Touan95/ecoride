import { UpdateUser, UserRepositoryInterface } from '../../../repositories/user.repository';
import userNotFoundError from '../../common/errors/userNotFound.error';
import userNotStaffError from '../../common/errors/userNotStaff.error';
import userNotAdminError from '../../common/errors/userNotAdmin.error';

interface GiveStaffAccessOptions {
  adminId: string;
  email: string;
  userRepository: UserRepositoryInterface;
}

export const service = async ({
  adminId,
  email,
  userRepository,
}: GiveStaffAccessOptions): Promise<void> => {
  const admin = await userRepository.getOneById(adminId);
  if (!admin) {
    throw userNotFoundError();
  }

  if (!admin.isStaff) {
    throw userNotStaffError();
  }

  if (!admin.isAdmin) {
    throw userNotAdminError();
  }

  const user = await userRepository.getOneByEmail(email);
  if (!user) {
    throw userNotFoundError();
  }

  const updatedUser: UpdateUser = {
    ...user,
    isStaff: true,
  };

  await userRepository.updateUser(user.id, updatedUser);
};
